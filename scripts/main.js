//starter code v1.1 - tutorial with some additional basic functionality

var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer");
var roleCourier = require("role.courier");
var roleLinkSender = require("role.linksender");
var roleLinkReciever = require("role.linkreciever");
var roleMiner = require("role.miner");
var controlTower = require("control.tower");
var spawner = require("spawner");

module.exports.loop = function () {
  //temporary safemode catastrophy failsafe during defense development....
  const mySpawn = Game.spawns["HSSpawn"];
  if (mySpawn.hits < mySpawn.hitsMax / 2) {
    mySpawn.room.controller.activateSafeMode();
  }
  //remove above code to fallback in defense module if all else fails once basic defense module developed

  //call spawner function to check for new creep needs and spawn accordingly
  spawner.run();

  //call roll function modules for each existing creep based on role assignment in memory
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (
      creep.memory.role == "harvester" ||
      creep.memory.role == "bigHarvester"
    ) {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    }
    if (creep.memory.role == "repairer") {
      roleRepairer.run(creep);
    }
    if (creep.memory.role == "courier") {
      roleCourier.run(creep);
    }
    var myTowers = Game.spawns.HSSpawn.room
      .find(FIND_MY_STRUCTURES)
      .filter((structure) => structure.structureType == STRUCTURE_TOWER);
    var towernrg = 0;
    for (let tower of myTowers) {
      console.log("Tower = ", tower);
      towernrg += tower.store[RESOURCE_ENERGY];
    }
    if (myTowers.length > 1) {
      towernrg /= myTowers.length;
    }
    console.log("towernrg = ", towernrg);
    console.log("# of towers = ", myTowers.length);
    if (myTowers.length > 0 && towernrg < 700) {
      if (creep.memory.role == "linkSender") {
        roleLinkSender.run(creep);
      }
      if (creep.memory.role == "linkReciever") {
        roleLinkReciever.run(creep);
      }
    }
    if (creep.memory.role == "miner") {
      roleMiner.run(creep);
    }
  }
  //trigger towers
  controlTower.run();
};
