var controlTower = {

    run: function () {
        //identify spawn(s) (upgrade this later to be a memory item iterator rather than a find each time to save CPU and handle multiple spawns/rooms)
        const mySpawn = Game.spawns['HSSpawn'];
        //identify towers I own in the room with the spawn (again upgrade to memory later on)
        const myTowers = mySpawn.room.find(FIND_MY_STRUCTURES).filter(structure => (structure.structureType == STRUCTURE_TOWER));

        if (myTowers.length > 0) {
            for (let tower of myTowers) {
                //heal any creeps

                for (creep in Game.creeps) {
                    if (creep.hits < creep.hitsMax) {
                        tower.heal(creep);
                    }
                }

                //attack any hostiles
                var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (target != undefined) {
                    tower.attack(target);
                }

                //repair structures if energy still above 50%
                if (tower.store.getFreeCapacity(RESOURCE_ENERGY) < tower.store.getCapacity(RESOURCE_ENERGY) / 2) {
                    //build array of all damaged structures
                    const repairTargs = tower.room.find(FIND_STRUCTURES, { filter: object => object.hits < object.hitsMax });
                    //sort by lowest hits
                    repairTargs.sort((a, b) => a.hits - b.hits);
                    //if anything to repair, do the repair
                    if (repairTargs.length > 0) {
                        tower.repair(repairTargs[0]);
                    }

                }
            }
        }
    }
};

module.exports = controlTower;
