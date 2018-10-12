var roomManager = {

    run: function(spawn) {

        if (spawn.memory.status == 1) {
            console.log("Spawner Pos: " + spawn.pos)
            console.log("Quelle Pos: " + Game.getObjectById(spawn.memory.quelle1).pos);


            var pfad = PathFinder.search(spawn.pos, Game.getObjectById(spawn.memory.quelle1).pos).path;
            spawn.memory.status = 1;

            for(var posis in pfad){
                var posi = pfad[spawns];
                var struktur = posi.lookFor(LOOK_STRUCTURES)
                console.log(struktur)
            }

        }
        console.log(pfad);

    }
};

module.exports = roomManager;