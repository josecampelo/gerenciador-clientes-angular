import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-consulta-cliente',
  imports: [
    CommonModule, 
    MatTableModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    NgxMaskPipe
  ],
  templateUrl: './consulta-cliente.component.html',
  styleUrl: './consulta-cliente.component.scss'
})
export class ConsultaClienteComponent implements OnInit {
  private clienteService = inject(ClienteService);
  
  displayedColumns: string[] = ['nome', 'cpf', 'email', 'telefone', 'dataCadastro'];
  dataSource: Cliente[] = [];

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.dataSource = this.clienteService.obterClientes();
  }

  excluir(id: string): void {
    console.log('Excluir ID:', id);
  }
}