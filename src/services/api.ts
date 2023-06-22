import {
  API_GITHUB_REPOS_URL,
  API_GITHUB_URL,
  API_YOUTUBE_URL,
  TWITCH_CHANNEL_NAME,
  TWTICH_CHANNEL_ID,
} from "~/constant";
import { Twitch } from "~/utils/api-twitch";

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
    TWTICH_CHANNEL_ID,
    token,
    true
  );

  const [userInfo, categoryInfo, streams, videos] = await Promise.all([
    apiTwitch.getUser(TWITCH_CHANNEL_NAME, token, true),
    apiTwitch.getCategory(channelInfo.data[0].game_id, token, true),
    apiTwitch.getStreams(TWTICH_CHANNEL_ID, token, true),
    apiTwitch.getVideos(TWTICH_CHANNEL_ID, token, true),
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
  };
}
