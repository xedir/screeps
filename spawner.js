var spawner = {

    /** @param {Creep} creep **/
    run: function(spawn) {

        lebendeHarvesterOne = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterSourceOne' && creep.ticksToLive > 50);
        builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.ticksToLive > 50);
        upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.ticksToLive > 50);
        rep = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.ticksToLive > 50);
        lebendeCarrysOne = _.filter(Game.creeps, (creep) => creep.memory.role == 'carry' && creep.ticksToLive > 50 && creep.memory.quelle == 'quelle1');


        //console.log(lebendeHarvesterOne);

        if(Game.spawns['Spawn1'].room.find(FIND_SOURCES).length > 1){
            lebendeHarvesterTwo = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterSourceTwo' && creep.ticksToLive > 50);
            lebendeCarrysTwo = _.filter(Game.creeps, (creep) => creep.memory.role == 'carry' && creep.ticksToLive > 50 && creep.memory.quelle == 'quelle2');
        }



        if(lebendeHarvesterOne.length < 2){
            var name = "Harvester1 " + Game.time.toString() ;
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, MOVE], name, {
                    memory: {role: 'harvesterSourceOne',
                    source: Game.getObjectById(Game.spawns['Spawn1'].memory.quelle1),
                    container: Game.getObjectById(Game.spawns['Spawn1'].memory.quelle1).pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
                    })}
            });
        } else if(lebendeCarrysOne.length < 2){
            var name = "Carry " + Game.time.toString();
            Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,CARRY,WORK,CARRY,CARRY,CARRY], name, {
                memory: {role: 'carry', carrying: false, quelle: 'quelle1'}
            });
        }else if(lebendeCarrysTwo.length < 3){
                var name = "Carry " + Game.time.toString();
                Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,WORK,CARRY,CARRY,CARRY], name, {
                    memory: {role: 'carry', carrying: false, quelle: 'quelle2'}
                });
        }else if(builders.length < 1){
            var name = "Builder " + Game.time.toString();
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], name, {
                memory: {role: 'builder'}
            });
        } else if (rep.length < 2){
            var name = "Repairer " + Game.time.toString();
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], name, {
                memory: {role: 'repairer'}
            });
        } else if(upgraders.length < 2){
            var name = "Upgrader " + Game.time.toString();
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, CARRY, MOVE], name, {
                memory: {role: 'upgrader'}
            });
        } else if (Game.spawns['Spawn1'].room.find(FIND_SOURCES).length > 1){
            if (lebendeHarvesterTwo.length < 2){
                var name = "Harvester2 " + Game.time.toString() ;
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE], name, {
                    memory: {role: 'harvesterSourceTwo',
                    source: Game.getObjectById(Game.spawns['Spawn1'].memory.quelle2),
                    container: Game.getObjectById(Game.spawns['Spawn1'].memory.quelle2).pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: (structure) => structure.structureType == STRUCTURE_CONTAINER
                    })}
                });
            }
        }

    }
};

module.exports = spawner;