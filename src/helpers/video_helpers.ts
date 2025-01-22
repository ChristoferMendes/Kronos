export function buildVideoStream(videoId: string) {
  const constraints = {
    audio: {
      mandatory: {
        chromeMediaSource: "desktop",
      },
    },
    video: {
      mandatory: {
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
