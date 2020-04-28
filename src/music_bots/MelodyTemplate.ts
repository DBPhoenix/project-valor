import { Client, Guild, VoiceChannel, VoiceConnection } from 'discord.js';
import * as ytdl from 'ytdl-core';

export class MelodyTemplate implements MusicBot {
    readonly client: Client;
    readonly guild: Guild;
    readonly displayName: string;

    constructor(client: Client, guild: Guild, displayName: string) {
        this.client = client;
        this.guild = guild;
        this.displayName = displayName;
        console.log(client.user.id);
        console.log(guild.available);
        console.log(displayName);
        setInterval(this.isInUse, 180000);
    }
    
    voiceConnection: VoiceConnection;
    songQueue: string[] = new Array;
    timeSince: number = 0;
    currentSongURL: string;

    play(URL: string): string {
        if (URL === "") {
            this.resume();
            return;
        }

        this.songQueue.unshift(URL);

        this.resume();

        return URL;
    }

    pause(): void {
        if (this.voiceConnection.dispatcher !== undefined && this.voiceConnection.dispatcher !== null) this.voiceConnection.dispatcher.pause();
    }

    async join(channel: VoiceChannel): Promise<VoiceConnection> {
        if (this.voiceConnection === undefined || this.voiceConnection.channel !== channel) {
            const newVoiceChannel = <VoiceChannel>(await this.guild.channels.resolve(channel.id));
            return this.voiceConnection = await newVoiceChannel.join();
        }
        return null;
    }

    leave(): void {
        this.voiceConnection.disconnect();
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
            if ((this.voiceConnection.dispatcher === undefined || this.voiceConnection.dispatcher === null) && this.songQueue.length > 0) this.playNext();
            this.voiceConnection.dispatcher.resume();
        }
    }

    playNext(): string {
        const previous = this.currentSongURL;
        if (this.songQueue.length > 0) {
            const URL: string = this.songQueue.pop();
            this.voiceConnection.play(ytdl(URL, { filter: 'audioonly' }));
            this.currentSongURL = URL;
            ytdl.getBasicInfo(URL).then((info) => {
                setTimeout(this.playNext, Number(info.length_seconds) * 1000);
            });
        }
        return previous;
    }

    async getSongTitleFromURL(URL: string): Promise<string> {
        return (await ytdl.getBasicInfo(URL)).title;
    }
}

export interface MusicBot {
    displayName: string;
    voiceConnection: VoiceConnection;
    songQueue: string[];
    play(URL: string): string;
    pause(): void;
    join(channel: VoiceChannel): Promise<VoiceConnection>;
    leave(): void;
    isInUse(): boolean;
    resume(): void;
    playNext(): string;
    getSongTitleFromURL(URL: string): Promise<string>;
}