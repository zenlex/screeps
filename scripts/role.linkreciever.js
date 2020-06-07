var roleLinkReciever = {
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
      creep.say("🔄 unloading");
    }
    //for transferring, find all relevant structure types that have available storage capacity
    /* ****NEEDS UPDATING WITH NEW STRUCTURE TYPES AS COLONY EVOLVES***** */
    if (creep.memory.loading == false) {
      var targets = creep.room
        .find(FIND_STRUCTURES)
        .filter(
          (structure) =>
            structure.structureType == STRUCTURE_TOWER &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      //if there's at least one available target for transfer, go to the closest one in the list
      if (targets.length > 0) {
        var target = creep.pos.findClosestByPath(targets);
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
    }
    //if switch is set to loading, find available sources, go to the first one in the array
    else {
      //console.log('Info for creep: ', creep)
      //console.log('Creep linkID in memory=', creep.memory.linkId)
      /*if (creep.memory.linkId == undefined) {
                creep.memory.linkId = '5ea16a62c1e5724d0034f96a'
            }*/
      var sourceLink = Game.getObjectById(creep.memory.linkId);
      //console.log('sourceLink = ', sourceLink)
      if (sourceLink.store[RESOURCE_ENERGY] > 0) {
        if (creep.withdraw(sourceLink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sourceLink);
        }
      }
    }
  },
};

module.exports = roleLinkReciever;
