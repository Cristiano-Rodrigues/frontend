'use server'

import { BellIcon } from "@heroicons/react/24/outline";
import { UserProfileOptions } from "./user-profile-options";
import { fetchOutlets } from "@/lib/data/fetch";
import { CustomSelect } from "./custom-select";
import { getCurrentOutlet, getCurrentUser } from "@/lib/actions/cookies";

export async function Topbar () {
  const { id: userId } = await getCurrentUser();
  const outlets = await fetchOutlets(userId);
  const currentOutlet = await getCurrentOutlet();

  return (
    <div className="flex justify-between w-full h-[80px] bg-white px-6 py-4">
      <div className="flex items-start md:items-center gap-2 flex-col md:flex-row">
        <p>Escolha a farmácia</p>
        <CustomSelect selected={currentOutlet} outlets={outlets} />
      </div>
      <div className="flex items-center gap-2">
        <button className="flex justify-center items-center w-8 h-8 rounded-sm">
          <BellIcon className="w-5 h-5" />
        </button>
        <UserProfileOptions />
      </div>
    </div>
  )
}
