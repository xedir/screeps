var roleUpgrader = require('role.upgrader');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            creep.say('loot_B');
        }
        if(!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('baubau_B');
        }

        if(creep.memory.building) {

            var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION);
                }
            });
            if(targets.length > 0) {
                if(creep.build(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if(targets != null) {
                    if(creep.build(targets) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    creep.memory.upgrading = true
                    roleUpgrader.run(creep);
                }
            }
        }
        else {
            var targets = Game.spawns['Spawn1'].pos.findInRange(FIND_STRUCTURES, 3, {
                filter: (structure) => structure.structureType === STRUCTURE_CONTAINER && structure.store.energy > 50
            })
            if(targets.length > 0) {
                if(creep.withdraw(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleBuilder;