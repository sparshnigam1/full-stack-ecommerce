import BellIcon from "../icons/bellIcon";
import { Badge } from "../ui/badge";
import CustomAvatar from "./customAvatar";

const DashboardHeader = () => {
  return (
    <header className="w-full px-4 md:px-6 pb-4 md:pb-5 pt-4 flex flex-col">
      <div className="w-full h-14 bg-white flex items-center justify-between gap-4 shadow p-3 rounded-lg overflow-hidden">
        <h4 className="relative flex-1 text-base font-medium">
          <span className="text-primary font-semibold text-lg">Welcome,</span>{" "}
          Rahul
        </h4>
        <div className="flex items-center justify-end gap-4">
          <span className="relative aspect-square p-2.5 rounded-std bg-primary-white cursor-pointer">
            <Badge className="absolute top-3 right-4 outline-2 outline-white bg-primary p-[2.3px] rounded-full aspect-square" />
            <BellIcon />
          </span>
          <CustomAvatar
            src="https://avatars.githubusercontent.com/u/77981238?v=4"
            fallback="Rahul Mondal"
            className="size-9"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
