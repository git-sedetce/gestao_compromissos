import { Component, OnInit } from '@angular/core';
import { Audit } from '../../../models/audit.model';
import { Sima } from '../../../models/industry/sima.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroProjetosService } from '../../../services/cadastro-projetos.service';
import { ReuniaoService } from '../../../services/reuniao.service';
import { IndustriaService } from '../../../services/industria.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from '../../../services/location.service';
import { AuditService } from '../../../services/audit.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-editar-sima',
  templateUrl: './editar-sima.component.html',
  styleUrl: './editar-sima.component.css',
})
export class EditarSimaComponent implements OnInit {
  profile_id!: any;
  user_id!: any;
  user_name!: any;
  maxChars: any = 500;

  lista_sima!: any[];
  lista_users!: any[];
  lista_status!: any[];

  registro!: Audit;

  formSima!: FormGroup;
  simaObj: Sima = new Sima();

  page: number = 1; // Página atual
  itemsPerPage: number = 10; // Itens por página
  constructor(
    private serviceProject: CadastroProjetosService,
    private industriaService: IndustriaService,
    private formBuilder: FormBuilder,
    private auditService: AuditService,
    private serviceUsers: UsersService,
  ) {}

  ngOnInit(): void {
    this.registro = new Audit();

    this.formSima = this.formBuilder.group({
      id: [''],
      numero_programa: [''],
      nome_entrega: [''],
      meta: [''],
      responsavel_id: [''],
      status_id: [''],
      detalhamento: [''],
      mapp: [''],
    });

    this.getPerfil();
    this.getSima();
    this.getUsers();
    this.getStatus();
  }

  getPerfil() {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        const payload = JSON.parse(atob(token!.split('.')[1]));
        this.profile_id = payload._profile_id;
        this.user_id = payload._id;
        this.registro.user_id = payload._id;
        this.user_name = payload._user_name;
        // console.log('payload', payload);
      }
    }
  }

  getStatus(){
    this.serviceProject.getStatus('allStatus').subscribe((st: any[]) =>{
      this.lista_status = st;
    }, (erro: any) => console.error('erro', erro)
    );
  }

  getSima(): void {
    this.industriaService.getEmpresaAtracao('allSima').subscribe(
      (data) => {
        this.lista_sima = data;
        // console.log('lista_sima', this.lista_sima);
      },
      (error) => console.error('Error fetching project details:', error)
    );
  }

  getUsers(){
    this.serviceUsers.pegar_users('allUserInd').subscribe((resp: any[]) => {
      this.lista_users = resp;
      // console.log('this.lista_users', this.lista_users);

    }, (erro: any) => console.error('erro', erro)
    );
  }

  editSima(sima: any){
    this.simaObj.id = sima.id;
    this.formSima.controls['numero_programa'].setValue(sima.numero_programa)
    this.formSima.controls['nome_entrega'].setValue(sima.nome_entrega)
    this.formSima.controls['meta'].setValue(sima.meta)
    this.formSima.controls['responsavel_id'].setValue(sima.responsavel_id)
    this.formSima.controls['status_id'].setValue(sima.status_id)
    this.formSima.controls['detalhamento'].setValue(sima.detalhamento)
    this.formSima.controls['mapp'].setValue(sima.mapp)

  }

  updateSima(){
    this.simaObj.numero_programa = this.formSima.value.numero_programa;
    this.simaObj.nome_entrega = this.formSima.value.nome_entrega;
    this.simaObj.meta = this.formSima.value.meta;
    this.simaObj.responsavel_id = this.formSima.value.responsavel_id;
    this.simaObj.status_id = this.formSima.value.status_id;
    this.simaObj.detalhamento = this.formSima.value.detalhamento;
    this.simaObj.mapp = this.formSima.value.mapp;

    this.industriaService.atualizaDados('atualizaSima/', this.simaObj, Number(this.simaObj.id)).subscribe(res=>{
      alert("Atualização realizada com sucesso!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formSima.reset();
      this.getSima();
    })

    this.saveRegister(this.formSima.value.numero_programa,'Atualização de SIMA');

  }

  deleteSima(sima: any){
    this.industriaService.deleteDados('sima/', sima.id).subscribe(res=>{
      alert("Empresa excluida!");
      this.getSima();
    })
    this.saveRegister(sima.numero_programa, 'Excluir SIMA');

  }

  saveRegister(empresa: any, type_action: any): void {
    this.registro.tipo_acao = type_action;
    this.registro.acao = `O SIma de número ${empresa}, foi alterado pelo usuário ${this.user_name}`;
    // console.log('registro', this.registro)
    this.auditService.cadastrarRegistros(this.registro).subscribe({
      next: (res: any) => {
        // console.log('registro', res)
      },
      error: (e) => console.error(e),
    });
  }


}
