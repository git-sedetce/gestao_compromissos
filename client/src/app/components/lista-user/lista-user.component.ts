import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CadastroUsers } from '../../models/cadastro-user.model';
import { SecretariaCoordenadoriaService } from '../../services/secretaria-coordenadoria.service';
import { Audit } from '../../models/audit.model';
import { AuditService } from '../../services/audit.service';

@Component({
  selector: 'app-lista-user',
  templateUrl: './lista-user.component.html',
  styleUrl: './lista-user.component.css'
})
export class ListaUserComponent implements OnInit{

  lista_users!: any [];
  lista_profile!: any [];
  lista_sexec!: any [];
  lista_coord!: any [];
  lista_coordenadoria!: any [];
  lista_secretaria!: any [];
  formUser!: FormGroup;
  userObj: CadastroUsers = new CadastroUsers();

  registro!: Audit;

  profile_id!: any;
  user_name!: any;

  page: number = 1; // Página atual
  itemsPerPage: number = 10; // Itens por página

  constructor(
    private user: UsersService,
    private sexecService: SecretariaCoordenadoriaService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private auditService: AuditService,
  ){}

  ngOnInit(): void {
      this.formUser = this.formBuilder.group({
        id: [''],
        name: [''],
        user_name: [''],
        user_email: [''],
        user_active: [],
        profile_id: [''],
        coord_id: [''],
        sexec_id: [''],
      })

      this.registro = new Audit();
      this.getPerfil();
      this.getUsers();
      this.pegarCoord();
      this.pegarSecretaria();
  }

  getPerfil(){
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        const token = localStorage.getItem('access_token');
        const payload = JSON.parse(atob(token!.split('.')[1]));
        this.profile_id = payload._profile_id;
        this.registro.user_id = payload._id;
        this.user_name = payload._user_name;
        // console.log('Profile ID:', this.profile_id);
      }
    }
  }

  getUsers() {
    this.user.pegar_users('allUser').subscribe((usr: any[]) => {
      this.lista_users = usr;
      // console.log('lista_users', this.lista_users)
    }, (erro: any) => console.error(erro))
  }

  pegarCoord(){
    this.sexecService.coordenadoria('coordenadoria').subscribe(
      (m: any[]) => {
        this.lista_coordenadoria = m;
        // console.log('lista_coordenadoria', m);
      },
      (erro: any) => console.error(erro)
    );
  }

  pegarSecretaria() {
    this.sexecService.secretaria('secretaria/').subscribe(
      (sec: any[]) => {
        // console.log('secretaria', sec)
        this.lista_secretaria = sec;
      },
      (erro: any) => console.error(erro)
    );
  }

  onEdit(user: any){
    this.userObj.id = user.id;
    this.formUser.controls['name'].setValue(user.name)
    this.formUser.controls['user_name'].setValue(user.user_name)
    this.formUser.controls['user_email'].setValue(user.user_email)
    this.formUser.controls['user_active'].setValue(user.user_active)
    this.formUser.controls['profile_id'].setValue(user.profile_id)
    this.formUser.controls['coord_id'].setValue(user.coord_id)
    this.formUser.controls['sexec_id'].setValue(user.sexec_id)

  }
  updateUser(){
    this.userObj.name = this.formUser.value.name;
    this.userObj.user_name = this.formUser.value.user_name;
    this.userObj.user_email = this.formUser.value.user_email;
    this.userObj.user_active = this.formUser.value.user_active;
    this.userObj.profile_id = this.formUser.value.profile_id;
    this.userObj.coord_id = this.formUser.value.coord_id;
    this.userObj.sexec_id = this.formUser.value.sexec_id;


    this.user.atualizarUser(this.userObj, Number(this.userObj.id)).subscribe(res=>{
      this.toastr.success('Atualiação realizada com sucesso!!!')
      this.formUser.reset();
      this.getUsers();
    })

    this.saveRegister()

  }
  deletaUser(user: any){
    this.user.deleteUser(user.id).subscribe(res=>{
      this.toastr.success('Exclusão realizada com sucesso!!!')
      this.getUsers();
    })

    this.saveDeleteUser(user.user_name)

  }

  saveRegister(): void {
    this.registro.tipo_acao = 'Alteração de dados do usuário'
    this.registro.acao = `O usuário ${this.userObj.user_name} teve seus dados alterados pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
    next: (res: any) => {
      // console.log('registro', res)
    },
    error: (e) => (this.toastr.error(e))
  })
  }

  saveDeleteUser(name: any): void {
    this.registro.tipo_acao = 'Exclusão de usuário'
    this.registro.acao = `O usuário ${name} foi excluido da base de dados pelo usuário ${this.user_name}`;
    this.auditService.cadastrarRegistros(this.registro).subscribe({
    next: (res: any) => {
      // console.log('registro', res)
    },
    error: (e) => (this.toastr.error(e))
  })

  }
}
