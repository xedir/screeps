var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            console.log(Game.getObjectById(creep.memory.source.id));

            var target = creep.memory.source;

            if(creep.memory.role == "harvesterSourceOne") {

                if (creep.harvest(target) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else if(creep.memory.role == "harvesterSourceTwo"){
                if (creep.harvest(target) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
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