import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashIfNull',
})
export class DashIfNullPipe implements PipeTransform {

  transform(value: string): string {
    return !value? '-': value;
  }
}
