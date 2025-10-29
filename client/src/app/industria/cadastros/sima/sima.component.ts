import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Sima } from '../../../models/industry/sima.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SecretariaCoordenadoriaService } from '../../../services/secretaria-coordenadoria.service';
import { IndustriaService } from '../../../services/industria.service';
import { CadastroProjetosService } from '../../../services/cadastro-projetos.service';
import { Audit } from '../../../models/audit.model';
import { AuditService } from '../../../services/audit.service';

@Component({
  selector: 'app-sima',
  templateUrl: './sima.component.html',
  styleUrl: './sima.component.css',
})
export class SimaComponent implements OnInit {
  @ViewChild('formSIMA') formSIMA!: NgForm;
  sima!: Sima;
  registro!: Audit;

  profile_id!: any;
  user_name!: any;
  authenticated: boolean = false;
  lista_resp!: any[];
  lista_status!: any[];

  maxChars = 500;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private serviceSexec: SecretariaCoordenadoriaService,
    private industriaService: IndustriaService,
    private serviceProject: CadastroProjetosService,
    private auditService: AuditService
  ) {}

  ngOnInit(): void {
    this.sima = new Sima();
    this.registro = new Audit();
    this.getPerfil();
    this.getStatus();
    this.getResp();
    // this.getResponsavel();
  }

  getPerfil() {
    const token = localStorage.getItem('access_token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.registro.user_id = payload._id;
    this.user_name = payload._user_name;
    this.authenticated = true;
    // console.log('payload', payload);
  }

  getStatus() {
    this.serviceProject.getStatus('allStatus').subscribe(
      (st: any[]) => {
        this.lista_status = st;
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  getResp() {
    this.industriaService.getUsersInd('allUserInd').subscribe(
      (usr: any[]) => {
        this.lista_resp = usr;
        // console.log('lista_resp', this.lista_resp);
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  saveSima() {
    this.industriaService.cadastrarSIMA(this.sima).subscribe({
      next: (res: any) => {
        // console.log('fdi', res)
        // this.saveAtracao(res.id)
        this.toastr.success('SIMA cadastrado com sucesso!');
        this.formSIMA.reset();
        this.router.navigate(['/industria/editarsima']);
      },
      error: (e) => console.error('erro', e), //(this.toastr.error(e.message))
    });
    this.saveRegister();
  }

  saveRegister(): void {
    this.registro.tipo_acao = 'Cadastro SIMA';
    this.registro.acao = `O SIMA de nome da entrega ${this.sima.nome_entrega} pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
      next: (res: any) => {
        // console.log('registro', res)
      },
      error: (e) => this.toastr.error(e),
    });
  }
}
