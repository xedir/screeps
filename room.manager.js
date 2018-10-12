var roomManager = {

    run: function(spawn) {

        if (spawn.memory.status == 1) {
            console.log("Spawner Pos: " + spawn.pos)
            console.log("Quelle Pos: " + Game.getObjectById(spawn.memory.quelle1).pos);


            var pfad = PathFinder.search(spawn.pos, Game.getObjectById(spawn.memory.quelle1)).path;
            spawn.memory.status = 1;
        }
        console.log(pfad[0]);

    }
};

module.exports = roomManager;