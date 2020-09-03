import { NgModule }      from '@angular/core';
import { FilterObjectsPipe } from './filter-objects.pipe';

@NgModule({
    imports:        [],
    declarations:   [FilterObjectsPipe],
    exports:        [FilterObjectsPipe],
})

export class FilterObjectsModule {

  static forRoot() {
     return {
         ngModule: FilterObjectsPipe,
         providers: [],
     };
  }
} 