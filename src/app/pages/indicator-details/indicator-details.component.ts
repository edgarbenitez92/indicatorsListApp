import { Component, OnInit } from '@angular/core';

// Service and routing
import { ActivatedRoute, Router } from '@angular/router';
import { IndicatorsService } from '../../services/indicators.service';

// Externals librarys
import { ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indicator-details',
  templateUrl: './indicator-details.component.html',
  styleUrls: ['./indicator-details.component.scss'],
})
export class IndicatorDetailsComponent implements OnInit {
  indicator: any = {};

  // Config Charts
  public lineChartData: ChartDataSets[] = [{ data: [], label: '' }];

  public lineChartLabels: Label[] = [];

  public lineChartType: ChartType = 'line';

  public lineChartColors: Color[] = [
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(3, 3, 181, 1)',
      pointBackgroundColor: 'rgba(3, 3, 181, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(3, 3, 181,0.8)',
    },
  ];

  public lineChartLegend = true;

  constructor(
    private indicatorsService: IndicatorsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.showLoadingMsg();
    this.activatedRoute.params.subscribe(({ codigo }) => {
      this.getIndicatorValues(codigo);
    });
    Swal.close();
  }

  ngOnInit(): void {}

  getIndicatorValues(code: string) {
    this.indicatorsService.getIndicatorValues(code).subscribe((response) => {
      this.indicator = response;
      this.lineChartLabels = response.serie.map((serie: any) => {
        return new Date(serie.fecha).toLocaleDateString();
      });
      this.lineChartData[0].label = response.codigo;

      this.lineChartData[0].data = response.serie.map((serie: any) => {
        return serie.valor;
      });
    });
  }

  showLoadingMsg(): void {
    Swal.fire({
      title: 'Cargando...',
      imageUrl: '/assets/b-chile.png',
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Logo Banco de Chile',
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
    Swal.showLoading();
  }
}
