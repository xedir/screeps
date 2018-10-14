var roomController = {

    run: function(roomToControll) {


        if(!roomToControll.memory.init) {
            initRoom(roomToControll);

        } else {
            var ControledRooms = [];
            var z = 0;
            for (var name in Game.rooms) {
                ControledRooms[z] = Game.rooms[name];
                z++;
            }
            if(ControledRooms.length == 1){
                roomToControll.memory.roomType = 'Hauptraum';
            }

        }
    }
};

function initRoom(room){

    //Quellen und Rohstoffe finden
    if(!room.memory.sources){

        //Quellen in room.memory.sources als Array gespeichert
        var quellen = room.find(FIND_SOURCES);
        room.memory.sources = quellen;

        //TODO Rohstoffe und Check für Sources ob diese Safe sind
    }
}


module.exports = roomController;