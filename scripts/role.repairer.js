//basic function for creeps with memory.role = builder
var roleRepairer = {

    //take creep passed from main loop as function parameter
    run: function (creep) {
        //check if creep is currently repairing and is out of energy, if so send it to harvest more energy and set building flag to false   
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }

        //if creep is full of energy and isn't repairing, send it off to build    
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🚧' + 'repairing');
        }

        //if creep is supposed to be building, find all available construction sites in the room, sort by progress, and send it to work on the least completed one
        if (creep.memory.repairing) {
            var repairTargs = creep.room.find(FIND_STRUCTURES, { filter: object => object.hits < object.hitsMax });
            //sort by lowest hits
            repairTargs.sort((a, b) => a.hits - b.hits);
            //if anything to repair, do the repair
            if (repairTargs.length > 0) {
                if (creep.repair(repairTargs[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTargs[0], { visualizePathStyle: { stroke: '#eeeeee' } })
                }
            }
        }

        //if they need more energy send them to the second source in the room (sources[0] prioritized for harvesters and upgraders - adjust based on room layout)
        else {
            var sources = creep.room.find(FIND_STRUCTURES).filter(structure => (
                structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_STORAGE)
                && structure.store[RESOURCE_ENERGY] > 0);
            var source = creep.pos.findClosestByPath(sources)
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        }
    }
};

module.exports = roleRepairer;