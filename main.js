var SpawnName = "Spawn1"; // IMPORTANT Spawn Name

// ALL BODY PARTS COST
var MOVECOST = 50;
var WORKCOST = 100;
var CARRYCOST = 50;
var ATTACKCOST = 80;
var RANGED_ATTACKCOST = 150;
var HEALCOST = 250;
var TOUGHCOST = 10;
var CLAIMCOST = 600;
// TODO: Currently, there are no uses for body parts variables, but in the future I plan to make it so
// that the code automatically determines how much body parts a creep needs.

// ROLES: Grabs other pieces of codes.
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function() { // infinite loop wow
    if (Game.cpu.bucket >= 100) { // if cpu bucket is more than 100: the minimum requirement for running the code, why? I dont know why are you asking me.
        // Infinite Pixels = Infinite Money!!!
        if (Game.cpu.bucket === 10000) { // if cpu bucket is full
            Game.cpu.generatePixel(); // generating pixel command
            console.log("Generating x1 Pixel..."); // logging "Generating x1 Pixel"
        }

        // Clearing Memory
        for (let name in Memory.creeps) {
            // and checking if the creep is still alive
            if (Game.creeps[name] == undefined) { // memory die i am so sad
                // if not, delete the memory entry
                delete Memory.creeps[name]; // delete memory yay
            }
        }

        // amazing auto spawning creeps totally origianl!!
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'); // gets all the harvesters
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'); // gets all the upgraders
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'); // gets all the builders
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'); // gets all the repairers

        if (harvesters.length < 4) { // if there are no more than 4 harvesters.
            var newName = 'Harvester' + Game.time; // setting a completely original name for the creep
            //console.log('Spawning new harvester: ' + newName); // console logging for utility in general
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'harvester' } }); // spawns the creep
        }
        if (upgraders.length < 4) { // if there are no more than 4 upgraders.
            var newName = 'Upgrader' + Game.time; // setting a completely original name for the creep
            //console.log('Spawning new upgrader: ' + newName); // console logging for utility in general
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'upgrader' } }); // spawns the creep
        }
        if (builders.length < 4) { // if there are no more than 4 builders.
            var newName = 'Builder' + Game.time; // setting a completely original name for the creep
            //console.log('Spawning new builder: ' + newName); // console logging for utility in general
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'builder' } }); // spawns the creep
        }
        if (repairers.length < 4) { // if there are no more than 4 repairers.
            var newName = 'Repairer' + Game.time; // setting a completely original name for the creep
            //console.log('Spawning new builder: ' + newName); // console logging for utility in general
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, { memory: { role: 'repairer' } }); // spawns the creep
        }

        // spawning visual text
        if (Game.spawns['Spawn1'].spawning) { // if Spawn1 is spawning anything
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name]; // spawning creep name
            Game.spawns['Spawn1'].room.visual.text( // creates a visual text
                '???????' + spawningCreep.memory.role, // emoji for asthetics
                Game.spawns['Spawn1'].pos.x + 1, // spawn creep
                Game.spawns['Spawn1'].pos.y, { align: 'left', opacity: 0.8 }); //spawn
        }

        // for each creeps assign a role
        for (var name in Game.creeps) { // role assign
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') { // harvester
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'upgrader') { //upgrader
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == 'builder') { //builder currently because nothing is being built
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == 'repairer') {
                roleUpgrader.run(creep); //nothing needs reapir so currently upgraders
            }
        }

        //for(var name in Game.rooms) {
        //    console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
        //}

        // Tower Defence Code
        var tower = Game.getObjectById('TOWER_ID'); // tower id
        if (tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if (closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        }

        if (Game.spawns[SpawnName].spawning) {
            var spawningCreep = Game.creeps[Game.spawns[SpawnName].spawning.name];
            Game.spawns[SpawnName].room.visual.text(
                '???????' + spawningCreep.memory.role,
                Game.spawns[SpawnName].pos.x + 1,
                Game.spawns[SpawnName].pos.y, { align: 'left', opacity: 0.8 });
        }
    } else {
        console.log("CPU BUCKET EMPTY " + Game.cpu.bucket + "/100"); // consoel log if cpu not enough
    }
}