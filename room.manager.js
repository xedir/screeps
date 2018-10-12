var roomManager = {

    run: function(spawn) {

        if (spawn.memory.status == 1) {
            console.log("Spawner Pos: " + spawn.pos)
            console.log("Quelle Pos: " + Game.getObjectById(spawn.memory.quelle1).pos);


            var pfad = PathFinder.search(spawn.pos, Game.getObjectById(spawn.memory.quelle1).pos).path;
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

module.exports = roomManager;