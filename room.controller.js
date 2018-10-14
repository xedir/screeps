var roomController = {

    run: function(room) {


        var spawn = room.find(STRUCTURE_SPAWN)[0];
        if(spawn){
            room.memory.spawner = spawn;
        } else {
            room.memory.spawner = false;
        }


        if(spawner != false){


            room.memory.energyToSpawn = room.energyAvailable;
            room.memory.energyToSpawnCap = room.energyCapacityAvailable;




        }






        if (spawn.memory.status == 1) {
            console.log("Spawner Pos: " + spawn.pos)
            console.log("Quelle Pos: " + Game.getObjectById(spawn.memory.quelle1).pos);


            var ziel = {pos :Game.getObjectById(spawn.memory.quelle1).pos , range: 2 };

            for(var quellen in spawn){


            }

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

        }
        console.log(pfad);

    }
};

module.exports = roomController;