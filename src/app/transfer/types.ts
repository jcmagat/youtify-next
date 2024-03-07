export type Track = {
  id?: string;
  image?: string;
  name: string;
};

export type Playlist = {
  id?: string;
  name: string;
  description: string;
  image?: string;
  tracks?: Track[]; // TODO: make required
};

export type TransferData = {
  source: string;
  destination: string;
  playlists: Playlist[];
};
