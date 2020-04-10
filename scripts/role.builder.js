var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧' +  'building');
	    }

	    if(creep.memory.building) {
            var conSites = creep.room.find(FIND_CONSTRUCTION_SITES);
             conSites.sort(function(a,b){return a.progress > b.progress ? -1 : 1});
            if (creep.build(conSites[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(conSites[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleBuilder;