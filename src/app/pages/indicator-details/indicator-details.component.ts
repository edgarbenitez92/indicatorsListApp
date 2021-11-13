import { Component, OnInit } from '@angular/core';

// Service and routing
import { ActivatedRoute } from '@angular/router';
import { IndicatorsService } from '../../services/indicators.service';

// Chart library
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-indicator-details',
  templateUrl: './indicator-details.component.html',
  styleUrls: ['./indicator-details.component.scss'],
})
export class IndicatorDetailsComponent implements OnInit {
  busy: boolean = true;
  indicator: any = {};

  public lineChartData: ChartDataSets[] = [{ data: [], label: '' }];

  public lineChartLabels: Label[] = [];

  public lineChartType: ChartType = 'line';

  constructor(
    private indicatorsService: IndicatorsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(({ codigo }) => {
      console.log(codigo, ' que soy?');
      this.getIndicatorValues(codigo);
    });
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

      this.busy = false;
    });
  }
}
