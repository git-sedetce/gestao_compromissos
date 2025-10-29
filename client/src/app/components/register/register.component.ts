import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CadastroUsers } from '../../models/cadastro-user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';
import { SecretariaCoordenadoriaService } from '../../services/secretaria-coordenadoria.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  @ViewChild("formCadastroUser") formCadastroUser!: NgForm
  users!: CadastroUsers

  passwordPtn = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$";
  lista_coordenadoria!: any[];
  lista_sexec!: any[];
  sexec!:any;
  coord!:any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private serviceUser: UsersService,
    private sexecService: SecretariaCoordenadoriaService
    ) { }

    ngOnInit(): void {
      this.users = new CadastroUsers();

      this.sexecService.coordenadoria('coordenadoria').subscribe(
        (m: any[]) => {
          this.lista_coordenadoria = m;
          // console.log('lista_coordenadoria', m);
        },
        (erro: any) => console.error(erro)
      );

      this.getSexec();
    }

    getSexec(){
      this.sexecService.secretaria('secretaria').subscribe((sxc:any[]) =>{
        this.lista_sexec = sxc;
        // console.log('lista_sexec', sxc)
      }, (erro: any) => console.error(erro)
      );
    }

    verificaEmail(email: any){
      email = this.users.user_email?.split("@")
      //console.log('verificaEmail', email)
      if(email[1] != 'sde.ce.gov.br'){
        this.toastr.warning('Somente email @SDE podem ser cadastrados!')
        this.formCadastroUser.reset()
      }
    }

    consultaEmail(email:any, form: any){
      this.serviceUser.consultarEmail(email).subscribe((res:any) =>{
        if(res.mensagem === 'Email já cadastrado!'){
          this.toastr.error(res.mensagem)
          this.users.user_email = '';
        }
      })
    }

    localizaCoord(coord: any){
      this.sexecService.pegar_coordenadoria('coordenadoria/', coord).subscribe((c:any) =>{
        // console.log('coordenadoria', c)
        this.users.coord_id = c.id;
        this.pegarSecretaria(c.sexec_id)
      })
    }

    pegarSecretaria(id: any) {
      this.sexecService.pegar_secretaria('secretaria/', id).subscribe(
        (id_sec: any) => {
          // console.log('secretaria', id_sec)
          this.users.sexec_id = id_sec.id;
          this.sexec = id_sec.secretaria;
        },
        (erro: any) => console.error(erro)
      );
    }

    saveUser(): void {
      // console.log("User", this.users)
      this.users.user_password = this.serviceUser.CriptografarMD5(this.users.user_password)
      this.users.user_confirm_password = this.serviceUser.CriptografarMD5(this.users.user_confirm_password)
      const nome_usuario = this.users.user_email?.split("@",1).toString();
      this.users.user_name = nome_usuario;
      // console.log('User', this.users)
      this.serviceUser.cadastrar_users(this.users).subscribe({
        next: (res:any) => {
          this.users.id = res.id
          // console.log('User', res)
          this.toastr.success('Usuário cadastrado com sucesso!!!')
          this.router.navigate(['/login'])
        },
        error:(e: any) => {
          console.error(e)
          this.toastr.error('Problemas ao realizar o cadastro!')
          this.formCadastroUser.reset()
        }
      })
    }

}
