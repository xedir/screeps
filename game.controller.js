

function setupRooms(){

    var z=0;
    Memory.myControlledRooms = Game.rooms;

    for (var nameRaum in Game.rooms){

        var nachbarn = Game.map.describeExits(nameRaum);

        //Memory.myControlledRooms[z].nachbarn = Game.rooms;
        z++;
    }
}

class GameController {

    constructor(name) {
        this.name = name;

    }

}



module.exports = gameController;