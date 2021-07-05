import { Pipe, PipeTransform } from '@angular/core';
import { Injectable } from "@angular/core";

@Pipe({
  name: 'filter'
})
@Injectable({
  providedIn: 'root'
})

export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }

    return items.filter(singleItem => {
      if (singleItem[field]) {
        return singleItem[field].toString().toLowerCase().includes(value.toString().toLowerCase());
      }
    });
  }

}
