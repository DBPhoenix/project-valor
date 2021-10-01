import {
  Guild,
  GuildChannel,
  GuildMember,
  PartialGuildMember,
  Message, Client,
  TextChannel,
  Collection,
  Invite,
} from 'discord.js';
import { channelData, roleData } from './JSONFileHandler';

export const guildID: string = '700994553636978749';

let invites: Collection<string, Invite>;

export async function getInvites(guild: Guild): Promise<Collection<string, Invite>> {
  await guild.fetchInvites().then((invitesCollection) => {
    invites = invitesCollection;
  });
  return invites;
}

function findFlexRooms(guild: Guild): GuildChannel[] {
  const flexRooms: GuildChannel[] = [];

  guild.channels.cache.each((channel) => {
    if (typeof channel !== 'undefined' && typeof channel.name !== 'undefined') {
      if (channel.name.startsWith('Flex #')) flexRooms.push(channel);
    }
  });

  flexRooms.sort((a, b) => a.name.localeCompare(b.name));

  return flexRooms;
}

export function manageFlexRooms(guild: Guild): GuildChannel[] {
  const flexRooms = findFlexRooms(guild);
  let ignore = true;

  flexRooms.forEach((channel) => {
    if (channel.members.size === 0) {
      if (ignore) {
        ignore = false;
      } else {
        channel.delete();
      }
    }
  });

  if (ignore) {
    const lastNumber = parseInt(flexRooms[flexRooms.length - 1].name.slice(6), 10);
    guild.channels.create(`Flex #${lastNumber + 1}`, {
      type: 'voice',
      userLimit: 5,
      parent: channelData['--- Play Valorant ---'].id,
      reason: 'All rooms filled',
    }).then((channel) => {
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
    guild.systemChannel?.send('Sorry, this Discord bot is only meant for PlayValorant Denmark. Please contact Phoenix#2855 for more information');
    console.warn('Bot joined another Guild:');
    console.warn(`GuildName: ${guild.name}`);
    console.warn(`GuildID: ${guild.id}`);
    guild.leave();
  }
  return guild;
}

export function fetchMainerMessage(client: Client): Promise<void | Message> {
  return client.channels.fetch(channelData['jeg-mainer'])
    .then((channel) => {
      if (channel.type !== 'text') {
        return;
      }

      (channel as TextChannel).messages.fetch().then((collection) => {
        collection.first()?.fetch();
      });
    });
}

export function memberJoinLog(guildMember: GuildMember | PartialGuildMember) {
  guildMember.guild.fetchInvites().then((guildInvites) => {
    const inviteCache = invites;

    invites = guildInvites;

    const inviteLink = guildInvites.find((invite) => {
      const inviteUses = inviteCache.get(invite.code)?.uses;

      if (!inviteUses || !invite.uses) {
        return false;
      }

      return inviteUses < invite.uses;
    });

    const channel = guildMember.guild.systemChannel;

    if (!channel) {
      throw Error();
    }

    channel.send(`${guildMember.displayName} joinede fra invite link: ${inviteLink}`);
  });
}
