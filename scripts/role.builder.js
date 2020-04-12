//basic function for creeps with memory.role = builder
var roleBuilder = {

    //take creep passed from main loop as function parameter
    run: function (creep) {
        //check if creep is currently building and is out of energy, if so send it to harvest more energy and set building flag to false   
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }

        //if creep is full of energy and isn't building, send it off to build    
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧' + 'building');
        }

        //if creep is supposed to be building, find all available construction sites in the room, sort by progress, and send it to work on the least completed one
        if (creep.memory.building) {
            var conSites = creep.room.find(FIND_CONSTRUCTION_SITES);
            conSites.sort(function (a, b) { return a.progress > b.progress ? -1 : 1 });
            if (creep.build(conSites[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(conSites[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        //if they need more energy send them to the second source in the room (sources[0] prioritized for harvesters and upgraders - adjust based on room layout)
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleBuilder;