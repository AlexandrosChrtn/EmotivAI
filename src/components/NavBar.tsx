import { Link, useLocation } from "react-router-dom";
import React from "react";
import { Menu } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
const links = [{
  name: "Home",
  to: "/"
}, {
  name: "Workbench",
  to: "/workbench"
}, {
  name: "Gallery",
  to: "/gallery"
}];
const NavBar: React.FC = () => {
  const {
    pathname
  } = useLocation();
  const [open, setOpen] = React.useState(false);

  // Utility to close the popover when a link is clicked
  const handleLinkClick = () => setOpen(false);
  return <header className="w-full px-4 sm:px-8 pt-8 flex items-center justify-between z-20 relative">
      <Link to="/" className="focus:outline-none group" aria-label="Go to homepage" style={{
      minWidth: 0
    }}>
        <h1 className="font-playfair font-bold tracking-tight bg-gradient-to-r from-[#eecda3] to-[#ef629f] text-transparent bg-clip-text transition-opacity group-active:opacity-70 whitespace-nowrap text-5xl">
          Emotivo
        </h1>
      </Link>
      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-7 text-lg font-medium">
        {links.map(({
        name,
        to
      }) => <Link key={name} to={to} className={`nav-link-underline transition-colors pb-1 ${pathname === to ? "text-primary" : "text-foreground/90"}`} aria-current={pathname === to ? "page" : undefined}>
            {name}
          </Link>)}
      </nav>
      {/* Hamburger Menu for Mobile & Tablet */}
      <div className="md:hidden flex items-center">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="p-2 rounded-full hover:bg-accent transition" aria-label="Open menu">
              <Menu size={28} />
            </button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="end" className="w-48 mt-2 px-0 py-2 rounded-xl shadow-lg">
            <div className="flex flex-col gap-2">
              {links.map(({
              name,
              to
            }) => <Link key={name} to={to} className={`block w-full px-5 py-2 font-medium text-lg rounded hover:bg-accent transition ${pathname === to ? "text-primary" : "text-foreground"}`} aria-current={pathname === to ? "page" : undefined} onClick={handleLinkClick}>
                  {name}
                </Link>)}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>;
};
export default NavBar;