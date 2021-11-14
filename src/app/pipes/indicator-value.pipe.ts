import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indicatorValue',
})
export class IndicatorValuePipe implements PipeTransform {
  transform(value: number, measurement: string): string {
    if (measurement === 'Porcentaje') {
      return value + '%';
    } else if (measurement === 'Dólar' || measurement === 'Pesos') {
      return '$ ' + value;
    }

    return value.toString();
  }
}
