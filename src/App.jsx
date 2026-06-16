import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";

const getPath = () => window.location.pathname || "/";

function App() {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const sync = () => setPath(getPath());
    window.addEventListener("popstate", sync);

    // Intercept clicks on internal links (href starting with "/") so they
    // navigate via the History API instead of doing a full page reload.
    // External links, mailto:/tel:, "#" anchors and new-tab clicks pass through.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = e.target.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;

      e.preventDefault();
      if (href !== window.location.pathname) {
        window.history.pushState({}, "", href);
      }
      setPath(getPath());
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("popstate", sync);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const [page, param] = path.split("/").filter(Boolean);

  if (page === "portfolio") return <Portfolio chapterId={param} />;
  if (page === "contact") return <Contact />;
  if (page === "blog") return <Blog postId={param} />;
  if (page === "services") return <Home scrollTo="services" />;
  return <Home />;
}

export default App;
