import { Component, OnInit } from '@angular/core';
import { Audit } from '../../../models/audit.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Inauguracao } from '../../../models/industry/inauguracao.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroProjetosService } from '../../../services/cadastro-projetos.service';
import { ReuniaoService } from '../../../services/reuniao.service';
import { IndustriaService } from '../../../services/industria.service';
import { LocationService } from '../../../services/location.service';
import { AuditService } from '../../../services/audit.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-editar-inauguracao',
  templateUrl: './editar-inauguracao.component.html',
  styleUrl: './editar-inauguracao.component.css',
})
export class EditarInauguracaoComponent implements OnInit {
  profile_id!: any;
  user_id!: any;
  user_name!: any;

  lista_empresa!: any[];
  lista_cidade!: any[];
  lista_inauguracao!: any[];
  nameIng!: any;

  registro!: Audit;

  formIng!: FormGroup;
  ingObj: Inauguracao = new Inauguracao();

  page: number = 1; // Página atual
  itemsPerPage: number = 10; // Itens por página
  constructor(
    private route: ActivatedRoute,
    private serviceProject: CadastroProjetosService,
    private serviceMeet: ReuniaoService,
    private industriaService: IndustriaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private auditService: AuditService,
    private serviceUsers: UsersService
  ) {}

  ngOnInit(): void {
    this.registro = new Audit();

    this.formIng = this.formBuilder.group({
      id: [''],
      tipo: [''],
      empresa_id: [''],
      city_id: [''],
      data_inauguracao: [''],
      valor: [''],
      qtde_empregos: [''],
    });

    this.getPerfil();
    this.getCidade();
    this.getEmpresas();
    this.getIng();
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

  getIng(): void {
    this.industriaService.getEmpresaAtracao('todasInauguracao').subscribe(
      (data) => {
        this.lista_inauguracao = data;
        // console.log('lista_inauguracoes', this.lista_inauguracao);
      },
      (error) => console.error('Error fetching project details:', error)
    );
  }

  getCidade() {
    this.locationService.pegaCidade('pegaCidade').subscribe(
      (cidades: any[]) => {
        this.lista_cidade = cidades;
      },
      (erro: any) => console.error('erro', erro)
    );
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

  editIng(ing: any) {
    this.ingObj.id = ing.id;
    this.formIng.controls['tipo'].setValue(ing.tipo);
    this.formIng.controls['empresa_id'].setValue(ing.empresa_id);
    this.formIng.controls['city_id'].setValue(ing.city_id);
    this.formIng.controls['data_inauguracao'].setValue(ing.data_inauguracao);
    this.formIng.controls['valor'].setValue(ing.valor);
    this.formIng.controls['qtde_empregos'].setValue(ing.qtde_empregos);

    this.nameIng = ing.tipo
  }

  updateIng() {
    this.ingObj.tipo = this.formIng.value.tipo;
    this.ingObj.empresa_id = this.formIng.value.empresa_id;
    this.ingObj.city_id = this.formIng.value.city_id;
    this.ingObj.data_inauguracao = this.formIng.value.data_inauguracao;
    this.ingObj.valor = this.formIng.value.valor;
    this.ingObj.qtde_empregos = this.formIng.value.qtde_empregos;

    this.industriaService
      .atualizaDados('atualizaIng/', this.ingObj, Number(this.ingObj.id))
      .subscribe((res) => {
        alert('Atualização realizada com sucesso!');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formIng.reset();
        this.getIng();
      });

    this.saveRegister(this.formIng.value.tipo, 'Atualização da Inauguração');
  }

  deleteIng(inauguracao: any) {
    this.industriaService
      .deleteDados('inauguracao/', inauguracao.id)
      .subscribe((res) => {
        alert('Dados excluidos!');
        this.getIng();
      });
    this.saveRegister(inauguracao.tipo, 'Excluir Inauguração');
  }

  saveRegister(ing: any, type_action: any): void {
    this.registro.tipo_acao = type_action;
    this.registro.acao = `Os dados da inauguração de ${ing}, foi alterado pelo usuário ${this.user_name}`;
    // console.log('registro', this.registro)
    this.auditService.cadastrarRegistros(this.registro).subscribe({
      next: (res: any) => {
        // console.log('registro', res)
      },
      error: (e) => console.error(e),
    });
  }
}
