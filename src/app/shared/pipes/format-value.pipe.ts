import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatValue',
  standalone: true,
})
export class FormatValuePipe implements PipeTransform {
  transform(value: string | number): string {
    return value ? `${value}` : '-';
  }
}
