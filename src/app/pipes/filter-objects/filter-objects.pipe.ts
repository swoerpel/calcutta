import { Pipe, PipeTransform } from "@angular/core";
import { Player } from 'src/app/models/player.model';
import { Tournament } from 'src/app/models/tournament.model';

@Pipe({name: 'filterPlayers'})
export class FilterPlayers implements PipeTransform {
  transform(playerList: Player[], inputString: string): any {
    if(!playerList || !inputString){
      return playerList;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return playerList.filter(p => (p.firstName + p.lastName).toLowerCase().indexOf(inputString) !== -1);
  }
}

@Pipe({name: 'filterTournaments'})
export class FilterTournaments implements PipeTransform {
  transform(tournamentList: Tournament[], inputString: string): any {
    if(!tournamentList || !inputString){
      return tournamentList;
    }
    return tournamentList.filter(p => (p.name + p.location).toLowerCase().indexOf(inputString) !== -1);
  }
}