import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import BrainIcon from "../icons/BrainIcon";
import { BACKEND_URL } from "../config";



const PublicBrain = () => {
  const { shareLink } = useParams();
  const [content, setContent] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function getBrain() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
        setContent(res.data.content);
        setUsername(res.data.username);
      }
      catch (e) {
        console.error("Error while accesing link", e );
      }
    }

    getBrain();
  }, [shareLink]);
  

  return (
    <div className="bg-slate-100 min-h-screen p-4">
      <div className="flex items-center">
      <BrainIcon />
      <h1 className="font-bold text-2xl">{username}'s Brain</h1>
      </div>
      <div className="flex flex-wrap">
      {content.map(({ _id, type, link, title }) => (
              <Card
                key={_id}
                _id={_id}
                type={type}
                link={link}
                title={title}
              />
            ))}
            </div>
    </div>
  )
}

export default PublicBrain;
