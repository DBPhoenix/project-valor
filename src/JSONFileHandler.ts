import { Guild } from 'discord.js';
import * as fs from 'fs';

function channelDataToJSON(guild: Guild): string {
  const channelData: {
    [parentName: string]: {
      id: string;
      [channelName: string]: string;
    } | string;
  } = {};

  guild.channels.cache.each((channel) => {
    if (channel.type === 'category') channelData[channel.name] = { id: '' };
  });

  guild.channels.cache.each((channel) => {
    if (channel.type === 'category') {
      channelData[channel.name] = { id: channel.id };
    } else if (channel.parent === null) {
      channelData[channel.name] = channel.id;
    } else {
      const parentChannel = channelData[channel.name] as {
        id: string;
        [channelName: string]: string;
      };

      if (!parentChannel) {
        throw Error();
      }

      parentChannel[channel.name] = channel.id;
    }
  });

  return JSON.stringify(channelData, null, 2);
}

function roleDataToJSON(guild: Guild): string {
  const roleData: {
    [name: string]: string;
  } = {};

  guild.roles.cache.each((role) => {
    roleData[role.name] = role.id;
  });

  return JSON.stringify(roleData, null, 2);
}

function writeJSON(path: string, JSON: string): boolean {
  fs.writeFile(path, JSON, (err) => {
    if (err) {
      console.warn('ERROR WRITING JSON', err);
    }
  });

  return true;
}

export function updateGuildData(guild: Guild): boolean {
  return (
    writeJSON('../data/channels.json', channelDataToJSON(guild))
    && writeJSON('../data/roles.json', roleDataToJSON(guild))
  );
}

export function append(key: string, value: string, path: string) {
  const data = JSON.parse(fs.readFileSync(path).toString());

  data[key] = value;

  writeJSON(path, JSON.stringify(data, null, 2));
  return data;
}

export function read(path: string): any {
  const output = JSON.parse(fs.readFileSync(path).toString());
  return output;
}

export const channelData = JSON.parse(fs.readFileSync('../data/channels.json').toString());

export const roleData = JSON.parse(fs.readFileSync('../data/roles.json').toString());

export const privateKeys = JSON.parse(fs.readFileSync('../private/keys.json').toString());
