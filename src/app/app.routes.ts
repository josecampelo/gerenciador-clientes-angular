import { Routes } from '@angular/router';
import { CadastroClienteComponent } from './components/cadastro-cliente/cadastro-cliente.component';
import { ConsultaClienteComponent } from './components/consulta-cliente/consulta-cliente.component';

export const routes: Routes = [
    { path: 'cadastrar', component: CadastroClienteComponent },
    { path: 'cadastrar/:id', component: CadastroClienteComponent },
    { path: 'consultar', component: ConsultaClienteComponent },
    { path: '', redirectTo: 'consultar', pathMatch: 'full' },
    { path: '**', redirectTo: 'consultar' }
];
