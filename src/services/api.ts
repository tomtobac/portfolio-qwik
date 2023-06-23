import {
  API_GITHUB_REPOS_URL,
  API_GITHUB_URL,
  API_YOUTUBE_URL,
  TWITCH_CHANNEL_NAME,
  TWITCH_CHANNEL_ID,
} from "~/constant";
import { Twitch } from "~/utils/api-twitch";

// https://www.googleapis.com/youtube/v3/channels?part=statistics&key=AIzaSyDjyp6v1Zb1SV8JdeoV-rLT_rR1MONAL9U&id=MiYTCF_Z8OQ&id=UCJbPGzawDH1njbqV-D5HqKw

export async function getYoutubeVideos() {
  try {
    const response = await fetch(API_YOUTUBE_URL);
    if (!response.ok) {
      throw new Error();
    }
    const { items } = await response.json();
    return items;
  } catch (error) {
    console.error("Error al obtener los shorts y videos:", error);
  }
}

export async function getGithubRepos() {
  try {
    const response = await fetch(API_GITHUB_REPOS_URL);
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    return data.sort((a: any, b: any) =>
      b.pushed_at.localeCompare(a.pushed_at)
    );
  } catch (error) {
    console.error("Error al obtener los repositorios:", error);
  }
}

export async function getGithubUser() {
  try {
    const response = await fetch(API_GITHUB_URL);
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los repositorios:", error);
  }
}

export async function getTwitchData() {
  const apiTwitch = new Twitch();
  const token = await apiTwitch.getToken();
  if (!token) throw new Error("No se pudo obtener el token de Twitch");

  const channelInfo = await apiTwitch.getChannel(
    TWITCH_CHANNEL_ID,
    token,
    true
  );

  const [userInfo, categoryInfo, streams, videos, chatEmotes] = await Promise.all([
    apiTwitch.getUser(TWITCH_CHANNEL_NAME, token, true),
    apiTwitch.getCategory(channelInfo.data[0].game_id, token, true),
    apiTwitch.getStreams(TWITCH_CHANNEL_ID, token, true),
    apiTwitch.getVideos(TWITCH_CHANNEL_ID, token, true),
    apiTwitch.getChannelChatEmotes(TWITCH_CHANNEL_ID, token, true),

  ]);

  const followers = await apiTwitch.getFollowers(
    userInfo.data[0].id,
    token,
    true
  );

  const totalViewCount = videos.data.reduce(
    (acc: number, video: any) => acc + video.view_count,
    0
  );

  return {
    userInfo,
    channelInfo,
    categoryInfo,
    token,
    streams,
    videos,
    followers,
    totalViewCount,
    chatEmotes
  };
}
