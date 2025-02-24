import { provideRouter, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CadastroClienteComponent } from './components/cadastro-cliente/cadastro-cliente.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'cadastrar-cliente', component: CadastroClienteComponent },
  { path: 'listar-clientes', component: ListaClientesComponent },
  { path: 'cadastro-cliente/:id', component: CadastroClienteComponent }
];

export const appConfig = {
    providers: [
      provideRouter(routes),
      RouterModule
    ]
  };