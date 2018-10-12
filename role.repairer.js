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

/*

        if(creep.memory.repairJob == undefined){
            var targets = creep.room.find(FIND_STRUCTURES,{
                filter: object => object.structureType == STRUCTURE_CONTAINER
            });

            targets.sort((a,b) => a.hits -b.hits);
            creep.memory.repairJob = targets[0].id
        }
*/
    creep.memory.repairJob = 'leer' ;



    }
};

module.exports = roleRepairer;
