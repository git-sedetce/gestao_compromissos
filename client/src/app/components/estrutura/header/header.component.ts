import { Component, DoCheck } from '@angular/core';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements DoCheck{
  authenticated: boolean = false;
  user_name: any;
  profile: any;
  sexec_id: any;

  constructor(
    private serviceUser: UsersService
  ) { }

  ngDoCheck() {
    this.isLogged();
  }

  isLogged() {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const loginUsers = this.decodeToken(token);
          this.authenticated = true;
          this.user_name = loginUsers._user_name;
          this.profile = loginUsers._profile_id;
          this.sexec_id = loginUsers._sexec_id;

          // console.log('loginUsers', loginUsers);
        } catch (error) {
          console.error('Erro ao decodificar o token:', error);
          this.authenticated = false;
        }
      } else {
        this.authenticated = false;
      }
    }
  }

  private decodeToken(token: string): { _user_name: string; _profile_id: string; _sexec_id: string } {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  logout(){
    this.serviceUser.logout()
  }

}
