import BrainIcon from "../icons/BrainIcon"
import TwitterIcon from "../icons/TwitterIcon"
import YoutubeIcon from "../icons/YoutubeIcon"
import SideBarItem from "./SideBarItem"

interface SideBarProps {
  onFilterChange: (type: "all" | "youtube" | "twitter") => void;
}


const SideBar = ({ onFilterChange }: SideBarProps) => {
  return (
    <div className="h-screen bg-white border-r-2 border-blue-500 w-76 fixed left-0 top-0 p-2">
      <div className="p-2 flex items-center">
        <button onClick={() => onFilterChange("all")}>
        <BrainIcon />
        </button>
        <h1 className="text-2xl font-bold">Second Brain</h1>
      </div>
      <div>
      <button className="w-full" onClick={() => onFilterChange("twitter") }>
      <SideBarItem icon={<TwitterIcon size="lg"/>} text="Tweets" />
      </button>
      </div>
      <div>
      <button className="w-full" onClick={() => onFilterChange("youtube")}>
      <SideBarItem icon={<YoutubeIcon size="lg"/>} text="Youtube" />
      </button>
      </div>
    </div>
  )
}

export default SideBar
