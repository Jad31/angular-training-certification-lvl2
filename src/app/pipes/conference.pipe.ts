import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conference',
  standalone: true,
})
export class ConferencePipe implements PipeTransform {
  transform(
    value: 'East' | 'West'
  ): 'Eastern Conference' | 'Western Conference' {
    return value === 'East' ? 'Eastern Conference' : 'Western Conference';
  }
}
