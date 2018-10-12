var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawner = require('spawner');
var roleRepairer = require('role.repairer');
var roleCarry = require('role.carry');

module.exports.loop = function () {

    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }


    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }



    if(Game.spawns['Spawn1'].memory.init === false){
        Game.spawns['Spawn1'].memory.quelle1 = Game.spawns['Spawn1'].room.find(FIND_SOURCES)[0].id;
        Game.spawns['Spawn1'].memory.quelle2 = false;

        if(Game.spawns['Spawn1'].room.find(FIND_SOURCES).length > 1){
            Game.spawns['Spawn1'].memory.quelle2 = Game.spawns['Spawn1'].room.find(FIND_SOURCES)[1].id;
        }
        Game.spawns['Spawn1'].memory.init = true;
    }

    /*
    console.log("Container am Spawn: " + Game.spawns['Spawn1'].pos.findInRange(FIND_STRUCTURES, 3, {
        filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store.energy < structure.storeCapacity
    }));

    console.log("Container an Quelle1: " + Game.getObjectById(Game.spawns['Spawn1'].memory.quelle1).pos.findInRange(FIND_STRUCTURES, 1, {
        filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
    }));

    console.log("Container an Quelle2: " + Game.getObjectById(Game.spawns['Spawn1'].memory.quelle2).pos.findInRange(FIND_STRUCTURES, 1, {
        filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
    }));

*/


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'harvesterSourceOne' || creep.memory.role === "harvesterSourceTwo") {
            roleHarvester.run(creep);
        }
        if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role === 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role === 'carry'){
            roleCarry.run(creep);
        }
    }

    for(var name in Game.creeps){
        var creep= Game.creeps[name];
        if(creep.ticksToLive < 30 ){
            creep.memory.role = 'tot';
            if(creep.energy > 0) {
                if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                if(creep.ticksToLive > 28)
                    creep.say('RiP');
            }
        }
    }

    for(var spawns in Game.spawns){
        var spawn = Game.spawns[spawns];
        spawner.run(spawn);
    }
};
