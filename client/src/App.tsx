import { Outlet } from "react-router-dom";
import { NavBar, Search } from "./pages/Layout";

function App() {
  return (
    <div className={`flex flex-col lg:flex-row gap-2 px-2 py-4`}>
      <NavBar />
      <div className="w-full flex flex-col items-start">
        <Search className="w-full" />
        <div className="p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
