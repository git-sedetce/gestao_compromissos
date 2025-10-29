import { Component, OnInit, ViewChild } from '@angular/core';
import { Fdi } from '../../../models/industry/fdi.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IndustriaService } from '../../../services/industria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroProjetosService } from '../../../services/cadastro-projetos.service';
import { SecretariaCoordenadoriaService } from '../../../services/secretaria-coordenadoria.service';
import { take } from 'rxjs';
import { LocationService } from '../../../services/location.service';
import { Audit } from '../../../models/audit.model';
import { AuditService } from '../../../services/audit.service';

@Component({
  selector: 'app-fdi',
  templateUrl: './fdi.component.html',
  styleUrl: './fdi.component.css'
})
export class FdiComponent implements OnInit {
  @ViewChild('formFDI') formFDI!: NgForm;
  fdi!: Fdi;
  registro!: Audit;

  profile_id!: any;
  user_name!: any;
  cnpj_company!: any;
  company_name!: any;
  regiao!: any;
  taked_company: boolean = false;
  authenticated: boolean = false;
  lista_empresa!: any[];
  lista_status!: any[];
  lista_cidade!: any[];

  maxChars = 500;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private industriaService: IndustriaService,
    private serviceProject: CadastroProjetosService,
    private locationService: LocationService,
    private auditService: AuditService,
  ) { }

  ngOnInit(): void {
    this.fdi = new Fdi();

    const id = this.route.snapshot.paramMap.get('id');
    this.industriaService
      .getEmpresa('empresabyid/', Number(id))
      .subscribe(
        (data) => {
          // console.log('empresa', data);
          this.taked_company = true;
          this.fdi.empresa_id = data.id
          this.company_name = data.nome_fantasia;
          // this.projeto = data;
        },
        (error) => {
          console.error('Error fetching project data', error);
        }
      );

    this.registro = new Audit();
    this.getPerfil();
    this.getEmpresa();
    this.getStatus();
    this.getCidade();
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

  getEmpresa(){
    this.industriaService.getEmpresaAtracao('allCompany').subscribe((cp: any[]) => {
      this.lista_empresa = cp;
      // console.log('company', this.lista_empresa)
    }, (erro: any) => console.error('erro', erro)
    );
  }

  getStatus(){
    this.serviceProject.getStatus('allStatus').subscribe((st: any[]) =>{
      this.lista_status = st;
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

  getRegiao(id: any) {
    if (!id) {
      this.regiao = '';
      this.fdi.regiao_id = undefined;
      return;
    }

    this.locationService.pegaCidadeById(id).pipe(take(1)).subscribe({
      next: (city: any) => {
        if (!city?.regiao_id) {
          console.warn(`Cidade com ID ${id} não possui uma região associada.`);
          this.fdi.regiao_id = undefined;
          this.regiao = '';
          return;
        }

        this.locationService.pegaRegiao('regiaoByCity/', city.regiao_id).pipe(take(1)).subscribe({
          next: (regiao: any) => {
            this.fdi.regiao_id = regiao?.id || undefined;
            this.regiao = regiao?.nome || '';
          },
          error: (erro: any) => {
            console.error(`Erro ao buscar região para ID ${city.regiao_id}:`, erro);
            this.fdi.regiao_id = undefined;
            this.regiao = '';
          }
        });
      },
      error: (erro: any) => {
        console.error(`Erro ao buscar cidade com ID ${id}:`, erro);
      }
    });
  }


  saveFdi(){
    this.industriaService.cadastrarFDI(this.fdi).subscribe({
      next: (res: any) => {
        // console.log('fdi', res)
        // this.saveAtracao(res.id)
        this.toastr.success('Acompanhamento FDI cadastrado com sucesso com sucesso!');
        this.formFDI.reset();
        this.router.navigate(['/industria/editarcompany']);
      },
      error: (e) => console.error('erro',e)//(this.toastr.error(e.message))
    })
    this.saveRegister();

  }

  saveRegister(): void {
    this.registro.tipo_acao = 'Cadastro FDI'
    this.registro.acao = `Foi realizado o cadastro de acompanhamento do FDI da empresa ${this.fdi.empresa_id} pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
    next: (res: any) => {
      // console.log('registro', res)
    },
    error: (e) => (this.toastr.error(e))
  })
  }

}
