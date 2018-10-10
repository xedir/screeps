var spawner = {

    /** @param {Creep} creep **/
    run: function(spawn) {

        var ha1 = null;
        var ha2 = null;
        var builders = null;
        var upgraders = null;

        ha1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'ha1' && creep.ticksToLive > 50);
        builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.ticksToLive > 50);
        upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.ticksToLive > 50);

        console.log("Momentane Harvester: " + harvesters);
        console.log("Momentane Builder: " + builders);
        console.log("Momentane Upgrader: " + upgraders);

        var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
        console.log(sources[0].pos);

        if(sources.length > 1){
            ha2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'ha2' && creep.ticksToLive > 50);
        }



        if(ha1.length < 3){
            var name = "Harvester1 " + Game.time.toString() ;
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], name, {
                memory: {role: 'ha1', source: sources[0]}
            });
        } else if (sources.length > 1){
            if (ha2.length < 3){
                var name = "Harvester2 " + Game.time.toString() ;
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], name, {
                    memory: {role: 'ha2', source: sources[1]}
                });
            }
        }
        else if(builders.length < 3){
            var name = "Builder " + Game.time.toString();
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], name, {
                memory: {role: 'builder'}
            });
        } else if(upgraders.length < 2){
            var name = "Upgrader " + Game.time.toString();
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], name, {
                memory: {role: 'upgrader'}
            });
        }
    }
};

module.exports = spawner;