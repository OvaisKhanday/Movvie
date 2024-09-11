import { FC, HTMLAttributes } from "react";
import { cn } from "../lib/utils";
import {
  AppLogo,
  BookmarkLogo,
  HomeLogo,
  MovieLogo,
  SearchLogo,
  TVSeriesLogo,
} from "../components/logos";

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {}

const Layout: FC<LayoutProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("flex flex-col lg:flex-row gap-2 p-2", className)}
      {...props}
    >
      <NavBar />
      <div className="lg:flex-grow">
        <Search />
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {}

const NavBar: FC<NavBarProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-secondary lg:min-h-[98vh] flex items-center gap-2 flex-row lg:flex-col p-4 text-onSecondary text-heading-lg",
        className
      )}
      {...props}
    >
      <AppLogo className="cursor-pointer hover:text-primary text-heading-lg h-8 w-8 text-primary" />
      <span className="flex-1" />
      <HomeLogo className="cursor-pointer hover:text-primary text-heading-lg h-6 w-6 text-onSurface" />
      <MovieLogo className="cursor-pointer hover:text-primary text-heading-lg h-6 w-6 text-muted" />
      <TVSeriesLogo className="cursor-pointer hover:text-primary text-heading-lg h-6 w-6 text-muted" />
      <BookmarkLogo className="cursor-pointer hover:text-primary text-heading-lg h-6 w-6 text-muted" />
      <span className="flex-1 lg:flex-[10]" />
      <span className="rounded-full bg-primary w-8 h-8"></span>
    </div>
  );
};

interface SearchProps extends HTMLAttributes<HTMLDivElement> {}

const Search: FC<SearchProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "h-12 p-2 rounded-lg text-onSecondary w-full flex gap-4 items-center bg-secondary",
        className
      )}
      {...props}
    >
      <SearchLogo className="text-heading-lg h-6 w-6" />
      <input
        className="w-full h-full bg-secondary  focus:outline-none border-b-2 focus:border-onSecondary border-muted text-onSecondary px-4"
        type="text"
        name="search"
        id="search-box"
      />
    </div>
  );
};

export { NavBar, Search };
