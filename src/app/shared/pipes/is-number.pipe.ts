import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isNumber',
  standalone: true,
})
export class IsNumberPipe implements PipeTransform {
  transform(value: unknown): boolean {
    return typeof value === 'number';
  }
}
