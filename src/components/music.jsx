import React from "react";
import YouTube from "react-youtube";

function Music() {
  return (
    <YouTube
      videoId="ALZHF5UqnU4"
      opts={{
        width: "350",
        height: "220",
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
        },
      }}
      onEnd={(e) => {
        e.target.stopVideo(0);
      }}
    />
  );
}

export default Music;
