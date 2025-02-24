import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Plano } from '../../model/plano.model';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-lista-clientes',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.scss'
})
export class ListaClientesComponent {
  clientes: any[] = [];
  carregando: boolean = true; 
  erro: string = '';
  mensagemSucesso: string = '';
  planos: Plano[] = [];
  nomePlano = "";

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.carregarClientes();
    this. carregarPlanos();

    this.apiService.mensagem$.subscribe(mensagem => {
      this.mensagemSucesso = mensagem;
      setTimeout(() => {
        this.mensagemSucesso = ''; 
      }, 5000);
    });
  }

  carregarClientes(): void {
    this.apiService.getClientes().subscribe(
      (data) => {
        this.clientes = data;
        this.carregando = false; 
      },
      (erro) => {
        this.erro = 'Erro ao carregar clientes.';
        this.carregando = false;
      }
    );
  }

  carregarPlanos(): void {
    this.apiService.getPlanos().subscribe(
      (data) => {
        this.planos = data;
      },
      (error) => {
        console.error('Erro ao carregar planos', error);
      }
    );
  }

  obterNomePlano(clienteId: string): string {
    const plano = this.planos.find(p => p.id === clienteId);
    return plano ? plano.nome : 'Sem plano';
  }

  editarCliente(id: string): void {
    this.router.navigate(['/cadastro-cliente', id]); 
  }
  

  excluirCliente(id: string): void {
    this.apiService.deleteCliente(id).subscribe(
      (response) => {
        console.log('Cliente excluído com sucesso!', response);
  
        location.reload();
  
        setTimeout(() => {
          this.apiService.setMensagem('Cliente deletado com sucesso!');
        }, 3000);
      },
      (error) => {
        console.error('Erro ao excluir cliente', error);
        this.apiService.setMensagem('Erro ao excluir cliente!');
      }
    );
  }
  
  
}
