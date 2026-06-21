import RoundedDrawerNav from "../components/RoundedDrawerNav";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import RibbonLogos from "../components/RibbonLogos";
import BlogCarousel from "../components/BlogCarousel";
import { NAV_LINKS } from "../navLinks";
import { useScrollToSection } from "../useScrollToSection";

const Home = ({ scrollTo }) => {
  // /services renders Home and scrolls to the Services section.
  useScrollToSection(scrollTo);

  return (
    <div className="bg-steel-700">
      <RoundedDrawerNav
        links={NAV_LINKS}
        navBackground="bg-steel-700"
        bodyBackground="bg-white"
      >
        <Hero />
        <RibbonLogos />
        <AboutSection />
        <ServicesSection />
        <BlogCarousel />
      </RoundedDrawerNav>
    </div>
  );
};

export default Home;
