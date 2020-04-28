import { Message } from 'discord.js'

import * as YoutubeHandler from './YoutubeHandler';

import { MusicBot } from './music_bots/MelodyTemplate';

const musicBots: MusicBot[] = [];

export function handleMessage(msg: Message, command: string) {
    if (msg.member.voice) {

        if (command === 'v!join') join(msg);
        if (command === 'v!play') play(msg, msg.content.split(" ").splice(1));
        if (command === 'v!resume') resume(msg);
        if (command === 'v!pause') pause(msg);
        if (command === 'v!skip') skip(msg);
        if (command === 'v!leave') leave(msg);

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

async function skip(msg: Message): Promise<void> {
    const musicBot = getBotByMessage(msg);

    if (musicBot !== null) {
        if (musicBot.songQueue.length > 0) msg.channel.send((await musicBot.getSongTitleFromURL(musicBot.playNext())) + " blev skippet.");
        else msg.channel.send("Song Queue empty.");
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