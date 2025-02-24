import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { GraficoBarraComponent } from '../grafico-barra/grafico-barra.component';
import { GraficoPizzaComponent } from '../grafico-pizza/grafico-pizza.component';
import { IndicadoresComponent } from '../indicadores/indicadores.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    GraficoBarraComponent,
    GraficoPizzaComponent,
    IndicadoresComponent
    , HeaderComponent, FooterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor() { }

  ngOnInit(): void {

  }

}
