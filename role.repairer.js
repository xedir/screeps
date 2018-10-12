var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy === 0) {
            creep.memory.repairing = false;
            creep.say('🔄 loot');
        }
        if(!creep.memory.repairing && creep.carry.energy === creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('⚡ upgrade');
        }



        if(creep.memory.repairJobId === 'voll' || creep.memory.repairJobId === 'undefined'){
            var targets = creep.room.find(FIND_STRUCTURES,{
                filter: object => object.structureType === STRUCTURE_CONTAINER && ((object.hitsMax - object.hits)  < (object.hitsMax * 0.1))
            });


            if (targets.length > 0){
                targets.sort((a,b) => a.hits -b.hits);
                creep.memory.repairJobId = targets[0].id
            } else {
                var targets = creep.room.find(FIND_STRUCTURES,{
                    filter: object => (object.hitsMax - object.hits)  < (object.hitsMax * 0.1)
                });
                targets.sort((a,b) => a.hits -b.hits);
                creep.memory.repairJobId = targets[0].id
            }

        }







    }
};

module.exports = roleRepairer;
