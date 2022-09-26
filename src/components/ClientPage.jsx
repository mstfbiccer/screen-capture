import { useState } from "react";

const ClientPage = () => {
  const [outputImage, setImage] = useState(""); 
  const WS_URL = "ws://localhost:8080";
  const ws = new WebSocket(WS_URL);
  ws.onmessage = (message) => {
    // set the base64 string to the src tag of the image
    setImage(message.data);
  };

  return(
    <img src={outputImage} alt="" />
  );
};

export default ClientPage;