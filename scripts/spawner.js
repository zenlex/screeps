//function to handle assessing current population and spawning accordingly

//Set Capacities

let spawnCaps = {
    harvesters: 4,
    harvesterMin: 2,
    builders: 3,
    upgraders: 3,
    repairers: 2,
}

const priorities = {
    harvest: 'HARVEST',
    build: 'BUILD',
    upgrade: 'UPGRADE'
}

let currPriority = harvest;

function setPriority(priority) {
    switch (priority) {
        case 'HARVEST':
            spawnCaps.harvesters = 5;
            spawnCaps.harvesterMin = 3;
            spawnCaps.builders = 2;
            spawnCaps.upgraders = 2;
            spawnCaps.repairers = 1;
            break;

        case 'BUILD':
            spawnCaps.harvesters = 3;
            spawnCaps.harvesterMin = 2;
            spawnCaps.builders = 5;
            spawnCaps.upgraders = 2;
            spawnCaps.repairers = 2;
            break;

        case 'UPGRADE':
            spawnCaps.harvesters = 3;
            spawnCaps.harvesterMin = 2;
            spawnCaps.builders = 2;
            spawnCaps.upgraders = 5;
            spawnCaps.repairers = 1;
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

        //check # of harverster creeps and spawn new basic harvester if less than 3
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);

        if (harvesters.length < spawnCaps.harvesters) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['HSSpawn'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'harvester' } });
        }
        //check # of builder creeps and spawn new basic builder if less than 3
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length);

        if (builders.length < spawnCaps.builders && harvesters.length > spawnCaps.harvesterMin) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['HSSpawn'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'builder' } });
        }
        //check # of upgrader creeps and spawn new basic upgrader if less than 3
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgraders.length);

        if (upgraders.length < spawnCaps.upgraders && harvesters.length > spawnCaps.harvesterMin) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new Upgrader: ' + newName);
            Game.spawns['HSSpawn'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'upgrader' } });
        }

        //check # of upgrader creeps and spawn new basic upgrader if less than 3
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        console.log('Repairers: ' + repairers.length);

        if (repairers.length < spawnCaps.repairers && harvesters.length > spawnCaps.harvesterMin) {
            var newName = 'Repairer' + Game.time;
            console.log('Spawning new Repairer: ' + newName);
            Game.spawns['HSSpawn'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'repairer' } });
        }



    }
}


module.exports = spawner;