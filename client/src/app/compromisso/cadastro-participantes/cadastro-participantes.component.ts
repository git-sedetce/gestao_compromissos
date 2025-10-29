import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ReuniaoService } from '../../services/reuniao.service';
import { CadastroTarefa } from '../../models/cadastro-tarefa.model';
import { TarefaService } from '../../services/tarefa.service';
import { Compromisso } from '../../models/compromisso.model';
import { CompromissoService } from '../../services/compromisso.service';
import { SecretariaCoordenadoriaService } from '../../services/secretaria-coordenadoria.service';

@Component({
  selector: 'app-cadastro-participantes',
  templateUrl: './cadastro-participantes.component.html',
  styleUrl: './cadastro-participantes.component.css',
})
export class CadastroParticipantesComponent implements OnInit {
  @ViewChild('formCompromisso') formCompromisso!: NgForm;
  compromisso!: Compromisso;

  lista_reuniao!: any[];
  lista_membro!: any[];
  membrosAdicionados: any[] = []; // Lista para armazenar os membros temporariamente
  maxChars = 5000;

  reuniao!: any;
  nome_membro!: any[];
  responsabilidade!: any[];
  // data_final!: any;

  profile_id!: any;
  id_usuario!: any;
  user_name!: any;
  getUser!: any;
  meetName!: any;

  // have_task: boolean = false;

  constructor(
    private router: Router,
    private serviceReuniao: ReuniaoService,
    private serviceUsers: UsersService,
    private compromissoService: CompromissoService,
    private sexec_coord_service: SecretariaCoordenadoriaService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.serviceReuniao.reuniaoById(Number(id)).subscribe(
      (data) => {
        // console.log('reuniao', data);
        this.reuniao = data;
        this.meetName = data.nome_reuniao;
        // this.data_final = data.data_reuniao
      },
      (error) => {
        console.error('Error fetching project data', error);
      }
    );
    this.compromisso = new Compromisso();
    this.getMembro();
    this.getPerfil();
  }

  getPerfil() {
    const token = localStorage.getItem('access_token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.id_usuario = payload._id;
    this.user_name = payload._user_name;
    this.compromisso.responsavel_id = this.id_usuario;
    // console.log('Usuario ID:', this.id_usuario);
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

  getCoordSexec(id: number) {
    this.sexec_coord_service.pegar_coord_sexec_by_user('coordsexecByUserId/', id).subscribe(
      (cd: any[]) => {
        this.getUser = cd;
        // console.log('getUser', this.getUser)
        this.reuniao.coord_id = this.getUser.coord_id;
        this.reuniao.sexec_id = this.getUser.sexec_id;
      },
      (erro: any) => console.error('erro', erro)
    );
  }


  getNomeMembro(name: any, form: any) {
    this.sexec_coord_service.pegar_coord_sexec_by_user_name('coordsexecByUserName/', name).subscribe(
      (cd: any[]) => {
        this.getUser = cd;
        // console.log('getUser', this.getUser)
        this.compromisso.coord_id = this.getUser.coord_id;
        this.compromisso.sexec_id = this.getUser.sexec_id;
        this.compromisso.responsavel_id = this.getUser.id;
      },
      (erro: any) => console.error('erro', erro)
    );

    // this.serviceUsers.getUser(id).subscribe(
    //   (name: any) => {
    //     this.nome_membro = name.name;
    //     console.log('this.nome_membro', this.nome_membro)
    //   },
    //   (erro: any) => console.error('erro', erro)
    // );
  }

  // getMeet(id: any) {
  //   this.serviceReuniao.reuniaoById(id).subscribe(
  //     (resp: any) => {
  //       this.nome_reuniao = resp.name;
  //       console.log('this.nome_reunião', this.nome_reuniao);
  //     },
  //     (erro: any) => console.error('erro', erro)
  //   );
  // }

  adicionarMembro() {
    if (this.compromisso.reuniao_id || this.compromisso.data_inicial || this.compromisso.responsavel_id) {
      const membroSelecionado = this.lista_membro.find(
        (membro) => membro.id === this.compromisso.responsavel_id
      );
      const nomeMembro = membroSelecionado ? membroSelecionado.nome : 'Membro não encontrado';
      this.membrosAdicionados.push({
        reuniao_id: this.reuniao.id,
        nome_reuniao: this.reuniao.nome_reuniao,
        responsavel_id: Number(this.compromisso.responsavel_id),
        nome_membro: this.compromisso.nome_usuario,
        compromisso: this.compromisso.compromisso,
        data_inicial: this.compromisso.data_inicial,
        prazo: this.compromisso.prazo,
        status_id: 1,
        coord_id: this.compromisso.coord_id,
        sexec_id: this.compromisso.sexec_id,
        usuario: this.id_usuario,
        nome_usuario: this.user_name
      });

      // Resetando o formulário após adicionar
      this.compromisso = new Compromisso()
      this.toastr.success('Compromisso adicionado com sucesso!');


    }else {
      alert('Preencha todos os campos antes de adicionar um membro.');
      return;
    }

  }

  removerMembro(userId: number) {
    // Encontra o índice do membro no array
    const indice = this.membrosAdicionados.findIndex(
      (membro) => membro.responsavel_id === userId
    );

    if (indice !== -1) {
      // Remove o membro usando o índice encontrado
      this.membrosAdicionados.splice(indice, 1);
      this.toastr.success('Membro removido da lista com sucesso!');
    } else {
      this.toastr.error('Membro não encontrado na lista.');
    }
  }

  cadastraMembro() {
    if (this.membrosAdicionados.length === 0) {
      this.toastr.error('Adicione pelo menos um membro antes de cadastrar.');
      return;
    }
    // console.log('this.membrosAdicionados', this.membrosAdicionados);


      this.compromissoService.cadastrarCompromisso(this.membrosAdicionados).subscribe({
        next: (res: any) => {
          console.log('Resposta do backend', res); // Aqui você pode ver os dados enviados para o backend.
          this.toastr.success('Cadastro de membros realizado com sucesso!');
          this.router.navigate(['commitment/acompanhamento']);
          this.membrosAdicionados = []; // Limpa a lista após o envio
          this.formCompromisso.reset();
        },
        error: (e) => this.toastr.error(e), //console.error('erro', e)
      });
  }

  // cadastraMembro(){
  //   this.membro.st_partic = 'sim'
  //   this.serviceProject.cadastrarMembro(this.membro).subscribe({
  //     next:(res:any) =>{
  //       this.toastr.success('Cadastro de projeto realizado com sucesso!!!');
  //       console.log('membroCadstrado', res)
  //       // this.router.navigate(['projetos-page']);
  //       this.formMember.reset();
  //     },
  //     error: (e) => (this.toastr.error(e))
  //   })
  // }
}
