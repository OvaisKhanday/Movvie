import {
  AppLogo,
  BookmarkLogo,
  HomeLogo,
  HyperlinkLogo,
  MovieLogo,
  SearchLogo,
  StarFilledLogo,
  StarLogo,
  TmdbLogo,
  TVSeriesLogo,
} from "./assets/logos";

function App() {
  return (
    <div className="p-10 bg-surface text-onSurface h-full w-full">
      <p className="text-heading-lg">Heading large</p>
      <p className="text-heading-md">Heading md</p>
      <p className="text-heading-sm">Heading small</p>
      <p className="text-heading-xs">Heading extra small</p>
      <p className="text-body-md">Body Medium</p>
      <p className="text-body-sm">Body small</p>

      <HomeLogo className="text-primary " />
      <MovieLogo />
      <TVSeriesLogo />
      <BookmarkLogo />
      <AppLogo />
      <SearchLogo />
      <StarLogo className=" text-primary" />
      <StarFilledLogo className="text-primary " />
      <HyperlinkLogo />
      <TmdbLogo />
    </div>
  );
}

export default App;
