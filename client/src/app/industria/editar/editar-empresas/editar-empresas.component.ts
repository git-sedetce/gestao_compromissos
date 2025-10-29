import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroProjetosService } from '../../../services/cadastro-projetos.service';
import { ReuniaoService } from '../../../services/reuniao.service';
import { SecretariaCoordenadoriaService } from '../../../services/secretaria-coordenadoria.service';
import { AuditService } from '../../../services/audit.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Audit } from '../../../models/audit.model';
import { Empresa } from '../../../models/industry/empresa.model';
import { Atracao } from '../../../models/industry/atracao.model';
import { Fdi } from '../../../models/industry/fdi.model';
import { IndustriaService } from '../../../services/industria.service';
import { LocationService } from '../../../services/location.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-editar-empresas',
  templateUrl: './editar-empresas.component.html',
  styleUrl: './editar-empresas.component.css',
})
export class EditarEmpresasComponent implements OnInit {
  profile_id!: any;
  user_id!: any;
  user_name!: any;
  authenticated: boolean = false;
  has_atraction: boolean = false;
  projeto: any;
  lista_empresa!: any[];
  city_list!: any[];
  lista_cidade!: any[];
  lista_status!: any[];
  getCity!: any;
  estado!: any;
  cidade_id!: any;
  companyName!: any;

  registro!: Audit;
  tarefas_cadastradas: boolean = false;

  formCompany!: FormGroup;
  formFDI!: FormGroup;
  companyObj: Empresa = new Empresa();
  atracaoyObj: Atracao = new Atracao();
  fdiObj: Fdi = new Fdi();
  maxChars = 500;

  page: number = 1; // Página atual
  itemsPerPage: number = 10; // Itens por página
  constructor(
    private serviceProject: CadastroProjetosService,
    private industriaService: IndustriaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private auditService: AuditService
  ) {}

  ngOnInit(): void {
    this.registro = new Audit();

    this.formCompany = this.formBuilder.group({
      id: [''],
      cnpj: [''],
      razao_social: [''],
      nome_fantasia: [''],
      city_id: [''],

      detalhamento: [''],
      mou: [''],
      contato: [''],
      email_contato: [''],
      fone_contato: [''],
      data_inicio: [''],
      descricao: [''],
      valor_investimento: [''],
      qtde_empregos: [''],
      tem_fdi: [''],
      proximo_passo: [''],
      status_id: [''],
      empresa_id: [''],
      cidade_id: ['']
    });

    this.formFDI = this.formBuilder.group({
      id: [''],
      pedido: [''],
      detalhamento: [''],
      valor_investimento: [''],
      qtde_empregos: [''],
      status_id: [''],
      empresa_id: [''],
      city_id: [''],
    });


    this.getPerfil();
    this.getEmpresas();
    this.getCidade();
    this.getCiity();
    this.getStatus();
  }

  getPerfil() {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        const payload = JSON.parse(atob(token!.split('.')[1]));
        this.profile_id = payload._profile_id;
        this.user_id = payload._id;
        this.authenticated = true;
        this.registro.user_id = payload._id;
        this.user_name = payload._user_name;
        // console.log('payload', payload);
      }
    }
  }

  getEmpresas(): void {
    this.industriaService.getEmpresaAtracao('allCompanyAtration').subscribe(
      (data) => {
        this.lista_empresa = data;
        // console.log('lista_empresa', this.lista_empresa);
      },
      (error) => console.error('Error fetching project details:', error)
    );
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
        // this.empresa.estado_id = this.getCity.ass_cidadebr_estadobr.id;
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

  editCompany(company: any) {
    this.companyObj.id = company.id;
    if(company.ass_empresa_atracao.length > 0){
      this.has_atraction = true;
    }else{
      this.has_atraction = false;
    }
    this.formCompany.controls['cnpj'].setValue(company.cnpj)
    this.formCompany.controls['razao_social'].setValue(company.razao_social)
    this.formCompany.controls['nome_fantasia'].setValue(company.nome_fantasia)
    this.formCompany.controls['city_id'].setValue(company.city_id)
    this.formCompany.controls['detalhamento'].setValue(company.ass_empresa_atracao[0].detalhamento)
    this.formCompany.controls['mou'].setValue(company.ass_empresa_atracao[0].mou)
    this.formCompany.controls['contato'].setValue(company.ass_empresa_atracao[0].contato)
    this.formCompany.controls['email_contato'].setValue(company.ass_empresa_atracao[0].email_contato)
    this.formCompany.controls['fone_contato'].setValue(company.ass_empresa_atracao[0].fone_contato)
    this.formCompany.controls['data_inicio'].setValue(company.ass_empresa_atracao[0].data_inicio)
    this.formCompany.controls['descricao'].setValue(company.ass_empresa_atracao[0].descricao)
    this.formCompany.controls['valor_investimento'].setValue(company.ass_empresa_atracao[0].valor_investimento)
    this.formCompany.controls['qtde_empregos'].setValue(company.ass_empresa_atracao[0].qtde_empregos)
    this.formCompany.controls['tem_fdi'].setValue(company.ass_empresa_atracao[0].tem_fdi)
    this.formCompany.controls['proximo_passo'].setValue(company.ass_empresa_atracao[0].proximo_passo)
    this.formCompany.controls['status_id'].setValue(company.ass_empresa_atracao[0].status_id)
    this.formCompany.controls['cidade_id'].setValue(company.ass_empresa_atracao[0].city_id)

  }

  cadastrarFDI(id: any) {
    this.router.navigate(['/industria/empresa', id, 'fdi']);
  }

  editFDI(fdi: any) {
    this.fdiObj.id = fdi.ass_empresa_fdi[0].id;
    this.formFDI.controls['pedido'].setValue(fdi.ass_empresa_fdi[0].pedido)
    this.formFDI.controls['detalhamento'].setValue(fdi.ass_empresa_fdi[0].detalhamento)
    this.formFDI.controls['valor_investimento'].setValue(fdi.ass_empresa_fdi[0].valor_investimento)
    this.formFDI.controls['qtde_empregos'].setValue(fdi.ass_empresa_fdi[0].qtde_empregos)
    this.formFDI.controls['status_id'].setValue(fdi.ass_empresa_fdi[0].status_id)
    this.formFDI.controls['empresa_id'].setValue(fdi.ass_empresa_fdi[0].empresa_id)
    this.formFDI.controls['city_id'].setValue(fdi.ass_empresa_fdi[0].city_id)

    this.companyName = fdi.nome_fantasia
  }

  updateCompanyDetails(){
    this.companyObj.cnpj = this.formCompany.value.cnpj;
    this.companyObj.razao_social = this.formCompany.value.razao_social;
    this.companyObj.nome_fantasia = this.formCompany.value.nome_fantasia;
    this.companyObj.city_id = this.formCompany.value.city_id;
    this.atracaoyObj.detalhamento = this.formCompany.value.detalhamento;
    this.atracaoyObj.mou = this.formCompany.value.mou;
    this.atracaoyObj.contato = this.formCompany.value.contato;
    this.atracaoyObj.email_contato = this.formCompany.value.email_contato;
    this.atracaoyObj.fone_contato = this.formCompany.value.fone_contato;
    this.atracaoyObj.data_inicio = this.formCompany.value.data_inicio;
    this.atracaoyObj.descricao = this.formCompany.value.descricao;
    this.atracaoyObj.valor_investimento = this.formCompany.value.valor_investimento;
    this.atracaoyObj.qtde_empregos = this.formCompany.value.qtde_empregos;
    this.atracaoyObj.tem_fdi = this.formCompany.value.tem_fdi;
    this.atracaoyObj.proximo_passo = this.formCompany.value.proximo_passo;
    this.atracaoyObj.status_id = this.formCompany.value.status_id;
    this.atracaoyObj.city_id = this.formCompany.value.cidade_id;

    //console.log('this.empresaObj.id', this.empresaObj.id)

    this.industriaService.atualizarEmpresa(this.companyObj, Number(this.companyObj.id)).subscribe(res=>{
      alert("Atualização realizada com sucesso!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formCompany.reset();
      this.getEmpresas();
    })

    this.industriaService.atualizarAtracao(this.atracaoyObj, Number(this.companyObj.id)).subscribe(res=>{
      alert("Atualização realizada com sucesso!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formCompany.reset();
      this.getEmpresas();
    })

    this.saveRegister(this.formCompany.value.nome_fantasia,'Atualiza Empresa e Atração');

  }

  deleteCompany(empresa: any){
    this.industriaService.deleteEmpresa(empresa.id).subscribe(res=>{
      alert("Empresa excluida!");
      this.getEmpresas();
    })
    this.saveRegister(empresa.nome_fantasia, 'Excluir Empresa');
  }

  saveRegister(empresa: any, type_action: any): void {
    this.registro.tipo_acao = type_action;
    this.registro.acao = `Os dados da empresa ${empresa}, foi alterado pelo usuário ${this.user_name}`;
    // console.log('registro', this.registro)
    this.auditService.cadastrarRegistros(this.registro).subscribe({
      next: (res: any) => {
        // console.log('registro', res)
      },
      error: (e) => console.error(e),
    });
  }
}
