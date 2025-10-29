import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroProjetosService } from '../../services/cadastro-projetos.service';
import { ReuniaoService } from '../../services/reuniao.service';
import { CadastroTarefa } from '../../models/cadastro-tarefa.model';
import { FormGroup } from '@angular/forms';
import { SecretariaCoordenadoriaService } from '../../services/secretaria-coordenadoria.service';
import { CompromissoService } from '../../services/compromisso.service';
import { AuditService } from '../../services/audit.service';
import { Audit } from '../../models/audit.model';

@Component({
  selector: 'app-acompanhamento',
  templateUrl: './acompanhamento.component.html',
  styleUrl: './acompanhamento.component.css',
})
export class AcompanhamentoComponent implements OnInit {
  profile_id!: any;
  user_id!: any;
  user_name!: any;
  authenticated: boolean = false;
  projeto: any;
  lista_reunioes!: any[];
  have_meet: boolean = false;
  pauta: any;
  ata: any;
  meetName!: any;
  oneMeet!: any;
  formTarefa!: FormGroup;
  tarefaObj: CadastroTarefa = new CadastroTarefa();
  registro!: Audit;
  tarefas_cadastradas: boolean = false;

  page: number = 1; // Página atual
  itemsPerPage: number = 10; // Itens por página

  date = new Date();
  ano_atual!: any;
  mes_atual!: any;
  lista_ano: number[] = [];
  lista_mes: any[] = [];

  //Variaáveis Filtro
  filter: boolean = false;
  filtro_coord!: any;
  filtro_mes!: any;
  filtro_ano!: any;
  filtro_sexec!: any;
  eventosFiltrados: any[] = [];

  lista_sexec!: any[];
  lista_coord!: any[];

  constructor(
    private route: ActivatedRoute,
    private serviceProject: CadastroProjetosService,
    private serviceMeet: ReuniaoService,
    private compromissoService: CompromissoService,
    private router: Router,
    private sexec_coord_service: SecretariaCoordenadoriaService,
    private auditService: AuditService,
  ) {}

  ngOnInit(): void {
    this.registro = new Audit();
    this.pegarReunioes();
    this.getPerfil();
    this.getSexec();
    this.getCoordenadoria();

    this.ano_atual = this.date.getFullYear();

    for (let y = 2023; y <= this.ano_atual + 1; y++) {
      this.lista_ano.push(y);
    }
    // console.log('lista_ano', this.lista_ano)

    for (let m = 0; m < 12; m++) {
      const data = new Date(this.ano_atual, m); // Criando uma data para cada mês do ano
      const nomeMes = data.toLocaleString('default', { month: 'long' }); // Nome do mês (ex: Janeiro)
      this.lista_mes.push(nomeMes);
    }
  }

  getPerfil() {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        const payload = JSON.parse(atob(token!.split('.')[1]));
        this.profile_id = payload._profile_id;
        this.user_id = payload._id;
        this.authenticated = true;
        this.registro.user_id = payload._id;
        this.user_name = payload._user_name;
        // console.log('payload', payload);
      }
    }
  }

  getSexec(){
    this.sexec_coord_service.secretaria('secretaria').subscribe((sxc:any[]) =>{
      this.lista_sexec = sxc;
    }, (erro: any) => console.error(erro)
    );
  }

  getCoordenadoria(){
    this.sexec_coord_service.coordenadoria('coordenadoria').subscribe((cd: any[]) => {
      this.lista_coord = cd;
      // console.log('cd', cd)
    }, (erro: any) => console.error('erro', erro)
    );
  }

  getSexecID(id: any){
    this.sexec_coord_service.filtro_sexec_meet_without_project('meetSexec/', id).subscribe((rp:any[]) =>{
      this.lista_reunioes = rp;
    }, (erro: any) => console.error(erro)
    );

  }

  getCoordID(id: any){
    this.sexec_coord_service.filtro_coord_meet_without_project('meetCoord/', id).subscribe((rp:any[]) =>{
      this.lista_reunioes = rp;
    }, (erro: any) => console.error(erro)
    );

  }

  getProjectDetails(id: number): void {
    this.serviceProject.getProjetoDetalhes(id).subscribe(
      (data) => {
        this.projeto = data;
        // console.log('projeto-resumo', this.projeto);
      },
      (error) => console.error('Error fetching project details:', error)
    );
  }

  pegarReunioes() {
    this.compromissoService.getMeetTask('meet').subscribe(
      (data) => {
        if (data.length > 0) {
          this.have_meet = true;
          // console.log('meet', data);
          this.lista_reunioes = data;
        } else {
          this.have_meet = false;
        }
      },
      (error) => {
        console.error('Error ao criar a lista de reuniões', error);
      }
    );
  }

  editarCompromissos(reuniaoId: number) {
    // console.log('reunião', reuniaoId);
    this.router.navigate(['/commitment/meet', reuniaoId, 'task']);

    // this.serviceMeet.getOneMeetTask(reuniaoId).subscribe(
    //   (data) => {

    //     this.oneMeet = data;
    //     console.log('oneMeet', this.oneMeet);
    //     this.meetName = this.oneMeet[0].nome_reuniao;
    //     this.pauta = this.oneMeet[0].pauta;
    //   },
    //   (error) => {
    //     console.error('Error ao criar a lista de reuniões', error);
    //   }
    // );
  }

  startMeet(reuniaoId: number) {
    // console.log('reunião', reuniaoId);
    this.router.navigate(['/commitment/membersmeet', reuniaoId, 'cadastro']);
  }

  //ATRIBUIR TAREFA

  //ACOMPANHAR TAREFA
  exportarCompromisso(reuniaoId: number) {
    // console.log('reunião', reuniaoId);

    this.compromissoService.getCommitmentByMeet(reuniaoId).subscribe(
      (data) => {
        this.oneMeet = data;
        this.meetName = this.oneMeet.nome_reuniao
        // console.log('oneMeet', data);
      },
      (error) => {
        console.error('Error ao criar a lista de reuniões', error);
      }
    );
  }

  deleteMeet(reuniao: any) {
    this.serviceMeet
      .deletarReuniao(reuniao.id)
      .subscribe((res) => {
        alert('Reunião deletado com sucesso!');
        window.location.reload();
      });

    this.saveRegister('excluir_compromisso', reuniao.id);
  }

  saveRegister(tipo: any, acao: any): void {
    this.registro.tipo_acao = tipo;
    this.registro.acao = `O compromisso de id ${acao} foi cadastrado pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
      next: (res: any) => {
        // console.log('registro', res)
      },
      error: (e) => alert(`Erro ao deletar a reunião! ${e}`)
    });
  }


}
