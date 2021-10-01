import {
  Client,
  Guild,
  VoiceChannel,
  VoiceConnection,
} from 'discord.js';
import * as ytdl from 'ytdl-core';

export class MelodyTemplate implements MusicBot {
  readonly client: Client;

  readonly guild: Guild;

  readonly displayName: string;

  constructor(client: Client, guild: Guild, displayName: string) {
    const { user } = client;

    if (!user) {
      throw Error();
    }

    this.client = client;
    this.guild = guild;
    this.displayName = displayName;
    console.log(user.id);
    console.log(guild.available);
    console.log(displayName);
    setInterval(this.isInUse, 180000);
  }

  voiceConnection: VoiceConnection | undefined;

  songQueue: string[] = [];

  timeSince: number = 0;

  currentSongURL: string | undefined;

  loop: boolean = false;

  play(URL: string): string | null {
    if (URL === '') {
      this.resume();
      return null;
    }

    this.songQueue.unshift(URL);
    this.resume();

    return URL;
  }

  pause(): void {
    if (
      this.voiceConnection
      && this.voiceConnection.dispatcher !== undefined
      && this.voiceConnection.dispatcher !== null
    ) {
      this.voiceConnection.dispatcher.pause();
    }
  }

  async join(channel: VoiceChannel): Promise<VoiceConnection | null> {
    if (this.voiceConnection === undefined || this.voiceConnection.channel !== channel) {
      const newVoiceChannel = <VoiceChannel>(await this.guild.channels.resolve(channel.id));
      this.voiceConnection = await newVoiceChannel.join();
      return this.voiceConnection;
    }

    return null;
  }

  leave(): void {
    this.songQueue = [];

    if (this.voiceConnection) {
      this.voiceConnection.disconnect();
    }

    this.voiceConnection = undefined;
  }

  isInUse(): boolean {
    if (this.voiceConnection !== undefined) {
      if (this.voiceConnection.channel.members.size <= 1 || Date.now() - this.timeSince >= 300000) {
        this.leave();
      }
    }

    return (this.voiceConnection !== undefined && this.voiceConnection !== null);
  }

  resume(): void {
    if (this.voiceConnection !== undefined) {
      if (
        (this.voiceConnection.dispatcher === undefined || this.voiceConnection.dispatcher === null)
        && this.songQueue.length > 0
      ) {
        this.playNext(this);
      }

      this.voiceConnection.dispatcher.resume();
    }
  }

  playNext(classReference: MelodyTemplate): string | null | undefined {
    const previous = classReference.currentSongURL;

    if (previous && this.loop) classReference.songQueue.push(previous);

    if (classReference.songQueue !== undefined) {
      if (classReference.songQueue.length > 0) {
        const URL = classReference.songQueue.pop();

        if (!URL || !classReference.voiceConnection) {
          throw Error();
        }

        classReference.voiceConnection.play(ytdl(URL, { filter: 'audioonly' }));
        classReference.currentSongURL = URL;

        ytdl.getBasicInfo(URL).then((info) => {
          setTimeout(() => {
            classReference.playNext(classReference);
          }, Number(info.length_seconds) * 1000);
        });
      } else if (classReference.voiceConnection !== undefined) {
        classReference.voiceConnection.dispatcher.end();
      }
    }

    if (
      classReference.voiceConnection === null
      || classReference.voiceConnection === undefined
      || classReference.voiceConnection.dispatcher === null
    ) {
      return null;
    }

    return previous;
  }

  static async getSongTitleFromURL(URL: string): Promise<string> {
    return (await ytdl.getBasicInfo(URL)).title;
  }
}

export interface MusicBot {
  displayName: string;
  voiceConnection: VoiceConnection | undefined;
  songQueue: string[];
  loop: boolean;
  play(URL: string): string | null;
  pause(): void;
  join(channel: VoiceChannel): Promise<VoiceConnection | null>;
  leave(): void;
  isInUse(): boolean;
  resume(): void;
  playNext(classRefenrece: MelodyTemplate): string | null | undefined;
}
