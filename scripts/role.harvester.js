var roleHarvester = {

    //basic harvesting creep functionality - takes creep object as parameter from main loop
    run: function (creep) {
        //if creep is transferring and has transferred all energy, set harvesting flag to true
        if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
            creep.say('🔄 harvest');
        }
        //if creep is harvesting and is full, switch to transferring
        if (creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
            creep.memory.harvesting = false;
            creep.say('transferring');
        }
        //for transferring, find all relevant structure types that have available storage capacity
        /* ****NEEDS UPDATING WITH NEW STRUCTURE TYPES AS COLONY EVOLVES***** */
        if (creep.memory.harvesting == false) {
            var targets = creep.room.find(FIND_STRUCTURES).filter(structure => (
                structure.structureType == STRUCTURE_STORAGE
                || structure.structureType == STRUCTURE_CONTAINER)
                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            );
            //if there's at least one available target for transfer, go to the first one in the list
            if (targets.length > 0) {
                var target = creep.pos.findClosestByRange(targets)
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        //if switch is set to harvest, find available sources, go to the first one in the array
        else {
            var sources = creep.room.find(FIND_SOURCES)
            var source = creep.pos.findClosestByRange(sources)
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0])
            }
        }
    }
}

module.exports = roleHarvester;