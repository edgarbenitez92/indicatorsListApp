import { Component, OnInit, OnDestroy } from '@angular/core';
import { IndicatorsService } from '../../services/indicators.service';

import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

// External librarys
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  indicators: any[] = [];

  arrowUpward: boolean = true;

  breakIndicators!: Subscription;

  constructor(
    private indicatorsService: IndicatorsService,
    private router: Router
  ) {
    this.showLoadingMsg();

    this.breakIndicators = this.indicatorsService
      .getIndicators()
      .pipe(
        map((indicators) => {
          return Object.values(indicators).filter((indicators) => {
            return typeof indicators === 'object';
          });
        })
      )
      .subscribe((indicators) => {
        this.indicators = indicators;
        this.sortByName();
        Swal.close();
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.breakIndicators.unsubscribe();
  }

  sortByName() {
    this.arrowUpward = !this.arrowUpward;

    if (this.arrowUpward) {
      this.indicators.sort((a, b) => {
        if (a.codigo < b.codigo) {
          return 1;
        }
        if (a.codigo > b.codigo) {
          return -1;
        }
        return 0;
      });
    } else {
      this.indicators.sort((a, b) => {
        if (a.codigo > b.codigo) {
          return 1;
        }
        if (a.codigo < b.codigo) {
          return -1;
        }
        return 0;
      });
    }
  }

  goToIndicatorDetails(code: string): void {
    this.router.navigate(['indicador', code]);
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
