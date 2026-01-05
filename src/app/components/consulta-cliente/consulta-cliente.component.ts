import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { NgxMaskPipe } from 'ngx-mask';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0, transform: 'translateX(50px)' }))
      ])
    ])
  ],
  templateUrl: './consulta-cliente.component.html',
  styleUrl: './consulta-cliente.component.scss'
})
export class ConsultaClienteComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private snackBar = inject(MatSnackBar);
  
  displayedColumns: string[] = ['nome', 'cpf', 'email', 'telefone', 'dataCadastro', 'acoes'];
  dataSource: Cliente[] = [];

  clienteEmExclusaoId: string | null = null;

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.dataSource = this.clienteService.obterClientes();
  }

  prepararExclusao(id: string): void {
    this.clienteEmExclusaoId = id;
  }

  cancelarExclusao(): void {
    this.clienteEmExclusaoId = null;
  }

  confirmarExclusao(id: string): void {
    this.clienteService.removerCliente(id);
    this.snackBar.open('Cliente removido com sucesso!', 'Fechar', { duration: 3000 });
    this.dataSource = this.dataSource.filter(c => c.id !== id);
    this.clienteEmExclusaoId = null;
  }
}