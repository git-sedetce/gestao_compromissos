import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, map, throwError } from 'rxjs';
import { Md5 } from 'ts-md5';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  CriptografarMD5(value: string | undefined): string | undefined {
    return Md5.hashStr(value!).toString();
  }

  private token!: string;
  private userSubject = new BehaviorSubject<any>(null);

  constructor( private http: HttpClient, private router: Router ) { }

    authenticated = false;

    cadastrar_users(data:any):Observable<any> {
      return this.http.post(environment.apiUrl + 'newUser', data)
    }

    pegar_users(metodo: string): Observable<any> {
      return this.http.get(environment.apiUrl + metodo)
    }

    getUser(id: any): Observable<any> {
      return this.http.get(environment.apiUrl + 'userById/' +id)
    }

    login(data:any): Observable<any> {
      return this.http.post<any>(environment.apiUrl + 'login', data).pipe(
        tap((response: { token: string; }) => {
        this.token = response.token;
        const payload = JSON.parse(atob(this.token.split('.')[1])); // Decodifica o token para pegar o perfil e outros dados
        this.userSubject.next(payload);
        localStorage.setItem('access_token', this.token);
        this.router.navigate(['/home']); // Redireciona após login
      }))
    }

    getToken(): string | null {
      if (typeof window !== 'undefined' && localStorage) {
        return this.token || localStorage.getItem('access_token');
      }
      return this.token || null;
    }


    public logout(){
      this.token = '';
      localStorage.removeItem('access_token');
      window.location.reload();
      return this.router.navigate(['login'])
    }

    auth_user() : boolean {
      const token = localStorage.getItem('access_token');
      //console.log('token', token)
      if(!token) return false;

      const jwtHelper = new JwtHelperService();
      return !jwtHelper.isTokenExpired(token)
    }

    reset_password(data:any) : Observable<any> {
      return this.http.post(environment.apiUrl + 'reset', data)
    }

    atualizarUser(data: any, id: number){
      return this.http.put<any>(environment.apiUrl + 'atualizaUser/' +id, data)
      .pipe(map((res:any)=>{
        return res;
      }))
    }

    deleteUser(id: number){
      return this.http.delete<any>(environment.apiUrl + 'user/' +id)
      .pipe(map((res:any)=>{
        return res;
      }))
    }

    consultarEmail(email: string) : Observable<any> {
      return this.http.get(environment.apiUrl + 'consultaEmail/' + email)
    }

    usersByProfile(metodo: string, id: number): Observable<any> {
      return this.http.get(environment.apiUrl + metodo + id)
    }

    usersByProject(id: number): Observable<any> {
      return this.http.get(environment.apiUrl + 'userByProject/' + id)
    }

    usersCommitment(metodo: string): Observable<any> {
      return this.http.get(environment.apiUrl + metodo)
    }

    commitmentFinished(id: number): Observable<any> {
      return this.http.get(environment.apiUrl + 'usersCompromissoConcluidos/' + id)
    }
}
