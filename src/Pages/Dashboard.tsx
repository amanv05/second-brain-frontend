import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import Card from "../components/Card";
import CreateContentModal from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import SideBar from "../components/SideBar";
import useContent from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const [filterType, setFilterType] = useState<"all" | "youtube" | "twitter">("all");

  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin", { replace: true });
    }
  }, [isAuthenticated, navigate]);


  function handleAddContent() {
    if (!isAuthenticated) {
      alert("You need to sign in before adding content");
      navigate("/signin", { replace: true });
      return;
    }
    setModalOpen(true);
  }


  async function deleteContent(id: string) {
    if (!token) return;

    await axios.delete(`${BACKEND_URL}/api/v1/content`, {
      headers: { Authorization: token },
      data: { contentID: id },
    });
    refresh();
  }


  async function sharelink() {
    if (!token) return;

    const response = await axios.post(
      `${BACKEND_URL}/api/v1/brain/share`,
      { share: true },
      { headers: { Authorization: token } }
    );

    const hash = response.data.hash;
    const shareUrl = `${BACKEND_URL}/api/v1/brain/${hash}`;
    await navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard");
  }


  useEffect(() => {
    refresh();
  }, [modalOpen]);

 
  if (!isAuthenticated) return null;

  return (
    <div>
      <SideBar onFilterChange={(type) => setFilterType(type)} />
      <div className="p-4 ml-72 min-h-screen bg-slate-100">
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />

        <div className="flex justify-end pr-8">
          <Button
            variant="secondary"
            text="Share Brain"
            size="md"
            startIcon={<ShareIcon size="lg" />}
            onClick={sharelink}
          />
          <Button
            onClick={handleAddContent}
            variant="primary"
            text="Add Content"
            size="md"
            startIcon={<PlusIcon size="lg" />}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {contents
            .filter((content) => filterType === "all" || content.type?.toLowerCase().trim() === filterType.toLowerCase())
            .map(({ _id, type, link, title }) => (
              <Card
                key={_id}
                _id={_id}
                type={type}
                link={link}
                title={title}
                onDelete={deleteContent}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
