import { Message } from 'discord.js'

import * as YoutubeHandler from './YoutubeHandler';

import { MusicBot, MelodyTemplate } from './music_bots/MelodyTemplate';

const musicBots: MusicBot[] = [];

export function handleMessage(msg: Message, command: string) {
    if (msg.member.voice) {

        if (command === '!join') join(msg);
        if (command === '!play') play(msg, msg.content.split(" ").splice(1));
        if (command === '!resume') resume(msg);
        if (command === '!pause') pause(msg);
        if (command === '!skip') skip(msg);
        if (command === '!leave') leave(msg);
        if (command === '!loop') loop(msg);

    } else {
        msg.channel.send("You need to join a voice channel first.");
    }
}

export function addMusicBot(bot: MusicBot) {
    musicBots.push(bot);
}

function getBotByMessage(msg): MusicBot {
    let musicBot: MusicBot = null;

    for (let bot of musicBots) {
        if (bot.voiceConnection !== undefined && bot.voiceConnection.channel.id === msg.member.voice.channel.id) {
            musicBot = bot;
        }
    }

    if (musicBot === null) msg.channel.send("Kunne ikke finde en musik bot i din channel. Få en til at joine ved: v!join");
    return musicBot;
}

async function join(msg: Message): Promise<MusicBot> {
    for (let bot of musicBots) {
        if (bot.voiceConnection !== undefined && msg.member.voice.channel.id === bot.voiceConnection.channel.id) {
            msg.channel.send("Der er allerede en musik bot i din channel.");
            return bot;
        }
    }

    let availableBots: MusicBot[] = [];
    for (let bot of musicBots) {
        if (!bot.isInUse()) {
            availableBots.push(bot);
        }
    }

    if (availableBots.length > 0) {
        const musicBot = availableBots[Math.floor(Math.random() * availableBots.length)];
        await musicBot.join(msg.member.voice.channel);
        msg.channel.send(musicBot.displayName + " joinede!");
        return musicBot;
    }

    return null;
}

function resume(msg: Message): void {
    const musicBot = getBotByMessage(msg);

    if (musicBot !== null) {
        if (musicBot.songQueue.length > 0) msg.channel.send(musicBot.displayName + " spiller videre.");
        else msg.channel.send("Song Queue empty.");
        return musicBot.resume();
    }

    return null;
}

function pause(msg: Message): void {
    const musicBot = getBotByMessage(msg);

    if (musicBot !== null) {
        musicBot.pause();
        if (musicBot.songQueue.length > 0) msg.channel.send(musicBot.displayName + " er blevet pauset.");
        else msg.channel.send("Song Queue empty.");
    }
}

function leave(msg: Message): void {
    const musicBot = getBotByMessage(msg);

    if (musicBot !== null) {
        musicBot.leave();
        msg.channel.send(musicBot.displayName + " har forladt kanalen.")
    }
}

async function skip(msg: Message): Promise<string> {
    const musicBot = getBotByMessage(msg);

    if (musicBot !== null) {
        const out = await musicBot.getSongTitleFromURL(musicBot.playNext(<MelodyTemplate>musicBot));
        if (out != null) msg.channel.send(out + " blev skippet.");
        else msg.channel.send("Der bliver ikke afspillet nogen sang.");
        return out;
    }
}

async function play(msg: Message, args: string[]): Promise<string> {
    let musicBot = null;

    for (let bot of musicBots) {
        if (bot.voiceConnection !== undefined && bot.voiceConnection.channel.id === msg.member.voice.channel.id) {
            musicBot = bot;
        }
    }

    if (musicBot === null) {
        musicBot = await join(msg);
    }

    if (musicBot !== null) {
        const songRequest = args.join(" ");
        let URL: string = null;
        if (songRequest.startsWith("http")) {
            URL = musicBot.play(songRequest);
        } else {
            URL = musicBot.play(await YoutubeHandler.getURLByKeywords(songRequest));
        }
        msg.channel.send((await musicBot.getSongTitleFromURL(URL)) + " er tilføjet til queue.");
        return URL;
    }

    return null;
}

function loop(msg: Message) {
    const bot: MusicBot = getBotByMessage(msg);
    bot.loop = !(bot.loop);
    if (bot.loop) msg.channel.send("Queue looper.");
    else msg.channel.send("Queue er stoppet med at loope.");
}