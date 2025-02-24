import { Component, HostListener } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-grafico-barra',
  imports: [NgxChartsModule],
  templateUrl: './grafico-barra.component.html',
  styleUrls: ['./grafico-barra.component.scss']
})
export class GraficoBarraComponent {
  data: any[] = [];
  showLegend = true;
  showLabels = true;
  scheme = 'cool';
  customColors = { domain: ['#5AA454', '#C7B42C', '#AAAAAA'] };
  view: [number, number] = [window.innerWidth * 0.6, 400];  


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const windowWidth = event.target.innerWidth;


    if (windowWidth >= 1010) {
      this.view = [windowWidth * 0.6, 400];  
    } else {
      this.view = [windowWidth * 0.8, 400];
    }
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.carregarDadosGrafico();
  }

  carregarDadosGrafico(): void {
    this.apiService.getClientes().subscribe(clientes => {
      const clientesPorMes = clientes.reduce((acc, cliente) => {
        if (!cliente.dataCadastro) return acc;

        const mes = new Date(cliente.dataCadastro).getMonth(); 
        acc[mes] = (acc[mes] || 0) + 1;
        return acc;
      }, {} as { [key: number]: number });

      this.data = Object.entries(clientesPorMes)
        .map(([mes, count]) => ({
          name: this.getNomeMes(+mes),
          value: count
        }))
        .sort((a, b) => new Date(`01 ${a.name} 2000`).getMonth() - new Date(`01 ${b.name} 2000`).getMonth());
    });
  }

  getNomeMes(mesIndex: number): string {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[mesIndex];
  }
}
