import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'msToKmh',
    standalone:true
 })
export class MsToKmhPipe implements PipeTransform {
  transform(value: number | null | undefined, digits = '1.0-1'): string {
    if (value == null) return '–';
    const kmh = value * 3.6;
    return `${kmh.toLocaleString(undefined, { minimumFractionDigits: +digits?.split(':')[1]?.split('-')[0], maximumFractionDigits: +digits.split('-')[1] })} km/h`;
  }
}
