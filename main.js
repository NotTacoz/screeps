// ALL BODY PARTS COST
var MOVECOST = 50;
var WORKCOST = 100;
var CARRYCOST = 50;
var ATTACKCOST = 80;
var RANGED_ATTACKCOST = 150;
var HEALCOST = 250;
var TOUGHCOST = 10;
var CLAIMCOST = 600;

// ROLES
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var autoSpawn = require('autoSpawn');

var SpawnName = "Spawn1";

module.exports.loop = function() {
    if (Game.cpu.bucket >= 100) {
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

        // spawning creeps auto
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

        if (harvesters.length < 2) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'harvester' } });
        }
        if (upgraders.length < 2) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'upgrader' } });
        }
        if (builders.length < 2) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'builder' } });
        }

        if (Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y, { align: 'left', opacity: 0.8 });
        }

        // for each creeps assign a role
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
        }


        // Tower Defence Code
        var tower = Game.getObjectById('TOWER_ID');
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
                '🛠️' + spawningCreep.memory.role,
                Game.spawns[SpawnName].pos.x + 1,
                Game.spawns[SpawnName].pos.y, { align: 'left', opacity: 0.8 });
        }
    } else {
        console.log("CPU BUCKET EMPTY " + Game.cpu.bucket + "/100");
    }
};