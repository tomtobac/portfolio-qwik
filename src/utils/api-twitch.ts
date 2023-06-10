type ResponseType = {
    status: number;
    json: () => Promise<any>;
  };
  
  export class Twitch {
    private static instance: Twitch;
    private clientID = "ytiy2g7jgjoo49mp7mq1mujad2kf82";
    private accessToken?: string;
    private user?: any;
    private channel?: any;
    private followers?: any;
    private clips?: any;
    private channelChatBadges?: any;
    private category: any;
    private schedule: any;
    private streams: any | undefined;
    private videos: any | undefined;
  
    constructor() {
      if (!Twitch.instance) {
        Twitch.instance = this;
      } else {
        return Twitch.instance;
      }
    }
  
    set setFollowers(followers: any) {
      this.followers = followers;
    }
  
    set setToken(token: string) {
      this.accessToken = token;
    }
  
    set setClips(clips: any) {
      this.clips = clips;
    }
  
    set setChannel(channel: any) {
      this.channel = channel;
    }
  
    set setChannelChatBadges(chatBadges: any) {
      this.channelChatBadges = chatBadges;
    }
  
    async getToken(forceReload = false): Promise<string | undefined> {
      if (this.accessToken && !forceReload) {
        return this.accessToken;
      }
  
      const clientSecret = "5pyma9uaboj352mlsplp04liuj6fes";
      const tokenEndpoint = `https://id.twitch.tv/oauth2/token?client_id=${this.clientID}&client_secret=${clientSecret}&grant_type=client_credentials`;
  
      return fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((response: ResponseType) => {
        if (response.status < 200 || response.status > 299) {
          return;
        }
        return response.json();
      });
    }
  
    async getUser(
      userName: string,
      accessToken: string,
      forceReload = false
    ): Promise<any> {
      if (this.user && !forceReload) {
        return this.user;
      }
  
      const endpoint = `https://api.twitch.tv/helix/users?login=${userName}`;
  
      return fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": `${this.clientID}`,
        },
      })
        .then((response: ResponseType) => response.json())
        .catch((error) => console.error(error));
    }
  
    async getChannel(
      userName: string,
      accessToken: string,
      forceReload = false
    ): Promise<any> {
      if (this.channel && !forceReload) {
        return this.channel;
      }
  
      const endpoint = (channelName: string) =>
        `https://api.twitch.tv/helix/channels?broadcaster_id=${channelName}`;
  
      return fetch(endpoint(userName), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": `${this.clientID}`,
        },
      })
        .then((response: ResponseType) => response.json())
        .catch((error) => console.error(error));
    }
  
    async getFollowers(
      channelID: string,
      accessToken: string,
      forceReload = false
    ): Promise<any> {
      const endpoint = (id: string) =>
        `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${id}`;
  
      if (this.followers && !forceReload) {
        return this.followers;
      }
  
      return fetch(endpoint(channelID), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": `${this.clientID}`,
        },
      })
        .then((response: ResponseType) => response.json())
        .catch((error) => console.error(error));
    }
  
    async getClips(
      channelID: string,
      accessToken: string,
      forceReload = false
    ): Promise<any> {
      const endpoint = (id: string) =>
        `https://api.twitch.tv/helix/clips?broadcaster_id=${id}`;
  
      if (this.clips && !forceReload) {
        return this.clips;
      }
  
      return fetch(endpoint(channelID), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": `${this.clientID}`,
        },
      })
        .then((response: ResponseType) => response.json())
        .catch((error) => console.error(error));
    }
  
    async getCategory(
      gameID: string,
      accessToken: string,
      forceReload = false
    ): Promise<any> {
      const endpoint = (id: string) =>
        `https://api.twitch.tv/helix/games?id=${id}`;
  
      if (this.category && !forceReload) {
        return this.category;
      }
  
      return fetch(endpoint(gameID), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": `${this.clientID}`,
        },
      })
        .then((response: ResponseType) => response.json())
        .catch((error) => console.error(error));
    }
  
    async getSchedule(
      userID: string,
      accessToken: string,
      forceReload = false
    ): Promise<any> {
      const endpoint = (id: string) =>
        `https://api.twitch.tv/helix/schedule?broadcaster_id=${id}`;
  
      if (this.schedule && !forceReload) {
        return this.schedule;
      }
  
      return fetch(endpoint(userID), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": `${this.clientID}`,
        },
      })
        .then((response: ResponseType) => response.json())
        .catch((error) => console.error(error));
    }
  
    async getChannelChatBadges(
      userID: string,
      accessToken: string,
      forceReload = false
    ): Promise<any> {
      const endpoint = (id: string) =>
        `https://api.twitch.tv/helix/chat/badges?broadcaster_id=${id}`;
  
      if (this.channelChatBadges && !forceReload) {
        return this.channelChatBadges;
      }
  
      return fetch(endpoint(userID), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": `${this.clientID}`,
        },
      })
        .then((response: ResponseType) => response.json())
        .catch((error) => console.error(error));
    }
  
    async searchChannels(
      query: string,
      accessToken: string,
      liveOnly: Boolean = false
    ): Promise<any> {
      const endpoint = `https://api.twitch.tv/helix/search/channels?query=${query}&live_only=${liveOnly}`;
  
      // if (this.channelChatBadges && !forceReload) {
      //   return this.channelChatBadges;
      // }
  
      return fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": `${this.clientID}`,
        },
      })
        .then((response: ResponseType) => response.json())
        .catch((error) => console.error(error));
    }

    async getVideos(
      userID: string,
      accessToken: string,
      forceReload = false
    ): Promise<any> {
      const endpoint = `https://api.twitch.tv/helix/videos?user_id=${userID}`;
  
      if (this.videos && !forceReload) {
        return this.videos;
      }
  
      return fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": `${this.clientID}`,
        },
      })
        .then((response: ResponseType) => response.json())
        .catch((error) => console.error(error));
    }
  
  
    async getStreams(
      userID: string,
      accessToken: string,
      forceReload = false
    ): Promise<any> {
      const endpoint = `https://api.twitch.tv/helix/streams?user_id=${userID}`;
  
      if (this.streams && !forceReload) {
        return this.streams;
      }
  
      return fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": `${this.clientID}`,
        },
      })
        .then((response: ResponseType) => response.json())
        .catch((error) => console.error(error));
    }
  }
  