var roleMiner = {
  //basic mining creep functionality - takes creep object as parameter from main loop
  run: function (creep) {
    //if creep is transferring and has transferred all energy, set mining flag to true
    if (!creep.memory.mining && creep.store[RESOURCE_HYDROGEN] == 0) {
      creep.memory.mining = true;
      creep.say("🔄 mine");
    }
    //if creep is mining and is full, switch to transferring
    if (creep.memory.mining && creep.store.getFreeCapacity() == 0) {
      creep.memory.mining = false;
      creep.say("transferring");
    }
    //for transferring, find all relevant structure types that have available storage capacity
    if (creep.memory.mining == false) {
      //storage options - rebuild this when 2nd type added to use object to store mines by mineral type
      var labIDs = ["5ec6a2fe9ea8d7fb60979664"];
      var storageIDs = ["5e92f5042877541117f47bd6"];
      //transfer hydrogen to the hydrogen lab
      var target = Game.getObjectById(labIDs[0]);
      //if hydrogen lab is full put it in storage;
      if (target.store.getFreeCapacity(RESOURCE_HYDROGEN) < 50) {
        target = Game.getObjectById(storageIDs[0]);
      }
      if (creep.transfer(target, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }

    //if switch is set to mine, find available sources, go to the first one in the array
    else {
      var sources = creep.room.find(FIND_MINERALS);
      var source = sources[creep.memory.mineId];
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  },
};

module.exports = roleMiner;
