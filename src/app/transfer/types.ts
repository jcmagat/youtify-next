export type Playlist = {
  id?: string;
  name: string;
  description: string;
  image?: string;
  tracks?: string[]; // TODO: make required
};

export type TransferData = {
  source: string;
  destination: string;
  playlists: Playlist[];
};
