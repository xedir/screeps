var spawner = {

    /** @param {Creep} creep **/
    run: function(spawn) {

        var harvesters = null;
        var builders = null;
        var upgraders = null;

        harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.ticksToLive > 50);
        builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.ticksToLive > 50);
        upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.ticksToLive > 50);

        console.log("Momentane Harvester: " + harvesters);
        console.log("Momentane Builder: " + builders);
        console.log("Momentane Upgrader: " + upgraders);


        if(harvesters.length < 4){
            var name = "Harvester0" + harvesters.length;
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], name, {
                memory: {role: 'harvester'}
            });
        }

        if(builders.length < 3){
            var name = "Builder0" + builders.length;
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], name, {
                memory: {role: 'builder'}
            });
        }

        if(upgraders.length < 3){
            var name = "Upgrader0" + upgraders.length;
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], name, {
                memory: {role: 'upgrader'}
            });
        }
    }
};

module.exports = spawner;