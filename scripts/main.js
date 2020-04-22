//starter code v1.1 - tutorial with some additional basic functionality

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer')
var controlTower = require('control.tower');
var spawner = require('spawner')

module.exports.loop = function () {

    //temporary safemode catastrophy failsafe during defense development....
    const mySpawn = Game.spawns['HSSpawn'];
    if (mySpawn.hits < mySpawn.hitsMax / 2) {
        mySpawn.room.controller.activateSafeMode();
    }
    //remove above code to fallback in defense module if all else fails once basic defense module developed

    //call spawner function to check for new creep needs and spawn accordingly
    spawner.run();

    //call roll function modules for each existing creep based on role assignment in memory
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep)
        }

    }
    //trigger towers
    controlTower.run();
}
