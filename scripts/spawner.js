//function to handle assessing current population and spawning accordingly

//Store all available energy sources and mineral deposits in memory
var sources = Game.spawns.HSSpawn.room.find(FIND_SOURCES);
Game.spawns.HSSpawn.memory.sources = sources;
var mines = Game.spawns.HSSpawn.room.find(FIND_MINERALS);
Game.spawns.HSSpawn.memory.mines = mines;

//console logging switch for creep type counts
const INVENTORY = true;
//Set Capacities

let spawnCaps = {
  harvesterMin: 2,
  builders: 3,
  upgraders: 3,
  repairers: 2,
  couriers: 4,
};

const priorities = {
  0: "BALANCED",
  1: "HARVEST",
  2: "BUILD",
  3: "UPGRADE",
};

let currPriority = priorities[1];

function setPriority(priority) {
  switch (priority) {
    case "BALANCED":
      spawnCaps.builders = 3;
      spawnCaps.upgraders = 3;
      spawnCaps.repairers = 1;
      spawnCaps.couriers = 2;
      break;

    case "HARVEST":
      spawnCaps.builders = 1;
      spawnCaps.upgraders = 2;
      spawnCaps.repairers = 1;
      spawnCaps.couriers = 2;
      break;

    case "BUILD":
      spawnCaps.builders = 6;
      spawnCaps.upgraders = 2;
      spawnCaps.repairers = 2;
      spawnCaps.couriers = 2;
      break;

    case "UPGRADE":
      spawnCaps.builders = 2;
      spawnCaps.upgraders = 4;
      spawnCaps.repairers = 1;
      spawnCaps.couriers = 2;
  }
}

var spawner = {
  run: function () {
    for (var name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        if (INVENTORY) {
          console.log("Clearing non-existent creep memory: " + name);
        }
      }
    }

    setPriority(currPriority);
    const harvesterCaps = {
      0: 2,
      1: 0,
    };

    const bigHarvesterCaps = {
      0: 0,
      1: 1,
    };
    //check array of energy sources and make sure each one has an assigned harvester
    for (let sourceInd in Game.spawns.HSSpawn.memory.sources) {
      var myHarvester = _.filter(
        Game.creeps,
        (creep) =>
          creep.memory.sourceId === sourceInd &&
          creep.memory.role === "harvester"
      );
      if (myHarvester.length < harvesterCaps[sourceInd]) {
        var newName = "Harvester" + Game.time;
        Game.spawns.HSSpawn.spawnCreep(
          [WORK, WORK, WORK, WORK, CARRY, MOVE],
          newName,
          { memory: { role: "harvester", sourceId: sourceInd } }
        );
        console.log(
          "Spawning new harvester: " +
            newName +
            "assigned to source: " +
            sourceInd
        );
      }
    }
    for (let sourceInd in Game.spawns.HSSpawn.memory.sources) {
      var bigHarvester = _.filter(
        Game.creeps,
        (creep) =>
          creep.memory.sourceId === sourceInd &&
          creep.memory.role === "bigHarvester"
      );
      if (bigHarvester.length < bigHarvesterCaps[sourceInd]) {
        var newName = "BigHarvester" + Game.time;
        Game.spawns.HSSpawn.spawnCreep(
          [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE],
          newName,
          { memory: { role: "bigHarvester", sourceId: sourceInd } }
        );
        console.log(
          "Spawning new BigHarvester: " +
            newName +
            "assigned to source: " +
            sourceInd
        );
      }
    }
    var harvesters = _.filter(
      Game.creeps,
      (creep) =>
        creep.memory.role == "harvester" || creep.memory.role == "bigHarvester"
    );
    if (INVENTORY) {
      console.log("Harvesters = " + harvesters);
    }
    //check # of courier creeps and spawn new basic courier if needed
    var couriers = _.filter(
      Game.creeps,
      (creep) => creep.memory.role == "courier"
    );
    if (INVENTORY) {
      console.log(
        "Couriers: " + couriers.length + " out of " + spawnCaps.couriers
      );
    }

    if (
      couriers.length < spawnCaps.couriers &&
      harvesters.length > spawnCaps.harvesterMin
    ) {
      var newName = "Courier" + Game.time;
      console.log("Spawning new Courier: " + newName);
      Game.spawns["HSSpawn"].spawnCreep(
        [WORK, CARRY, CARRY, MOVE, MOVE],
        newName,
        { memory: { role: "courier" } }
      );
    }

    //check # of builder creeps and spawn new basic builder if needed
    var builders = _.filter(
      Game.creeps,
      (creep) => creep.memory.role == "builder"
    );
    if (INVENTORY) {
      console.log(
        "Builders: " + builders.length + " out of " + spawnCaps.builders
      );
    }

    if (
      builders.length < spawnCaps.builders &&
      harvesters.length > spawnCaps.harvesterMin &&
      couriers.length >= spawnCaps.harvesterMin
    ) {
      var newName = "Builder" + Game.time;
      console.log("Spawning new builder: " + newName);
      Game.spawns["HSSpawn"].spawnCreep([WORK, CARRY, MOVE], newName, {
        memory: { role: "builder" },
      });
    }
    //check # of upgrader creeps and spawn new basic upgrader if needed
    var upgraders = _.filter(
      Game.creeps,
      (creep) => creep.memory.role == "upgrader"
    );
    if (INVENTORY) {
      console.log(
        "Upgraders: " + upgraders.length + " out of " + spawnCaps.upgraders
      );
    }

    if (
      upgraders.length < spawnCaps.upgraders &&
      harvesters.length > spawnCaps.harvesterMin &&
      couriers.length >= spawnCaps.harvesterMin
    ) {
      var newName = "Upgrader" + Game.time;
      console.log("Spawning new Upgrader: " + newName);
      Game.spawns["HSSpawn"].spawnCreep([WORK, CARRY, MOVE], newName, {
        memory: { role: "upgrader" },
      });
    }

    //check # of repairer creeps and spawn new basic upgrader if needed
    var repairers = _.filter(
      Game.creeps,
      (creep) => creep.memory.role == "repairer"
    );
    if (INVENTORY) {
      console.log(
        "Repairers: " + repairers.length + " out of " + spawnCaps.repairers
      );
    }

    if (
      repairers.length < spawnCaps.repairers &&
      harvesters.length > spawnCaps.harvesterMin &&
      couriers.length >= spawnCaps.harvesterMin
    ) {
      var newName = "Repairer" + Game.time;
      console.log("Spawning new Repairer: " + newName);
      Game.spawns["HSSpawn"].spawnCreep([WORK, CARRY, MOVE], newName, {
        memory: { role: "repairer" },
      });
    }

    //store all available links in memory
    const sendLinkIds = ["5ea1a3adfddc012f0fd75ee7"];
    const recLinkIds = ["5edc0464479845867bfb35d5", "5edc1802b1cef77cef4fa563"];

    //check array of sender links and make sure each one has an assigned harvester
    for (var linkInd of sendLinkIds) {
      var myLinkRunners = _.filter(
        Game.creeps,
        (creep) => creep.memory.linkId == linkInd
      );
      if (myLinkRunners.length < 2) {
        var newName = "LinkSender" + Game.time;
        Game.spawns.HSSpawn.spawnCreep([WORK, CARRY, MOVE], newName, {
          memory: {
            role: "linkSender",
            linkId: linkInd,
            targetLinks: recLinkIds,
          },
        });
        console.log(
          "Spawning new linkRunner: " +
            newName +
            "assigned to link: " +
            linkInd,
          "with target: ",
          recLinkIds[0]
        );
      }
    }

    //check array of reciever links and make sure each one has an assigned harvester
    for (var linkInd of recLinkIds) {
      var myLinkRunners = _.filter(
        Game.creeps,
        (creep) => creep.memory.linkId == linkInd
      );
      if (myLinkRunners.length < 1) {
        var newName = "LinkReciever" + Game.time;
        Game.spawns.HSSpawn.spawnCreep([WORK, CARRY, MOVE], newName, {
          memory: { role: "linkReciever", linkId: linkInd },
        });
        console.log(
          "Spawning new linkRunner: " + newName + "assigned to link: " + linkInd
        );
      }
    }
    //miner code
    for (let mineInd in Game.spawns.HSSpawn.memory.mines) {
      var myMiner = _.filter(
        Game.creeps,
        (creep) =>
          creep.memory.mineId === mineInd && creep.memory.role === "miner"
      );
      if (myMiner.length < 1) {
        var newName = "Miner" + Game.time;
        Game.spawns.HSSpawn.spawnCreep(
          [WORK, WORK, WORK, WORK, CARRY, MOVE],
          newName,
          { memory: { role: "miner", mineId: mineInd, labId: mineInd } }
        );
        console.log(
          "Spawning new Miner: " + newName + "assigned to mine: " + mineInd
        );
      }
    }
  }, //end run
}; //end spawner var

module.exports = spawner;
