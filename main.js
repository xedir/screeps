var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawner = require('spawner');
var roleRepairer = require('role.repairer');
// var roleCarry = require('role.carry');

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



    if(Game.spawns['Spawn1'].memory.init == false){
        Game.spawns['Spawn1'].memory.quelle1 = Game.spawns['Spawn1'].room.find(FIND_SOURCES[0]).id;
        Game.spawns['Spawn1'].memory.quelle2 = false;

        console.log(Game.spawns['Spawn1'].room.find(FIND_SOURCES[0]).id);

        if(Game.spawns['Spawn1'].room.find(FIND_SOURCES).length > 1){
            Game.spawns['Spawn1'].memory.quelle2 = Game.spawns['Spawn1'].room.find(FIND_SOURCES[1]).id;
        }
        Game.spawns['Spawn1'].memory.init = true;
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'ha1' || creep.memory.role == "ha2") {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        /* if(creep.memory.role == 'carry'){
            roleCarry.run(creep);
        } */
    }

    for(var spawns in Game.spawns){
        var spawn = Game.spawns[spawns];
        spawner.run(spawn);
    }
};
