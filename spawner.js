var spawner = {

    /** @param {Creep} creep **/
    run: function(spawn) {

        var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.ticksToLive > 50);
        console.log(creeps.length);


        if((_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.ticksToLive > 50).length) < 1){
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvester1', {
                memory: {role: 'harvester'}
            });
        }

        if((_.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.ticksToLive > 50).length) < 2){
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Builder1', {
                memory: {role: 'builder'}
            });
        }

        if((_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.ticksToLive > 50).length) < 2){
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Upgrader1', {
                memory: {role: 'upgrader'}
            });
        }
    }
};

module.exports = spawner;