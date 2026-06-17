import React from "react";

interface WatchSVGProps {
  dialColor: "Black" | "Blue" | "Green" | "Champagne" | "Silver" | "Slate" | "Ice Blue" | "Chocolate" | "White" | "Meteorite";
  material: "Oystersteel" | "Yellow Gold" | "Everose Gold" | "White Gold" | "Platinum" | "Rolesor";
  bezelStyle: "Fluted" | "Polished" | "Cerachrom" | "Tachymeter";
  bracelet: "Oyster" | "Jubilee" | "President" | "Oysterflex";
  collection?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showHands?: boolean;
}

export const WatchSVG: React.FC<WatchSVGProps> = ({
  dialColor,
  material,
  bezelStyle,
  bracelet,
  collection = "",
  size = "md",
  showHands = true,
}) => {
  // Size mapping
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48 md:w-56 md:h-56",
    lg: "w-64 h-64 md:w-72 md:h-72",
    xl: "w-80 h-80 md:w-[350px] md:h-[350px]",
  };

  const idSuffix = `${dialColor}-${material}-${bezelStyle}-${bracelet}-${collection}`.replace(/[\s\(\)'",]/g, "-");

  // Determine core metals colors
  const getMetalColors = (mat: string) => {
    switch (mat) {
      case "Yellow Gold":
        return {
          primary: "#D4AF37",    // Solid gold mid
          light: "#F3E5AB",      // Gold shine
          dark: "#AA7C11",       // Rich shade
          bevel: "#B88A3E",
          braceletCenter: "#D4AF37",
          braceletOuter: "#D4AF37"
        };
      case "Everose Gold":
        return {
          primary: "#E5A990",    // warm pink rose gold
          light: "#FDF4F1",      // glossy pink
          dark: "#AA6955",       // shaded copper
          bevel: "#C98570",
          braceletCenter: "#E5A990",
          braceletOuter: "#E5A990"
        };
      case "Platinum":
        return {
          primary: "#CBD5E1",    // cool ice silver
          light: "#F8FAFC",      // bright reflection
          dark: "#64748B",       // slate tint
          bevel: "#94A3B8",
          braceletCenter: "#CBD5E1",
          braceletOuter: "#CBD5E1"
        };
      case "Rolesor": // Standard steel outer links, yellow gold center links, yellow gold bezel!
        return {
          primary: "#D1D5DB",    // steel
          light: "#F3F4F6",      // steel shine
          dark: "#4B5563",       // steel shadow
          bevel: "#D4AF37",      // Gold bezel!
          braceletCenter: "#D4AF37", // Gold center links!
          braceletOuter: "#D1D5DB"  // Steel outer links
        };
      case "White Gold":
        return {
          primary: "#E2E8F0",    // rich white gold
          light: "#FFFFFF",      // white glare
          dark: "#475569",       // dark nickel shadow
          bevel: "#CBD5E1",
          braceletCenter: "#E2E8F0",
          braceletOuter: "#E2E8F0"
        };
      case "Oystersteel":
      default:
        return {
          primary: "#CBD5E1",    // tough steel gray
          light: "#F1F5F9",      // brilliant luster shadow
          dark: "#475569",       // brushed metal charcoal
          bevel: "#94A3B8",
          braceletCenter: "#CBD5E1",
          braceletOuter: "#CBD5E1"
        };
    }
  };

  const metals = getMetalColors(material);

  // Dial color gradient definitions
  const getDialColors = (col: string) => {
    switch (col) {
      case "Blue":
        return { start: "#005691", end: "#001b3a", text: "#e2e8f0", isMetallic: true };
      case "Green":
        return { start: "#006644", end: "#002416", text: "#e2e8f0", isMetallic: true };
      case "Champagne":
        return { start: "#E5C49F", end: "#9C7853", text: "#2e251a", isMetallic: true };
      case "Silver":
        return { start: "#F1F5F9", end: "#94A3B8", text: "#1e293b", isMetallic: true };
      case "Slate":
        return { start: "#52525b", end: "#18181b", text: "#f4f4f5", isMetallic: true };
      case "Ice Blue":
        return { start: "#D6EFFFF", end: "#73A8C7", text: "#0f172a", isMetallic: true };
      case "Chocolate":
        return { start: "#634735", end: "#23150d", text: "#fbf7f5", isMetallic: true };
      case "White":
        return { start: "#FDFDFD", end: "#E2E8F0", text: "#0f172a", isMetallic: false };
      case "Meteorite":
        return { start: "#A1A1AA", end: "#27272a", text: "#fafafa", isMetallic: false, isMeteorite: true };
      case "Black":
      default:
        return { start: "#18181b", end: "#09090b", text: "#f4f4f5", isMetallic: false };
    }
  };

  const dial = getDialColors(dialColor);

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} select-none filter drop-shadow-2xl`}>
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        <defs>
          {/* Metallic Case Shading Gradients */}
          <linearGradient id={`case-grad-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={metals.light} />
            <stop offset="30%" stopColor={metals.primary} />
            <stop offset="70%" stopColor={metals.dark} />
            <stop offset="100%" stopColor={metals.light} />
          </linearGradient>

          <linearGradient id={`bevel-grad-${idSuffix}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={metals.light} />
            <stop offset="50%" stopColor={metals.bevel} />
            <stop offset="100%" stopColor={metals.dark} />
          </linearGradient>

          <linearGradient id={`gold-bevel-pure-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9E6" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="90%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>

          {/* Dial Radial Sunburst Gradient */}
          <radialGradient id={`dial-grad-${idSuffix}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={dial.start} />
            <stop offset="70%" stopColor={dial.start} stopOpacity="0.85" />
            <stop offset="100%" stopColor={dial.end} />
          </radialGradient>

          {/* Bezel Ring Ceramic Colors */}
          <linearGradient id={`cerachrom-grad-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            {collection.includes("Pepsi") ? (
              <>
                <stop offset="0%" stopColor="#1E3A8A" /> {/* Deep Royal Blue for upper GMT */}
                <stop offset="50%" stopColor="#1E3A8A" />
                <stop offset="50.1%" stopColor="#B91C1C" /> {/* Crimson Red for lower GMT */}
                <stop offset="100%" stopColor="#B91C1C" />
              </>
            ) : collection.includes("Starbucks") || collection.includes("Kermit") ? (
              <>
                <stop offset="0%" stopColor="#064E3B" /> {/* Dark Green Forest */}
                <stop offset="50%" stopColor="#047857" />
                <stop offset="100%" stopColor="#064E3B" />
              </>
            ) : collection.includes("Bruce Wayne") ? (
              <>
                <stop offset="0%" stopColor="#18181B" /> {/* Dark Slate Gray */}
                <stop offset="50%" stopColor="#18181B" />
                <stop offset="50.1%" stopColor="#4B5563" /> {/* Mid Gray */}
                <stop offset="100%" stopColor="#374151" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#1F2937" /> {/* Standard Cerachrom Black */}
                <stop offset="50%" stopColor="#111827" />
                <stop offset="100%" stopColor="#030712" />
              </>
            )}
          </linearGradient>

          {/* Bracelet Links Shading */}
          <linearGradient id={`link-outer-grad-${idSuffix}`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor={metals.braceletOuter} />
            <stop offset="50%" stopColor={metals.light} />
            <stop offset="100%" stopColor={metals.braceletOuter} stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id={`link-center-grad-${idSuffix}`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor={metals.braceletCenter} />
            <stop offset="40%" stopColor={material === "Rolesor" || material === "Yellow Gold" ? "#FFEEAA" : metals.light} />
            <stop offset="100%" stopColor={metals.braceletCenter} />
          </linearGradient>

          {/* Golden reflections */}
          <linearGradient id={`gold-shine-vertical-${idSuffix}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#FFEEAA" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>

          {/* Crystal shine glare */}
          <linearGradient id={`crystal-glare-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.03" />
            <stop offset="40.1%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.04" /> {/* AR Coating Blue halo */}
          </linearGradient>
        </defs>

        {/* ==================== BRACELET ==================== */}
        {bracelet !== "Oysterflex" ? (
          <g id="metal-bracelet" opacity="0.95">
            {/* Top Links */}
            <path d="M 85 -5 L 87 60 L 153 60 L 155 -5 Z" fill="#1f2937" opacity="0.1" />
            {bracelet === "Oyster" && (
              <g id="oyster-bracelet-top">
                {/* Columns representing three row Oyster links */}
                <rect x="76" y="-10" width="26" height="30" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="138" y="-10" width="26" height="30" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="102" y="-12" width="36" height="32" fill={`url(#link-center-grad-${idSuffix})`} rx="1" />

                <rect x="79" y="20" width="25" height="30" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="136" y="20" width="25" height="30" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="104" y="20" width="32" height="32" fill={`url(#link-center-grad-${idSuffix})`} rx="1" />
              </g>
            )}

            {bracelet === "Jubilee" && (
              <g id="jubilee-bracelet-top">
                {/* 5 columns, fine intricate link structure */}
                <rect x="76" y="-10" width="20" height="20" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="144" y="-10" width="20" height="20" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="96" y="-11" width="15" height="21" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />
                <rect x="111" y="-11" width="18" height="21" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />
                <rect x="129" y="-11" width="15" height="21" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />

                <rect x="78" y="10" width="19" height="22" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="143" y="10" width="19" height="22" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="97" y="10" width="15" height="22" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />
                <rect x="112" y="10" width="16" height="22" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />
                <rect x="128" y="10" width="15" height="22" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />

                <rect x="80" y="32" width="18" height="23" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="142" y="32" width="18" height="23" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="98" y="32" width="14" height="23" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />
                <rect x="112" y="32" width="16" height="23" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />
                <rect x="128" y="32" width="14" height="23" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />
              </g>
            )}

            {bracelet === "President" && (
              <g id="president-bracelet-top">
                {/* 3 columns but links are short and rounded, semi-circular profile */}
                <rect x="76" y="-10" width="22" height="18" fill={`url(#link-outer-grad-${idSuffix})`} rx="2" />
                <rect x="142" y="-10" width="22" height="18" fill={`url(#link-outer-grad-${idSuffix})`} rx="2" />
                <rect x="98" y="-11" width="44" height="19" fill={`url(#link-center-grad-${idSuffix})`} rx="3" />

                <rect x="78" y="8" width="21" height="18" fill={`url(#link-outer-grad-${idSuffix})`} rx="2" />
                <rect x="141" y="8" width="21" height="18" fill={`url(#link-outer-grad-${idSuffix})`} rx="2" />
                <rect x="99" y="7" width="42" height="20" fill={`url(#link-center-grad-${idSuffix})`} rx="3" />

                <rect x="80" y="26" width="20" height="18" fill={`url(#link-outer-grad-${idSuffix})`} rx="2" />
                <rect x="140" y="26" width="20" height="18" fill={`url(#link-outer-grad-${idSuffix})`} rx="2" />
                <rect x="100" y="25" width="40" height="20" fill={`url(#link-center-grad-${idSuffix})`} rx="3" />
              </g>
            )}

            {/* Bottom Links */}
            {bracelet === "Oyster" && (
              <g id="oyster-bracelet-bottom">
                <rect x="80" y="190" width="24" height="30" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="136" y="190" width="24" height="30" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="104" y="188" width="32" height="32" fill={`url(#link-center-grad-${idSuffix})`} rx="1" />

                <rect x="77" y="220" width="26" height="30" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="137" y="220" width="26" height="30" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="103" y="220" width="34" height="32" fill={`url(#link-center-grad-${idSuffix})`} rx="1" />
              </g>
            )}

            {bracelet === "Jubilee" && (
              <g id="jubilee-bracelet-bottom">
                <rect x="80" y="185" width="18" height="22" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="142" y="185" width="18" height="22" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="98" y="185" width="14" height="22" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />
                <rect x="112" y="185" width="16" height="22" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />
                <rect x="128" y="185" width="14" height="22" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />

                <rect x="78" y="207" width="19" height="22" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="143" y="207" width="19" height="22" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="97" y="207" width="15" height="22" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />
                <rect x="112" y="207" width="16" height="22" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />
                <rect x="128" y="207" width="15" height="22" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />

                <rect x="75" y="229" width="21" height="22" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="144" y="229" width="21" height="22" fill={`url(#link-outer-grad-${idSuffix})`} rx="1" />
                <rect x="96" y="229" width="15" height="22" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />
                <rect x="111" y="229" width="18" height="22" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />
                <rect x="129" y="229" width="15" height="22" fill={`url(#link-center-grad-${idSuffix})`} rx="2" />
              </g>
            )}

            {bracelet === "President" && (
              <g id="president-bracelet-bottom">
                <rect x="80" y="196" width="20" height="18" fill={`url(#link-outer-grad-${idSuffix})`} rx="2" />
                <rect x="140" y="196" width="20" height="18" fill={`url(#link-outer-grad-${idSuffix})`} rx="2" />
                <rect x="100" y="195" width="40" height="20" fill={`url(#link-center-grad-${idSuffix})`} rx="3" />

                <rect x="78" y="214" width="21" height="18" fill={`url(#link-outer-grad-${idSuffix})`} rx="2" />
                <rect x="141" y="214" width="21" height="18" fill={`url(#link-outer-grad-${idSuffix})`} rx="2" />
                <rect x="99" y="213" width="42" height="20" fill={`url(#link-center-grad-${idSuffix})`} rx="3" />

                <rect x="76" y="232" width="22" height="18" fill={`url(#link-outer-grad-${idSuffix})`} rx="2" />
                <rect x="142" y="232" width="22" height="18" fill={`url(#link-outer-grad-${idSuffix})`} rx="2" />
                <rect x="98" y="231" width="44" height="19" fill={`url(#link-center-grad-${idSuffix})`} rx="3" />
              </g>
            )}
          </g>
        ) : (
          /* High-Performance Oysterflex Matte Black Elastomer Strap */
          <g id="oysterflex-strap">
            {/* Top Strap */}
            <path d="M 85 -10 L 89 54 L 151 54 L 155 -10 Z" fill="#18181b" />
            <path d="M 112 -10 L 112 54 L 128 54 L 128 -10 Z" fill="#27272a" opacity="0.4" /> {/* Center ridge */}
            {/* Bottom Strap */}
            <path d="M 89 186 L 85 250 L 155 250 L 151 186 Z" fill="#18181b" />
            <path d="M 112 186 L 112 250 L 128 250 L 128 186 Z" fill="#27272a" opacity="0.4" />
          </g>
        )}

        {/* ==================== WATCH CASE ==================== */}
        <g id="watch-case">
          {/* Lugs / Case Structure */}
          {/* Top-Left Lug */}
          <path d="M 76 60 Q 64 80 50 100 Q 56 100 70 85 Z" fill={`url(#case-grad-${idSuffix})`} />
          {/* Bottom-Left Lug */}
          <path d="M 76 180 Q 64 160 50 140 Q 56 140 70 155 Z" fill={`url(#case-grad-${idSuffix})`} />
          {/* Top-Right Lug */}
          <path d="M 164 60 Q 176 80 190 100 Q 184 100 170 85 Z" fill={`url(#case-grad-${idSuffix})`} />
          {/* Bottom-Right Lug */}
          <path d="M 164 180 Q 176 160 190 140 Q 184 140 170 155 Z" fill={`url(#case-grad-${idSuffix})`} />

          {/* Right crown guards (for sport models) */}
          {(collection.includes("Submariner") || collection.includes("Daytona") || collection.includes("GMT") || collection.includes("Yacht-Master")) && (
            <path d="M 190 102 Q 198 111 198 120 Q 198 129 190 138 Z" fill={`url(#case-grad-${idSuffix})`} />
          )}

          {/* Crown */}
          <g transform="translate(198, 114)">
            <rect x="0" y="0" width="8" height="12" rx="1.5" fill={material === "Oystersteel" || material === "White Gold" || material === "Platinum" ? "#94A3B8" : "url(#gold-shine-vertical-" + idSuffix + ")"} stroke="#334155" strokeWidth="0.5" />
            {/* Ridges on crown */}
            <line x1="2" y1="1" x2="2" y2="11" stroke="#334155" strokeWidth="0.5" />
            <line x1="4" y1="1" x2="4" y2="11" stroke="#334155" strokeWidth="0.5" />
            <line x1="6" y1="1" x2="6" y2="11" stroke="#334155" strokeWidth="0.5" />
          </g>

          {/* Daytona Pushers */}
          {collection.includes("Daytona") && (
            <>
              {/* Top Pusher */}
              <g transform="translate(186, 85) rotate(30)">
                <rect x="0" y="0" width="7" height="12" rx="1" fill={material === "Oystersteel" ? "#94A3B8" : "url(#gold-shine-vertical-" + idSuffix + ")"} stroke="#1e293b" strokeWidth="0.5" />
                <rect x="1" y="8" width="5" height="2" fill="#1e293b" />
              </g>
              {/* Bottom Pusher */}
              <g transform="translate(191, 145) rotate(-30)">
                <rect x="0" y="0" width="7" height="12" rx="1" fill={material === "Oystersteel" ? "#94A3B8" : "url(#gold-shine-vertical-" + idSuffix + ")"} stroke="#1e293b" strokeWidth="0.5" />
                <rect x="1" y="8" width="5" height="2" fill="#1e293b" />
              </g>
            </>
          )}

          {/* Round Case Body */}
          <circle cx="120" cy="120" r="85" fill={`url(#case-grad-${idSuffix})`} stroke={metals.dark} strokeWidth="1" />
        </g>

        {/* ==================== BEZEL ==================== */}
        <g id="bezel">
          {bezelStyle === "Polished" && (
            <circle cx="120" cy="120" r="81" fill={`url(#bevel-grad-${idSuffix})`} stroke={material === "Rolesor" || material === "Yellow Gold" ? "#D4AF37" : "#CBD5E1"} strokeWidth="1.5" />
          )}

          {bezelStyle === "Fluted" && (
            <g id="fluted-bezel-ridges">
              {/* Outer ring */}
              <circle cx="120" cy="120" r="82" fill={material === "Rolesor" || material === "Yellow Gold" ? "url(#gold-bevel-pure-" + idSuffix + ")" : "url(#bevel-grad-" + idSuffix + ")"} />
              {/* Inner bezel core ring */}
              <circle cx="120" cy="120" r="75" fill={material === "Rolesor" || material === "Yellow Gold" ? "#AA7C11" : "#475569"} />
              {/* Meticulously generated 48 radial flutes */}
              {Array.from({ length: 60 }).map((_, i) => {
                const angle = (i * 360) / 60;
                const rad = (angle * Math.PI) / 180;
                const x1 = 120 + 74 * Math.cos(rad);
                const y1 = 120 + 74 * Math.sin(rad);
                const x2 = 120 + 82 * Math.cos(rad);
                const y2 = 120 + 82 * Math.sin(rad);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={material === "Rolesor" || material === "Yellow Gold" ? "#FFF2CC" : "#F8FAFC"}
                    strokeWidth="0.75"
                    opacity={i % 3 === 0 ? "0.9" : "0.5"}
                  />
                );
              })}
              {/* Dynamic highlights */}
              <circle cx="120" cy="120" r="78.5" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.3" />
            </g>
          )}

          {(bezelStyle === "Cerachrom" || bezelStyle === "Tachymeter") && (
            <g id="sport-bezel">
              {/* Metal Ring Frame */}
              <circle cx="120" cy="120" r="82.5" fill="none" stroke={material === "Yellow Gold" || material === "Rolesor" ? "#AA7C11" : "#94A3B8"} strokeWidth="1.5" />
              {/* Ceramic Insert */}
              <circle cx="120" cy="120" r="79.5" fill={`url(#cerachrom-grad-${idSuffix})`} stroke="#111827" strokeWidth="1" />

              {/* Bezel markings */}
              {bezelStyle === "Tachymeter" && (
                <g id="daytona-tachymeter-scale" opacity="0.85">
                  {/* Core cardinal ticks for Daytona tachymeter */}
                  {[
                    { label: "UNITS PER HOUR", angle: -90, rDist: 69, size: "4px" },
                    { label: "400", angle: -50, rDist: 69, size: "5px" },
                    { label: "300", angle: -20, rDist: 69, size: "5px" },
                    { label: "240", angle: 10, rDist: 69, size: "5px" },
                    { label: "200", angle: 30, rDist: 69, size: "5px" },
                    { label: "180", angle: 50, rDist: 69, size: "5px" },
                    { label: "160", angle: 70, rDist: 69, size: "5px" },
                    { label: "140", angle: 90, rDist: 69, size: "5px" },
                    { label: "120", angle: 120, rDist: 69, size: "5px" },
                    { label: "100", angle: 150, rDist: 69, size: "5px" },
                    { label: "80", angle: 190, rDist: 69, size: "5px" },
                    { label: "60", angle: 240, rDist: 69, size: "5px" },
                  ].map((item, idx) => {
                    const rad = (item.angle * Math.PI) / 180;
                    const x = 120 + item.rDist * Math.cos(rad);
                    const y = 120 + item.rDist * Math.sin(rad);
                    const isGold = material === "Yellow Gold" || material === "Rolesor" || material === "Everose Gold";
                    return (
                      <g key={idx} transform={`translate(${x}, ${y}) rotate(${item.angle + 90})`}>
                        <text
                          textAnchor="middle"
                          fill={isGold ? "#D4AF37" : "#CBD5E1"}
                          fontSize={item.size}
                          fontFamily="sans-serif"
                          fontWeight="700"
                          letterSpacing="0"
                        >
                          {item.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {bezelStyle === "Cerachrom" && !collection.includes("Daytona") && (
                <g id="diver-gmt-scale">
                  {collection.includes("GMT") ? (
                    /* GMT-Master II Bezel (24 Hours scale) */
                    Array.from({ length: 12 }).map((_, i) => {
                      const value = i * 2;
                      const angle = (i * 360) / 12 - 90;
                      const rad = (angle * Math.PI) / 180;
                      const x = 120 + 70 * Math.cos(rad);
                      const y = 120 + 70 * Math.sin(rad);
                      const label = value === 0 ? "▲" : String(value * 2);
                      const isGold = material === "Yellow Gold" || material === "Rolesor";
                      return (
                        <text
                          key={i}
                          x={x}
                          y={y + 1.5}
                          textAnchor="middle"
                          fill={isGold ? "#D4AF37" : "#E2E8F0"}
                          fontSize={label === "▲" ? "6px" : "5px"}
                          fontFamily="sans-serif"
                          fontWeight="700"
                          transform={`rotate(${angle + 90}, ${x}, ${y})`}
                        >
                          {label}
                        </text>
                      );
                    })
                  ) : (
                    /* Submariner Diver Bezel (10, 20, 30, 40, 50 + Triangle) */
                    <>
                      {/* Triangle standard at 12 o'clock */}
                      <polygon points="120,44 117,49 123,49" fill="#F8FAFC" />
                      <circle cx="120" cy="46.5" r="1" fill="#00FFCC" /> {/* Pip */}
                      {[10, 20, 30, 40, 50].map((num) => {
                        const angle = (num * 6) - 90;
                        const rad = (angle * Math.PI) / 180;
                        const x = 120 + 70 * Math.cos(rad);
                        const y = 120 + 70 * Math.sin(rad);
                        return (
                          <text
                            key={num}
                            x={x}
                            y={y + 2}
                            textAnchor="middle"
                            fill="#F1F5F9"
                            fontSize="5.5px"
                            fontFamily="sans-serif"
                            fontWeight="bold"
                            transform={`rotate(${angle + 90}, ${x}, ${y})`}
                          >
                            {num}
                          </text>
                        );
                      })}
                      {/* Technical ticks for first 15 mins on sub */}
                      {Array.from({ length: 15 }).map((_, i) => {
                        if (i % 5 === 0) return null;
                        const angle = (i * 6) - 90;
                        const rad = (angle * Math.PI) / 180;
                        const x1 = 120 + 74 * Math.cos(rad);
                        const y1 = 120 + 74 * Math.sin(rad);
                        const x2 = 120 + 77 * Math.cos(rad);
                        const y2 = 120 + 77 * Math.sin(rad);
                        return (
                          <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#E2E8F0"
                            strokeWidth="0.5"
                          />
                        );
                      })}
                    </>
                  )}
                </g>
              )}
            </g>
          )}

          {/* Inner reflective ring (Rehaut) with delicate metallic tint */}
          <circle cx="120" cy="120" r="74.5" fill="none" stroke={material === "Yellow Gold" || material === "Rolesor" ? "#AA7C11" : "#CBD5E1"} strokeWidth="1" />
          <circle cx="120" cy="120" r="73.5" fill="none" stroke="#222" strokeWidth="0.5" opacity="0.3" />
        </g>

        {/* ==================== DIAL FACE ==================== */}
        <g id="dial-face">
          {/* Main Dial Circular Base */}
          <circle cx="120" cy="120" r="73" fill={`url(#dial-grad-${idSuffix})`} />

          {/* Widmanstätten Meteorite Patterns */}
          {dial.isMeteorite && (
            <g opacity="0.25">
              <line x1="50" y1="60" x2="190" y2="130" stroke="#FFF" strokeWidth="0.5" />
              <line x1="70" y1="120" x2="170" y2="70" stroke="#E2E8F0" strokeWidth="0.5" />
              <line x1="80" y1="50" x2="160" y2="180" stroke="#FFF" strokeWidth="0.5" />
              <line x1="120" y1="50" x2="120" y2="190" stroke="#FFF" strokeWidth="0.5" />
              <line x1="60" y1="150" x2="180" y2="90" stroke="#D1D5DB" strokeWidth="0.25" />
              <line x1="55" y1="100" x2="165" y2="150" stroke="#E5E7EB" strokeWidth="0.3" />
              <line x1="100" y1="80" x2="140" y2="170" stroke="#FFF" strokeWidth="0.4" />
              {/* Random triangular crystalline highlights */}
              <polygon points="110,110 130,118 115,125" fill="#FFF" opacity="0.15" />
              <polygon points="85,140 100,135 92,150" fill="#E2E8F0" opacity="0.1" />
              <polygon points="140,90 155,95 145,108" fill="#FFF" opacity="0.2" />
            </g>
          )}

          {/* Dial Outer Seconds Ticks */}
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = i * 6;
            const rad = (angle * Math.PI) / 180;
            const length = i % 5 === 0 ? 3.5 : 1.5;
            const x1 = 120 + 72 * Math.cos(rad);
            const y1 = 120 + 72 * Math.sin(rad);
            const x2 = 120 + (72 - length) * Math.cos(rad);
            const y2 = 120 + (72 - length) * Math.sin(rad);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={dialColor === "White" ? "#475569" : "#D4AF37"}
                strokeWidth={i % 5 === 0 ? "0.6" : "0.3"}
                opacity={i % 5 === 0 ? "0.7" : "0.4"}
              />
            );
          })}

          {/* ================= COMPLICATIONS INLAY ================= */}

          {/* DAY-DATE: Curved day window arching at 12 o'clock */}
          {collection.includes("Day-Date") && (
            <g id="day-date-day-aperture">
              {/* Background Window */}
              <path d="M 94 65 Q 120 57 146 65 L 144 71 Q 120 63 96 71 Z" fill="#FDFDFD" stroke="#AA7C11" strokeWidth="0.5" />
              {/* Serif TEXT Day */}
              <text x="120" y="69.5" textAnchor="middle" fill="#0c0a09" fontSize="5.5px" fontFamily="serif" fontWeight="bold" letterSpacing="0.5">
                WEDNESDAY
              </text>
            </g>
          )}

          {/* SKY-DWELLER: Off-Center 24-Hour Disc */}
          {collection.includes("Sky-Dweller") && (
            <g id="sky-dweller-disc" transform="translate(120, 137)">
              <circle cx="0" cy="0" r="22" fill="#F8FAFC" stroke="#AA7C11" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="18" fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
              {/* GMT Numbers around disk */}
              <path d="M -3 -15 L 3 -15 L 0 -22 Z" fill="#EF4444" /> {/* Red marker */}
              {[4, 8, 12, 16, 20, 24].map((num, i) => {
                const angle = (i * 360) / 6 - 90;
                const rad = (angle * Math.PI) / 180;
                return (
                  <text
                    key={num}
                    x={14 * Math.cos(rad)}
                    y={14 * Math.sin(rad) + 1.5}
                    textAnchor="middle"
                    fill="#1E293B"
                    fontSize="4.5px"
                    fontFamily="sans-serif"
                    fontWeight="700"
                  >
                    {num}
                  </text>
                );
              })}
            </g>
          )}

          {/* COSMOGRAPH DAYTONA: Tri-compax Chronograph registers */}
          {collection.includes("Daytona") && (
            <g id="daytona-chronograph-dials" opacity="0.9">
              {/* 3 o'clock register */}
              <g transform="translate(152, 120)">
                <circle cx="0" cy="0" r="12" fill="none" stroke={dialColor === "White" ? "#1E293B" : "#D4AF37"} strokeWidth="1" />
                <circle cx="0" cy="0" r="10" fill="none" stroke={dialColor === "White" ? "#E2E8F0" : "#111"} strokeWidth="0.5" />
                <text x="0" y="-6" textAnchor="middle" fill={dialColor === "White" ? "#000" : "#D4AF37"} fontSize="3px" fontFamily="sans-serif">30</text>
                <text x="0" y="8" textAnchor="middle" fill={dialColor === "White" ? "#000" : "#D4AF37"} fontSize="3px" fontFamily="sans-serif">15</text>
                {/* Pointer */}
                <line x1="0" y1="0" x2="6" y2="-4" stroke={dialColor === "White" ? "#000" : "#FFF"} strokeWidth="0.75" />
              </g>

              {/* 9 o'clock register */}
              <g transform="translate(88, 120)">
                <circle cx="0" cy="0" r="12" fill="none" stroke={dialColor === "White" ? "#1E293B" : "#D4AF37"} strokeWidth="1" />
                <circle cx="0" cy="0" r="10" fill="none" stroke={dialColor === "White" ? "#E2E8F0" : "#111"} strokeWidth="0.5" />
                <text x="0" y="-6" textAnchor="middle" fill={dialColor === "White" ? "#000" : "#D4AF37"} fontSize="3px" fontFamily="sans-serif">12</text>
                <text x="0" y="8" textAnchor="middle" fill={dialColor === "White" ? "#000" : "#D4AF37"} fontSize="3px" fontFamily="sans-serif">6</text>
                {/* Pointer */}
                <line x1="0" y1="0" x2="-5" y2="4" stroke={dialColor === "White" ? "#000" : "#FFF"} strokeWidth="0.75" />
              </g>

              {/* 6 o'clock register */}
              <g transform="translate(120, 145)">
                <circle cx="0" cy="0" r="12" fill="none" stroke={dialColor === "White" ? "#1E293B" : "#D4AF37"} strokeWidth="1" />
                <circle cx="0" cy="0" r="10" fill="none" stroke={dialColor === "White" ? "#E2E8F0" : "#111"} strokeWidth="0.5" />
                <text x="0" y="-6" textAnchor="middle" fill={dialColor === "White" ? "#000" : "#D4AF37"} fontSize="3px" fontFamily="sans-serif">60</text>
                <text x="0" y="8" textAnchor="middle" fill={dialColor === "White" ? "#000" : "#D4AF37"} fontSize="3px" fontFamily="sans-serif">30</text>
                {/* Pointer */}
                <line x1="0" y1="0" x2="0" y2="-7" stroke={dialColor === "White" ? "#000" : "#FFF"} strokeWidth="0.75" />
              </g>
            </g>
          )}

          {/* ================= DIAL MARKERS / HOUR INDEXES ================= */}
          <g id="hour-markers">
            {/* Rolex Crown at 12 o'clock */}
            <g transform="translate(120, 52) scale(0.48)">
              <path
                d="M -10 -2 L -6 -12 L -2 -4 L 2 -12 L 6 -2 C 6 -2 1 -4 0 -1 C -1 -4 -6 -2 -6 -2 Z M -6 -14 A 1 1 0 1 1 -8 -14 A 1 1 0 1 1 -6 -14 Z M 8 -14 A 1 1 0 1 1 6 -14 A 1 1 0 1 1 8 -14 Z M -1 -16 A 1 1 0 1 1 -3 -16 A 1 1 0 1 1 -1 -16 Z"
                fill={material === "Oystersteel" || material === "White Gold" || material === "Platinum" ? "#E2E8F0" : "#D4AF37"}
                stroke={material === "Oystersteel" ? "#475569" : "#AA7C11"}
                strokeWidth="0.5"
              />
              <rect x="-8" y="-1" width="16" height="2" fill={material === "Oystersteel" ? "#CBD5E1" : "#D4AF37"} />
            </g>

            {/* Render distinct dial patterns depending on collection */}
            {collection.includes("Explorer") ? (
              /* Explorer classic 3, 6, 9 luminescent numerals */
              <>
                {/* 3 */}
                <text x="178" y="125" fill="#f8fafc" stroke="#AA7C11" strokeWidth="0.25" fontSize="13px" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">3</text>
                {/* 6 */}
                <text x="120" y="180" fill="#f8fafc" stroke="#AA7C11" strokeWidth="0.25" fontSize="13px" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">6</text>
                {/* 9 */}
                <text x="62" y="125" fill="#f8fafc" stroke="#AA7C11" strokeWidth="0.25" fontSize="13px" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">9</text>

                {/* Bars or Dots for rest of indices */}
                {[1, 2, 4, 5, 7, 8, 10, 11].map((hour) => {
                  const angle = hour * 30 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const x = 120 + 64 * Math.cos(rad);
                  const y = 120 + 64 * Math.sin(rad);
                  return (
                    <g key={hour} transform={`translate(${x}, ${y}) rotate(${angle})`}>
                      <rect x="-1.5" y="-6" width="3" height="12" rx="0.5" fill="#F8FAFC" stroke="#64748B" strokeWidth="0.5" />
                    </g>
                  );
                })}
              </>
            ) : collection.includes("Day-Date") ? (
              /* Elegant Romain numerals indices for Day-Date */
              <>
                {[
                  { r: "I", h: 1 }, { r: "II", h: 2 }, { r: "III", h: 3 },
                  { r: "IV", h: 4 }, { r: "V", h: 5 }, { r: "VI", h: 6 },
                  { r: "VII", h: 7 }, { r: "VIII", h: 8 }, { r: "IX", h: 9 },
                  { r: "X", h: 10 }, { r: "XI", h: 11 }
                ].map((item) => {
                  const angle = item.h * 30 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const x = 120 + 60 * Math.cos(rad);
                  const y = 120 + 60 * Math.sin(rad);
                  const isGold = material === "Yellow Gold" || material === "Rolesor";
                  return (
                    <text
                      key={item.h}
                      x={x}
                      y={y + 1.5}
                      textAnchor="middle"
                      fill={isGold ? "#D4AF37" : "#CBD5E1"}
                      fontSize="5px"
                      fontFamily="serif"
                      fontWeight="700"
                      transform={`rotate(${angle + 90}, ${x}, ${y})`}
                    >
                      {item.r}
                    </text>
                  );
                })}
              </>
            ) : (
              /* Professional Divers or Chronos style indices (combination of tri, bar, circles) */
              <>
                {/* 12 o'clock inverted triangle (behind the crown but further down slightly) */}
                {collection.includes("Submariner") || collection.includes("GMT") || collection.includes("Yacht") ? (
                  <polygon points="120,53 113,63 127,63" fill="#F8FAFC" stroke={material === "Yellow Gold" || material === "Rolesor" ? "#AA7C11" : "#64748B"} strokeWidth="0.5" />
                ) : null}

                {/* Elegant dots and bars details */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((hour) => {
                  // Omit hour markers covered by date cyclops (at 3)
                  const isDateExempt = hour === 3 && (collection.includes("Submariner") || collection.includes("Datejust") || collection.includes("GMT") || collection.includes("Sky-Dweller") || collection.includes("Day-Date"));
                  if (isDateExempt) return null;

                  const angle = hour * 30 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const x = 120 + 62 * Math.cos(rad);
                  const y = 120 + 62 * Math.sin(rad);

                  const isGoldRef = material === "Yellow Gold" || material === "Rolesor" || material === "Everose Gold";
                  const frameColor = isGoldRef ? "#AA7C11" : "#334155";

                  // Professional diver layouts (circles on 1,2,4,5,7,8,10,11; bars on 6,9)
                  if (collection.includes("Submariner") || collection.includes("GMT") || collection.includes("Yacht")) {
                    if (hour === 6 || hour === 9) {
                      return (
                        <g key={hour} transform={`translate(${x}, ${y}) rotate(${angle})`}>
                          <rect x="-1.5" y="-5.5" width="3" height="11" rx="0.5" fill="#F8FAFC" stroke={frameColor} strokeWidth="0.5" />
                        </g>
                      );
                    } else {
                      return (
                        <circle key={hour} cx={x} cy={y} r="3" fill="#F8FAFC" stroke={frameColor} strokeWidth="0.5" />
                      );
                    }
                  }

                  // Non-diver index baton styles
                  return (
                    <g key={hour} transform={`translate(${x}, ${y}) rotate(${angle})`}>
                      <rect x="-1" y="-5" width="2" height="10" fill={isGoldRef ? "#D4AF37" : "#F8FAFC"} stroke={frameColor} strokeWidth="0.5" />
                      <rect x="-0.5" y="-4.5" width="1" height="9" fill="#FFF" />
                    </g>
                  );
                })}
              </>
            )}
          </g>

          {/* ================= DATE WINDOW CODES ================= */}
          {(collection.includes("Submariner") || collection.includes("Datejust") || collection.includes("GMT") || collection.includes("Sky-Dweller") || collection.includes("Day-Date")) && (
            <g id="date-wheel-window" transform="translate(162, 114)">
              {/* Gold or Silver border framing */}
              <rect x="0" y="0" width="13" height="11" rx="0.5" fill="#09090b" stroke={material === "Yellow Gold" || material === "Rolesor" ? "#AA7C11" : "#475569"} strokeWidth="0.5" />
              <rect x="1" y="1" width="11" height="9" fill="#FDFDFD" />
              {/* Date numeral */}
              <text x="6.5" y="8" textAnchor="middle" fill="#0c0a09" fontSize="7.5px" fontFamily="serif" fontWeight="900">
                17
              </text>
            </g>
          )}

          {/* ================= HANDS LAYOUT ================= */}
          {showHands && (
            <g id="mercedes-hands">
              {/* GMT 24h arrow index pointer (Pepsi or Bruce Wayne have beautiful GMT hands) */}
              {collection.includes("GMT") && (
                <g id="gmt-hand-layer" transform="translate(120, 120) rotate(-35)">
                  {/* GMT Arrow */}
                  <line x1="0" y1="0" x2="0" y2="-62" stroke={collection.includes("Pepsi") ? "#EF4444" : "#10B981"} strokeWidth="0.75" />
                  <polygon points="0,-64 -4,-57 4,-57" fill={collection.includes("Pepsi") ? "#EF4444" : "#10B981"} stroke="#000" strokeWidth="0.25" />
                  <circle cx="0" cy="-59" r="1" fill="#FFF" />
                </g>
              )}

              {/* Hour Hand: Custom Classic Mercedes luxury shape (divers) or sleek stick */}
              <g transform="translate(120, 120) rotate(162)">
                {collection.includes("Submariner") || collection.includes("GMT") || collection.includes("Yacht") ? (
                  /* Pro Mercedes Hour Hand */
                  <>
                    <line x1="0" y1="0" x2="0" y2="-42" stroke={material === "Yellow Gold" || material === "Rolesor" ? "#D4AF37" : "#CBD5E1"} strokeWidth="2.5" strokeLinecap="round" />
                    {/* Mercedes symbol circle */}
                    <circle cx="0" cy="-28" r="4.5" fill={material === "Yellow Gold" || material === "Rolesor" ? "#D4AF37" : "#CBD5E1"} stroke={material === "Yellow Gold" ? "#AA7C11" : "#475569"} strokeWidth="0.5" />
                    {/* Mercedes dividing lines inside circle */}
                    <circle cx="0" cy="-28" r="3.2" fill="#FFFFFF" />
                    <line x1="0" y1="-28" x2="0" y2="-31.2" stroke={material === "Yellow Gold" || material === "Rolesor" ? "#D4AF37" : "#475569"} strokeWidth="0.5" />
                    <line x1="0" y1="-28" x2="-2.77" y2="-26.4" stroke={material === "Yellow Gold" || material === "Rolesor" ? "#D4AF37" : "#475569"} strokeWidth="0.5" />
                    <line x1="0" y1="-28" x2="2.77" y2="-26.4" stroke={material === "Yellow Gold" || material === "Rolesor" ? "#D4AF37" : "#475569"} strokeWidth="0.5" />
                  </>
                ) : (
                  /* Elegant stick hand with luminous centerline */
                  <>
                    <line x1="0" y1="0" x2="0" y2="-40" stroke={material === "Yellow Gold" || material === "Rolesor" ? "#D4AF37" : "#CBD5E1"} strokeWidth="2" strokeLinecap="round" />
                    <line x1="0" y1="-3" x2="0" y2="-37" stroke="#FFF" strokeWidth="0.75" />
                  </>
                )}
              </g>

              {/* Minute Hand: Elegant long pointer with white inlay */}
              <g transform="translate(120, 120) rotate(42)">
                <line x1="0" y1="0" x2="0" y2="-66" stroke={material === "Yellow Gold" || material === "Rolesor" ? "#D4AF37" : "#E2E8F0"} strokeWidth="1.8" strokeLinecap="round" />
                <line x1="0" y1="-4" x2="0" y2="-63" stroke="#FFFFFF" strokeWidth="0.75" />
              </g>

              {/* Seconds Hand: needle-thin with a glowing circular pip */}
              <g transform="translate(120, 120) rotate(275)">
                <line x1="0" y1="12" x2="0" y2="-72" stroke={collection.includes("Daytona") ? "#EF4444" : material === "Yellow Gold" || material === "Rolesor" ? "#D4AF37" : "#F1F5F9"} strokeWidth="0.4" />
                {/* Lume Pip */}
                {!collection.includes("Daytona") && (
                  <circle cx="0" cy="-52" r="2.2" fill="#FFF" stroke={material === "Yellow Gold" || material === "Rolesor" ? "#AA7C11" : "#475569"} strokeWidth="0.5" />
                )}
              </g>

              {/* Pinion center cap pinning them all */}
              <circle cx="120" cy="120" r="3.5" fill={material === "Yellow Gold" || material === "Rolesor" ? "#AA7C11" : "#475569"} />
              <circle cx="120" cy="120" r="1.8" fill={material === "Yellow Gold" || material === "Rolesor" ? "#FFE699" : "#F1F5F9"} />
            </g>
          )}

          {/* ================= GLASS & CYCLOPS LENS MAGNIFICATION ================= */}
          {/* Magnifying bubble lens (Cyclops) over Date window at 3 o'clock */}
          {(collection.includes("Submariner") || collection.includes("Datejust") || collection.includes("GMT") || collection.includes("Sky-Dweller") || collection.includes("Day-Date")) && (
            <g id="cyclops-bubble">
              {/* Background shadow of cyclops */}
              <rect x="156" y="110" width="22" height="19" rx="9" fill="#000" fillOpacity="0.12" />
              {/* Glowing magnification lens glass */}
              <rect x="157" y="111" width="21" height="17" rx="8.5" fill="none" stroke="#FFF" strokeWidth="0.5" strokeOpacity="0.4" />
              <rect x="157" y="111" width="21" height="17" rx="8.5" fill={`url(#crystal-glare-${idSuffix})`} style={{ mixBlendMode: "screen" }} />
              <path d="M 159 113 Q 163 111 168 111" stroke="#FFF" strokeWidth="0.75" strokeLinecap="round" strokeOpacity="0.3" />
            </g>
          )}

          {/* Luxury glare on the crystal sapphire */}
          <circle cx="120" cy="120" r="73.5" fill={`url(#crystal-glare-${idSuffix})`} style={{ mixBlendMode: "screen" }} pointerEvents="none" />
        </g>
      </svg>
    </div>
  );
};
