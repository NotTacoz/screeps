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

var SpawnName = "Tacoz";

module.exports.loop = function() {
    if (Game.cpu.bucket >= 100) {
        // Infinite Pixels = Infinite Money!!!
        if (Game.cpu.bucket === 10000) {
            Game.cpu.generatePixel();
            console.log("Generating x1 Pixel...");
        }

        // Clearing Memory
        for (let name in Memory.creeps) {
            // and checking if the creep is still alive
            if (Game.creeps[name] == undefined) {
                // if not, delete the memory entry
                delete Memory.creeps[name];
            }
        }
        // for each creeps
        for (let name in Game.creeps) {
            // run creep logic
            Game.creeps[name].runRole();
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