import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly STORAGE_KEY = '@GerenciadorClientes:clientes';

  constructor() { }

  obterClientes(): Cliente[] {
    const dados = localStorage.getItem(this.STORAGE_KEY);
    
    if (!dados) return [];

    try {
      return JSON.parse(dados);
    } catch (error) {
      console.error("Erro ao ler dados do Local Storage", error);
      return [];
    }
  }

  salvarCliente(cliente: Cliente): void {
    const clientes = this.obterClientes();
    
    if (!cliente.id) {
      cliente.id = crypto.randomUUID();
      cliente.dataCadastro = new Date();
    }

    clientes.push(cliente);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(clientes));
  }

  removerCliente(id: string): void {
    const clientes = this.obterClientes();
    const clientesFiltrados = clientes.filter(c => c.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(clientesFiltrados));
  }

  obterClientePorId(id: string): Cliente | undefined {
    return this.obterClientes().find(c => c.id === id);
  }

  atualizarCliente(clienteAtualizado: Cliente): void {
    const clientes = this.obterClientes();
    const index = clientes.findIndex(c => c.id === clienteAtualizado.id);

    if (index !== -1) {
      clientes[index] = clienteAtualizado;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(clientes));
    }
  }
}