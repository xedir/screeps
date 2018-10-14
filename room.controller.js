var roomController = {

    run: function(roomToControll) {


        if(!roomToControll.memory.init) {
            initRoom(roomToControll);

        } else
            var myRooms = Game.rooms;
            if(myRooms == 1) {
            roomToControll.memory.roomTyp = 'Hauptraum';
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