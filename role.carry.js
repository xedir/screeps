var roleCarry = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.carrying && creep.carry.energy == 0) {
            creep.memory.carrying = false;
            creep.say('🔄 loot');
        }
        if (!creep.memory.carrying && creep.carry.energy == creep.carryCapacity) {
            creep.memory.carrying = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.carrying) {
            var targets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
                filter: (structure) => (structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity) || (structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity)
            });
            if(targets.length > 0){
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var targets = Game.spawns['Spawn1'].pos.findInRange(FIND_STRUCTURES, 3, {
                    filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store.energy < structure.storeCapacity
                });
                if(targets.length > 0) {
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
        else {

            var targets = Game.getObjectById(Game.spawns['Spawn1'].memory.quelle1).pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > 500
            });


            if (targets.length > 0) {
                if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else
                var targets = Game.getObjectById(Game.spawns['Spawn1'].memory.quelle2).pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store.energy > 500
                })
                if (targets.length > 0){
                    if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
        }
    }
};

module.exports = roleCarry;