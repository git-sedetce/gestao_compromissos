import { SecretariaCoordenadoriaService } from '../../services/secretaria-coordenadoria.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CadastroProjetos } from '../../models/cadastro-projetos.model';
import { CadastroProjetosService } from '../../services/cadastro-projetos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.css'
})
export class ProjetosComponent implements OnInit {
  @ViewChild('formProject') formProject!: NgForm;
  projeto!: CadastroProjetos;

  lista_gerente!: any[];
  lista_coordenador!: any[];
  lista_responsavel!: any[];
  lista_coord!: any[];
  lista_sexec!: any[];
  lista_status!: any [];
  secretaria_executiva!: any;

  profile_id!: any;
  sexec_id!: any;
  user_id!: any;
  authenticated: boolean = false;

  constructor(
    private router: Router,
    private serviceProject: CadastroProjetosService,
    private serviceUsers: UsersService,
    private sexec_coord_service: SecretariaCoordenadoriaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
      this.projeto = new CadastroProjetos()
      this.getGerente(2);
      this.getCoordenador(3);
      this.getResponsavel(4);
      this.getResponsavel(1)
      this.getCoordenadoria();
      this.getStatus();
      this.getPerfil();
  }

  getPerfil(){
    const token = localStorage.getItem('access_token');
    const payload = JSON.parse(atob(token!.split('.')[1]));
    this.profile_id = payload._profile_id;
    this.sexec_id = payload._sexec_id;
    this.user_id = payload._id;
    this.authenticated =true;
    this.projeto.usuario_id = this.user_id;
    // console.log('payload', payload);
  }

  getGerente(id: any){
    this.serviceUsers.usersByProfile('allUserByProfile/', id).subscribe((maneger: any[]) => {
      this.lista_gerente = maneger;
    }, (erro: any) => console.error('erro', erro)
    );
  }

  getCoordenador(id: any){
    this.serviceUsers.usersByProfile('allUserByProfile/', id).subscribe((coord: any[]) => {
      this.lista_coordenador = coord;
    }, (erro: any) => console.error('erro', erro)
    );
  }

  getResponsavel(id: any){
    this.serviceUsers.usersByProfile('allUserByProfile/', id).subscribe((resp: any[]) => {
      this.lista_responsavel = resp;
    }, (erro: any) => console.error('erro', erro)
    );
  }

  getCoordenadoria(){
    this.sexec_coord_service.coordenadoria('coordenadoria').subscribe((cd: any[]) => {
      this.lista_coord = cd;
      // console.log('cd', cd)
    }, (erro: any) => console.error('erro', erro)
    );
  }

  foundSexec(coord:any, form:any){
    this.sexec_coord_service.pegar_coordenadoria_by_id('coordenadoriaById/', coord).subscribe((cd: any) =>{
      // console.log('coordenadorias', cd)
      // console.log('sexec_id', cd.sexec_id)
      this.pegarSecretaria(cd.sexec_id);
    })
  }

  pegarSecretaria(id: any) {
    this.sexec_coord_service.pegar_secretaria('secretaria/', id).subscribe(
      (id_sec: any) => {
        // console.log('secretaria', id_sec)
        this.projeto.sexec_id = id_sec.id;
        this.secretaria_executiva = id_sec.secretaria
      },
      (erro: any) => console.error(erro)
    );
  }

  getStatus(){
    this.serviceProject.getStatus('allStatus').subscribe((st: any[]) =>{
      this.lista_status = st;
    }, (erro: any) => console.error('erro', erro)
    );
  }

  saveProject(): void {
    //this.projeto.criadoPor_id = 2;
    // console.log('projeto', this.projeto)
    this.serviceProject.cadastrarProjeto(this.projeto).subscribe({
      next: (res: any) => {
        // console.log('projeto', res)
        this.toastr.success('Cadastro de projeto realizado com sucesso!!!');
        this.router.navigate(['/projeto/membersproject', res.id, 'cadastromembro']);
        this.formProject.reset();
      },
      error: (e) => (this.toastr.error(e), this.formProject.reset())
    })

  }
}
