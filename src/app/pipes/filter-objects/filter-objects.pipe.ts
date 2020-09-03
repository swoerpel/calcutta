import { Pipe, PipeTransform } from "@angular/core";
import { Room } from 'src/app/models/room.model';

@Pipe({name: 'filterByKey'})
export class FilterObjectsPipe implements PipeTransform {
  transform(listOfObjects: any[], keyToFilter: string, key: any): Room[] {
    const listOfObjectKeys = listOfObjects.map(r => r[key]);
    if(!listOfObjectKeys) return null;
    if(!keyToFilter) return listOfObjects;
    return listOfObjectKeys.filter(n => n.toUpperCase().indexOf(keyToFilter.toUpperCase()) >= 0)
      .map((value: string) => {
        return {
          ...listOfObjects.find(r => r[key] = value)
        }
      });
  }
}