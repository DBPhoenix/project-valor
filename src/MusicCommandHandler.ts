import { Message } from 'discord.js';

import * as YoutubeHandler from './YoutubeHandler';

import { MusicBot, MelodyTemplate } from './music_bots/MelodyTemplate';

const musicBots: MusicBot[] = [];

function getBotByMessage(msg: Message): MusicBot | null {
  const channel = msg.member?.voice.channel;

  if (!channel) {
    throw Error();
  }

  let musicBot: MusicBot | null = null;

  musicBots.forEach((bot) => {
    if (bot.voiceConnection && bot.voiceConnection.channel.id === channel.id) {
      musicBot = bot;
    }
  });

  if (!musicBot) {
    msg.channel.send('Kunne ikke finde en musik bot i din channel. Få en til at joine ved: v!join');

    return null;
  }

  return musicBot;
}

async function join(msg: Message): Promise<MusicBot | null> {
  const channel = msg.member?.voice.channel;

  if (!channel) {
    throw Error();
  }

  musicBots.forEach((bot) => {
    if (bot.voiceConnection && channel.id === bot.voiceConnection.channel.id) {
      msg.channel.send('Der er allerede en musik bot i din channel.');
      return bot;
    }

    return null;
  });

  const availableBots: MusicBot[] = [];
  musicBots.forEach((bot) => {
    if (!bot.isInUse()) {
      availableBots.push(bot);
    }
  });

  if (availableBots.length > 0) {
    const musicBot = availableBots[Math.floor(Math.random() * availableBots.length)];
    await musicBot.join(msg.member.voice.channel);
    msg.channel.send(`${musicBot.displayName} joinede!`);
    return musicBot;
  }

  return null;
}

function resume(msg: Message): boolean {
  const musicBot = getBotByMessage(msg);

  if (musicBot !== null) {
    if (musicBot.songQueue.length > 0) msg.channel.send(`${musicBot.displayName} spiller videre.`);
    else msg.channel.send('Song Queue empty.');
    musicBot.resume();

    return true;
  }

  return false;
}

function pause(msg: Message): void {
  const musicBot = getBotByMessage(msg);

  if (musicBot !== null) {
    musicBot.pause();
    if (musicBot.songQueue.length > 0) msg.channel.send(`${musicBot.displayName} er blevet pauset.`);
    else msg.channel.send('Song Queue empty.');
  }
}

function leave(msg: Message): void {
  const musicBot = getBotByMessage(msg);

  if (musicBot !== null) {
    musicBot.leave();
    msg.channel.send(`${musicBot.displayName} har forladt kanalen.`);
  }
}

async function skip(msg: Message): Promise<string | null> {
  const musicBot = getBotByMessage(msg);

  if (musicBot !== null) {
    const nextSong = musicBot.playNext(<MelodyTemplate>musicBot);

    if (!nextSong) {
      throw Error();
    }

    const out = await MelodyTemplate.getSongTitleFromURL(nextSong);
    if (out != null) msg.channel.send(`${out} blev skippet.`);
    else msg.channel.send('Der bliver ikke afspillet nogen sang.');
    return out;
  }

  return null;
}

async function play(msg: Message, args: string[]): Promise<string | null> {
  const channel = msg.member?.voice.channel;

  if (!channel) {
    throw Error();
  }

  let musicBot = null;

  musicBots.forEach((bot) => {
    if (bot.voiceConnection !== undefined && bot.voiceConnection.channel.id === channel.id) {
      musicBot = bot;
    }
  });

  if (musicBot === null) {
    musicBot = await join(msg);
  }

  if (musicBot !== null) {
    const songRequest = args.join(' ');
    let URL: string | null = null;

    if (songRequest.startsWith('http')) {
      URL = musicBot.play(songRequest);
    } else {
      const url = await YoutubeHandler.getURLByKeywords(songRequest);

      if (!url) {
        return null;
      }

      URL = musicBot.play(url);
    }

    if (!URL) {
      throw Error();
    }

    msg.channel.send(`${await MelodyTemplate.getSongTitleFromURL(URL)} er tilføjet til queue.`);
    return URL;
  }

  return null;
}

function loop(msg: Message) {
  const bot: MusicBot | null = getBotByMessage(msg);

  if (!bot) {
    msg.channel.send('Botten kunne ikke findes.');
    return;
  }

  bot.loop = !(bot.loop);
  if (bot.loop) msg.channel.send('Queue looper.');
  else msg.channel.send('Queue er stoppet med at loope.');
}

export function handleMessage(msg: Message, command: string) {
  const { member } = msg;

  if (!member) {
    throw Error();
  }

  if (member.voice) {
    if (command === '!join') join(msg);
    if (command === '!play') play(msg, msg.content.split(' ').splice(1));
    if (command === '!resume') resume(msg);
    if (command === '!pause') pause(msg);
    if (command === '!skip') skip(msg);
    if (command === '!leave') leave(msg);
    if (command === '!loop') loop(msg);
  } else {
    msg.channel.send('You need to join a voice channel first.');
  }
}

export function addMusicBot(bot: MusicBot) {
  musicBots.push(bot);
}
