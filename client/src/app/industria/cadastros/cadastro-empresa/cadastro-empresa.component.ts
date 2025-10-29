import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../../../services/location.service';
import { AuditService } from '../../../services/audit.service';
import { IndustriaService } from '../../../services/industria.service';
import { Router } from '@angular/router';
import { Audit } from '../../../models/audit.model';
import { Empresa } from '../../../models/industry/empresa.model';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrl: './cadastro-empresa.component.css',
})
export class CadastroEmpresaComponent implements OnInit {
  @ViewChild('formEmpresa') formEmpresa!: NgForm;
  empresa!: Empresa;
  registro!: Audit;

  profile_id!: any;
  user_id!: any;
  user_name!: any;
  authenticated: boolean = false;

  city_list!: any[];
  getCity!: any;
  estado!: any;
  cidade_id!: any;

  constructor(
    private toastr: ToastrService,
    private locationService: LocationService,
    private auditService: AuditService,
    private industriaService: IndustriaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.empresa = new Empresa();
    this.registro = new Audit();
    this.getPerfil();
    this.getCiity();
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

  saveCompany(){
    this.industriaService.cadastrarEmpresa(this.empresa).subscribe({
      next: (res: any) => {
        // console.log('empresa', res)
        this.toastr.success('Cadastro da empresa realizado com sucesso!');
        this.formEmpresa.reset();
        this.router.navigate(['/industria/editarcompany']);
      },
      error: (e) => console.error('erro',e)//(this.toastr.error(e.message))
    })
    this.saveRegister();
  }

  cadastrarFDI(){
    this.industriaService.cadastrarEmpresa(this.empresa).subscribe({
      next: (res: any) => {
        // console.log('empresa', res)
        this.toastr.success('Cadastro da empresa realizado com sucesso!');
        this.formEmpresa.reset();
        this.cadastroFdi(res.id)
      },
      error: (e) => console.error('erro',e)//(this.toastr.error(e.message))
    })
    this.saveRegister();
  }

  cadastroFdi(id: any){
    this.router.navigate(['/industria/empresa', id, 'fdi']);
  }

  saveRegister(): void {
    this.registro.tipo_acao = 'Cadastro de empresa'
    this.registro.acao = `A Empresa de CNPJ ${this.empresa.cnpj} foi cadastrado pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
    next: (res: any) => {
      // console.log('registro', res)
    },
    error: (e) => console.error('error',e)//(this.toastr.error(e))
  })
  }
}
