import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";

// Tiny hash router. The route is the path after "#", ignoring any
// "?section" suffix used by in-page anchors (e.g. "#/portfolio?quality").
const getRoute = () =>
  window.location.hash.replace(/^#/, "").split("?")[0] || "/";

function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route === "/portfolio") return <Portfolio />;
  return <Home />;
}

export default App;
