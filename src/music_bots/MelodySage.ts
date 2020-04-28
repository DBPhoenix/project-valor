import { Client } from 'discord.js';
import * as JSONFileHandler from '../JSONFileHandler';
import * as GuildHandler from '../GuildHandler';
import { MelodyTemplate } from './MelodyTemplate';

export async function instantiate(): Promise<MelodyTemplate> {
    const client = new Client();
    await client.login(JSONFileHandler.privateKeys.musicBots.melodySage);

    const guild = await client.guilds.resolve(GuildHandler.guildID)

    const displayName = (await guild.members.fetch(client.user.id)).displayName;

    client.on('guildCreate', guild => {
        GuildHandler.externRejection(guild);
    });

    return new MelodyTemplate(client, guild, displayName);
}