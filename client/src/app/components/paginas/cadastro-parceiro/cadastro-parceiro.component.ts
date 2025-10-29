import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CadastroUsers } from '../../../models/cadastro-user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../services/users.service';
import { SecretariaCoordenadoriaService } from '../../../services/secretaria-coordenadoria.service';
import { AuditService } from '../../../services/audit.service';
import { Audit } from '../../../models/audit.model';

@Component({
  selector: 'app-cadastro-parceiro',
  templateUrl: './cadastro-parceiro.component.html',
  styleUrl: './cadastro-parceiro.component.css'
})
export class CadastroParceiroComponent implements OnInit {
  @ViewChild("formCadastroParceiro") formCadastroParceiro!: NgForm
  parceiro!: CadastroUsers
  registro!: Audit

  profile_id!: any;
  user_name!: any;


  constructor(
    private router: Router,
    private toastr: ToastrService,
    private serviceUser: UsersService,
    private auditService: AuditService,
    private sexecService: SecretariaCoordenadoriaService
    ) { }

    ngOnInit(): void {
      this.parceiro = new CadastroUsers();
      this.registro = new Audit();
      this.getPerfil();
    }

    getPerfil(){
      const token = localStorage.getItem('access_token');
      const payload = JSON.parse(atob(token!.split('.')[1]));
      this.profile_id = payload._profile_id;
      this.registro.user_id = payload._id;
      this.user_name = payload._user_name;
      // console.log('Profile ID:', this.profile_id);
    }

    // verificaEmail(email: any){
    //   email = this.parceiro.user_email?.split("@")
    //   console.log('verificaEmail', email)
    //   if(email[1] != 'sde.ce.gov.br'){
    //     this.toastr.warning('Somente email @SDE podem ser cadastrados!')
    //     this.formCadastroParceiro.reset()
    //   }
    // }

    consultaEmail(email:any, form: any){
      this.serviceUser.consultarEmail(email).subscribe((res:any) =>{
        if(res.mensagem === 'Email já cadastrado!'){
          this.toastr.error(res.mensagem)
          this.parceiro.user_email = '';
        }
      })
    }

    savePartner(): void {
      // console.log("User", this.users)
      this.parceiro.user_password = this.serviceUser.CriptografarMD5('@GP_SDE')
      this.parceiro.profile_id = 5
      const nome_usuario = this.parceiro.user_email?.split("@",1).toString();
      this.parceiro.user_name = nome_usuario;
      this.serviceUser.cadastrar_users(this.parceiro).subscribe({
        next: (res:any) => {
          this.parceiro.id = res.id
          this.toastr.success('Parceiro cadastrado com sucesso!!!')
          this.router.navigate(['/home'])
        },
        error:(e: any) => {
          console.error(e)
          this.toastr.error('Problemas ao realizar o cadastro!')
          this.formCadastroParceiro.reset()
        }
      })
      this.saveRegister();
    }

    saveRegister(): void {
      this.registro.tipo_acao = 'Cadastro de Parceiro'
      this.registro.acao = `O Parceiro ${this.parceiro.user_name} foi cadastrado pelo usuário ${this.user_name}`;
      this.auditService.cadastrarRegistros(this.registro).subscribe({
      next: (res: any) => {
        // console.log('registro', res)
      },
      error: (e) => (this.toastr.error(e))
    })
    }

}
