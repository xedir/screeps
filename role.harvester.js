var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && creep.harvest(sources[0] == creep.memory.source)) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            } else if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE && creep.harvest(sources[1] == creep.memory.source)) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity) );
                }
            });
            console.log(targets.findInRange(FIND_STRUCTURES));
            targets.findInRange(FIND_STRUCTURES);
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;