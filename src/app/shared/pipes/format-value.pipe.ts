import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatValue',
  standalone: true,
})
export class FormatValuePipe implements PipeTransform {
  datePipe = new DatePipe('fr-FR');

  transform(value: any): string {
    if (!value) {
      return '-';
    }

    if (value instanceof Date) {
      return formatDate(value);
    }

    return value;
  }
}

function formatDate(value: any): string {
  let date, month, year;
  date = value.getDate();
  month = value.getMonth() + 1;
  year = value.getFullYear();
  date = date.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');
  return `${date}/${month}/${year}`;
}
