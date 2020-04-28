'use strict';

import { Client } from 'discord.js';

import * as JSONFileHandler from './JSONFileHandler';
import * as CommandHandler from './CommandHandler';
import * as GuildHandler from './GuildHandler';
import * as MessageHandler from './MessageHandler';
import { addMusicBot } from './MusicCommandHandler';

import * as MelodyJett from './music_bots/MelodyJett';
import * as MelodyPhoenix from './music_bots/MelodyPhoenix';
import * as MelodySage from './music_bots/MelodySage';

const client = new Client({partials: ['MESSAGE', 'REACTION']});
const TOKEN = JSONFileHandler.privateKeys.TOKEN;

client.on('ready', async () => {
    JSONFileHandler.updateGuildData(client.guilds.resolve(GuildHandler.guildID));
    addMusicBot(await MelodyJett.instantiate());
    addMusicBot(await MelodyPhoenix.instantiate());
    addMusicBot(await MelodySage.instantiate());
    console.log('Client is connected & ready!');
});

client.on('guildCreate', (guild) => {
    GuildHandler.externRejection(guild);
});

client.on('guildMemberAdd', (member) => {
    if (!member.user.bot) {
        GuildHandler.addBetaRole(member);
        GuildHandler.addMemberRole(member);
    }
});

client.on('voiceStateUpdate', (oldState, newState) => {
    const guild = newState.guild;
    if (guild.id === GuildHandler.guildID) {
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