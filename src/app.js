'use strict';

import * as EmbeddedMessages from "./EmbeddedMessages.js";

import { Client, MessageAttachment } from 'discord.js';
import fs from 'fs';

//const { Client, MessageAttachment } = module.createRequire('discord.js');
//const fs = module.createRequire('fs');

//DISCORD CLIENT:
const client = new Client({partials: ['MESSAGE', 'REACTION']});

//JSON DATA:
const sharedData = JSON.parse(fs.readFileSync("../private/shared_data.json"));
const TOKEN = sharedData.TOKEN;

//CONSTANT IDS:
const betaRoleID = '700995685348016130';
const memberDefaultRoleID = '702661151858622464';
const developerRoleID = '702055729284251708';
const reactMessageID = '702960373615296683';
const guildID = '700994553636978749';

//CONSTANT VARIABLES
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
    member.roles.add(memberDefaultRoleID);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    const guild = newState.guild;
    if (guild.id === guildID) {
        fillRooms(guild);
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (!user.bot) addMainByEmote(reaction, user);
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (!user.bot) removeMainByEmote(reaction, user);
});

client.on('message', (msg) => {
    if (msg.content.startsWith('v!') && !msg.author.bot) {
        let args = msg.content.toLowerCase().split(" ");
        const command = args[0]; args.splice(0, 1);

        if (command === 'v!commands') commands(msg);
        if (command === 'v!random') randomAgent(msg);
        if (command === 'v!map') sendMap(msg, args);
        if (command === 'v!setup') setup(msg, args);
    }
});

//UTILITY FUNCTIONS
function checkForDeveloper(guildMember) {
    return guildMember.roles.cache.some(role => role.id === developerRoleID);
}

function getRoleIDFromName(name) {
    let roleID = '';
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

//COMMON COMMANDS
function commands(msg) {
    msg.channel.send(
        "**VALOR'S COMMANDS**:\n" +
        "v!commands - liste over alle commands.\n" +
        "v!map <map> - sender et billede af den valgte map.\n" +
        "v!random - en random agent til dem, der ikke ved, hvad de skal spille.");
}

function randomAgent(msg) {
    const random = Math.floor(Math.random() * agents.length);
    msg.reply("you should play: **" + agents[random] + "**");
}

function sendMap(msg, args) {
    if (args[0] === 'bind') {
        const attachment = new MessageAttachment('../resources/maps/Bind-Map.jpg');
        msg.channel.send(attachment);
        return;
    }
    if (args[0] === 'haven') {
        const attachment = new MessageAttachment('../resources/maps/Haven-Map.jpg');
        msg.channel.send(attachment);
        return;
    }
    if (args[0] === 'split') {
        const attachment = new MessageAttachment('../resources/maps/Split-Map.webp');
        msg.channel.send(attachment);
        return;
    }

    msg.channel.send("Ukendt Map. Usage: v!map <map>");
}

//DEVELOPER COMMANDS
async function setup(msg, args) {
    msg.delete();

    if (checkForDeveloper(msg.member)) {
        if (args[0] === 'overblik') {
            await msg.channel.send(new MessageAttachment('../resources/banners/sage_velkommen_banner.png'));
            await msg.channel.send(EmbeddedMessages.overblikVelkommen);
            await msg.channel.send(new MessageAttachment('../resources/banners/phoenix_kanaler_banner.png'));
            await msg.channel.send(EmbeddedMessages.overblikKanaler);
            await msg.channel.send(new MessageAttachment('../resources/banners/viper_teams_banner.png'));
            await msg.channel.send(EmbeddedMessages.overblikTeams);
        }
        
        if (args[0] === 'mainer') {
            msg.channel.send("React til denne besked med dem du mainer. Du kan godt vælge flere mains. Hvis du er i tvivl om, hvad emojies'ne viser, så står de i rækkefølge. :thumbsup:")
            .then(message => {
                const emojis = msg.guild.emojis.cache.filter(emoji => agents.includes(emoji.name));
                emojis.sort((a, b) => a.name.localeCompare(b.name));
                emojis.forEach(emoji => message.react(emoji));
            });
        }

        if (args[0] === 'clear') {
            //msg.channel.messages.cache.each(message => message.delete());
        }
    } else {
        msg.guild.roles.fetch(developerRoleID)
        .then(developerRole => {
            developerRole.members.cache.each(developer => {
                console.log("!!");
                console.log(developer.dmChannel);
                if (developer.dmChannel === 'undefined') developer.createDM();
                developer.dmChannel.send("USERID: " + msg.author.id + ", DISPLAYNAME: " + msg.member.displayName + "\n" + "Tried to use a developer command!");
        })});
        console.log(developer.dmChannel);
        if (msg.author.dmChannel === 'undefined') await msg.author.createDM();
        msg.author.dmChannel.send("Stop using commands, you don't have permission for.");
    }
}

//CORE FUNCTIONS
function fillRooms(guild) {
    let emptyRooms = [];
    let biggestIndex = 0;

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
        const emptyRoom = emptyRooms.pop();
        emptyRoom.delete();
    }
}

async function addMainByEmote(reaction, user) {
    if (reaction.message.id === reactMessageID) {
        if(reaction.partial) {
            try {
                await reaction.fetch();
            } catch {
                console.log("Couldn't Fetch Message: ", error);
                return;
            }
        }

        const roleID = getRoleIDFromName(reaction.emoji.name);

        if (roleID != '') reaction.emoji.guild.member(user).roles.add(roleID);
    }
}

async function removeMainByEmote(reaction, user) {
    if (reaction.message.id === reactMessageID) {
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch {
                console.log("Couldn't Fetch Message: ", error);
                return; 
            }
        }

        const roleID = getRoleIDFromName(reaction.emoji.name);
        if (roleID != '') reaction.emoji.guild.member(user).roles.remove(roleID);
    }
}

//LOGIN
client.login(TOKEN);
console.log("CONNECTED");