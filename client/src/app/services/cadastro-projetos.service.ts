import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroProjetosService {

  constructor(private http: HttpClient) { }

  cadastrarProjeto(data: any) : Observable<any> {
    return this.http.post(environment.apiUrl + 'newProject', data)
  }

  getProjetos(metodo: string) : Observable<any>{
    return this.http.get(environment.apiUrl + metodo)
  }

  getUsersProjects(): Observable<any> {
    return this.http.get(environment.apiUrl + 'usersProjects');
  }

  getUser(metodo: string) : Observable<any> {
    return this.http.get(environment.apiUrl + metodo)
  }

  getProject(id: any): Observable<any> {
    return this.http.get(environment.apiUrl + 'projectId/' +id)
  }

  getResp(id: any): Observable<any> {
    return this.http.get(environment.apiUrl + 'responsabilidadeById/' +id)
  }

  getAllResp(): Observable<any> {
    return this.http.get(environment.apiUrl + 'responsabilidade')
  }

  getStatus(metodo: string) : Observable<any> {
    return this.http.get(environment.apiUrl + metodo)
  }

  getresp(metodo: string) : Observable<any>{
    return this.http.get(environment.apiUrl + metodo)
  }

  cadastrarMembro(data: any) : Observable<any> {
    return this.http.post(environment.apiUrl + 'newMembers', data)
  }

  getProjetoDetalhes(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'projetoDetalhes/' + id)
  }

  getProjectWithCronogramasETarefas(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'projetoComCronogramasETarefas/' + id)
  }

  updateProjectStatus(id: number, status_id: number): Observable<any> {
    return this.http.patch(environment.apiUrl + 'updateProjectStatus/' + id, { status_id });
  }

  filedProject(data: any, id: number): Observable<any> {
    return this.http.put(environment.apiUrl + 'arquivarProject/' +id, data);
  }

  getMembrosByProjetoId(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'usersProjectById/' + id)
  }

  getMembrosByProjetoIdNot(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'usersProjectByIdNot/' + id)
  }

  getMembroByProjeto(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'userProject/' + id)
  }

  updateMembro(data: any, id: number): Observable<any> {
    return this.http.put(environment.apiUrl + 'updateMembro/' + id, data);
  }

  updateProjeto(data: any, id: number): Observable<any> {
    return this.http.put(environment.apiUrl + 'updatedProjeto/' + id, data);
  }

  deletarMembro(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + 'deleteMembro/' + id)
  }

  // deletarProjeto(id: number): Observable<any> {
  //   return this.http.delete(environment.apiUrl + 'deleteProject/' + id)
  // }
}


