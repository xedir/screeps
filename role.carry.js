var roleCarry = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.carrying && creep.carry.energy == 0) {
            creep.memory.carrying = false;
            creep.say('🔄 loot');
        }
        if(!creep.memory.carrying && creep.carry.energy == creep.carryCapacity) {
            creep.memory.carrying = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.carrying) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity))
                }
            });
            if(targets.length > 0) {
                if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleCarry;