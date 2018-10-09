var spawner = {

    /** @param {Creep} creep **/
    run: function(spawn) {

        var harvesters = 0;
        var builders = 0;
        var upgraders = 0;

        harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.ticksToLive > 50);
        builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.ticksToLive > 50);
        upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.ticksToLive > 50);
        console.log("Momentane Harvester: " + harvesters.length);
        console.log("Momentane Builder: " + builders.length);
        console.log("Momentane Upgrader: " + builders.length);


        if(harvesters < 1){
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvester1', {
                memory: {role: 'harvester'}
            });
        }

        if(builders < 2){
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Builder1', {
                memory: {role: 'builder'}
            });
        }

        if(upgraders < 2){
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Upgrader1', {
                memory: {role: 'upgrader'}
            });
        }
    }
};

module.exports = spawner;