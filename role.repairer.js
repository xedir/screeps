var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 loot');
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('⚡ upgrade');
        }

        var toRepair = creep.memory.repairJob;

        if(creep.memory.repairJob === undefined){
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.structureType == STRUCTURE_CONTAINER
            });
            targets.sort((a,b) => a.hits - b.hits);
            creep.memory.repairJob = targets[0].id;
        }


        if(Game.getObjectById(toRepair.hits) !== Game.getObjectById(toRepair).hitsMax && creep.memory.repairing){
            if(creep.repair(Game.getObjectById(toRepair)) === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(toRepair));
            }
        } else if (creep.memory.repairing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax && object.structureType === STRUCTURE_CONTAINER
            });
            targets.sort((a,b) => a.hits - b.hits);
            if(targets.length > 0){
                creep.memory.repairJob = targets[0]
            } else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
                })
                targets.sort((a,b) => a.hits - b.hits);
                if (targets.length > 0){
                    creep.memory.repairJob = targets[0]
                }
            }
        } else {
            var targets = Game.spawns['Spawn1'].pos.findInRange(FIND_STRUCTURES, 3, {
                filter: (structure) => structure.structureType === STRUCTURE_CONTAINER && structure.store.energy > 50
            })
            if(targets.length > 0) {
                if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleRepairer;
