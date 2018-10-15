var gameController = {

    run: function() {

        setupRooms();


}


};


function setupRooms(){

    var z=0;
    Memory.myControlledRooms = Game.rooms;

    for (var nameRaum in Game.rooms){

        var nachbarn = Game.map.describeExits(nameRaum);

        //Memory.myControlledRooms[z].nachbarn = Game.rooms;
        z++;
    }
}



module.exports = gameController;