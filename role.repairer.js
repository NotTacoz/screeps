var roleRepairer = { // repairer script

    /** @param {Creep} creep **/
    run: function(creep) { // run code

        if (creep.memory.repairer && creep.store[RESOURCE_ENERGY] == 0) { // does it have 0 energy
            creep.memory.repairer = false; // variable set in order to differentiate harvest and repair mode
            creep.say('🔄 harvest'); // broadcast harvest
        }
        if (!creep.memory.repairer && creep.store.getFreeCapacity() == 0) { // is the energy full?
            creep.memory.repairer = true; // repair true moment
            creep.say('🔨 repair'); // broadcast repair
        }

        if (creep.memory.repairer) {
            var targets = creep.room.find(FIND_STRUCTURES, { filter: object => object.hits < (object.hitsMax / 4) });
            targets.sort((a, b) => a.hits - b.hits); // sorts targets by hp left
            if (targets.length > 0) { // if there are more then one target
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) { // try to repair, if it isnt in range then,
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#12b300' } }); //move to targets whilst drawing path
                }
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES); // find sources
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) { // try to harvest, if it's not in range,
                creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#12b300' } }) //move to source whilst drawing path
            }
        }
    }
};

module.exports = roleRepairer; // export the thingy