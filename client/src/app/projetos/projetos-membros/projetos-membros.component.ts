import { Component, OnInit } from '@angular/core';
import { CadastroProjetosService } from '../../services/cadastro-projetos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CadastroMenbros } from '../../models/cadastro-membros.model';
import { ToastrService } from 'ngx-toastr';
import { Audit } from '../../models/audit.model';
import { AuditService } from '../../services/audit.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

declare var bootstrap: any;

@Component({
  selector: 'app-projetos-membros',
  templateUrl: './projetos-membros.component.html',
  styleUrl: './projetos-membros.component.css',
})
export class ProjetosMembrosComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;

  projeto: any;
  membros!: any[];
  notMembros!: any[];
  lista_resp!: any[];
  authenticated: boolean = false;
  membroEdit: boolean = false;
  membroUser!: any;
  membroDelete: boolean = false;
  notMembers: boolean = false;
  profile_id!: any;
  user_name!: any;
  membroToDelete: number | null = null;
  formMembro!: FormGroup;
  membroObj: CadastroMenbros = new CadastroMenbros();
  registro!: Audit;
  userDeletado: any;
  projetoName!: any;

  constructor(
    private cadastroProjetosService: CadastroProjetosService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private auditService: AuditService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.cadastroProjetosService
      .getProjectWithCronogramasETarefas(Number(id))
      .subscribe(
        (data) => {
          // console.log('projeto', data);
          this.projeto = data;
        },
        (error) => {
          console.error('Error fetching project data', error);
        }
      );

    this.registro = new Audit();
    this.getParticiped(Number(id));
    this.getNotPaticiped(Number(id));
    this.getPerfil();
    this.forms();

  }

  getParticiped(id: number){
    this.cadastroProjetosService.getMembrosByProjetoId(Number(id)).subscribe(
      (data) => {
        // console.log('membros', data);
        this.membros = data;
      },
      (error) => {
        console.error('Error fetching project data', error);
      }
    );
  }

  getNotPaticiped(id: number){
    this.cadastroProjetosService.getMembrosByProjetoIdNot(Number(id)).subscribe(
      (data) => {
        // console.log('notMembros', data);
        this.notMembros = data;
        if(this.notMembros.length > 0){
          this.notMembers = true;
        }else{
          this.notMembers = false;
        }
      },
      (error) => {
        console.error('Error fetching project data', error);
      }
    );
  }

  getPerfil() {
    const token = localStorage.getItem('access_token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.registro.user_id = payload._id;
    this.user_name = payload._user_name;
  }

  forms(): void {
    this.formMembro = this.formBuilder.group({
      id: [''],
      projeto_id: [''],
      responsabilidade_id: [''],
      st_partic: [''],
    });
  }

  editMembro(membro: any) {
    this.membroObj.id = membro.id;
    this.formMembro.controls['projeto_id'].setValue(membro.projeto_id);
    this.formMembro.controls['responsabilidade_id'].setValue(membro.ass_project_resp.id);
    this.formMembro.controls['st_partic'].setValue(membro.st_partic);

    this.membroUser = membro.ass_project_users.name;
  }

  updateMembro() {
    this.membroObj.responsabilidade_id = this.formMembro.value.responsabilidade_id;
    this.membroObj.st_partic = this.formMembro.value.st_partic;

    // console.log('membroObj', this.membroObj)

    this.cadastroProjetosService
      .updateMembro(this.membroObj, Number(this.membroObj.id))
      .subscribe(
        (res) => {
          // console.log('res', res)
          this.toastr.success('Atualiação realizada com sucesso!!!');
          this.membroEdit = true;
          const myModal = bootstrap.Modal.getInstance(
            document.getElementById('modalEditCronograma') as HTMLElement
          );
          if (myModal) {
            myModal.hide();
          }
          this.saveRegister();
          window.location.reload();
          // this.getParticiped(Number(this.membroObj.id))
        },
        (error) => {
          console.error('Erro ao atualizar membro', error);
        }
      );

  }
  confirmDeleteMembros(MembroId: number) {
    this.membroToDelete = MembroId;
    this.cadastroProjetosService.getMembroByProjeto(this.membroToDelete).subscribe(
      (res) => {
        // console.log('membros', res);
        this.userDeletado = res.ass_project_users.name;
        this.projetoName = res.ass_project_members.name;
        // console.log('idDeletado', this.userDeletado)
      },
      (error) => {
        console.error('Error fetching project data', error);
      });
    const myModal = new bootstrap.Modal(
      document.getElementById('confirmDeleteMembroModal') as HTMLElement
    );
    myModal.show();
  }

  deleteMembros() {
    if (this.membroToDelete !== null) {
      this.cadastroProjetosService.deletarMembro(this.membroToDelete).subscribe(
        () => {
          this.membros = this.membros.filter(
            (membros: any) => membros.id !== this.membroToDelete
          );
          this.membroToDelete = null;
          this.membroDelete = true;
          const myModal = bootstrap.Modal.getInstance(
            document.getElementById('confirmDeleteMembroModal') as HTMLElement
          );
          if (myModal) {
            myModal.hide();
          }
          this.saveRegister();
        },
        (error) => {
          console.error('Error deleting cronograma', error);
        }
      );
    }
  }

  saveRegister(): void {
    if (this.membroEdit) {
      this.registro.tipo_acao = 'Editar Membro';
      this.registro.acao = `O membro ${this.membroUser} foi alterado pelo usuário ${this.user_name}`;
      this.auditService.cadastrarRegistros(this.registro).subscribe({
        next: (res: any) => {
          // console.log('registro', res)
        },
        error: (e) => console.error(e),
      });
    } else if (this.membroDelete) {
      this.registro.tipo_acao = 'Deletar Membro';
      this.registro.acao = `O membro ${this.userDeletado} foi excluido do projeto ${this.projetoName} pelo usuário ${this.user_name}`;
      this.auditService.cadastrarRegistros(this.registro).subscribe({
        next: (res: any) => {
          // console.log('registro', res)
        },
        error: (e) => console.error(e),
      });
    }
  }
}

