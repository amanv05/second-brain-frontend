import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface ContentTypes {
    _id:  string;
    type: "twitter" | "youtube";
    link: string;
    title: string;
    onDelete: (id: string) => void;
}


const useContent = () => {
    const [contents, setContents] = useState<ContentTypes[]>([]);

    function refresh() {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then((response) => {
            setContents(response.data.content);
        })
    }

    useEffect(() => {
        refresh();
        let interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);
    return { contents, refresh, }
    
}

export default useContent
