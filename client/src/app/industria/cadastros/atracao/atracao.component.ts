import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Atracao } from '../../../models/industry/atracao.model';
import { Empresa } from '../../../models/industry/empresa.model';
import { ToastrService } from 'ngx-toastr';
import { SecretariaCoordenadoriaService } from '../../../services/secretaria-coordenadoria.service';
import { IndustriaService } from '../../../services/industria.service';
import { Router } from '@angular/router';
import { CadastroProjetosService } from '../../../services/cadastro-projetos.service';
import { LocationService } from '../../../services/location.service';
import { Audit } from '../../../models/audit.model';
import { AuditService } from '../../../services/audit.service';
import { switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-atracao',
  templateUrl: './atracao.component.html',
  styleUrl: './atracao.component.css'
})
export class AtracaoComponent implements OnInit {
  @ViewChild('formAtracao') formAtracao!: NgForm;
  atracao!: Atracao;
  empresa!: Empresa;
  registro!: Audit;

  profile_id!: any;
  user_id!: any;
  user_name!: any;
  authenticated: boolean = false;
  lista_cidade!: any[];
  lista_status!: any[];

  maxChars = 500;

  city_list!: any[];
  getCity!: any;
  estado!: any;
  cidade_id!: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private locationService: LocationService,
    private industriaService: IndustriaService,
    private serviceProject: CadastroProjetosService,
    private auditService: AuditService,
  ) { }

  ngOnInit(): void {
    this.atracao = new Atracao();
    this.empresa = new Empresa();
    this.registro = new Audit();
    this.getPerfil();
    this.getCidade();
    this.getStatus();
    this.getCiity();
  }

  getPerfil(){
    const token = localStorage.getItem('access_token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.registro.user_id = payload._id;
    this.user_name = payload._user_name;
    this.authenticated = true;
    // console.log('payload', payload);
  }

  getCidade(){
    this.locationService.pegaCidade('pegaCidade').subscribe((cidades: any[]) => {
      this.lista_cidade = cidades;
    }, (erro: any) => console.error('erro', erro)
    );
  }

  getCiity(){
    this.locationService.pegaCidade('pegaCidadeBr').subscribe((cityBr: any[]) => {
      // console.log('cityBr', cityBr)
      this.city_list = cityBr;
    }, (erro: any) => console.error('erro', erro)
    );
  }

  getEstado(id: any) {
    this.locationService.pegaCityById(id).subscribe(
      (cd: any[]) => {
        this.getCity = cd;
        // console.log('getCity', this.getCity)
        // this.empresa.cidade_id = this.getCity.coord_id;
        this.empresa.estado_id = this.getCity.ass_cidadebr_estadobr.id;
        this.estado = this.getCity.ass_cidadebr_estadobr.estado;
      },
      (erro: any) => console.error('erro', erro)
    );
  }

  getStatus(){
    this.serviceProject.getStatus('allStatus').subscribe((st: any[]) =>{
      this.lista_status = st;
    }, (erro: any) => console.error('erro', erro)
    );
  }

  saveCompany() {
    this.industriaService.cadastrarEmpresa(this.empresa).subscribe({
      next: (res: any) => {
        // console.log('empresa', res)
        this.saveAtracao(res.id)
      },
      error: (e) => console.error('erro',e)//(this.toastr.error(e.message))
    })
    this.saveAtracao(this.atracao.empresa_id)

  }

  saveAtracao(id: any){
    this.atracao.empresa_id = id
    // console.log('empresa.id', this.atracao.empresa_id)
    this.industriaService.cadastrarAtracao(this.atracao).subscribe({
      next: (res: any) => {
        // console.log('atracao', res)
        this.toastr.success('Atração cadastrada com sucesso com sucesso!');
        this.formAtracao.reset();
        this.router.navigate(['/industria/editarcompany']);
      },
      error: (e) => console.error('erro',e)//(this.toastr.error(e.message))
    })

    this.saveRegister();

  }

  saveRegister(): void {
    this.registro.tipo_acao = 'Cadastro de Atração'
    this.registro.acao = `A Empresa de CNPJ ${this.empresa.cnpj} foi atraida pelo usuário ${this.user_name} e cadastrada com sucesso`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
    next: (res: any) => {
      // console.log('registro', res)
    },
    error: (e) => (this.toastr.error(e))
  })
  }


}
