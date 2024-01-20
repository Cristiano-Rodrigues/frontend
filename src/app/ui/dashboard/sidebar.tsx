import Logo from "../logo";
import { NavLinks } from "./nav-links";

export function Sidebar () {
  return (
    <div className="w-[300px] h-full shrink-0 bg-gray-300 p-6">
      <Logo
        className="mb-16"
      />
      <NavLinks />
    </div>
  )
}