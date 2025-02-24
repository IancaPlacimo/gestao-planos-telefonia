import { Component, HostListener } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraficoData } from '../../model/GraficoData.model';

@Component({
  selector: 'app-grafico-pizza',
  imports: [NgxChartsModule],
  templateUrl: './grafico-pizza.component.html',
  styleUrls: ['./grafico-pizza.component.scss']
})
export class GraficoPizzaComponent {
  data: GraficoData[] = [];
  view: [number, number] = [700, 400]; // Tamanho inicial
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  showLegend = true;
  colorScheme = 'vivid'; 

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.carregarDadosGrafico();
    this.updateChartSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateChartSize();
  }

  updateChartSize(): void {
    const width = window.innerWidth;
    if (width <= 600) {
      this.view = [width - 20, 300];
    } else if (width <= 1024) {
      this.view = [width - 40, 400]; 
    } else {
      this.view = [700, 400]; 
    }
  }

  carregarDadosGrafico(): void {
    this.apiService.getClientes().subscribe(clientes => {
      this.apiService.getPlanos().subscribe(planos => {
        this.apiService.getClientePlanos().subscribe(clientePlanos => {

          const planoCounts: GraficoData[] = planos.map(plano => {
            const clientesNoPlano = clientePlanos.filter(cp => cp.planoId === plano.id);
  
            return {
              name: plano.nome,  
              value: clientesNoPlano.length  
            };
          }).filter(plano => plano.value > 0);  

          this.data = planoCounts;
        });
      });
    });
  }
}
