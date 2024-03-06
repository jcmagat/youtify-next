export type Playlist = {
  id?: string;
  name: string;
  description: string;
  image?: string;
  tracks?: string[]; // TODO: make required
};
