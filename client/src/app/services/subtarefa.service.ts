import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubTarefaService {

  constructor(private http: HttpClient) { }

  cadastrarSubTarefa(data: any) : Observable<any> {
    return this.http.post(environment.apiUrl + 'newTask', data)
  }

  getTarefa(metodo: string) : Observable<any>{
    return this.http.get(environment.apiUrl + metodo)
  }

  getTask(id: any) : Observable<any>{
    return this.http.get(environment.apiUrl + 'task/' + id)
  }

  subTarefaByTarefa(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'taskTarefa/' + id)
  }

  updateSubTarefa(id: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}updateTask/${id}`, data);
  }

  updateSubTarefaStatus(id: number, status_id: number): Observable<any> {
    return this.http.patch(environment.apiUrl + 'updateTaskStatus/' + id, { status_id });
  }

  deletarSubTarefa(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + 'deleteTask/' + id)
  }

  ordemSubTarefa(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'ordemTarefa/' + id)
  }
}
