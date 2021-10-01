import { Client } from 'discord.js';
import * as JSONFileHandler from './JSONFileHandler';
import * as GuildHandler from './GuildHandler';

import * as CommandHandler from './CommandHandler';
import * as MessageHandler from './MessageHandler';

import { addMusicBot } from './MusicCommandHandler';
import * as MelodyJett from './music_bots/MelodyJett';
import * as MelodyPhoenix from './music_bots/MelodyPhoenix';
import * as MelodySage from './music_bots/MelodySage';

const client = new Client({ partials: ['MESSAGE', 'REACTION'] });
const { TOKEN } = JSONFileHandler.privateKeys;

client.on('ready', async () => {
  const guild = client.guilds.resolve(GuildHandler.guildID);

  if (!guild) {
    throw Error();
  }

  await new Promise((r) => setTimeout(r, 1000));
  JSONFileHandler.updateGuildData(guild);

  addMusicBot(await MelodyJett.instantiate());
  addMusicBot(await MelodyPhoenix.instantiate());
  addMusicBot(await MelodySage.instantiate());

  await GuildHandler.fetchMainerMessage(client);
  await GuildHandler.getInvites(guild);

  console.log('Client is connected & ready!');
});

client.on('guildCreate', (guild) => {
  GuildHandler.externRejection(guild);
});

client.on('guildMemberAdd', (member) => {
  if (!member.user?.bot) {
    GuildHandler.addMemberRole(member);
    GuildHandler.memberJoinLog(member);
  }
});

client.on('voiceStateUpdate', (oldState, newState) => {
  const { guild } = newState;
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
