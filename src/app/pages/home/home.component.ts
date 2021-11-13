import { Component, OnInit } from '@angular/core';
import { IndicatorsService } from '../../services/indicators.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  indicators: any[] = [];

  constructor(private indicatorsService: IndicatorsService) {}

  ngOnInit(): void {
    this.indicatorsService.getIndicators().subscribe((response) => {
      let indicators: any[] = [];

      for (let key in response) {
        let value = response[key];

        if (typeof value === 'object') {
          indicators.push(value);
        }
      }

      this.indicators = indicators;
    });
  }
}
