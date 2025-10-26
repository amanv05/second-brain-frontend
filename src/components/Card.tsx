import DeleteIcon from "../icons/DeleteIcon";
import ShareIcon from "../icons/ShareIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";

interface CardProps {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  onDelete?: (id: string) => void;
}

const Card = ({ _id, title, link, type, onDelete }: CardProps) => {
  const renderIcon = () => {
    switch (type) {
      case "youtube":
        return <YoutubeIcon size="lg" />;
      case "twitter":
        return <TwitterIcon size="lg" />;
    }
  };

  return (
    <div className="bg-white p-4 ml-4 mt-4 rounded-md max-w-72 min-h-48 min-w-72 border-1 border-black/10">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          {renderIcon()}
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-1">
          <div>
            <a href={link} target="_blank">
              <ShareIcon size="lg" />
            </a>
          </div>
          <div>
            {onDelete && (
              <button
                className="cursor-pointer flex items-center"
                onClick={() => {
                  onDelete(_id);
                }}
              >
                <DeleteIcon size="lg" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="pt-4">
        {type === "youtube" && link && (
          <iframe
            className="w-full aspect-video rounded-sm"
            src={
              link.includes("youtu.be")
                ? `https://www.youtube.com/embed/${link.split("/").pop()?.split("?")[0] ?? ""
                }`
                : `https://www.youtube.com/embed/${new URLSearchParams(new URL(link).search).get("v") ?? ""
                }`
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};

export default Card;
