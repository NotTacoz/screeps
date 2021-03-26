var roleBuilder = { // builder role poggers

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) { // if the creep is not empty
            creep.memory.building = false;
            creep.say('🔄 harvest'); // do the harvest thing and broadcast it
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) { // if the creep is full
            creep.memory.building = true;
            creep.say('🚧 build'); // do the building thing and broadcast it
        }

        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES); // find construction sitess
            //console.log("creep.build(targets[0])"); //temporary file lol
            if (targets.length > 0) { // more then one construction site
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) { // try to build
                    creep.moveTo(targets[0]), { visualizePathStyle: { stroke: '#ffffff' } };
                }
            } else if (creep.build(targets[0]) == ERR_INVALID_TARGET) {
                console.log("a");
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleBuilder;