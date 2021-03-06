import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

// Service and routing
import { ActivatedRoute, Router } from '@angular/router';
import { IndicatorsService } from '../../services/indicators.service';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// Externals libraries
import { ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indicator-details',
  templateUrl: './indicator-details.component.html',
  styleUrls: ['./indicator-details.component.scss'],
})
export class IndicatorDetailsComponent implements OnInit, OnDestroy {
  // Data indicator
  indicator: any = {};
  filteredValueIndicator: any[] = [];
  indicatorValue: number[] = [];
  indicatorCode!: string;
  breakIndicator!: Subscription;

  // Data date
  dateIndicator: string[] = [];
  selectedDate!: FormControl;
  breakDate!: Subscription;
  filteredDateIndicator = null;

  // Data years
  filteredYearIndicator: string[] = [];
  selectedYear!: FormControl;
  breakYear!: Subscription;

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];

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
  public lineChartType: ChartType = 'line';

  constructor(
    private acRoute: ActivatedRoute,
    private indicatorService: IndicatorsService,
    private router: Router
  ) {
    this.showLoadingMsg();
    this.breakIndicator = this.acRoute.params
      .pipe(
        switchMap(({ codigo }) => {
          this.indicatorCode = codigo;
          return this.indicatorService.getIndicatorValues(codigo);
        }),
        map((indicator) => {
          const { autor, version, ...item } = indicator;
          return item;
        })
      )
      .subscribe((indicator) => {
        this.indicator = indicator;

        this.indicator.serie.forEach((indicator: any) => {
          const fecha = this.formatDate(indicator.fecha);
          this.indicatorValue.push(indicator.valor);
          this.dateIndicator.push(fecha);
        });

        this.lineChartData = [
          {
            data: this.indicatorValue,
            label: `Nombre: ${this.indicator.nombre}`,
          },
        ];
        this.lineChartLabels = this.dateIndicator;
        Swal.close();
      });
    this.selectedDate = new FormControl('');
    this.selectedYear = new FormControl('');
  }

  ngOnInit(): void {
    this.filteredYearIndicator = this.getYears();
    this.getDateIndicator();
    this.getYearIndicator();
  }

  ngOnDestroy(): void {
    this.breakIndicator.unsubscribe();
    this.breakDate.unsubscribe();
  }

  getDateIndicator(): void {
    this.breakDate = this.selectedDate.valueChanges
      .pipe(
        switchMap((date: string) => {
          this.showLoadingMsg();
          return this.indicatorService.getIndicatorByDate(
            this.indicatorCode,
            date
          );
        }),
        map((indicator) => indicator.serie[0].valor)
      )
      .subscribe((indicator) => {
        this.filteredDateIndicator = indicator;
        Swal.close();
      });
  }

  getYearIndicator(): void {
    this.breakYear = this.selectedYear.valueChanges
      .pipe(
        switchMap((year: string) => {
          this.showLoadingMsg();
          return this.indicatorService.getIndicatorByYear(
            this.indicatorCode,
            year
          );
        }),
        map((indicator) => indicator.serie)
      )
      .subscribe((indicator) => {
        this.filteredValueIndicator = indicator;
        console.log(this.filteredValueIndicator.length);
        Swal.close();
      });
  }

  formatDate(date: string): string {
    const currentDate = new Date(date);
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    let formattedMonth = month < 10 ? `0${month}` : month;

    return `${day}-${formattedMonth}-${year}`;
  }

  showLoadingMsg(): void {
    Swal.fire({
      title: 'Cargando...',
      imageUrl: '/assets/b-chile.png',
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'B. Chile Icon',
      allowEscapeKey: false,
      allowOutsideClick: false,
    });
    Swal.showLoading();
  }

  getYears(): string[] {
    let firstYear = 2000;
    const currentYear = new Date().getFullYear();
    let Years = [];
    for (firstYear; firstYear <= currentYear; firstYear++) {
      Years.push(String(firstYear));
    }
    return Years;
  }
}
