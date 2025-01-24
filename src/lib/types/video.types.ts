export type VideoType = "screen" | "window";

export type VideoSource = {
  id: string;
  name: string;
  type: VideoType;
};

export type VideoInfo = {
  name: string;
  extension: string;
  fileSizeInBytes: number;
}

export type GetVideosResponse = {
  label: string;
  color: string;
  files: VideoInfo[]
}

export type SelectedFile = {
  label: string;
  files: string[];
}