const Logo = ({ size = 46, withWordmark = true }) => {
  return (
    <a href="/" className="flex items-center gap-3">
      {/* True logo mark: yellow disc, gray MK */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="MK Productions logo"
      >
        <circle cx="50" cy="50" r="50" fill="#FFCC01" />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#727270"
          fontFamily="Manrope, sans-serif"
          fontWeight="800"
          fontSize="42"
          letterSpacing="-2"
        >
          MK
        </text>
      </svg>
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-xl font-bold tracking-tight text-white">
            MK PRODUCTIONS
          </span>
          <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.28em] text-steel-100">
            Photography | Cinematography
          </span>
        </span>
      )}
    </a>
  );
};

export default Logo;
