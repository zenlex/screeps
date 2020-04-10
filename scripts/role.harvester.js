var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
            creep.say('🔄 harvest');
	    }
	    if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
	        creep.memory.harvesting = false;
	        creep.say('transferring');
	    }

	    if(creep.memory.harvesting == false) {
            var targets = creep.room.find(FIND_STRUCTURES).filter(structure => (
                    structure.structureType == STRUCTURE_EXTENSION 
                    || structure.structureType == STRUCTURE_SPAWN 
                    || structure.structureType == STRUCTURE_STORAGE
                    || structure.structureType == STRUCTURE_TOWER) 
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    );
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
        else{
            var sources = creep.room.find(FIND_SOURCES)
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources[0])
            }
        }
    }   
}

module.exports = roleHarvester;