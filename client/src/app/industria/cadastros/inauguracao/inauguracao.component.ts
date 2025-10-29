import { Inauguracao } from '../../../models/industry/inauguracao.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SecretariaCoordenadoriaService } from '../../../services/secretaria-coordenadoria.service';
import { IndustriaService } from '../../../services/industria.service';
import { CadastroProjetosService } from '../../../services/cadastro-projetos.service';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../../../services/location.service';
import { Audit } from '../../../models/audit.model';
import { AuditService } from '../../../services/audit.service';

@Component({
  selector: 'app-inauguracao',
  templateUrl: './inauguracao.component.html',
  styleUrl: './inauguracao.component.css'
})
export class InauguracaoComponent implements OnInit {
  @ViewChild('formInauguracao') formInauguracao!: NgForm;
    ing!: Inauguracao;
    registro!: Audit;

    profile_id!: any;
    user_name!: any;
    authenticated: boolean = false;
    lista_empresa!: any[];
    lista_cidade!: any[];

    maxChars = 500;
    constructor(
      private router: Router,
      private toastr: ToastrService,
      private locationService: LocationService,
      private industriaService: IndustriaService,
      private serviceProject: CadastroProjetosService,
      private auditService: AuditService
    ) {}

    ngOnInit(): void {
      this.ing = new Inauguracao();
      this.registro = new Audit();
      this.getPerfil();
      this.getEmpresa();
      this.getCidade();
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

    getEmpresa(){
      this.industriaService.getEmpresaAtracao('allCompany').subscribe((cp: any[]) => {
        this.lista_empresa = cp;
      }, (erro: any) => console.error('erro', erro)
      );
    }

    getCidade(){
      this.locationService.pegaCidade('pegaCidade').subscribe((cidades: any[]) => {
        // console.log('cidades', cidades);
        this.lista_cidade = cidades;
      }, (erro: any) => console.error('erro', erro)
      );
    }

    saveInauguracao() {
      this.industriaService.cadastrarInauguracao(this.ing).subscribe({
      next: (res: any) => {
        // console.log('fdi', res)
        // this.saveAtracao(res.id)
        this.toastr.success('Ianuguração cadastrado com sucesso!');
        this.formInauguracao.reset();
        this.router.navigate(['/industria/editarinauguracao']);
      },
      error: (e) => console.error('erro', e), //(this.toastr.error(e.message))
    });
    this.saveRegister();
  }

  saveRegister(): void {
    this.registro.tipo_acao = 'Cadastro Inauguração';
    this.registro.acao = `O evento de inauguração ${this.ing.tipo} foi cadastrado pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
      next: (res: any) => {
        // console.log('registro', res)
      },
      error: (e) => this.toastr.error(e),
    });
  }


}
