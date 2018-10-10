var spawner = {

    /** @param {Creep} creep **/
    run: function(spawn) {

        var ha1 = null;
        var ha2 = null;
        var builders = null;
        var upgraders = null;
        var rep = null;

        ha1 = _.filter(Game.creeps, (creep) => creep.memory.role == 'ha1' && creep.ticksToLive > 50);
        builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.ticksToLive > 50);
        upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.ticksToLive > 50);
        rep = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.ticksToLive > 50);



        var sources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
        console.log(sources[0].pos);

        if(sources.length > 1){
            ha2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'ha2' && creep.ticksToLive > 50);
        }

        console.log("Momentane Harvester1: " + ha1);
        console.log("Momentane Harvester2: " + ha2);
        console.log("Momentane Builder: " + builders);
        console.log("Momentane Upgrader: " + upgraders);
        console.log("Momentane Repairern: " + rep);

        if(ha1.length < 3){
            var name = "Harvester1 " + Game.time.toString() ;
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], name, {
                memory: {role: 'ha1', source: sources[0]}
            });
        } else if(builders.length < 3){
            var name = "Builder " + Game.time.toString();
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], name, {
                memory: {role: 'builder'}
            });
        } else if (rep.length > 1){
            var name = "Repairer " + Game.time.toString();
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], name, {
                memory: {role: 'repairer'}
            });
        } else if(upgraders.length < 3){
            var name = "Upgrader " + Game.time.toString();
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], name, {
                memory: {role: 'upgrader'}
            });
        } else if (sources.length > 1){
            if (ha2.length < 1){
                var name = "Harvester2 " + Game.time.toString() ;
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], name, {
                    memory: {role: 'ha2', source: sources[1]}
                });
            }
        }

    }
};

module.exports = spawner;