import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroProjetosService } from '../../services/cadastro-projetos.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Justificativa } from '../../models/justificativa.model';
import { ReuniaoService } from '../../services/reuniao.service';
import { Ata } from '../../models/ata.model';
import { ToastrService } from 'ngx-toastr';
import { CadastroProjetos } from '../../models/cadastro-projetos.model';
import { SecretariaCoordenadoriaService } from '../../services/secretaria-coordenadoria.service';
import { Audit } from '../../models/audit.model';
import { AuditService } from '../../services/audit.service';

declare var bootstrap: any;

@Component({
  selector: 'app-projetos-resumo',
  templateUrl: './projetos-resumo.component.html',
  styleUrls: ['./projetos-resumo.component.css']
})
export class ProjetosResumoComponent implements OnInit {

  @ViewChild("formjustify") formjustify!:NgForm
  justify!: Justificativa;

  formProject!: FormGroup;
  projetoObj: CadastroProjetos = new CadastroProjetos();
  registro!: Audit;
  lista_coord!: any[];
  lista_sexec!: any[];
  lista_status!: any[];
  secretaria_executiva!: any;

  projeto: any;
  statuses: any[] = [];
  selectedStatusId: number | null = null;
  isEditingStatus: boolean = false;
  profile_id!: any;
  user_id!: any;
  user_name!: any;
  id_sexec!: any;
  authenticated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceProject: CadastroProjetosService,
    private toastr: ToastrService,
    private serviceMeet: ReuniaoService,
    private formBuilder: FormBuilder,
    private sexec_coord_service: SecretariaCoordenadoriaService,
    private auditService: AuditService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.getProjectDetails(Number(projectId));
      this.getStatuses();
    } else {
      console.error('ProjectID is not provided in the route');
    }

    this.justify = new Justificativa();
    this.registro = new Audit();
    this.getPerfil();
    this.getCoordenadoria();
    this.getStatus();

    this.formProject = this.formBuilder.group({
      id: [''],
      name: [''],
      descricao: [''],
      data_inicio: [''],
      previsao_conclusao: [''],
      coord_id: [''],
      sexec_id: [''],
      status_id: [''],
      usuario_id: [''],
      numero_programa: [''],
      valor: [''],
      secretaria_executiva: [''],
    })
    // Preenche o valor inicial de secretaria_executiva, se disponível
  if (this.projeto?.ass_project_sexec?.secretaria) {
    this.formProject.patchValue({
      secretaria_executiva: this.projeto.ass_project_sexec.secretaria,
    });
  }
  }

  getPerfil(){
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        const payload = JSON.parse(atob(token!.split('.')[1]));
        this.profile_id = payload._profile_id;
        this.user_id = payload._id;
        this.id_sexec = payload._sexec_id;
        this.authenticated = true;
        this.user_name = payload._user_name;
        // console.log('payload', payload)
      }
    }
  }

  getCoordenadoria(){
    this.sexec_coord_service.coordenadoria('coordenadoria').subscribe((cd: any[]) => {
      this.lista_coord = cd;
      // console.log('cd', cd)
    }, (erro: any) => console.error('erro', erro)
    );
  }

  foundSexec(coord:any){
    this.sexec_coord_service.pegar_coordenadoria_by_id('coordenadoriaById/', coord).subscribe((cd: any) =>{
      // console.log('coordenadorias', cd)
      // console.log('sexec_id', cd.sexec_id)
      this.pegarSecretaria(cd.sexec_id);
    },
    (erro: any) => console.error('Erro ao buscar coordenadoria:', erro)
  );
  }

  pegarSecretaria(id: any): void {
    this.sexec_coord_service.pegar_secretaria('secretaria/', id).subscribe(
      (id_sec: any) => {
        // console.log('Secretaria encontrada:', id_sec);

        // Atualiza o valor do campo secretaria_executiva no formulário
        this.formProject.patchValue({
          secretaria_executiva: id_sec.secretaria,
          sexec_id: id_sec.id, // Atualiza também o campo sexec_id
        });
      },
      (erro: any) => console.error('Erro ao buscar secretaria:', erro)
    );
  }

  getStatus(){
    this.serviceProject.getStatus('allStatus').subscribe((st: any[]) =>{
      this.lista_status = st;
    }, (erro: any) => console.error('erro', erro)
    );
  }

  getProjectDetails(id: number): void {
    this.serviceProject.getProjetoDetalhes(id).subscribe(
      (data) => {
        this.projeto = data;
        // console.log('projeto-resumo', this.projeto)
        if (data && data.ass_project_status) {
          this.selectedStatusId = data.ass_project_status.id;
        }
      },
      (error) => console.error('Error fetching project details:', error)
    );
  }

  getStatuses(): void {
    this.serviceProject.getStatus('allStatus').subscribe(
      (data) => {
        this.statuses = data;
      },
      (error) => console.error('Error fetching statuses:', error)
    );
  }

  toggleEditStatus(): void {
    this.isEditingStatus = !this.isEditingStatus;
  }

  saveStatus(): void {
    if (this.selectedStatusId !== null && this.projeto && this.projeto.id) {
      setTimeout(() => {
        this.serviceProject.updateProjectStatus(this.projeto.id, this.selectedStatusId as number).subscribe(
          (data) => {
            this.projeto = data;
            this.isEditingStatus = false;
          },
          (error) => console.error('Error updating project status:', error)
        );
      }, 400);
    } else {
      console.error('ProjectID or StatusID is missing. Project ID:', this.projeto?.id, 'Status ID:', this.selectedStatusId);
    }
  }

  deleteProject(): void {
    const myModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal') as HTMLElement);
    myModal.show();
  }

  editProject(project: any): void {
    const myModal = new bootstrap.Modal(document.getElementById('editarModal') as HTMLElement);
    myModal.show();

    this.projetoObj.id = project.id;
    this.formProject.controls['name'].setValue(project.name);
    this.formProject.controls['descricao'].setValue(project.descricao);
    this.formProject.controls['data_inicio'].setValue(project.data_inicio);
    this.formProject.controls['previsao_conclusao'].setValue(project.previsao_conclusao);
    this.formProject.controls['coord_id'].setValue(project.coord_id);
    this.formProject.controls['sexec_id'].setValue(project.sexec_id);
    this.formProject.controls['status_id'].setValue(project.status_id);
    this.formProject.controls['usuario_id'].setValue(project.usuario_id);
    this.formProject.controls['numero_programa'].setValue(project.numero_programa);
    this.formProject.controls['valor'].setValue(project.valor);
  }

  confirmArchiving(): void {
    this.justify.tipo_acao = "arquivar projetos";
    this.justify.user_id = this.user_id;
    if (this.projeto && this.projeto.id) {
      this.serviceProject.filedProject(this.justify, this.projeto.id).subscribe(
        () => {
          this.router.navigate(['/projeto/projetos-page']);
        },
        (error) => console.error('Error archiving project:', error)
      );
    } else {
      console.error('ProjectID is missing. Project ID:', this.projeto?.id);
    }

    const myModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal') as HTMLElement);
    if (myModal) {
      myModal.hide();
    }
  }

  confirmEdit(): void {
    this.projetoObj.name = this.formProject.value.name;
    this.projetoObj.descricao = this.formProject.value.descricao;
    this.projetoObj.data_inicio = this.formProject.value.data_inicio;
    this.projetoObj.previsao_conclusao = this.formProject.value.previsao_conclusao;
    this.projetoObj.coord_id = this.formProject.value.coord_id;
    this.projetoObj.sexec_id = this.formProject.value.sexec_id;
    this.projetoObj.numero_programa = this.formProject.value.numero_programa;
    this.projetoObj.valor = this.formProject.value.valor;

    this.serviceProject
      .updateProjeto(this.projetoObj, Number(this.projetoObj.id))
      .subscribe((res) => {
        // console.log('res',res)
        alert('Atualização realizada com sucesso!');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formProject.reset();
        window.location.reload();
      });

    this.saveRegister('atualizar_projeto', this.projetoObj.id);

  }

  saveRegister(tipo: any, acao: any): void {
    this.registro.tipo_acao = tipo;
    this.registro.acao = `O projeto de id ${acao} foi alterado pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
      next: (res: any) => {
        // console.log('registro', res)
      },
      error: (e) => this.toastr.error(e),
    });
  }
}
