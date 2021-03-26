var roleHarvester = { // role harvester

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.store.getFreeCapacity() > 0) { // is the creep full?
            var sources = creep.room.find(FIND_SOURCES); // find sources
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) { // try to harvest, if the source returns the not in range error then,
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } }); // move to source whilst drawing path
            }
        } else { // else
            var targets = creep.room.find(FIND_STRUCTURES, { // find structres
                filter: (structure) => { // if the structure is 
                    return (structure.structureType == STRUCTURE_EXTENSION || // extension
                            structure.structureType == STRUCTURE_SPAWN || // spawn
                            structure.structureType == STRUCTURE_TOWER) && // or tower
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0; // and these structures has to not be full
                }
            });
            if (targets.length > 0) { // if there are more then one targets
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { // fill
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } }); // yes
                }
            } else {
                // i want to add interchangable roles here
            }
        }
    }
};

module.exports = roleHarvester;