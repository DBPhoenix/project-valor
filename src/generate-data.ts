// THIS IS A STUPID FIX TO A BADLY DESIGNED CODE
import { Client } from 'discord.js';
import * as JSONFileHandler from './JSONFileHandler';
import * as GuildHandler from './GuildHandler';

const client = new Client({ partials: [] });
const { TOKEN } = JSONFileHandler.privateKeys;

client.on('ready', async () => {
  const guild = client.guilds.resolve(GuildHandler.guildID);

  if (!guild) {
    throw Error();
  }

  await new Promise((r) => setTimeout(r, 1000));
  JSONFileHandler.updateGuildData(guild);

  await new Promise((r) => setTimeout(r, 5000));
  client.destroy();
});

client.login(TOKEN);
