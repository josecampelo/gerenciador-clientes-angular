import { Routes } from '@angular/router';
import { CadastroClienteComponent } from './components/cadastro-cliente/cadastro-cliente.component';
import { ConsultaClienteComponent } from './components/consulta-cliente/consulta-cliente.component';

export const routes: Routes = [
    {path: 'cadastrar', component: CadastroClienteComponent},
    { path: 'consultar', component: ConsultaClienteComponent }
];
