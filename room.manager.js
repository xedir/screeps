var roomManager = {

    run: function(spawn) {

        if (spawn.memory.status === 1) {

            var pfad = PathFinder.search(spawn.pos, Game.getObjectById(spawn.memory.quelle1)).path;
            spawn.memory.status = 2;
        }
        console.log(pfad);

    }
};

module.exports = roomManager;