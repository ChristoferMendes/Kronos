import { VideoType } from "@/lib/types/video.types";

interface VideoOptions {
  fps: number;
  quality: number;
  volume: number;
  type: VideoType;
}

export function buildVideoStream(videoId: string, options: VideoOptions) {
  const { fps, volume, quality } = options;
  const audioType = options.type === "screen" ? "desktop" : "window";

  const constraints = {
    audio:
      volume === 0
        ? false
        : {
            mandatory: {
              chromeMediaSource: audioType,
            },
          },
    video: {
      mandatory: {
        framerate: {
          ideal: fps,
        },
        width: { ideal: quality === 1080 ? 1920 : quality === 720 ? 1280 : 854 },
        height: { ideal: quality === 1080 ? 1080 : quality === 720 ? 720 : 480 },
        chromeMediaSource: "desktop",
        chromeMediaSourceId: videoId,
      },
    },
  } as MediaStreamConstraints;

  return navigator.mediaDevices.getUserMedia(constraints);
}

export function buildMicAudioStream() {
  const constraints = {
    audio: true,
    video: false,
  } as MediaStreamConstraints;

  return navigator.mediaDevices.getUserMedia(constraints);
}

export function mergeAudios(screenStream: MediaStream, micStream: MediaStream) {
  const audioContext = new AudioContext();

  const desktopAudioSource = audioContext.createMediaStreamSource(screenStream);
  const micAudioSource = audioContext.createMediaStreamSource(micStream);

  const destination = audioContext.createMediaStreamDestination();

  desktopAudioSource.connect(destination);
  micAudioSource.connect(destination);

  const combinedStream = new MediaStream();
  screenStream.getVideoTracks().forEach((track) => combinedStream.addTrack(track));
  destination.stream.getAudioTracks().forEach((track) => combinedStream.addTrack(track));

  return combinedStream;
}
