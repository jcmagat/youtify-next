export enum Service {
  None = "",
  Spotify = "spotify",
  YouTube = "youtube",
}

export type Track = {
  id: string;
  image?: string;
  name: string;
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  image?: string;
  tracks: Track[];
};

export type TransferData = {
  source: Service;
  destination: Service;
  playlists: Playlist[];
};

export type TransferStepProps = TransferData & {
  updateData: (data: Partial<TransferData>) => void;
  stepForward: () => void;
};
