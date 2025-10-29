import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { CadastroProjetosService } from '../../services/cadastro-projetos.service';
import { CompromissoService } from '../../services/compromisso.service';
import { ToastrService } from 'ngx-toastr';
import { SecretariaCoordenadoriaService } from '../../services/secretaria-coordenadoria.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  lista_compromissos!: any[];
  originalLista_compromissos: any[] = [];
  lista_status!: any [];
  lista_membro!: any[];
  date = new Date();
  data_atual!: any;

  page: number = 1; // Página atual
  itemsPerPage: number = 10; // Itens por página

  // Filtros selecionados
  selectedStatus: number | string = '';
  selectedMonth: string = '';

  authenticated: boolean = false;
  user_name: any;
  profile: any;
  sexec_id: any;
  user_id: any;

  constructor(
    private serviceUsers: UsersService,
    private router: Router,
    private serviceProject: CadastroProjetosService,
    private commitmentService: CompromissoService,
    private toastr: ToastrService,
    private sexec_coord_service: SecretariaCoordenadoriaService,
  ) {}

  ngOnInit(): void {
    this.getStatus();
    this.getPerfil();
    this.getMembro();
    this.data_atual = this.date;
  }

  getPerfil() {
    const token = localStorage.getItem('access_token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.profile = payload._profile_id;
    this.user_id = payload._id;
    // console.log('payload:', payload);

    if(this.profile == 1 || this.profile ==2){
      this.getUsersCommitment();
    }else{
      this.getCommitmentByMember(payload._id);
    }
  }

  getStatus(){
    this.serviceProject.getStatus('allStatus').subscribe((st: any[]) =>{
      this.lista_status = st;
    }, (erro: any) => console.error('erro', erro)
    );
  }

  getUsersCommitment(): void {
    this.serviceUsers.usersCommitment('usersCompromisso').subscribe(
      (data) => {
        this.lista_compromissos = data;
        this.originalLista_compromissos = [...this.lista_compromissos];
        // console.log('lista_compromissos', this.lista_compromissos);
      },
      (error) => console.error('Error fetching project details:', error)
    );
  }

  getUsersCommitmentFinished(id: number): void {
    this.serviceUsers.commitmentFinished(id).subscribe(
      (data) => {
        this.lista_compromissos = data;
        this.originalLista_compromissos = [...this.lista_compromissos];
        // console.log('lista_compromissos', this.lista_compromissos);
      },
      (error) => console.error('Error fetching project details:', error)
    );
  }

  getCommitmentFinished(): void {
    this.serviceUsers.usersCommitment('compromissoConcluidos').subscribe(
      (data) => {
        this.lista_compromissos = data;
        this.originalLista_compromissos = [...this.lista_compromissos];
        // console.log('lista_compromissos', this.lista_compromissos);
      },
      (error) => console.error('Error fetching project details:', error)
    );
  }

  getDataFinal(data: string | Date, prazo: number): Date {
    const dt = new Date(data);
    dt.setDate(dt.getDate() + prazo);
    return dt;
  }


  getDiferencaDias(data1: string, data2: string, prazo: number): number {
    const dt1 = new Date(data1);
    const dt2 = new Date(data2);

    // Cria uma nova data somando o prazo à data2
    const novaData = new Date(dt2);
    novaData.setDate(novaData.getDate() + prazo);

    // Calcula a diferença em milissegundos
    const diffTime = dt1.getTime() - novaData.getTime();

    // Converte a diferença para dias
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }



  getMembro() {
    this.serviceUsers.pegar_users('allUser').subscribe(
      (resp: any[]) => {
        this.lista_membro = resp;
        // console.log('this.lista_membro', this.lista_membro)
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  getNomeMembro(name: any) {
    this.sexec_coord_service.pegar_coord_sexec_by_user_name('coordsexecByUserName/', name).subscribe(
      (cd: any) => {
        // console.log('getUser', cd)
        this.getCommitmentByMember(cd.id)
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  getCommitmentByMember(id: any) {
    this.commitmentService.getCommitmentByRespId(id).subscribe(
      (resp: any[]) => {
        this.lista_compromissos = resp;
        // console.log('this.lista_membro', this.lista_membro)
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  viewMeet(reuniaoId: number) {
    // console.log('reunião', reuniaoId);
    this.router.navigate(['/commitment/meet', reuniaoId, 'task']);
  }

  filterStatus(statusId: number | string): void {
    this.selectedStatus = statusId;
    this.filterCommitments();
  }

  filterByMonth(month: string): void {
    this.selectedMonth = month;
    this.filterCommitments();
  }

  filterCommitments(): void {
    this.lista_compromissos = this.originalLista_compromissos.filter((compromisso) => {
      const matchesStatus =
        !this.selectedStatus || this.selectedStatus === 'Selecione o Status' || compromisso.status_id === +this.selectedStatus;

      const matchesMonth =
        !this.selectedMonth || this.selectedMonth === 'Selecione o Mês' ||
        (new Date(compromisso.data_inicial).getMonth() + 1) === parseInt(this.selectedMonth, 10);

      return matchesStatus && matchesMonth;
    });
  }

  mailCommitment(compromissoId: number) {
    // console.log('compromissoId', compromissoId);
    this.commitmentService.getMailCommitment(compromissoId).subscribe((mail: any[]) =>{
      // console.log('mail', mail);
      this.toastr.success('Email enviado com sucesso!')
    }, (erro: any) => this.toastr.error('Erro no envio de email!')//console.error('erro', erro)
    );
  }
}
