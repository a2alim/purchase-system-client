import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiFilter'
})
export class MultiFilterPipe implements PipeTransform {

  transform(items: any[], value: string, ...fields: string[]): any[] {
    if (!items) {
      return [];
    }
    if (!fields || !value) {
      return items;
    }

    let itemResult = [];
    items.forEach(item => {
      fields.forEach(col => {
        if (item[col] && item[col].toLowerCase().includes(value.toLowerCase())) {
          let dupItem = itemResult.find(obj => { if(obj == item) return item});
          if(!dupItem){
            itemResult.push(item);
          }
        }
      });
    });
    return itemResult;
  }

}
