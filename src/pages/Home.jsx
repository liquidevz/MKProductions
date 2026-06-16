import RoundedDrawerNav from "../components/RoundedDrawerNav";
import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import RibbonLogos from "../components/RibbonLogos";
import { NAV_LINKS } from "../navLinks";

const Home = () => {
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
      </RoundedDrawerNav>
    </div>
  );
};

export default Home;
