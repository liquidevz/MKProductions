import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import LoadingOverlay from "./components/LoadingOverlay";
import WhatsAppButton from "./components/WhatsAppButton";

const getPath = () => window.location.pathname || "/";

// How long the loading veil stays up — a touch longer on first paint (a proper
// splash), brief on in-app route changes so navigation stays snappy.
const INITIAL_LOAD_MS = 1300;
const ROUTE_LOAD_MS = 650;

function App() {
  const [path, setPath] = useState(getPath);
  const [loading, setLoading] = useState(true);
  const [loadMs, setLoadMs] = useState(INITIAL_LOAD_MS);

  // Whenever loading switches on, schedule it back off.
  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), loadMs);
    return () => clearTimeout(timer);
  }, [loading, loadMs]);

  useEffect(() => {
    const sync = () => {
      setLoadMs(ROUTE_LOAD_MS);
      setLoading(true);
      setPath(getPath());
    };
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
        setLoadMs(ROUTE_LOAD_MS);
        setLoading(true);
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

  const renderPage = () => {
    if (page === "about") return <About />;
    if (page === "portfolio") return <Portfolio chapterId={param} />;
    if (page === "contact") return <Contact />;
    if (page === "blog") return <Blog postId={param} />;
    if (page === "services") {
      // /services → overview; /services/<slug> → individual service page.
      return param ? <ServiceDetail slug={param} /> : <Services />;
    }
    return <Home />;
  };

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingOverlay key="loading-overlay" />}
      </AnimatePresence>
      {renderPage()}
      {/* Floating WhatsApp enquiry — present on every page */}
      <WhatsAppButton />
    </>
  );
}

export default App;
