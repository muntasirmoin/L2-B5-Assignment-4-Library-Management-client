import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1.5 rounded-md text-sm transition-all duration-200
   ${
     isActive
       ? "border border-b-blue-900 font-bold bg-[#fcfbfb]  text-blue-900"
       : "text-gray-700 font-bold hover:border hover:border-b-blue-400 hover:bg-[#fcfbfb]  hover:text-blue-500"
   }`;

  return (
    //
    <header className="sticky top-0 z-50 w-full bg-[#eeeef5]  text-gray-900">
      <nav className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6 ">
        {/* App Title Book!Nest */}
        <NavLink
          to="/"
          end
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500"
        >
          Book!Nest
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-300">
          <NavLink to="/" end className={navClasses}>
            Home
          </NavLink>

          <NavLink to="/books" className={navClasses}>
            All Books
          </NavLink>
          <NavLink to="/create-book" className={navClasses}>
            Add Book
          </NavLink>
          <NavLink to="/borrow-summary" className={navClasses}>
            Borrow Summary
          </NavLink>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-6">
              <SheetHeader>
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
                  Book!Nest
                </div>
              </SheetHeader>
              <nav className="flex flex-col gap-4 text-gray-700 dark:text-gray-300 text-base font-medium">
                <NavLink to="/" end className={navClasses}>
                  Home
                </NavLink>

                <NavLink to="/books" className={navClasses}>
                  All Books
                </NavLink>
                <NavLink to="/create-book" className={navClasses}>
                  Add Book
                </NavLink>
                <NavLink to="/borrow-summary" className={navClasses}>
                  Borrow Summary
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
