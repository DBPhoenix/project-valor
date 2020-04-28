import { Guild, GuildChannel, GuildMember, PartialGuildMember } from 'discord.js';
import { channelData, roleData } from './JSONFileHandler';

export const guildID: string = '700994553636978749';

function findFlexRooms(guild: Guild): GuildChannel[] {
    let flexRooms: GuildChannel[] = [];

    guild.channels.cache.each(channel => {
        if (typeof channel !== 'undefined' && typeof channel.name !== 'undefined') {
            if (channel.name.startsWith("Flex #")) flexRooms.push(channel);
        }
    });

    flexRooms.sort((a, b) => a.name.localeCompare(b.name));

    return flexRooms;
}

export function manageFlexRooms(guild: Guild): GuildChannel[] {
    let flexRooms = findFlexRooms(guild);
    let ignore = true;

    flexRooms.forEach(channel => {
        if (channel.members.size === 0) {
            if (ignore) {
                ignore = false;
            } else {
                channel.delete();
            }
        }
    });

    if (ignore) {
        let lastNumber = parseInt(flexRooms[flexRooms.length - 1].name.slice(6));
        guild.channels.create("Flex #" + (lastNumber + 1), {
            type: 'voice',
            userLimit: 5,
            parent: channelData["--- Play Valorant ---"]["id"],
            position: lastNumber + 1,
            reason: 'All rooms filled'
        });
    }

    return flexRooms;
}

export function addBetaRole(member: GuildMember | PartialGuildMember): Promise<GuildMember> {
    return member.roles.add(roleData.beta);
}   

export function addMemberRole(member: GuildMember | PartialGuildMember): Promise<GuildMember> {
    return member.roles.add(roleData.member);
}

export function externRejection(guild: Guild): Guild {
    if (guild.id !== guildID) {
        guild.systemChannel.send("Sorry, this Discord bot is only meant for PlayValorant Denmark. Please contact Phoenix#2855 for more information");
        console.warn("Bot joined another Guild:");
        console.warn("GuildName: " + guild.name);
        console.warn("GuildID: " + guild.id);
        guild.leave().then(guild => { return guild });
    }
    return guild;
}