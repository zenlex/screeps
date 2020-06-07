var roleLinkSender = {
  //basic courier creep functionality - takes creep object as parameter from main loop
  run: function (creep) {
    //if creep is transferring and has transferred all energy, set loading flag to true
    if (!creep.memory.loading && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.loading = true;
      creep.say("🔄 loading");
    }
    //if creep is loading and is full, switch to transferring
    if (creep.memory.loading && creep.store.getFreeCapacity() == 0) {
      creep.memory.loading = false;
      creep.say("🔄 sending");
    }
    //for transferring, find all relevant structure types that have available storage capacity
    /* ****NEEDS UPDATING WITH NEW STRUCTURE TYPES AS COLONY EVOLVES***** */
    var sender = Game.getObjectById(creep.memory.linkId);
    if (creep.memory.loading == false) {
      if (creep.transfer(sender, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sender, { visualizePathStyle: { stroke: "#ffffff" } });
      }

      var targets = creep.room
        .find(FIND_STRUCTURES)
        .filter(
          (structure) =>
            structure.structureType == STRUCTURE_LINK &&
            structure.id != creep.memory.linkId
        );
      if (targets.length > 0) {
        targets.sort((a, b) => a.store.energy - b.store.energy);
      }
      if (
        Game.getObjectById(creep.memory.linkId).store.getFreeCapacity(
          RESOURCE_ENERGY
        ) == 0
      ) {
        sender.transferEnergy(targets[0]);
      }
    }
    //if switch is set to loading, find available sources, go to the first one in the array
    else {
      var sources = creep.room
        .find(FIND_STRUCTURES)
        .filter(
          (structure) =>
            (structure.structureType == STRUCTURE_CONTAINER ||
              structure.structureType == STRUCTURE_STORAGE) &&
            structure.store[RESOURCE_ENERGY] > 0
        );
      if (sources.length == 0) {
        sources = creep.room.find(FIND_SOURCES_ACTIVE);
      }
      var source = creep.pos.findClosestByPath(sources);
      if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  },
};

module.exports = roleLinkSender;
