import { FC, HTMLAttributes, useState } from "react";
import { cn } from "../lib/utils";
import {
  AppLogo,
  BookmarkLogo,
  HomeLogo,
  MovieLogo,
  SearchLogo,
  TVSeriesLogo,
} from "../components/logos";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import axios from "axios";
import { logout } from "../store/features/auth/authSlice";

interface NavBarProps extends HTMLAttributes<HTMLDivElement> {}

const NavBar: FC<NavBarProps> = ({ className, ...props }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = async () => {
    if (!auth.status) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/auth/logout");

      if (response.data) {
        // if logout is successful we can show a toast message and update the store
        dispatch(logout());
      }
    } catch (error) {
      console.error("Error in logging out", error);
    }
  };

  return (
    <div
      className={cn(
        "bg-secondary relative lg:h-[98vh] flex items-center gap-10 flex-row lg:flex-col px-4 py-1 pb-2 text-onSecondary text-heading-lg rounded-xl ",
        className
      )}
      {...props}
    >
      <Link to="/">
        <AppLogo className="inline-block cursor-pointer hover:text-primary text-heading-lg h-8 w-8 text-primary" />
      </Link>
      <span className="flex flex-col gap-5 flex-grow">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? "text-onSurface" : "text-muted"} text-heading-lg`
          }
        >
          {({ isActive }) => (
            <HomeLogo
              className={cn(
                "transition-colors duration-200 ease-in-out hover:text-onSurface h-6 w-6",
                isActive ? "text-onSurface" : "text-muted"
              )}
            />
          )}
        </NavLink>

        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `${isActive ? "text-onSurface" : "text-muted"} text-heading-lg`
          }
        >
          {({ isActive }) => (
            <MovieLogo
              className={cn(
                "transition-colors duration-200 ease-in-out hover:text-onSurface h-6 w-6",
                isActive ? "text-onSurface" : "text-muted"
              )}
            />
          )}
        </NavLink>

        <NavLink
          to="/tv-shows"
          className={({ isActive }) =>
            `${isActive ? "text-onSurface" : "text-muted"} text-heading-lg`
          }
        >
          {({ isActive }) => (
            <TVSeriesLogo
              className={cn(
                "transition-colors duration-200 ease-in-out hover:text-onSurface h-6 w-6",
                isActive ? "text-onSurface" : "text-muted"
              )}
            />
          )}
        </NavLink>

        <NavLink
          to="/bookmarks"
          className={({ isActive }) =>
            `${isActive ? "text-onSurface" : "text-muted"} text-heading-lg`
          }
        >
          {({ isActive }) => (
            <BookmarkLogo
              className={cn(
                "transition-colors duration-200 ease-in-out hover:text-onSurface h-6 w-6",
                isActive ? "text-onSurface" : "text-muted"
              )}
            />
          )}
        </NavLink>
      </span>
      <span
        className=" cursor-pointer inline-block border-2 self-end border-onTertiary/70 rounded-full overflow-hidden w-8 h-8"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={
            auth.userData?.userImage ||
            "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg"
          }
          alt="p"
          className="object-cover w-full"
        />
      </span>
      <span
        className={`absolute bottom-10 -left-2/5 w-28 h-16 z-10 transition-opacity duration-300 ease-in-out flex items-center justify-center p-2 ${isOpen ? "opacity-100" : "opacity-0"} bg-black/60 rounded-lg shadow-lg`}
      >
        <button
          onClick={handleClick}
          className={`text-base font-sans font-medium text-onSurface/80 px-2 py-1 rounded-md ${auth.status ? "bg-red-500" : "bg-green-500"}`}
        >
          {auth.status ? "Logout" : "Login"}
        </button>
      </span>
    </div>
  );
};

interface SearchProps extends HTMLAttributes<HTMLDivElement> {}

const Search: FC<SearchProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "h-14 py-3 px-4 rounded-full text-onSecondary w-1/2 flex gap-4 items-center bg-inherit",
        className
      )}
      {...props}
    >
      <SearchLogo className="text-heading-lg h-6 w-6" />
      <input
        className="w-[90%] h-full bg-inherit outline-none border-b-[0.5px] focus:border-onSecondary border-muted/40 transition duration-300 ease-in caret-primary text-onSecondary px-2 font-sans font-light
        placeholder:font-sans placeholder:font-light placeholder:text-muted/60 focus:border-muted/100"
        type="text"
        name="search"
        id="search-box"
        placeholder="Search for movie or TV show"
      />
    </div>
  );
};

export { NavBar, Search };
