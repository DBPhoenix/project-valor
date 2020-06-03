import { Message, MessageAttachment, VoiceChannel, TextChannel } from 'discord.js';
import { checkForDeveloper } from './ValorUtils';
import * as JSONFileHandler from './JSONFileHandler';

import { reactMessageID } from './MessageHandler'
import * as CreatorCommandHandler from './CreatorCommandHandler';
import * as EmbeddedMessages from './EmbeddedMessages';
import * as MusicCommandHandler from './MusicCommandHandler';
import * as TeamCommandHandler from './TeamCommandHandler';

const agents = ['Breach', 'Brimstone', 'Cypher', 'Jett', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Sova', 'Viper'];
const maps = ['ascent', 'bind', 'haven', 'split'];

export function handleMessage(msg: Message): void {
    let args = msg.content.toLowerCase().split(" ");
    const command = args[0]; args.splice(0, 1);

    if (command === '!link') sendSocialLinks(msg);
    if (command === '!random') randomAgent(msg);
    if (command === '!map') sendMap(msg, args);

    if (command === '!join') MusicCommandHandler.handleMessage(msg, command);
    if (command === '!play') MusicCommandHandler.handleMessage(msg, command);
    if (command === '!resume') MusicCommandHandler.handleMessage(msg, command);
    if (command === '!pause') MusicCommandHandler.handleMessage(msg, command);
    if (command === '!skip') MusicCommandHandler.handleMessage(msg, command);
    if (command === '!leave') MusicCommandHandler.handleMessage(msg, command);
    if (command === '!loop') MusicCommandHandler.handleMessage(msg, command);
    
    if (command === '!team') team(msg, args);

    if (command === '!creator') CreatorCommandHandler.handleMessage(msg, args);

    if (command === '!admin') admin(msg, args);
}

function sendSocialLinks(msg: Message): Promise<Message> {
    return msg.channel.send(
        "Discord Link: https://discord.gg/5RPdCUb\n\n" +
        "Facebook Gruppe: https://www.facebook.com/groups/276840039591196/");
}

function randomAgent(msg: Message): void {
    const random = Math.floor(Math.random() * agents.length);
    msg.reply("du burde spille: **" + agents[random] + "**");
}

function sendMap(msg: Message, args: string[]): void {
    if (maps.includes(args[0])) {
        msg.channel.send(new MessageAttachment('../resources/maps/' + args[0] + '-map.jpg'));
    } else {
        msg.channel.send("Ukendt Map. Usage: v!map <map>");
    }
}

function team(msg: Message, args: string[]): void {
    if (args[0] === 'create') TeamCommandHandler.createChannel(msg, args);
}

function admin(msg: Message, args: string[]): void {
    msg.delete();

    if (checkForDeveloper(msg.member)) {
        if (args[0] === 'clear') clearMessages(msg, args);

        if (args[0] === 'setup') {
            if (args[1] === 'overblik') setupOverblik(msg);
            if (args[1] === 'mainer') setupMainer(msg);
            if (args[1] === 'regler') setupRegler(msg);
            if (args[1] === 'valor') setupValorCommands(msg);
        }

        if (args[0] === 'setposition') setPosition(msg, args);
        if (args[0] === 'bitrate') checkBitRate(msg);
        if (args[0] === 'syncdata') JSONFileHandler.updateGuildData(msg.guild);
        if (args[0] === 'displayname') getDisplayNameFromID(msg, args);
        if (args[0] === 'updatemainer') updateMainMessage(msg);
    }
}

function setPosition(msg: Message, args: string[]) {
    try {
        msg.guild.channels.resolve(args[1]).setPosition(Number(args[2]));
    } catch(err) {
        console.warn("Something went wrong...", err);
    }
}

async function setupOverblik(msg: Message): Promise<void> {
    await msg.channel.send(new MessageAttachment('../resources/banners/sage_velkommen_banner.png'));
    await msg.channel.send(EmbeddedMessages.overblikVelkommen);
    await msg.channel.send(new MessageAttachment('../resources/banners/phoenix_kanaler_banner.png'));
    await msg.channel.send(EmbeddedMessages.overblikKanaler);
    await msg.channel.send(new MessageAttachment('../resources/banners/viper_teams_banner.png'));
    await msg.channel.send(EmbeddedMessages.overblikTeams);
}

async function setupRegler(msg: Message): Promise<void> {
    await msg.channel.send(EmbeddedMessages.regler1);
    await msg.channel.send(EmbeddedMessages.regler2);
    await msg.channel.send(EmbeddedMessages.regler3);
    await msg.channel.send(EmbeddedMessages.regler4);
    await msg.channel.send(EmbeddedMessages.regler5);
    await msg.channel.send(EmbeddedMessages.regler6);
}

async function setupValorCommands(msg: Message): Promise<void> {
    await msg.channel.send(new MessageAttachment('../resources/banners/valor_commands_banner.png'));
    await msg.channel.send(EmbeddedMessages.commandsValor);
}

function setupMainer(msg: Message): void {
    msg.channel.send("React til denne besked med dem du mainer. Du kan godt vælge flere mains. Hvis du er i tvivl om, hvad emojies'ne viser, kan du mouse-over. :thumbsup:")
    .then(message => {
        const emojis = msg.guild.emojis.cache.filter(emoji => agents.includes(emoji.name));
        emojis.sort((a, b) => a.name.localeCompare(b.name));
        emojis.each(emoji => message.react(emoji));
    });
}

function clearMessages(msg: Message, args: string[]): void {
    msg.channel.messages.fetch({ limit: parseInt(args[1]) }).then(messages => messages.each(message => message.delete()));
}

function checkBitRate(msg: Message): void {
    let output: string = '';

    msg.guild.channels.cache.each((channel) => {
        if(channel.type === 'voice') {
            let warning: boolean = ((<VoiceChannel>channel).bitrate !== 64000);
            if (warning) output += "**";
            output += "Channel Name: " + channel.name + ", Bitrate: " + (<VoiceChannel>channel).bitrate;
            if (warning) output += "**";
            output += "\n";
        }
    });

    msg.author.send(output);
}

function getDisplayNameFromID(msg: Message, args: string[]): void {
    msg.guild.members.resolve(args[1]).fetch()
    .then((member) => {
        msg.channel.send("Display Name: " + member.displayName);
    });
}

async function updateMainMessage(msg: Message): Promise<Message> {
    await msg.guild.channels.cache.each((channel) => {
        if (channel.id === JSONFileHandler.channelData["jeg-mainer"]) {
            (<TextChannel> channel).messages.cache.each((msg) => {
                if (msg.id === reactMessageID) {
                    const agents = ['Breach', 'Brimstone', 'Cypher', 'Jett', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Sova', 'Viper'];
                    const emojis = msg.guild.emojis.cache.filter(emoji => agents.includes(emoji.name));
                    emojis.sort((a, b) => a.name.localeCompare(b.name));
                    emojis.each(emoji => msg.react(emoji));
                    return msg;
                }
            });
        }
    });

    return null;
}
