import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'winLoss',
  standalone: true,
})
export class WinLossPipe implements PipeTransform {
  transform(value: 'win' | 'lose'): 'W' | 'L' {
    return value === 'win' ? 'W' : 'L';
  }
}
