import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CadastroSubTarefas } from '../../models/cadastro-sub-tarefa.model';
import { Router } from '@angular/router';
import { CadastroProjetosService } from '../../services/cadastro-projetos.service';
import { UsersService } from '../../services/users.service';
import { TarefaService } from '../../services/tarefa.service';
import { ToastrService } from 'ngx-toastr';
import { SubTarefaService } from '../../services/subtarefa.service';
import { AuditService } from '../../services/audit.service';
import { Audit } from '../../models/audit.model';

@Component({
  selector: 'app-sub-tarefas',
  templateUrl: './sub-tarefas.component.html',
  styleUrl: './sub-tarefas.component.css'
})
export class SubTarefasComponent implements OnInit{
  @ViewChild('formTarefa') formSubTarefa!: NgForm
  subTarefa!: CadastroSubTarefas;
  registro!: Audit

  lista_user!: any [];
  lista_projetos!: any [];
  lista_status!: any [];
  lista_tarefa!: any [];
  lista_sub_tarefa!: any [];
  ordemSubTarefa!: any;
  projeto_id!: any;
  pending!: any;
  listar_sub!: boolean;

  profile_id!: any;
  user_name!: any;

  constructor(
    private router: Router,
    private serviceProject: CadastroProjetosService,
    private serviceUsers: UsersService,
    private serviceTarefa: TarefaService,
    private serviceSubTarefa: SubTarefaService,
    private toastr: ToastrService,
    private auditService: AuditService,
  ) {}

  ngOnInit(): void {
      this.subTarefa = new CadastroSubTarefas();
      this.registro = new Audit();
      this.getStatus();
      this.getProjetos();
      this.getPerfil();
      // this.getTarefa();
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

  // getTarefa(){
  //   this.serviceTarefa.getTarefa('allTarefa').subscribe((cr: any[]) =>{
  //     this.lista_tarefa = cr;
  //     console.log('lista_tarefa', this.lista_tarefa)
  //   }, (erro: any) => console.log('erro', erro)
  //   );
  // }

  getProjetos(){
    this.serviceProject.getProjetos('allProject').subscribe((pj: any[]) =>{
      this.lista_projetos = pj;
    }, (erro: any) => console.error('erro', erro)
    );
  }

  getUser(id: any){
    this.serviceTarefa.tarefaById(id).subscribe((crId: any) =>{
      this.serviceUsers.usersByProject(crId.projeto_id).subscribe((user: any []) =>{
        this.lista_user = user;
      }, (erro: any) => console.error('erro', erro)
      );
    }, (erro: any) => console.error('erro', erro)
    );

  }

  getTask(id: any){
    this.serviceSubTarefa.getTask(id).subscribe((tasks: any []) =>{
      this.lista_tarefa = tasks;
    },(erro: any) => console.error('error', erro))
  }

  getTaskTarefa(id: any){
    this.serviceSubTarefa.subTarefaByTarefa(id).subscribe((subtasks: any []) =>{
      this.lista_sub_tarefa = subtasks;
      // console.log('lista_sub_tarefa', this.lista_sub_tarefa)
      if(this.lista_sub_tarefa.length > 0){
        this.listar_sub = true;
      } else {
        this.listar_sub = false;
      }
    },(erro: any) => console.error('error', erro))
  }

  getOrdemExecucao(id: any){
    this.serviceSubTarefa.ordemSubTarefa(id).subscribe((order: any) =>{
      this.ordemSubTarefa = order.execucao;
      if(this.ordemSubTarefa >= 1){
        this.subTarefa.execucao = this.ordemSubTarefa + 1;
      } else {
        this.subTarefa.execucao = 1;
      }
    }, (erro: any) => console.error('erro', erro)
    );
  }

  saveSubTarefa(){
    this.serviceSubTarefa.cadastrarSubTarefa(this.subTarefa).subscribe({
      next: (res: any) => {
        this.toastr.success('Cadastro realizado com sucesso!');
        // this.formSubTarefa.reset();
        this.router.navigate(['/projeto/projetos-page']);
      },
      error: (e) => (this.toastr.error(e))
    })
    this.saveRegister();
  }

  saveRegister(): void {
    this.registro.tipo_acao = 'Cadastro de sub-tarefa'
    this.registro.acao = `A Sub-Tarefa ${this.subTarefa.nome_sub_tarefa} foi cadastrada pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
    next: (res: any) => {
      // console.log('registro', res)
    },
    error: (e) => (this.toastr.error(e))
  })
  }

}
