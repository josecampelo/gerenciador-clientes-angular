import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cadastro-cliente',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    NgxMaskDirective
  ],
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.scss'
})
export class CadastroClienteComponent {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private snackBar = inject(MatSnackBar);

  cadastroForm: FormGroup = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      cpf: ['', [Validators.required]]
  });

  salvar(): void {
    if (this.cadastroForm.valid) {
      const novoCliente = { ...this.cadastroForm.value };
    
      this.clienteService.salvarCliente(novoCliente);
      
      this.snackBar.open('Cliente cadastrado com sucesso!', 'Fechar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      this.cadastroForm.reset();
      
      Object.keys(this.cadastroForm.controls).forEach(key => {
        this.cadastroForm.get(key)?.setErrors(null);
      });
    }
  }
}
