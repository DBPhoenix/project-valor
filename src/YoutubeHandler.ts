import { google } from 'googleapis';

import * as JSONFileHandler from './JSONFileHandler';

const YOUTUBE_LINK: string = 'https://www.youtube.com/watch?v=';

export async function getURLByKeywords(keywords: string): Promise<string | null> {
  const results = await google.youtube('v3').search.list(<any>{
    part: 'id, snippet', key: JSONFileHandler.privateKeys.youtubeAPI, maxResults: 1, q: keywords, type: 'video',
  });

  const { items } = results.data;

  if (!items) {
    throw Error();
  }

  const videoId = items[0].id?.videoId;

  if (!videoId) {
    return null;
  }

  return YOUTUBE_LINK + items[0].id?.videoId;
}
