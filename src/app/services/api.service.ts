import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from '../model/cliente.model';
import { Plano } from '../model/plano.model';
import { ClientePlano } from '../model/clientePlano.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';
  private mensagemSubject = new BehaviorSubject<string>('');
  mensagem$ = this.mensagemSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Métodos para Clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  }

  getClienteById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/clientes/${id}`);
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/clientes`, cliente);
  }
  

  updateCliente(id: string, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/clientes/${id}`, cliente);
  }

  deleteCliente(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clientes/${id}`);
  }

  // Métodos para Planos


  getPlanoById(id: string): Observable<Plano> {
    return this.http.get<Plano>(`${this.apiUrl}/planos/${id}`);
  }

  addPlano(plano: Plano): Observable<Plano> {
    return this.http.post<Plano>(`${this.apiUrl}/planos`, plano);
  }

  getPlanos(): Observable<Plano[]> {
    return this.http.get<Plano[]>(`${this.apiUrl}/planos`);
  }

  updatePlano(id: string, plano: Plano): Observable<Plano> {
    return this.http.put<Plano>(`${this.apiUrl}/planos/${id}`, plano);
  }

  deletePlano(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/planos/${id}`);
  }

  associarPlanoCliente(associacao: { clienteId: string, planoId: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/clientePlanos`, associacao); 
  }

  // Método para ClientePlanos
  getClientePlanos(): Observable<ClientePlano[]> {
    return this.http.get<ClientePlano[]>(`${this.apiUrl}/clientePlanos`);
  }



  setMensagem(mensagem: string) {
    this.mensagemSubject.next(mensagem);
  }
}
