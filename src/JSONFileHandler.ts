import { Guild } from 'discord.js';
import * as fs from 'fs';

function channelDataToJSON(guild: Guild): string {
    let channelData: object = {};

    guild.channels.cache.each((channel) => {
        if (channel.type === 'category') channelData[channel.name] = {};
    })

    guild.channels.cache.each((channel) => {
        if (channel.type === 'category') {
            channelData[channel.name]["id"] = channel.id;
        } else if (channel.parent === null) {
            channelData[channel.name] = channel.id;
        } else {
            channelData[channel.parent.name][channel.name] = channel.id;
        }
    });

    return JSON.stringify(channelData, null, 2);
}

function roleDataToJSON(guild: Guild): string {
    let roleData: object = {};

    guild.roles.cache.each((role) => {
        roleData[role.name] = role.id;
    });

    return JSON.stringify(roleData, null, 2);
}

function writeJSON(path: string, JSON: string): boolean {
    fs.writeFile(path, JSON, err => {
        if (err) {
            console.warn("ERROR WRITING JSON", err);
            return false;
        }
    });
    return true;
}

export function updateGuildData(guild: Guild): boolean {
    return (
        writeJSON('../data/channels.json', channelDataToJSON(guild)) &&
        writeJSON('../data/roles.json', roleDataToJSON(guild))
    );
}

export function append(key: string, value: string, path: string) {
    let data = JSON.parse(fs.readFileSync(path).toString());

    data[key] = value;

    writeJSON(path, JSON.stringify(data, null, 2));
    return data;
}

export function read(path: string): any {
    let output = JSON.parse(fs.readFileSync(path).toString());
    return output;
}

export const channelData = JSON.parse(fs.readFileSync("../data/channels.json").toString());

export const roleData = JSON.parse(fs.readFileSync("../data/roles.json").toString());

export const privateKeys = JSON.parse(fs.readFileSync("../private/keys.json").toString());