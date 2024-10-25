interface VideoProps {
  videoUrl: string;
}

export function Video({ videoUrl }: VideoProps) {
  if (videoUrl.includes("youtube")) {
    // Extract YouTube video ID
    const videoId = videoUrl.split("v=")[1];
    return (
      <iframe
        width="100%"
        height="auto"
        style={{ aspectRatio: "16/9" }}
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  } else {
    return (
      <video
        width="100%"
        height="auto"
        style={{ aspectRatio: "16/9" }}
        controls
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
}
