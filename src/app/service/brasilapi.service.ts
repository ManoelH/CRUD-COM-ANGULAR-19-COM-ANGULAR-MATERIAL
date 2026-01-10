import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../model/brasilapi/state.model';
import { City } from '../model/brasilapi/city.model';

@Injectable({
  providedIn: 'root'
})
export class BrasilApiService {

  private baseURL: string = 'https://brasilapi.com.br/api';
  constructor(private http: HttpClient) { }

  listStates() : Observable<State[]> {
    return this.http.get<State[]>(this.baseURL + '/ibge/uf/v1');
  }

  listCities(uf: string) : Observable<City[]> {
    return this.http.get<City[]>(this.baseURL + '/ibge/municipios/v1/'+ uf);
  }
}
