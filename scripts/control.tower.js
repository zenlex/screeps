var controlTower = {

    run: function () {
        //identify spawn(s) (upgrade this later to be a memory item iterator rather than a find each time to save CPU and handle multiple spawns/rooms)
        const mySpawn = Game.spawns['HSSpawn'];
        //identify towers I own in the room with the spawn (again upgrade to memory later on)
        const myTowers = mySpawn.room.find(FIND_MY_STRUCTURES).filter(structure => (structure.structureType == STRUCTURE_TOWER));

        //attack any hostiles
        for (let tower of myTowers) {
            var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target != undefined) {
                tower.attack(target);
            }
        }
        //heal any creeps

        //repair structures
    }
};

module.exports = controlTower;
