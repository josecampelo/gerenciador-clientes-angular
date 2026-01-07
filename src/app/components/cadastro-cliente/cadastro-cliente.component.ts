import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { EnderecoService, Municipio, Uf } from '../../services/endereco.service';

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
    MatSelectModule,
    NgxMaskDirective
  ],
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.scss'
})
export class CadastroClienteComponent implements OnInit {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private snackBar = inject(MatSnackBar);
  private enderecoService = inject(EnderecoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  modoEdicao = false;
  clienteId: string | null = null;
  dadosOriginaisCliente?: any;
  listaUfs: Uf[] = [];
  listaMunicipios: Municipio[] = [];
  carregandoMunicipios = false;

  cadastroForm: FormGroup = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      municipio: [{ value: '', disabled: true }, [Validators.required]]
  });

  ngOnInit(): void {
    this.carregarUfs();
    this.escutarMudancaUf();

    this.clienteId = this.route.snapshot.paramMap.get('id');
    
    if (this.clienteId) {
      this.modoEdicao = true;
      const cliente = this.clienteService.obterClientePorId(this.clienteId);
      
      if (cliente) {
        this.dadosOriginaisCliente = cliente;
        this.cadastroForm.patchValue(cliente);
      }
    }
  }

  salvar(): void {
    if (this.cadastroForm.valid) {
      if (this.modoEdicao) {
        const clienteAtualizado = {
          ...this.dadosOriginaisCliente,
          ...this.cadastroForm.value
        };
        this.clienteService.atualizarCliente(clienteAtualizado);
        this.snackBar.open('Cliente atualizado com sucesso!', 'Fechar', { duration: 5000 });
        this.router.navigate(['/consultar']);
      } else {
        this.clienteService.salvarCliente(this.cadastroForm.value);
        this.snackBar.open('Cliente cadastrado com sucesso!', 'Fechar', { duration: 5000 });
        this.router.navigate(['/consultar']);
      }
    }
  }

  carregarUfs(): void {
    this.enderecoService.obterUfs().subscribe(ufs => {
      this.listaUfs = ufs;
    });
  }

  escutarMudancaUf(): void {
    this.cadastroForm.get('uf')?.valueChanges.subscribe(sigla => {
      if (sigla) {
        this.carregandoMunicipios = true;
        this.cadastroForm.get('municipio')?.enable(); // Habilita o dropdown de municípios
        
        this.enderecoService.obterMunicipios(sigla).subscribe(municipios => {
          this.listaMunicipios = municipios;
          this.carregandoMunicipios = false;
        });
      }
    });
  }
}
