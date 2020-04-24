'use strict';

import { Client } from 'discord.js';
import { readFileSync } from 'fs';

import * as CommandHandler from './CommandHandler';
import * as GuildMemberHandler from './GuildMemberHandler';
import * as GuildHandler from './GuildHandler';
import * as MessageHandler from './MessageHandler';

const client = new Client({partials: ['MESSAGE', 'REACTION']});
const sharedData = JSON.parse(readFileSync("../private/shared_data.json").toString());
const TOKEN = sharedData.TOKEN;

//CONSTANT IDS:
const guildID: string = '700994553636978749';

client.on('guildCreate', (guild) => {
    if (guild.id !== guildID) {
        guild.systemChannel.send("Sorry, this Discord bot is only meant for PlayValorant Denmark. Please contact Phoenix#2855 for more information");
        console.warn("Bot joined another Guild:");
        console.warn("GuildName: " + guild.name);
        console.warn("GuildID: " + guild.id);
        guild.leave();
    }
});

client.on('guildMemberAdd', (member) => {
    GuildMemberHandler.addBetaRole(member);
    GuildMemberHandler.addMemberRole(member);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    const guild = newState.guild;
    if (guild.id === guildID) {
        GuildHandler.manageFlexRooms(guild);
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (!user.bot) MessageHandler.addMainByEmote(reaction, user);
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (!user.bot) MessageHandler.removeMainByEmote(reaction, user);
});

client.on('message', (msg) => {
    if (msg.content.toLowerCase().startsWith('v!') && !msg.author.bot) {
        CommandHandler.handleMessage(msg);
    }
});

client.login(TOKEN);