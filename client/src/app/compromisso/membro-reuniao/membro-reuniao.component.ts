import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import {
  faEdit,
  faTrash,
  faListCheck,
  faPaperclip,
  faFilePdf
} from '@fortawesome/free-solid-svg-icons';
import { Audit } from '../../models/audit.model';
import { AuditService } from '../../services/audit.service';
import { CompromissoService } from '../../services/compromisso.service';
import { Compromisso } from '../../models/compromisso.model';
import { CadastroProjetosService } from '../../services/cadastro-projetos.service';
import { Situacao } from '../../models/situacao.model';
import { CadastroReunioes } from '../../models/cadastro-reunioes.model';
import { ReuniaoService } from '../../services/reuniao.service';


@Component({
  selector: 'app-membro-reuniao',
  templateUrl: './membro-reuniao.component.html',
  styleUrl: './membro-reuniao.component.css',
})
export class MembroReuniaoComponent implements OnInit {
  @ViewChild('formSituacao') formSituacao!: NgForm;
  meetUp!: CadastroReunioes;

  formCompromisso!: FormGroup;
  compromissoObj: Compromisso = new Compromisso();
  situacao!: Situacao;
  registro!: Audit;

  lista_reuniao!: any[];
  lista_users!: any[];
  lista_status!: any[];
  lista_situacao!: any[];
  lista_cmt!: any[];


  reuniao!: any[];
  meet!: any;
  meetId!: any;
  meet_complete!: boolean;
  nome_membro!: any[];
  responsabilidade!: any[];

  arquivado!: boolean;
  have_status: boolean = false;
  can_status: boolean = false;
  maxChars = 3000;

  profile_id!: any;
  id_usuario!: any;
  user_name!: any;
  desc_compromisso!: any;
  user_compromisso!: any;
  has_report: boolean = false;

  faEdit = faEdit;
  faTrash = faTrash;
  faListCheck = faListCheck;
  faPaperclip = faPaperclip;
  faFilePdf = faFilePdf;

  editorModules = {};

  constructor(
    private router: Router,
    private serviceCompromisso: CompromissoService,
    private serviceUsers: UsersService,
    private serviceProject: CadastroProjetosService,
    private formBuilder: FormBuilder,
    private reuniaoService: ReuniaoService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private auditService: AuditService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.serviceCompromisso.getMembrosByMeet(Number(id)).subscribe(
      (data) => {
        if (data.length > 0) {
          this.meet_complete = true;
          this.reuniao = data;
          this.meetId = data[0].reuniao_id;
          this.getReuniao(this.meetId);
          // console.log('reuniao', this.reuniao);
        } else {
          this.meet_complete = false;
        }
      },
      (error) => {
        console.error('Error fetching project data', error);
      }
    );
    this.formCompromisso = this.formBuilder.group({
      id: [''],
      compromisso: [''],
      prazo: [''],
      data_inicial: [''],
      data_conclusao: [''],
      status_id: [''],
      arquivo: [''],
      responsavel_id: [''],
    });
    this.registro = new Audit();
    this.situacao = new Situacao();
    this.meetUp = new CadastroReunioes();
    this.getPerfil();
    this.getStatus();
    this.getUsers();

    this.editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],     // estilos
      [{ list: 'ordered' }, { list: 'bullet' }],     // listas
      ['link', 'clean'],                                      // links
      [{ color: [] }, { background: [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'font': [] }],
      [{ align: [] }]                                     // limpar formatação
    ]
  };
  }

  getPerfil() {
    const token = localStorage.getItem('access_token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.registro.user_id = payload._id;
    this.user_name = payload._user_name;
    this.compromissoObj.responsavel_id = this.id_usuario;
    // console.log('Usuario ID:', this.id_usuario);
  }
  getStatus() {
    this.serviceProject.getStatus('allStatus').subscribe(
      (st: any[]) => {
        this.lista_status = st;
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  getUsers() {
    this.serviceUsers.pegar_users('allUserActive').subscribe((usr: any[]) => {
      this.lista_users = usr;
      // console.log('lista_users', this.lista_users)
    }, (erro: any) => console.error(erro))
  }

  getReuniao(id: number): void {
    this.reuniaoService.reuniaoById(id).subscribe(
      (data) => {
        this.meetUp.compromissos_concluidos = data.compromissos_concluidos;
        this.meetUp.nome_reuniao = data.nome_reuniao;
      },
      (error) => console.error('Error fetching project details:', error)
    );
  }

  getSituacao(id: number, id_user: number) {
    if (this.registro.user_id == id_user) {
      this.can_status = true;
    } else {
      this.can_status = false;
    }
    this.situacao.compromisso_id = id;

    this.serviceCompromisso.getSituacaoId(id).subscribe(
      (data) => {
        this.have_status = !!data?.length;
        if (this.have_status) {
          this.lista_situacao = data;
          // console.log('status:', this.lista_situacao);
        }
      },
      (error) =>
        console.error('Erro ao buscar a situação do compromisso:', error)
    );
  }

  saveSituacao() {
    this.serviceCompromisso.salvarSituacao(this.situacao).subscribe({
      next: (res: any) => {
        // console.log('reunião', this.reuniao)
        this.toastr.success('Status do compromisso cadastrado com sucesso!');
        this.formSituacao.reset();
        // this.getSituacao(this.situacao.compromisso_id);
        this.serviceCompromisso
          .getSituacaoId(Number(this.situacao.compromisso_id))
          .subscribe(
            (data) => {
              if (data.length > 0) {
                this.have_status = true;
                this.lista_situacao = data;
                // console.log('status', this.lista_situacao);
              } else {
                this.have_status = false;
              }
            },
            (error) => console.error('Error fetching project details:', error)
          );
      },
      error: (e) => this.toastr.error(e),
    });
    this.saveRegister('cadastro_situacao', this.situacao.compromisso_id);
  }

  edit(compromisso: any) {
    // console.log('follow', follow);
    this.compromissoObj.id = compromisso.id;
    this.formCompromisso.controls['compromisso'].setValue(compromisso.compromisso);
    this.formCompromisso.controls['prazo'].setValue(compromisso.prazo);
    this.formCompromisso.controls['data_inicial'].setValue(compromisso.data_inicial);
    this.formCompromisso.controls['data_conclusao'].setValue(compromisso.data_conclusao);
    this.formCompromisso.controls['status_id'].setValue(compromisso.ass_commitment_status.id);
    this.formCompromisso.controls['arquivo'].setValue(compromisso.arquivo);
    this.formCompromisso.controls['responsavel_id'].setValue(compromisso.ass_commitment_users.id);
  }

  saveCompromisso() {
    this.compromissoObj.compromisso = this.formCompromisso.value.compromisso;
    this.compromissoObj.prazo = this.formCompromisso.value.prazo;
    this.compromissoObj.data_inicial = this.formCompromisso.value.data_inicial;
    this.compromissoObj.data_conclusao = this.formCompromisso.value.data_conclusao;
    this.compromissoObj.status_id = this.formCompromisso.value.status_id;
    this.compromissoObj.arquivo = this.formCompromisso.value.arquivo;
    this.compromissoObj.responsavel_id = this.formCompromisso.value.responsavel_id;

    this.serviceCompromisso
      .atualizarCompromisso(this.compromissoObj, Number(this.compromissoObj.id))
      .subscribe((res) => {
        // console.log('res',res)
        alert('Atualização realizada com sucesso!');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formCompromisso.reset();
        window.location.reload();
      });

    this.saveRegister('atualizar_compromisso', this.compromissoObj.id);
  }

  finalizaCompromisso() {
    this.reuniaoService
      .finalizaCompromissos(this.meetId, this.meetUp)
      .subscribe((res) => {
        //let ref = document.getElementById('cancel')
        this.toastr.success('Atualiação realizada com sucesso!!!');
        this.router.navigate(['/commitment/acompanhamento']);
      });
    this.registerEnd('finaliza_compromissos', this.meetId);
  }

  delete(commitment: any) {
    this.serviceCompromisso
      .deletarCompromisso(commitment.id)
      .subscribe((res) => {
        alert('Compromisso deletado');
        window.location.reload();
      });

    this.saveRegister('excluir_compromisso', commitment.id);
  }

  saveRegister(tipo: any, acao: any): void {
    this.registro.tipo_acao = tipo;
    this.registro.acao = `O compromisso de id ${acao} foi alterado pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
      next: (res: any) => {
        // console.log('registro', res)
      },
      error: (e) => this.toastr.error(e),
    });
  }

  registerEnd(tipo: any, acao: any): void {
    this.registro.tipo_acao = tipo;
    this.registro.acao = `A reunião de id ${acao} foi teve seus compromissos finalizados pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
      next: (res: any) => {
        // console.log('registro', res)
      },
      error: (e) => this.toastr.error(e),
    });
  }

  mailCommitment(compromissoId: number) {
    // console.log('compromissoId', compromissoId);
    this.serviceCompromisso.getMailCommitment(compromissoId).subscribe((mail: any[]) =>{
      // console.log('mail', mail);
      this.toastr.success('Email enviado com sucesso!')
    }, (erro: any) => this.toastr.error('Erro no envio de email!')//console.error('erro', erro)
    );
  }

  exportar(conmitment_id: any){
    // console.log('stconmitment_idatus', conmitment_id);
    this.serviceCompromisso.getExportCommitment(conmitment_id).subscribe((cmt: any[]) => {
      this.lista_cmt = cmt;
      if (this.lista_cmt.length > 0) {
        this.has_report = true;
        this.desc_compromisso = this.lista_cmt[0].ass_report_commitment.compromisso;
        this.user_compromisso = this.lista_cmt[0].ass_report_commitment.ass_commitment_users.name
        // console.log('lista_cmt', this.lista_cmt[0])
      }else{
        this.has_report = false
      }

    }, (erro: any) => console.error(erro))
  }


}
