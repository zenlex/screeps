var roleUpgrader = {

    //basic upgrader creep role function - takes creep from main loop as parameter
    run: function (creep) {
        //if they're upgrading and have run out of energy, switch to harvesting more        
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        //if they're not upgrading and are full on energy, switch to upgrading
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }
        //go upgrade the controller
        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        //go get more energy
        else {
            var sources = creep.room.find(FIND_STRUCTURES).filter(structure => (
                structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_STORAGE)
                && structure.store[RESOURCE_ENERGY] > 0);
            var source = creep.pos.findClosestByPath(sources);
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        }
    }
};

module.exports = roleUpgrader;