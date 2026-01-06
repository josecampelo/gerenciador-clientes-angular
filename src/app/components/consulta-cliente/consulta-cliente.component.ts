import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { NgxMaskPipe } from 'ngx-mask';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-cliente',
  imports: [
    CommonModule, 
    MatTableModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
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
  private router = inject(Router);
  
  displayedColumns: string[] = ['nome', 'cpf', 'email', 'telefone', 'dataCadastro', 'acoes'];
  dataSource: Cliente[] = [];
  clientesCompleto: Cliente[] = [];

  clienteEmExclusaoId: string | null = null;

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    const dados = this.clienteService.obterClientes();
    
    this.clientesCompleto = dados;
    this.dataSource = dados;
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
    this.clientesCompleto = this.clientesCompleto.filter(c => c.id !== id);
    this.clienteEmExclusaoId = null;
  }

  editar(id: string): void {
    this.router.navigate(['/cadastrar', id]);
  }

  pesquisar(event: Event): void {
    const termo = (event.target as HTMLInputElement).value.toLowerCase();
    
    this.dataSource = this.clientesCompleto.filter(cliente => 
      cliente.nome.toLowerCase().includes(termo)
    );
  }
}