import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompromissoService {
  constructor(private http: HttpClient) {}

  cadastrarCompromisso(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'newCompromisso', data);
  }

  getMeetTask(metodo: string): Observable<any> {
    return this.http.get(environment.apiUrl + metodo);
  }
  getMembrosByMeet(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'usersByMeet/' + id)
  }
  getCommitmentById(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'commitmentById/' + id)
  }

  getCommitmentByMeet(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'meetCommitment/' + id)
  }

  deletarCompromisso(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + 'deleteCommitment/' + id)
  }

  atualizarCompromisso(data: any, id: number){
    return this.http.put<any>(environment.apiUrl + 'atualizaCompromisso/' +id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  salvarSituacao(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'newSituacao', data);
  }

  getSituacao(metodo: string): Observable<any> {
    return this.http.get(environment.apiUrl + metodo);
  }
  getSituacaoId(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'situacaoById/' + id)
  }

  getMailCommitment(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'mailCommitment/' + id)
  }

  getCommitmentByRespId(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'usersCompromisso/' + id)
  }

  getExportCommitment(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + 'exportCommitment/' + id)
  }
}
