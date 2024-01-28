import Logo from "../logo";
import { NavLinks } from "./nav-links";

export function Sidebar () {
  return (
    <div className="w-16 md:w-[300px] h-full shrink-0 bg-lightGray p-2 md:p-6">
      <Logo />
      <NavLinks />
    </div>
  )
}