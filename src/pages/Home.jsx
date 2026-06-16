import RoundedDrawerNav from "../components/RoundedDrawerNav";
import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import RibbonLogos from "../components/RibbonLogos";
import BlogCarousel from "../components/BlogCarousel";
import { NAV_LINKS } from "../navLinks";
import { useScrollToSection } from "../useScrollToSection";

const Home = ({ scrollTo }) => {
  // /services renders Home and scrolls to the Services section.
  useScrollToSection(scrollTo);

  return (
    <div className="bg-steel-500">
      <RoundedDrawerNav
        links={NAV_LINKS}
        navBackground="bg-steel-500"
        bodyBackground="bg-white"
      >
        <Hero />
        <RibbonLogos />
        <ServicesSection />
        <BlogCarousel />
      </RoundedDrawerNav>
    </div>
  );
};

export default Home;
