export const isProd = process.env.NODE_ENV === "production";
export const isDev = !isProd;

export const LOCAL_ADDRESS = "http://localhost:5173";

export const PUBLIC_YOUTUBE_API_KEY = "AIzaSyC3O-zPANM6pcSOIY49QzaU66VJuCslKw4";
export const YOUTUBE_CHANNEL_ID = "UCJbPGzawDH1njbqV-D5HqKw";

export const TWITCH_CHANNEL_NAME = "ArturoZarzalejo";
export const TWTICH_CHANNEL_ID = "794553674";

export const API_GITHUB_URL = isProd
  ? "https://api.github.com/users/arturozarzalejo"
  : `${LOCAL_ADDRESS}/mocks/api-github-mock.json`;

export const API_GITHUB_REPOS_URL = isProd
  ? "https://api.github.com/users/arturozarzalejo/repos"
  : `${LOCAL_ADDRESS}/mocks/api-github-repos.json`;

export const API_YOUTUBE_URL = isProd
  ? `https://www.googleapis.com/youtube/v3/search?channelId=${YOUTUBE_CHANNEL_ID}&maxResults=10&channelType=any&type=video&order=date&part=snippet&key=${PUBLIC_YOUTUBE_API_KEY}`
  : `${LOCAL_ADDRESS}/mocks/api-youtube-mock.json`;
