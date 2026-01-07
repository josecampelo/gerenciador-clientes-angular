import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Uf {
  id: number;
  sigla: string;
  nome: string;
}

export interface Municipio {
  nome: string;
  codigo_ibge: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://brasilapi.com.br/api/ibge';

  obterUfs(): Observable<Uf[]> {
    return this.http.get<Uf[]>(`${this.API_URL}/uf/v1`);
  }

  obterMunicipios(uf: string): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.API_URL}/municipios/v1/${uf}`);
  }
}
