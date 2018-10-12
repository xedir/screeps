var roomManager = {

    run: function(spawn) {

        if (spawn.memory.status === 1) {

            var pfad = PathFinder.search(spawn, Game.getObjectById(spawn.memory.quelle1).pos).path
            spawn.memory.status = 2;
        }
        console.log(pfad);

    }
};

module.exports = roomManager;