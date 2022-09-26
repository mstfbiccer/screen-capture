import { useRef } from "react";

/**
 * ScreenOutput component function
 * @returns React component
 */
const ScreenOutput = () => {
  const recordData = useRef(null);
  let sendFrameInterval;

  const displayMediaOptions = {
    video: {
      cursor: "always",
    },
    audio: false,
  };

  /**
   * Start capture and send msg on ws.
   * @function
   */
  const startRecording = async () => {
    try {
      recordData.current.srcObject =
        await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      recordData.current.autoplay = true;
      recordData.current.muted = false;
      const video = recordData.current;
      const WS_URL = "ws://localhost:8080";
      const FPS = 3;
      const ws = new WebSocket(WS_URL);
      sendFrameInterval = setInterval(() => {
        ws.send(getFrame(video));
      }, 1000 / FPS);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

  /**
   * This function allows to split the video into image parts.
   * @param {element} video 
   * @returns svg img data
   */
  const getFrame = (video) => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const data = canvas.toDataURL("image/png");
    return data;
  };

  const stopRecording = () => {
    let tracks = recordData.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    recordData.srcObject = null;
    clearInterval(sendFrameInterval);
  };

  return (
    <div className="container">
      <div className="video-controller">
        <button onClick={startRecording}>Start Capture</button>
        <button onClick={stopRecording}>Stop Capture</button>
      </div>
      <div className="output-container">
        <video ref={recordData} autoPlay></video>
      </div>
    </div>
  );
};

export default ScreenOutput;
