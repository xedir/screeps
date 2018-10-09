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


        if(harvesters.length < 3){
            var name = "Harvester" + Game.time.toString() ;
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], name, {
                memory: {role: 'harvester'}
            });
        } else if(builders.length < 3){
            var name = "Builder" + Game.time.toString();
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], name, {
                memory: {role: 'builder'}
            });
        } else if(upgraders.length < 2){
            var name = "Upgrader" + Game.time.toString();
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], name, {
                memory: {role: 'upgrader'}
            });
        }
    }
};

module.exports = spawner;