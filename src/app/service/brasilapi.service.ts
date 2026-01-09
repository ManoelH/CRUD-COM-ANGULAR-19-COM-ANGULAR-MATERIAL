import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../model/brasilapi/state.model';

@Injectable({
  providedIn: 'root'
})
export class BrasilApiService {

  private baseURL: string = 'https://brasilapi.com.br/api';
  constructor(private http: HttpClient) { }

  listStates() : Observable<State[]> {
    return this.http.get<State[]>(this.baseURL + '/ibge/uf/v1');
  }
}
