import { Player } from '../models/player.model';

export function makeId(length = 16) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export function playerExists(playerList: Player[], player: Player){
    return !!playerList.find((p:Player) => {
        let p1 = p.firstName.toLowerCase()  + p.lastName.toLowerCase();
        let p2 = player.firstName.toLowerCase() + player.lastName.toLowerCase();
        return p1 === p2
    })
}