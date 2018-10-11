var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {

            if(creep.memory.role == "harvesterSourceOne") {
                if (creep.harvest(Game.getObjectById(creep.memory.source.id)) == ERR_NOT_IN_RANGE){
                    creep.moveTo(Game.getObjectById(creep.memory.source.id), {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else if(creep.memory.role == "harvesterSourceTwo"){
                if (creep.harvest(creep.memory.source) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.memory.source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {
                if(creep.transfer(creep.memory.container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.memory.container, {visualizePathStyle: {stroke: '#ffffff'}});
                }
        }
    }
};

module.exports = roleHarvester;