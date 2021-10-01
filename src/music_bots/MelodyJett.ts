import { Client } from 'discord.js';
import * as JSONFileHandler from '../JSONFileHandler';
import * as GuildHandler from '../GuildHandler';
import { MelodyTemplate } from './MelodyTemplate';

export async function instantiate(): Promise<MelodyTemplate> {
  const client = new Client();
  await client.login(JSONFileHandler.privateKeys.musicBots.melodyJett);

  const guild = await client.guilds.resolve(GuildHandler.guildID);
  const { user } = client;

  if (!guild || !user) {
    throw Error();
  }

  const { displayName } = await guild.members.fetch(user);

  client.on('guildCreate', (newGuild) => {
    GuildHandler.externRejection(newGuild);
  });

  return new MelodyTemplate(client, guild, displayName);
}
