import { Guild, GuildChannel } from 'discord.js';

const playValorantCategory: string = '700995169708933131';

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
            parent: playValorantCategory,
            position: lastNumber + 1,
            reason: 'All rooms filled'
        });
    }

    return flexRooms;
}