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
    loop: boolean = false;

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
        this.songQueue = new Array;
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
            if ((this.voiceConnection.dispatcher === undefined || this.voiceConnection.dispatcher === null) && this.songQueue.length > 0) this.playNext(this);
            this.voiceConnection.dispatcher.resume();
        }
    }

    playNext(classReference: MelodyTemplate): string {
        const previous = classReference.currentSongURL;
        if (this.loop) classReference.songQueue.push(previous);
        if (classReference.songQueue !== undefined) {
            if (classReference.songQueue.length > 0) {
                const URL: string = classReference.songQueue.pop();
                classReference.voiceConnection.play(ytdl(URL, { filter: 'audioonly' }));
                classReference.currentSongURL = URL;
                ytdl.getBasicInfo(URL).then((info) => {
                    setTimeout(function(){classReference.playNext(classReference);}, Number(info.length_seconds) * 1000);
                });
            } else if (classReference.voiceConnection !== undefined) classReference.voiceConnection.dispatcher.end();
        }
        if (classReference.voiceConnection === null || classReference.voiceConnection === undefined || classReference.voiceConnection.dispatcher === null) return null;
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
    loop: boolean;
    play(URL: string): string;
    pause(): void;
    join(channel: VoiceChannel): Promise<VoiceConnection>;
    leave(): void;
    isInUse(): boolean;
    resume(): void;
    playNext(classRefenrece: MelodyTemplate): string;
    getSongTitleFromURL(URL: string): Promise<string>;
}