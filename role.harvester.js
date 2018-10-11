var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            console.log(Game.getObjectById(creep.memory.source.id));


            var target = creep.memory.source;

            if(creep.memory.role == "harvesterSourceOne") {

                if (creep.harvest(Game.getObjectById(creep.memory.source.id)) == ERR_NOT_IN_RANGE){
                    creep.moveTo(Game.getObjectById(creep.memory.source.id), {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else if(creep.memory.role == "harvesterSourceTwo"){
                if (creep.harvest(Game.getObjectById(creep.memory.source.id)) == ERR_NOT_IN_RANGE){
                    creep.moveTo(Game.getObjectById(creep.memory.source.id), {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {
                if(creep.transfer(Game.getObjectById(creep.memory.container.id), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.container.id), {visualizePathStyle: {stroke: '#ffffff'}});
                }
        }
    }
};

module.exports = roleHarvester;