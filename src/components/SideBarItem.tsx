import type { ReactElement } from "react";

const SideBarItem = ({ text, icon }: { text: string; icon: ReactElement }) => {
  return (
    <div className="flex p-2 m-2 border-1 border-black/60 rounded-md cursor-pointer hover:bg-slate-200 transition-all duration-200">
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </div>
  );
};

export default SideBarItem;
