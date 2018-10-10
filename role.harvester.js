var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.memory.role == "ha1") {
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else if(creep.memory.role == "ha2"){
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {
            var targets = creep.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity) );
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
                console.log(targets);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;