//function to handle assessing current population and spawning accordingly

//Set Capacities

let spawnCaps = {
    harvesters: 2,
    harvesterMin: 2,
    builders: 3,
    upgraders: 3,
    repairers: 2,
    couriers: 4
}

const priorities = {
    0: 'BALANCED',
    1: 'HARVEST',
    2: 'BUILD',
    3: 'UPGRADE'
}

let currPriority = priorities[0];

function setPriority(priority) {
    switch (priority) {
        case 'BALANCED':
            spawnCaps.harvesters = 3;
            spawnCaps.harvesterMin = 2;
            spawnCaps.builders = 3;
            spawnCaps.upgraders = 3;
            spawnCaps.repairers = 2;
            spawnCaps.couriers = 3;
            break;

        case 'HARVEST':
            spawnCaps.harvesters = 4;
            spawnCaps.harvesterMin = 2;
            spawnCaps.builders = 1;
            spawnCaps.upgraders = 2;
            spawnCaps.repairers = 1;
            spawnCaps.couriers = 2;
            break;

        case 'BUILD':
            spawnCaps.harvesters = 3;
            spawnCaps.harvesterMin = 2;
            spawnCaps.builders = 4;
            spawnCaps.upgraders = 2;
            spawnCaps.repairers = 2;
            spawnCaps.couriers = 2;
            break;

        case 'UPGRADE':
            spawnCaps.harvesters = 3;
            spawnCaps.harvesterMin = 2;
            spawnCaps.builders = 1;
            spawnCaps.upgraders = 4;
            spawnCaps.repairers = 1;
            spawnCaps.couriers = 3;
    }
}



var spawner = {
    run: function () {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existent creep memory: ' + name);
            }
        }

        setPriority(currPriority);

        //check # of harverster creeps and spawn new basic harvester if needed
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length + ' out of ' + spawnCaps.harvesters);

        if (harvesters.length < spawnCaps.harvesters) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['HSSpawn'].spawnCreep([WORK, WORK, CARRY, MOVE], newName,
                { memory: { role: 'harvester' } });
        }
        //check # of courier creeps and spawn new basic courier if needed
        var couriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'courier');
        console.log('Couriers: ' + couriers.length + ' out of ' + spawnCaps.couriers);

        if (couriers.length < spawnCaps.couriers && harvesters.length > spawnCaps.harvesterMin) {
            var newName = 'Courier' + Game.time;
            console.log('Spawning new Courier: ' + newName);
            Game.spawns['HSSpawn'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'courier' } });
        }

        //check # of builder creeps and spawn new basic builder if needed
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length + ' out of ' + spawnCaps.builders);

        if (builders.length < spawnCaps.builders && harvesters.length > spawnCaps.harvesterMin && couriers.length >= spawnCaps.harvesterMin) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['HSSpawn'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'builder' } });
        }
        //check # of upgrader creeps and spawn new basic upgrader if needed
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgraders.length + ' out of ' + spawnCaps.upgraders);

        if (upgraders.length < spawnCaps.upgraders && harvesters.length > spawnCaps.harvesterMin && couriers.length >= spawnCaps.harvesterMin) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new Upgrader: ' + newName);
            Game.spawns['HSSpawn'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'upgrader' } });
        }

        //check # of repairer creeps and spawn new basic upgrader if needed
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        console.log('Repairers: ' + repairers.length + ' out of ' + spawnCaps.repairers);

        if (repairers.length < spawnCaps.repairers && harvesters.length > spawnCaps.harvesterMin && couriers.length >= spawnCaps.harvesterMin) {
            var newName = 'Repairer' + Game.time;
            console.log('Spawning new Repairer: ' + newName);
            Game.spawns['HSSpawn'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'repairer' } });
        }





    }
}


module.exports = spawner;