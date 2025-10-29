import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CadastroTarefa } from '../../models/cadastro-tarefa.model';
import { Router } from '@angular/router';
import { CadastroProjetosService } from '../../services/cadastro-projetos.service';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { TarefaService } from '../../services/tarefa.service';
import { AuditService } from '../../services/audit.service';
import { Audit } from '../../models/audit.model';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css'
})
export class TarefasComponent implements OnInit {
  @ViewChild('formTarefa') formTarefa!: NgForm
  tarefa!: CadastroTarefa;
  registro!: Audit

  lista_user!: any [];
  lista_projetos!: any [];
  lista_status!: any [];
  ordemTarefa!: any;

  profile_id!: any;
  user_name!: any;

  constructor(
    private router: Router,
    private serviceProject: CadastroProjetosService,
    private serviceUsers: UsersService,
    private serviceTarefa: TarefaService,
    private toastr: ToastrService,
    private auditService: AuditService,
  ) {}

  ngOnInit(): void {
      this.tarefa = new CadastroTarefa();
      this.registro = new Audit();
      this.getProjetos();
      this.getStatus();
      this.getPerfil();
  }

  getPerfil(){
    const token = localStorage.getItem('access_token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.registro.user_id = payload._id;
    this.user_name = payload._user_name;
    // console.log('Profile ID:', this.profile_id);
  }

  getStatus(){
    this.serviceProject.getStatus('allStatus').subscribe((st: any[]) =>{
      this.lista_status = st;
    }, (erro: any) => console.error('erro', erro)
    );
  }

  getProjetos(){
    this.serviceProject.getProjetos('allProject').subscribe((pj: any[]) =>{
      this.lista_projetos = pj;
    }, (erro: any) => console.error('erro', erro)
    );
  }

  getUser(id: any){
    this.serviceUsers.usersByProject(id).subscribe((user: any []) =>{
      this.lista_user = user;
    }, (erro: any) => console.error('erro', erro)
    );
  }
  getOrdemExecucao(id: any){
    this.serviceTarefa.ordemTarefa(id).subscribe((order: any) =>{
      this.ordemTarefa = order.execucao;
      if(this.ordemTarefa >= 1){
        this.tarefa.execucao = this.ordemTarefa + 1;
      } else {
        this.tarefa.execucao = 1;
      }
    }, (erro: any) => console.error('erro', erro)
    );
  }

  saveTarefa(){
    this.serviceTarefa.cadastrarTarefa(this.tarefa).subscribe({
      next: (res: any) => {
        this.toastr.success('Cadastro realizado com sucesso!');
        this.formTarefa.reset();
        this.router.navigate(['/projeto/projetos-page']);
      },
      error: (e) => (this.toastr.error(e.message))
    })
    this.saveRegister();
  }

  saveRegister(): void {
    this.registro.tipo_acao = 'Cadastro de tarefa'
    this.registro.acao = `A Tarefa ${this.tarefa.nome_ordem} foi cadastrado pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
    next: (res: any) => {
      // console.log('registro', res)
    },
    error: (e) => (this.toastr.error(e))
  })
  }

}
