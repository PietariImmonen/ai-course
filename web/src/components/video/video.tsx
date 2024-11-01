import ReactPlayer from "react-player";

interface VideoProps {
  src: string;
  type: "youtube" | "loom" | "storage";
}

const Video = ({ src, type }: VideoProps) => {
  if (type === "youtube") {
    return <ReactPlayer url={src} className="w-full h-full" />;
  }
  return <ReactPlayer url={src} className="w-full h-full" />;
};
export default Video;
