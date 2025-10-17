import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import InputBox from "./InputBox";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateContentModal = ({
  open,
  onClose,
}: CreateContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        title: title,
        link: link,
        type: type,
      },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    onClose();
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-500/60 fixed top-0 left-0 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded-md">
              <div
                className="flex justify-end cursor-pointer"
                onClick={onClose}
              >
                <CrossIcon size="lg" />
              </div>
              <div>
                <InputBox ref={titleRef} placeholder={"Title"} />
                <InputBox ref={linkRef} placeholder={"Link"} />
                <div className="flex items-center justify-center">
                  <h1 className="font-bold text-2xl p-2">Type</h1>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Button
                    text="Youtube"
                    size="sm"
                    variant={
                      type === ContentType.Youtube ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(ContentType.Youtube);
                    }}
                  ></Button>
                  <Button
                    text="Twitter"
                    size="sm"
                    variant={
                      type === ContentType.Twitter ? "primary" : "secondary"
                    }
                    onClick={() => {
                      setType(ContentType.Twitter);
                    }}
                  ></Button>
                </div>
                <div className="flex justify-center opacity-100 ">
                  <Button
                    variant="primary"
                    size="md"
                    text="Submit"
                    onClick={addContent}
                  />
                </div>
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModal;
