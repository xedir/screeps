var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawner = require('spawner');
var roleRepairer = require('role.repairer');
var roleCarry = require('role.carry');
//var roomManager = require('room.manager');
var roomController = require('room.controller');
var gameController = require('game.controller');

module.exports.loop = function () {


    for(var i in Game.rooms){

        roomController.run(Game.rooms[i]);
    }

    if(!gameController){
        var master = new GameController;
    } else{
        master.setupRooms();
    }





    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    var towers = _.filter(Game.structures, (object) => object.structureType === STRUCTURE_TOWER);

    for (var i in towers){
        var tower = Game.getObjectById(i);
        if(tower) {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            } else {
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });
                if (closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            }
        }
    }


    if(Game.spawns['Spawn1'].memory.init != true){
        Game.spawns['Spawn1'].memory.quelle1 = Game.spawns['Spawn1'].room.find(FIND_SOURCES)[0].id;
        Game.spawns['Spawn1'].memory.quelle2 = false;

        if(Game.spawns['Spawn1'].room.find(FIND_SOURCES).length > 1){
            Game.spawns['Spawn1'].memory.quelle2 = Game.spawns['Spawn1'].room.find(FIND_SOURCES)[1].id;
        }
        Game.spawns['Spawn1'].memory.init = true;
        Game.spawns['Spawn1'].memory.status = 1;
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
            var targets = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType === STRUCTURE_CONTAINER && structure.store.energy < structure.storeCapacity
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }

    for(var spawns in Game.spawns){
        var spawn = Game.spawns[spawns];
        spawner.run(spawn);
        //roomManager.run(spawn);
    }

};
