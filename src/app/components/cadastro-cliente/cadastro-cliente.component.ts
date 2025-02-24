import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../model/cliente.model';
import { ApiService } from '../../services/api.service';
import { Plano } from '../../model/plano.model';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";



@Component({
  selector: 'app-cadastro-cliente',
  imports: [ReactiveFormsModule, CommonModule, FooterComponent, HeaderComponent],
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.scss'
})
export class CadastroClienteComponent {
  clienteForm!: FormGroup;
  planos: Plano[] = []; 
  private mensagemSubject = new BehaviorSubject<string>('');
  mensagem$ = this.mensagemSubject.asObservable();

  tituloTela: string = 'Cadastro de Cliente'; 
  clienteId: string | null = null; 
  cliente: Cliente | null = null;


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      planoId: ['', Validators.required]
    });

    this.apiService.getPlanos().subscribe(planos => {
      this.planos = planos;
    });

     this.clienteId = this.route.snapshot.paramMap.get('id');

     if (this.clienteId) {
       this.tituloTela = 'Alterar Cliente';
       this.carregarCliente();
     } else {
       this.tituloTela = 'Cadastrar Cliente';
     }

  }
  carregarCliente(): void {
    if (!this.clienteId) return; 
  
    this.apiService.getClienteById(this.clienteId).subscribe(cliente => {
    
      this.cliente = cliente;
  
      const plano = this.planos.find(p => p.id === cliente.planoId);
  
      this.clienteForm.patchValue({
        nome: cliente.nome,
        cpf: cliente.cpf,
        telefone: cliente.telefone,
        email: cliente.email,
        planoId: plano ? plano.id : null 
      });
    }, (error) => {
      console.error('Erro ao carregar cliente', error);
    });
  }
  

  setMensagem(mensagem: string) {
    this.mensagemSubject.next(mensagem);
  }
  salvarCliente(): void {
    if (this.clienteForm.valid) {
      const clienteData = { ...this.clienteForm.value };
  
      if (this.clienteId) {
        const clienteId = this.clienteId as string;
  
        this.apiService.getClienteById(clienteId).subscribe(clienteExistente => {
          clienteData.dataCadastro = clienteExistente.dataCadastro;
          
          this.apiService.updateCliente(clienteId, clienteData).subscribe(() => {
            this.router.navigate(['/listar-clientes']);
            this.apiService.setMensagem('Cliente atualizado com sucesso!');
          });
        });
      } else {
        clienteData.dataCadastro = new Date().toISOString();
        
        this.apiService.addCliente(clienteData).subscribe(novoCliente => {
          const novaAssociacao = {
            clienteId: novoCliente.id,  
            planoId: clienteData.planoId 
          };
  
          this.apiService.associarPlanoCliente(novaAssociacao).subscribe(() => {
            this.router.navigate(['/listar-clientes']);
            this.apiService.setMensagem('Cliente cadastrado e associado ao plano com sucesso!');
          });
        });
      }
    }
  }
  
  
  
    aplicarMascaraCPF(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length <= 3) {
      event.target.value = valor;
    } else if (valor.length <= 6) {
      event.target.value = `${valor.slice(0, 3)}.${valor.slice(3)}`;
    } else if (valor.length <= 9) {
      event.target.value = `${valor.slice(0, 3)}.${valor.slice(3, 6)}.${valor.slice(6)}`;
    } else {
      event.target.value = `${valor.slice(0, 3)}.${valor.slice(3, 6)}.${valor.slice(6, 9)}-${valor.slice(9, 11)}`;
    }
  }
  
  get f() {
    return this.clienteForm.controls;
  }
}
