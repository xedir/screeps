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
        buildMiningContainer(roomToControll);

    }
};

function initRoom(room){

    //Quellen und Rohstoffe finden
    if(!room.memory.sources){

        //Quellen in room.memory.sources als Array gespeichert
        var quellen = room.find(FIND_SOURCES);
        room.memory.sources = quellen;

        //TODO Rohstoffe und Check fÃ¼r Sources ob diese Safe sind
    }
}

function buildMiningContainer(roomAt){

    const terrain = new Room.Terrain(roomAt.name);
    console.log(terrain);


    for(var i in roomAt.memory.sources){
        var targetX = roomAt.memory.sources[i].pos.x;
        var targetY = roomAt.memory.sources[i].pos.y;
        var buildAt = {roomName: roomAt.memory.sources[i].room, x: targetX, y: targetY};
        var result = false;

        if(roomAt.memory.sources[i].containerStatus == 'leer'){
            roomAt.createConstructionSite(roomAt.memory.sources[i].containerLocation.x, roomAt.memory.sources[i].containerLocation.y, STRUCTURE_CONTAINER);
            roomAt.memory.sources[i].containerStatus = 'construction';
        }else if (!roomAt.memory.sources[i].containerStatus){
            for(let x = -1; x < 2; x++){
                for(let y = -1; y < 2; y++){
                    if(terrain.get(targetX+x, targetY+y) !== 1 && terrain.get(targetX+x, targetY+y) !== 2 && result == false){
                        buildAt.x = targetX+x;
                        buildAt.y = targetY+y;
                        roomAt.memory.sources[i].containerLocation = buildAt;
                        roomAt.memory.sources[i].containerStatus = 'leer';
                    }
                }
            }
        }
    }


    /*
        var ziel = {pos :Game.getObjectById(spawn.memory.quelle1).pos , range: 2 };


        var pfad = PathFinder.search(spawn.pos, ziel).path;
        //spawn.findPathTo(Game.getObjectById(spawn.memory.quelle1).pos);

        spawn.memory.status = 1;

        for(var posis in pfad){
            var posi = pfad[posis];
            var struktur = posi.lookFor(LOOK_STRUCTURES);

            if(struktur != 'structure'){
                struktur = posi.lookFor(LOOK_CONSTRUCTION_SITES);
                if(struktur != 'constructionSite'){
                    spawn.room.createConstructionSite(posi, STRUCTURE_ROAD)
                }
                console.log(struktur)
            }
        }
        console.log(pfad);

        */
}



module.exports = roomController;