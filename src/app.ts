'use strict';

import { Client, TextChannel } from 'discord.js';
import * as JSONFileHandler from './JSONFileHandler';
import * as GuildHandler from './GuildHandler';

const client = new Client({partials: ['MESSAGE', 'REACTION']});
const TOKEN = JSONFileHandler.privateKeys.TOKEN;

import * as CommandHandler from './CommandHandler';
import * as MessageHandler from './MessageHandler';

import { addMusicBot } from './MusicCommandHandler';
import * as MelodyJett from './music_bots/MelodyJett';
import * as MelodyPhoenix from './music_bots/MelodyPhoenix';
import * as MelodySage from './music_bots/MelodySage';

client.on('ready', async () => {
    await new Promise(r => setTimeout(r, 1000));
    JSONFileHandler.updateGuildData(client.guilds.resolve(GuildHandler.guildID));
    addMusicBot(await MelodyJett.instantiate());
    addMusicBot(await MelodyPhoenix.instantiate());
    addMusicBot(await MelodySage.instantiate());
    await GuildHandler.fetchMainerMessage(client);
    await GuildHandler.getInvites(client.guilds.resolve(GuildHandler.guildID));
    console.log('Client is connected & ready!');
});

client.on('guildCreate', (guild) => {
    GuildHandler.externRejection(guild);
});

client.on('guildMemberAdd', (member) => {
    if (!member.user.bot) {
        GuildHandler.addMemberRole(member);
        GuildHandler.memberJoinLog(member);
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
    if (msg.content.startsWith('!') && !msg.author.bot) {
        CommandHandler.handleMessage(msg);
    }
});

client.login(TOKEN);
