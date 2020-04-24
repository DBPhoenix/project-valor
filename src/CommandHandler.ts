import { Message, MessageAttachment } from 'discord.js';
import { checkForDeveloper } from './ValorUtils';

import * as EmbeddedMessages from './EmbeddedMessages';

const agents = ['Breach', 'Brimstone', 'Cypher', 'Jett', 'Omen', 'Phoenix', 'Raze', 'Sage', 'Sova', 'Viper'];
const maps = ['bind', 'haven', 'split'];

export function handleMessage(msg: Message): void {
    let args = msg.content.toLowerCase().split(" ");
    const command = args[0]; args.splice(0, 1);

    if (command === 'v!commands') commands(msg);
    if (command === 'v!random') randomAgent(msg);
    if (command === 'v!map') sendMap(msg, args);

    if (command === 'v!admin') admin(msg, args);
}

function commands(msg: Message): void {
    msg.channel.send(
        "**VALOR'S COMMANDS**:\n" +
        "v!commands - liste over alle commands.\n" +
        "v!map <map> - sender et billede af den valgte map.\n" +
        "v!random - en random agent til dem, der ikke ved, hvad de skal spille."
    );
}

function randomAgent(msg: Message): void {
    const random = Math.floor(Math.random() * agents.length);
    msg.reply("you should play: **" + agents[random] + "**");
}

function sendMap(msg: Message, args: string[]): void {
    if (maps.includes(args[0])) {
        msg.channel.send(new MessageAttachment('../resources/maps/' + args[0] + '-map.jpg'));
    } else {
        msg.channel.send("Ukendt Map. Usage: v!map <map>");
    }
}

function admin(msg: Message, args: string[]): void {
    msg.delete();

    if (checkForDeveloper(msg.member)) {
        if (args[0] === 'clear') {
            clearMessages(msg, args);
        }

        if (args[0] === 'setup') {
            if (args[1] === 'overblik') setupOverblik(msg);
            if (args[1] === 'mainer') setupMainer(msg);
        }
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

function setupMainer(msg: Message): void {
    msg.channel.send("React til denne besked med dem du mainer. Du kan godt vælge flere mains. Hvis du er i tvivl om, hvad emojies'ne viser, så står de i rækkefølge. :thumbsup:")
    .then(message => {
        const emojis = msg.guild.emojis.cache.filter(emoji => agents.includes(emoji.name));
        emojis.sort((a, b) => a.name.localeCompare(b.name));
        emojis.each(emoji => message.react(emoji));
    });
}

function clearMessages(msg: Message, args: string[]): void {
    msg.channel.messages.fetch({ limit: parseInt(args[1]) }).then(messages => messages.each(message => message.delete()));
}