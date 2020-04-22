'use strict';
const Discord = require('discord.js');
const fs = require('fs');

//DISCORD CLIENT:
const client = new Discord.Client({partials: ['MESSAGE', 'REACTION']});

//JSON DATA:
const sharedData = JSON.parse(fs.readFileSync("../private/shared_data.json"));
const TOKEN = sharedData.TOKEN;

//CONSTANT IDS:
const betaRoleID = '700995685348016130';
const devRoleID = '702055729284251708';
const reactMessageID = '702066087008927776';
const guildID = '700994553636978749';
const agents = ['Breach', 'Brimstone', 'Cypher', 'Jett', 'Omen', 'Phoeinx', 'Raze', 'Sage', 'Sova', 'Viper'];

client.on('guildCreate', (guild) => {
    if (guild.id !== guildID) {
        guild.systemChannel.send("Sorry, this Discord bot is only meant for PlayValorant DK. Please contact Phoenix#2855 for more information");
        console.warn("Bot joined another Guild: " + guild.id);
        guild.leave();
    }
});

client.on('guildMemberAdd', (member) => {
    member.roles.add(betaRoleID);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    var guild = newState.guild;
    if (guild.id === guildID) {
        var emptyRooms = [];
        var biggestIndex = 0;

        guild.channels.cache.each((channel,id) => {
            if (typeof channel !== 'undefined' && typeof channel.name !== 'undefined') {
                if (channel.name.startsWith("Flex #")) {
                    if(channel.members.array().length === 0) {
                        emptyRooms.push(channel);
                    }
                    
                    biggestIndex = Math.max(parseInt(channel.name.slice(6)), biggestIndex);
                }
            }
        });

        emptyRooms.sort((a, b) => a.name.localeCompare(b.name));
        
        if (emptyRooms.length === 0) {
            guild.channels.create("Flex #" + (biggestIndex + 1), {
                type: 'voice',
                userLimit: 5,
                parent: '700995169708933131',
                position: biggestIndex + 1,
                reason: 'All rooms filled'
            })
        }
    
        while(emptyRooms.length > 1) {
            var emptyRoom = emptyRooms.pop();
            emptyRoom.delete();
        }
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.id === reactMessageID) {
        if(reaction.partial) {
            try {
                await reaction.fetch();
            } catch {
                console.log("Couldn't Fetch Message: ", error);
                return;
            }
        }

        var roleID = getRoleIDFromName(reaction.emoji.name);

        if (roleID != '') reaction.emoji.guild.member(user).roles.add(roleID);
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.id === reactMessageID) {
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch {
                console.log("Couldn't Fetch Message: ", error);
                return; 
            }
        }

        var roleID = getRoleIDFromName(reaction.emoji.name);
        if (roleID != '') reaction.emoji.guild.member(user).roles.remove(roleID);
    }
});

client.on('message', (msg) => {
    if (msg.content.startsWith('v!')) {
        var args = msg.content.split(" ");
        var command = args[0]; args.splice(0, 1);

        if (command === 'v!commands') commands(msg);
        if (command === 'v!random') randomAgent(msg);
    }
});

//UTILITY FUNCTIONS
function checkForDevPermission(guildMember) {
    guildMember.roles.cache.some(key => key === devRoleID);
}

function getRoleIDFromName(name) {
    var roleID = '';
    if (name === 'Breach') roleID = '701476915692699788';
    if (name === 'Brimstone') roleID = '701743884652380210';
    if (name === 'Cypher') roleID = '701747485147791412';
    if (name === 'Jett') roleID = '701013336938250380';
    if (name === 'Omen') roleID = '701049760789823558';
    if (name === 'Phoenix') roleID = '701001111691198504';
    if (name === 'Raze') roleID = '701477304525783159';
    if (name === 'Sage') roleID = '700996339517096056';
    if (name === 'Sova') roleID = '701494886419136522';
    if (name === 'Viper') roleID = '701001201596104754';
    return roleID;
}

//COMMANDS
function commands(msg) {
    msg.channel.send(
        "**VALOR'S COMMANDS**:\n" +
        "v!commands - liste over alle commands.\n" +
        "v!random - en random agent til dem, der ikke ved, hvad de skal spille.");
}

function randomAgent(msg) {
    const random = Math.floor(Math.random() * agents.length);
    msg.reply("you should play: **" + agents[random] + "**");
}

//LOGIN
client.login(TOKEN);
console.log("CONNECTED");