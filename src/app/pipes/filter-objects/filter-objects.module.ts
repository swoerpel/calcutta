import { NgModule }      from '@angular/core';
import { FilterPlayers } from './filter-objects.pipe';
import { FilterTournaments } from './filter-objects.pipe';

@NgModule({
    imports:        [],
    declarations:   [FilterPlayers],
    exports:        [FilterPlayers],
})
export class FilterPlayersModule {

  static forRoot() {
     return {
         ngModule: FilterPlayers,
         providers: [],
     };
  }
} 

@NgModule({
    imports:        [],
    declarations:   [FilterTournaments],
    exports:        [FilterTournaments],
})
export class FilterTournamentsModule {

  static forRoot() {
     return {
         ngModule: FilterTournaments,
         providers: [],
     };
  }
} 