import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-indicadores',
  imports: [CommonModule, DecimalPipe],
  templateUrl: './indicadores.component.html',
  styleUrl: './indicadores.component.scss'
})
export class IndicadoresComponent {
  totalClientes = 0;
  totalPlanos = 0;
  mediaPlanosPorCliente = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.carregarIndicadores();
  }

  carregarIndicadores(): void {
    this.apiService.getClientes().subscribe(clientes => {
      this.apiService.getPlanos().subscribe(planos => {
        this.totalClientes = clientes.length;
        this.totalPlanos = planos.length;
        this.mediaPlanosPorCliente = this.totalClientes > 0 ? (this.totalPlanos / this.totalClientes) : 0;
      });
    });
  }

}
