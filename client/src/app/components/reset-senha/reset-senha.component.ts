import { ResetSenha } from './../../models/reset-senha.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrl: './reset-senha.component.css'
})
export class ResetSenhaComponent implements OnInit {

  @ViewChild("formResetPassword") formResetPassword!: NgForm
  resetSenha!: ResetSenha

  constructor(
    private serviceUser: UsersService,
    private router: Router,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
      this.resetSenha = new ResetSenha()
  }

  passwordPtn = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";

  verificaEmail(email: any){
    email = this.resetSenha.user_email?.split("@")
    if(email[1] != 'sde.ce.gov.br'){
      this.toastr.warning('Somente email da SDE!')
      this.formResetPassword.reset()
    }
  }

  reset(): void {
    this.resetSenha.user_password = this.serviceUser.CriptografarMD5(this.resetSenha.user_password)
    this.resetSenha.password_2 = this.serviceUser.CriptografarMD5(this.resetSenha.password_2)
    this.serviceUser.reset_password(this.resetSenha).subscribe({
      next: (res: any) => {
        this.toastr.success('Senha alterada com sucesso!!')
        this.router.navigate(['/login'])
      }, error: (e) => {
        this.toastr.error('Problema ao recriar a senha!!')
        this.formResetPassword.reset()
      }
    })
  }



}
