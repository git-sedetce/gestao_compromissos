import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginUsers } from '../../models/login-user.model';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  @ViewChild("formLogin") formLogin!: NgForm;
  loginUsers!: LoginUsers;

  constructor(
    private serviceUser: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginUsers = new LoginUsers()
  }

  verificaEmail(email: any){
    email = this.loginUsers.user_email?.split("@")
    //console.log('verificaEmail', email)
    if(email[1] != 'sde.ce.gov.br'){
      this.toastr.warning('Somente emaili @SDE!')
      this.formLogin.reset()
    }
  }

  login(): void {
    this.loginUsers.user_password = this.serviceUser.CriptografarMD5(this.loginUsers.user_password)
    // console.log('loginUser', this.loginUsers)
    this.serviceUser.login(this.loginUsers).subscribe({
      next: (res) => res,
      error: (e) => (this.toastr.error(e), this.formLogin.reset())
    })
  }

}
