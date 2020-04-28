import { google } from 'googleapis';

import * as JSONFileHandler from './JSONFileHandler';

const YOUTUBE_LINK: string = "https://www.youtube.com/watch?v=";

export async function getURLByKeywords(keywords: string): Promise<string> {
    const results = await google.youtube('v3').search.list(<any>{ part:'id, snippet', key: JSONFileHandler.privateKeys.youtubeAPI, maxResults: 1, q: keywords, type: 'video' });
    return YOUTUBE_LINK + results.data.items[0].id.videoId;
}