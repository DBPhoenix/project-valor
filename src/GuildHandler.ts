import { Guild, GuildChannel, GuildMember, PartialGuildMember, Message, Client, TextChannel, Collection, Invite } from 'discord.js';
import { channelData, roleData } from './JSONFileHandler';

export const guildID: string = '700994553636978749';

let invites: Collection<string, Invite>;

export async function getInvites(guild: Guild): Promise<Collection<string, Invite>> {
    await guild.fetchInvites().then(invitesCollection => invites = invitesCollection);
    return invites;
}

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
            reason: 'All rooms filled'
        }).then(channel => {
            channel.setPosition(lastNumber);
        });
    }

    return flexRooms;
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

export function fetchMainerMessage(client: Client): Promise<void | Message> {
    return client.channels.fetch(channelData["jeg-mainer"])
    .then((channel: TextChannel) => {
        channel.messages.fetch().then(collection => {
            collection.first().fetch();
        });
    });
}

export function memberJoinLog(guildMember: GuildMember | PartialGuildMember) {
    guildMember.guild.fetchInvites().then(guildInvites => {
        let inviteCache = invites;
    
        invites = guildInvites;

        const inviteLink = guildInvites.find(i => inviteCache.get(i.code).uses < i.uses);
    
        guildMember.guild.systemChannel.send(guildMember.displayName + " joinede fra invite link: " + inviteLink);
    });
}