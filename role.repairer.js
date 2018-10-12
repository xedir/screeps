var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy === 0) {
            creep.memory.repairing = false;
        }
        if(!creep.memory.repairing && creep.carry.energy === creep.carryCapacity) {
            creep.memory.repairing = true;
        }



        if(creep.memory.repairJobId === 'voll' || creep.memory.repairJobId === 'undefined' && creep.memory.repairing){
            var targets = creep.room.find(FIND_STRUCTURES,{
                filter: object => object.structureType === STRUCTURE_CONTAINER && ((object.hitsMax - object.hits)  > (object.hitsMax * 0.1))
            });


            if (targets.length > 0){
                targets.sort((a,b) => a.hits -b.hits);
                creep.memory.repairJobId = '' + targets[0].id
            } else {
                var targets = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                    filter: object => (object.hitsMax - object.hits)  > (object.hitsMax * 0.1)
                });
                creep.memory.repairJobId = '' + targets.id
            }

        }

        if(creep.memory.repairJobId !== 'voll' && creep.memory.repairJobId !== 'undefined' && creep.memory.repairing){
            var target = Game.getObjectById(creep.memory.repairJobId);
            creep.say('Rep ' + target.structureType);
        }

        if(creep.memory.repairing){
            if(target.hits < target.hitsMax){

                if(creep.repair(target) === ERR_NOT_IN_RANGE){
                    creep.moveTo(target)
                }
             } else
                 creep.memory.repairJobId = 'voll';
        } else {
            var targets = Game.spawns['Spawn1'].pos.findInRange(FIND_STRUCTURES, 3, {
                filter: (structure) => structure.structureType === STRUCTURE_CONTAINER && structure.store.energy > 50
            })
            if(targets.length > 0) {
                creep.say('Tanken_R');
                if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }

    }
};

module.exports = roleRepairer;
