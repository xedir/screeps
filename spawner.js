var spawner = {

    /** @param {Creep} creep **/
    run: function(spawn) {

        var roomSpawnEnergy = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType === STRUCTURE_SPAWN
        }).length * 300;

        var roomExtensionEnergy = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType === STRUCTURE_EXTENSION
        }).length * 50;

        var roomMaxSpawnEnergy =  roomSpawnEnergy + roomExtensionEnergy;


        var lebendeHarvesterOne = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvesterSourceOne' && creep.ticksToLive > 50);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder' && creep.ticksToLive > 50);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader' && creep.ticksToLive > 50);
        var rep = _.filter(Game.creeps, (creep) => creep.memory.role === 'repairer' && creep.ticksToLive > 50);
        var lebendeCarrysOne = _.filter(Game.creeps, (creep) => creep.memory.role === 'carry' && creep.ticksToLive > 150 && creep.memory.quelle === 'quelle1');




        //console.log(lebendeHarvesterOne);

        if(Game.spawns['Spawn1'].room.find(FIND_SOURCES).length > 1){
            lebendeHarvesterTwo = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvesterSourceTwo' && creep.ticksToLive > 70);
            lebendeCarrysTwo = _.filter(Game.creeps, (creep) => creep.memory.role === 'carry' && creep.ticksToLive > 50 && creep.memory.quelle === 'quelle2');
            var lebendeHarvesterTwoDebugText = 'HarvesterTwo: ' + lebendeHarvesterTwo.length + '  ';
            var lebendeCarrysTwoDebugText = 'CarrysTwo: ' + lebendeCarrysTwo.length + '  ';
        }

        console.log('HarvesterOne: ' + lebendeHarvesterOne.length + '  '
                    + lebendeHarvesterTwoDebugText
                    + 'Builder : ' + builders.length + '  '
                    + 'Upgraders: ' + upgraders.length + '  '
                    + 'CarrysOne: ' + lebendeCarrysOne.length + '  '
                    +   lebendeCarrysTwoDebugText +
                    'Reps: ' + rep.length
        );

        if(lebendeHarvesterOne.length < 1){
            var name = "Harvester1 " + Game.time.toString() ;
            Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY], name, {
                    memory: {role: 'harvesterSourceOne',
                    source: Game.getObjectById(Game.spawns['Spawn1'].memory.quelle1),
                    container: Game.getObjectById(Game.spawns['Spawn1'].memory.quelle1).pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: (structure) => structure.structureType === STRUCTURE_CONTAINER
                    })}
            });
        } else if(lebendeCarrysOne.length < 1){
            var name = "Carry " + Game.time.toString();
            Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], name, {
                memory: {role: 'carry', carrying: false, quelle: 'quelle1'}
            });
        }else if(lebendeCarrysTwo.length < 2){
                var name = "Carry " + Game.time.toString();
                Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], name, {
                    memory: {role: 'carry', carrying: false, quelle: 'quelle2'}
                });
        }else if(builders.length < 1){
            var name = "Builder " + Game.time.toString();
            Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY], name, {
                memory: {role: 'builder'}
            });
        } else if (rep.length < 2){
            var name = "Repairer " + Game.time.toString();
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], name, {
                memory: {role: 'repairer', repairJobId: 'undefined'}
            });
        } else if(upgraders.length < 3){
            var name = "Upgrader " + Game.time.toString();
            Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY], name, {
                memory: {role: 'upgrader'}
            });
        } else if (Game.spawns['Spawn1'].room.find(FIND_SOURCES).length > 1){
            if (lebendeHarvesterTwo.length < 1){
                var name = "Harvester2 " + Game.time.toString() ;
                Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,CARRY], name, {
                    memory: {role: 'harvesterSourceTwo',
                    source: Game.getObjectById(Game.spawns['Spawn1'].memory.quelle2),
                    container: Game.getObjectById(Game.spawns['Spawn1'].memory.quelle2).pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: (structure) => structure.structureType === STRUCTURE_CONTAINER
                    })}
                });
            }
        }

    }
};

module.exports = spawner;