import heroImage from "/hero-photographer.png";

// The signature hero visual: a photographer set inside an upside-down yellow
// arch. Two aligned copies of the cutout — layer A is clipped inside the arch
// (head fills the top); layer B is the same figure with its top clipped away so
// only the lower hand + camera spill past the arch bottom onto white. Both imgs
// share identical position/size so they line up seamlessly. Sits on a white
// background (the spill-out relies on it).
const ArchPortrait = ({ className = "" }) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative h-[26rem] w-64 sm:h-[32rem] sm:w-80 lg:h-[38rem] lg:w-[22rem]">
        {/* Layer A — figure clipped to the yellow arch */}
        <div className="absolute inset-0 overflow-hidden rounded-b-full bg-brand">
          <img
            alt="MK Productions photographer with camera equipment"
            src={heroImage}
            className="absolute left-1/2 -top-64 -ml-8 h-[72rem] w-auto max-w-none -translate-x-1/2 sm:-top-80 sm:-ml-12 sm:h-[88rem] lg:-top-96 lg:-ml-16 lg:h-[100rem]"
          />
        </div>
        {/* Layer B — same figure, only the camera/hand below the arch */}
        <img
          aria-hidden="true"
          src={heroImage}
          style={{ clipPath: "polygon(0% 0%, 46% 0%, 46% 100%, 0% 100%)" }}
          className="pointer-events-none absolute left-1/2 -top-64 -ml-8 z-10 h-[72rem] w-auto max-w-none -translate-x-1/2 sm:-top-80 sm:-ml-12 sm:h-[88rem] lg:-top-96 lg:-ml-16 lg:h-[100rem]"
        />
      </div>
    </div>
  );
};

export default ArchPortrait;
