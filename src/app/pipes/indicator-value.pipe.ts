import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indicatorValue'
})
export class IndicatorValuePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
