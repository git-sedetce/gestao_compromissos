import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroProjetosService } from '../../services/cadastro-projetos.service';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { CadastroMenbros } from '../../models/cadastro-membros.model';

@Component({
  selector: 'app-cadastra-membro',
  templateUrl: './cadastra-membro.component.html',
  styleUrl: './cadastra-membro.component.css'
})
export class CadastraMembroComponent implements OnInit {
  @ViewChild('formMember') formMember!: NgForm;
  membro!: CadastroMenbros;

  lista_projeto!: any[];
  lista_membro!: any[];
  lista_resp!: any[];
  membrosAdicionados: any[] = []; // Lista para armazenar os membros temporariamente

  nome_projeto!: any[];
  nome_membro!: any[];
  responsabilidade!: any[];

  profile_id!: any;
  id_usuario!: any;
  user_name!: any;

  constructor(
    private router: Router,
    private serviceProject: CadastroProjetosService,
    private serviceUsers: UsersService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.membro = new CadastroMenbros();
    this.getProjetos();
    this.getMembro();
    this.getNivelResp();
    this.getPerfil();

  }

  getPerfil(){
    const token = localStorage.getItem('access_token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.id_usuario = payload._id;
    this.user_name = payload._user_name;
    this.membro.usuario_id = this.id_usuario;
    // console.log('Usuario ID:', this.id_usuario);
  }

  getMembro(){
    this.serviceUsers.pegar_users('allUser').subscribe((resp: any[]) => {
      this.lista_membro = resp;
      // console.log('this.lista_membro', this.lista_membro)

    }, (erro: any) => console.error('erro', erro)
    );
  }

  getNomeMembro(id: any){
    this.serviceUsers.getUser(id).subscribe((name: any) => {
      this.nome_membro = name.name;
      // console.log('this.nome_membro', this.nome_membro)
    }, (erro: any) => console.error('erro', erro)
  );
  }

  getNivelResp(){
    this.serviceProject.getresp('responsabilidade').subscribe((rp: any[]) => {
      this.lista_resp = rp;
      // console.log('responsabilidade', rp);
    }, (erro: any) => console.error ('error', erro)
    );
  }

  getResponsabilidade(id: any){
    this.serviceProject.getResp(id).subscribe((resp: any) => {
      this.responsabilidade = resp.tipo_responsabilidade;
      // console.log('this.responsabilidade', this.responsabilidade)
    }, (erro: any) => console.error('erro', erro)
  );
  }

  getProjetos(){
    this.serviceProject.getProjetos('project').subscribe((pj: any[]) => {
      this.lista_projeto = pj;
      // console.log('projetos', pj);
    }, (erro: any) => console.error ('error', erro)
    );
  }

  getProject(id: any){
    this.serviceProject.getProject(id).subscribe((resp: any) => {
      this.nome_projeto = resp.name;
      // console.log('this.nome_projeto', this.nome_projeto)
    }, (erro: any) => console.error('erro', erro)
  );
  }

   adicionarMembro() {
     if (this.membro.projeto_id && this.membro.user_id && this.membro.responsabilidade_id) {
  //     // Busca o nome do projeto pelo ID
   const projetoSelecionado = this.lista_projeto.find(
     (projeto) => projeto.id === this.membro.projeto_id
   );
   const nomeProjeto = projetoSelecionado ? projetoSelecionado.nome : 'Projeto não encontrado';
 // Busca o nome do membro pelo ID
   const membroSelecionado = this.lista_membro.find(
     (membro) => membro.id === this.membro.user_id
   );
   const nomeMembro = membroSelecionado ? membroSelecionado.nome : 'Membro não encontrado';

  //     // Adiciona os dados completos à lista de membros
    this.membrosAdicionados.push({
      projeto_id: this.membro.projeto_id,
      nome_projeto: this.nome_projeto,
      user_id: this.membro.user_id,
      nome_membro: this.nome_membro,
      nivel_responsabilidade: this.membro.responsabilidade_id,
      responsabilidade: this.responsabilidade,
      usuario: this.id_usuario,
      nome_usuario: this.user_name
    });

      // Reseta o formulário
      this.membro = new CadastroMenbros();
      this.toastr.success('Membro adicionado com sucesso!');
    } else {
      this.toastr.error('Preencha todos os campos antes de adicionar um membro.');
    }
  }

  removerMembro(userId: number, projetoId: number) {
    // Encontra o índice do membro no array
    const indice = this.membrosAdicionados.findIndex(
      (membro) => membro.user_id === userId && membro.projeto_id === projetoId
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
    // console.log('this.membrosAdicionados', this.membrosAdicionados)

    this.serviceProject.cadastrarMembro(this.membrosAdicionados).subscribe({
      next: (res: any) => {

        console.log('Resposta do backend', res); // Aqui você pode ver os dados enviados para o backend.
        this.toastr.success('Cadastro de membros realizado com sucesso!');
        this.router.navigate(['projetos-page']);
        this.membrosAdicionados = []; // Limpa a lista após o envio
        this.formMember.reset();
      },
      error: (e) => this.toastr.error(e)
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
