import React, { useState, useEffect } from "react";
import { WatchSVG } from "./WatchSVG";
import { Watch, DesignConfigState } from "../types";
import { Sparkles, Save, CreditCard } from "lucide-react";
import { ThreeDContainer } from "./ThreeDContainer";

interface BespokeBuilderProps {
  onSaveToVault: (customWatch: Watch) => void;
  onInquire: (watch: Watch) => void;
}

const BASES = [
  { id: "base-datejust", name: "Classic Datejust", type: "Datejust", basePrice: 7200, diameter: 36, defaultBezel: "Fluted", defaultBracelet: "Jubilee" },
  { id: "base-submariner", name: "Professional Submariner", type: "Submariner", basePrice: 9500, diameter: 41, defaultBezel: "Cerachrom", defaultBracelet: "Oyster" },
  { id: "base-daytona", name: "Racing Daytona", type: "Cosmograph Daytona", basePrice: 13800, diameter: 40, defaultBezel: "Tachymeter", defaultBracelet: "Oyster" },
  { id: "base-daydate", name: "Imperial Day-Date", type: "Day-Date", basePrice: 28000, diameter: 40, defaultBezel: "Fluted", defaultBracelet: "President" },
];

const MATERIALS = [
  { id: "Oystersteel", name: "Oystersteel (Superalloy)", price: 0, desc: "Highly resistant standard 904L steel." },
  { id: "Rolesor", name: "Rolesor (Two-Tone)", price: 3200, desc: "A harmonious marriage of Oystersteel & 18ct Gold." },
  { id: "Yellow Gold", name: "18 ct Yellow Gold", price: 18500, desc: "Exclusive 18ct gold alloy with incomparable brilliance." },
  { id: "White Gold", name: "18 ct White Gold", price: 21000, desc: "Luminous white alloy crafted in private Rolex foundry." },
  { id: "Everose Gold", name: "18 ct Everose Gold", price: 22500, desc: "Patented warm pink gold containing platinum accents." },
  { id: "Platinum", name: "950 Platinum", price: 26000, desc: "Extremely heavy, noble metal reserved for peak luxury." },
];

const DIAL_COLORS = [
  { id: "Black", name: "Intense Black", price: 0, colorCode: "#0c0a09" },
  { id: "White", name: "Lacquered White", price: 0, colorCode: "#f4f4f5" },
  { id: "Silver", name: "Silver Sunburst", price: 0, colorCode: "#cbd5e1" },
  { id: "Blue", name: "Royal Blue Radial", price: 500, colorCode: "#1d4ed8" },
  { id: "Green", name: "Emerald Sunburst", price: 600, colorCode: "#047857" },
  { id: "Slate", name: "Slate Sunburst", price: 500, colorCode: "#52525b" },
  { id: "Champagne", name: "Champagne Sunburst", price: 800, colorCode: "#d97706" },
  { id: "Chocolate", name: "Chocolate Radial", price: 800, colorCode: "#451a03" },
  { id: "Ice Blue", name: "Ice Blue Sunburst", price: 1250, colorCode: "#bae6fd" },
  { id: "Meteorite", name: "Gibeon Meteorite Shards", price: 6500, colorCode: "#71717a" },
];

const BEZELS = [
  { id: "Polished", name: "Polished / Domed Bezel", price: 0 },
  { id: "Fluted", name: "Rolex Iconic Fluted Bezel", price: 2200 },
  { id: "Cerachrom", name: "Unidirectional Cerachrom", price: 1500 },
  { id: "Tachymeter", name: "Engraved Tachymeter Scale", price: 1800 },
];

const BRACELETS = [
  { id: "Oyster", name: "Flat Three-Piece Oyster Link", price: 1000 },
  { id: "Jubilee", name: "Intricate Five-Piece Jubilee Link", price: 1800 },
  { id: "President", name: "Imperial Tri-Link President", price: 3500 },
  { id: "Oysterflex", name: "High-Performance Oysterflex Elastomer", price: 0 },
];

export const BespokeBuilder: React.FC<BespokeBuilderProps> = ({ onSaveToVault, onInquire }) => {
  const [selectedBase, setSelectedBase] = useState(BASES[0]);
  const [customName, setCustomName] = useState("");
  const [config, setConfig] = useState<DesignConfigState>({
    material: "Oystersteel",
    dialColor: "Black",
    bezelStyle: "Fluted",
    bracelet: "Jubilee",
    diameter: 36,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  // Auto-align configuration to Base constraints on change
  useEffect(() => {
    setConfig({
      material: selectedBase.type === "Day-Date" ? "Yellow Gold" : "Oystersteel",
      dialColor: selectedBase.type === "Day-Date" ? "Champagne" : "Black",
      bezelStyle: selectedBase.defaultBezel as any,
      bracelet: selectedBase.defaultBracelet as any,
      diameter: selectedBase.diameter,
    });
  }, [selectedBase]);

  // Compute live price
  useEffect(() => {
    const baseP = selectedBase.basePrice;
    const materialP = MATERIALS.find((m) => m.id === config.material)?.price || 0;
    const dialP = DIAL_COLORS.find((d) => d.id === config.dialColor)?.price || 0;
    const bezelP = BEZELS.find((b) => b.id === config.bezelStyle)?.price || 0;
    const braceletP = BRACELETS.find((br) => br.id === config.bracelet)?.price || 0;

    setTotalPrice(baseP + materialP + dialP + bezelP + braceletP);
  }, [config, selectedBase]);

  const handleSave = () => {
    const finalName = customName.trim() || `Bespoke ${selectedBase.type} (${config.material})`;
    const refSuffix = `${config.material.slice(0, 2).toUpperCase()}-${config.dialColor.slice(0, 2).toUpperCase()}`;

    const customizedWatch: Watch = {
      id: `bespoke-${Date.now()}`,
      collection: selectedBase.type as any,
      name: finalName,
      reference: `Bespoke-${selectedBase.diameter}-${refSuffix}`,
      diameter: selectedBase.diameter,
      material: config.material,
      dialColor: config.dialColor,
      bezelStyle: config.bezelStyle,
      bezelColor: `${config.material} ${config.bezelStyle}`,
      bracelet: config.bracelet,
      price: totalPrice,
      popular: false,
      featuredText: "Bespoke Collector's Commissions",
      intro: `A bespoke timepiece commissioned by the collector. Beautifully configured in ${config.material} with a ${config.dialColor} dial face and a ${config.bracelet} bracelet.`,
      specifications: {
        calibre: selectedBase.type === "Cosmograph Daytona" ? "4131" : "3235",
        powerReserve: "Approximately 70 hours",
        waterResistance: selectedBase.type === "Submariner" ? "300 metres" : "100 metres",
        clasp: "Folding Oysterclasp with Easylink safety system",
        bezelDescription: `${config.bezelStyle} crafted in premium metallurgical metals`,
        movement: "Perpetual, mechanical, self-winding chronometer"
      }
    };

    onSaveToVault(customizedWatch);
    setCustomName("");
  };

  const activeWatchDummyForInquiry: Watch = {
    id: `bespoke-inquiry-temp`,
    collection: selectedBase.type as any,
    name: customName.trim() || `Bespoke ${selectedBase.type}`,
    reference: `Bespoke-Configured`,
    diameter: selectedBase.diameter,
    material: config.material,
    dialColor: config.dialColor,
    bezelStyle: config.bezelStyle,
    bezelColor: `${config.material} ${config.bezelStyle}`,
    bracelet: config.bracelet,
    price: totalPrice,
    popular: false,
    featuredText: "Bespoke Configured Watch",
    intro: `Client configured personalized chronometer.`,
    specifications: {
      calibre: "3235",
      powerReserve: "70 Hours",
      waterResistance: "100m",
      clasp: "Crownclasp",
      bezelDescription: `${config.bezelStyle}`,
      movement: "Perpetual, Self-Winding"
    }
  };

  return (
    <div id="builder-section" className="w-full bg-[#0a0a0a] border-t border-[#1f1f1f] py-16 px-6 md:px-12 font-sans text-sans text-[#e5e5e5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-full text-[10px] text-[#c5a059] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3" />
            <span>The Salon of Commissions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-[#e5e5e5] tracking-wide">
            Bespoke Watch Configurator
          </h2>
          <p className="text-[#888] text-xs md:text-sm max-w-xl mx-auto mt-3 font-sans leading-relaxed">
            Configure precious metals, dials, and bracelet styles to commission your dream luxury horology marvel. See true metallurgical prices in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-[#0d0d0d] border border-[#1f1f1f] p-6 md:p-10 rounded-sm">
          {/* LEFT: Live Vector Preview */}
          <div className="lg:col-span-5 flex flex-col items-center justify-between bg-[#0a0a0a] rounded-sm p-8 border border-[#1f1f1f] min-h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#c5a059,transparent_75%)] opacity-[0.03] pointer-events-none" />
            
            <ThreeDContainer className="w-full max-w-[280px] p-4 flex items-center justify-center bg-[#0d0d0d]/40 rounded border border-[#1f1f1f]/50 shadow-inner" intensity={18}>
              <WatchSVG
                dialColor={config.dialColor}
                material={config.material}
                bezelStyle={config.bezelStyle}
                bracelet={config.bracelet}
                collection={selectedBase.type}
                size="xl"
              />
            </ThreeDContainer>

            {/* Spec tags overlay */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-xs relative z-10">
              <span className="bg-[#0d0d0d] px-2.5 py-1 text-3xs font-semibold uppercase tracking-wider text-[#888] border border-[#1f1f1f]">
                {selectedBase.diameter} mm
              </span>
              <span className="bg-[#c5a059]/15 px-2.5 py-1 text-3xs font-semibold uppercase tracking-wider text-[#c5a059] border border-[#c5a059]/30">
                {config.material}
              </span>
              <span className="bg-[#0d0d0d] px-2.5 py-1 text-3xs font-semibold uppercase tracking-wider text-[#888] border border-[#1f1f1f]">
                {config.dialColor} Dial
              </span>
              <span className="bg-[#0d0d0d] px-2.5 py-1 text-3xs font-semibold uppercase tracking-wider text-[#888] border border-[#1f1f1f]">
                {config.bezelStyle} Bezel
              </span>
              <span className="bg-[#0d0d0d] px-2.5 py-1 text-3xs font-semibold uppercase tracking-wider text-[#888] border border-[#1f1f1f]">
                {config.bracelet}
              </span>
            </div>
          </div>

          {/* RIGHT: Configurator Panel */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Step 1: Base Platform selection */}
            <div>
              <span className="text-3xs font-bold uppercase tracking-widest text-[#c5a059] block mb-3">
                01. Select Horology Template
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BASES.map((base) => (
                  <button
                    key={base.id}
                    onClick={() => setSelectedBase(base)}
                    className={`p-3 text-left border rounded-sm transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                      selectedBase.id === base.id
                        ? "border-[#c5a059] text-[#e5e5e5] bg-[#c5a059]/5"
                        : "border-[#1f1f1f] text-[#888] hover:border-[#666] hover:text-[#e5e5e5]"
                    }`}
                  >
                    <span className="text-2xs font-bold uppercase tracking-wider">{base.name}</span>
                    <span className="text-3xs text-[#666] font-mono mt-1 pt-1 border-t border-[#1f1f1f]">
                      From ${base.basePrice.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Casing Metallurgical Element */}
            <div>
              <span className="text-3xs font-bold uppercase tracking-widest text-[#c5a059] block mb-3">
                02. Select Precious Metal
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {MATERIALS.map((m) => {
                  // Day-Date constraint: only precious gold/platinum!
                  const isRestrictedByDD = selectedBase.type === "Day-Date" && m.id === "Oystersteel";
                  if (isRestrictedByDD) return null;

                  return (
                    <button
                      key={m.id}
                      onClick={() => setConfig((prev) => ({ ...prev, material: m.id as any }))}
                      className={`p-3 text-left border rounded-sm transition-all duration-200 flex flex-col gap-1 relative cursor-pointer ${
                        config.material === m.id
                          ? "border-[#c5a059] text-white bg-[#c5a059]/5"
                          : "border-[#1f1f1f] text-[#888] hover:border-[#666] hover:text-[#e5e5e5]"
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-xs font-bold">{m.name}</span>
                        {m.price > 0 && (
                          <span className="text-3xs font-mono font-bold text-[#c5a059]">
                            +${m.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-3xs text-[#666] leading-normal">{m.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Dial selection */}
            <div>
              <span className="text-3xs font-bold uppercase tracking-widest text-[#c5a059] block mb-3">
                03. Choose Dial Canvas
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {DIAL_COLORS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setConfig((prev) => ({ ...prev, dialColor: d.id as any }))}
                    className={`p-2.5 border rounded-sm flex flex-col items-center justify-center text-center gap-2 transition-all duration-200 group cursor-pointer ${
                      config.dialColor === d.id
                        ? "border-[#c5a059] bg-[#c5a059]/5"
                        : "border-[#1f1f1f] hover:border-[#666]"
                    }`}
                  >
                    {/* Color dot */}
                    <div
                      className="w-5 h-5 rounded-full border border-neutral-800 group-hover:scale-110 transition-transform duration-200 shadow-inner"
                      style={{
                        backgroundColor: d.colorCode,
                        background: d.id === "Meteorite" ? "repeating-linear-gradient(45deg, #71717a, #71717a 1px, #a1a1aa 2px, #3f3f46 3px)" : undefined,
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-3xs font-bold text-[#e5e5e5]">{d.name.split(" ")[0]}</span>
                      <span className="text-4xs font-mono font-bold text-[#666] mt-0.5">
                        {d.price > 0 ? `+$${d.price}` : "Incl."}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Bezel Style */}
            <div>
              <span className="text-3xs font-bold uppercase tracking-widest text-[#c5a059] block mb-3">
                04. Personalize Bezel Style
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BEZELS.map((b) => {
                  // Rule limit: tachymeter is only for racing daytona! fluted is not for submariner.
                  const isTachymeterOnlyForDaytona = b.id === "Tachymeter" && selectedBase.type !== "Cosmograph Daytona";
                  const isCerachromDiverOnly = b.id === "Cerachrom" && selectedBase.type !== "Submariner" && selectedBase.type !== "GMT-Master II";

                  if (isTachymeterOnlyForDaytona || isCerachromDiverOnly) return null;

                  return (
                    <button
                      key={b.id}
                      onClick={() => setConfig((prev) => ({ ...prev, bezelStyle: b.id as any }))}
                      className={`p-2.5 border rounded-sm text-center transition-all duration-200 cursor-pointer ${
                        config.bezelStyle === b.id
                          ? "border-[#c5a059] text-white bg-[#c5a059]/5"
                          : "border-[#1f1f1f] text-[#888] hover:border-[#666] hover:text-[#e5e5e5]"
                      }`}
                    >
                      <span className="text-2xs font-bold block">{b.id}</span>
                      <span className="text-4xs font-mono font-bold text-[#666] block mt-1">
                        {b.price > 0 ? `+$${b.price.toLocaleString()}` : "Incl."}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Bracelet Style */}
            <div>
              <span className="text-3xs font-bold uppercase tracking-widest text-[#c5a059] block mb-3">
                05. Anchor Bracelet Structure
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BRACELETS.map((br) => {
                  return (
                    <button
                      key={br.id}
                      onClick={() => setConfig((prev) => ({ ...prev, bracelet: br.id as any }))}
                      className={`p-2.5 border rounded-sm text-center transition-all duration-200 cursor-pointer ${
                        config.bracelet === br.id
                          ? "border-[#c5a059] text-white bg-[#c5a059]/5"
                          : "border-[#1f1f1f] text-[#888] hover:border-[#666] hover:text-[#e5e5e5]"
                      }`}
                    >
                      <span className="text-2xs font-bold block">{br.id}</span>
                      <span className="text-4xs font-mono font-bold text-[#666] block mt-1">
                        {br.price > 0 ? `+$${br.price.toLocaleString()}` : "Incl."}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 6: Designation Label & Order */}
            <div className="pt-6 border-t border-[#1f1f1f] flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="text-4xs font-extrabold uppercase tracking-widest text-[#666] block mb-2">
                    Commission Designation (Option)
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#0a0a0a] border border-[#1f1f1f] focus:border-[#c5a059] focus:outline-none rounded-sm px-3 py-2 text-xs text-[#e5e5e5] placeholder-neutral-700 font-serif"
                    placeholder="e.g. Masterwork Chrono No. I"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                  />
                </div>

                <div className="text-right flex flex-col justify-end">
                  <span className="text-4xs font-extrabold uppercase tracking-widest text-[#666] block">
                    Bespoke Acquisition Value
                  </span>
                  <span className="text-3xl font-serif text-[#c5a059] font-bold mt-1">
                    ${totalPrice.toLocaleString()}
                  </span>
                  <span className="text-4xs text-[#888] font-mono mt-0.5">
                    Includes metallurgical certification & private delivery
                  </span>
                </div>
              </div>

              {/* Commission Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-2">
                <button
                  onClick={handleSave}
                  className="w-full bg-transparent border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-[#0a0a0a] font-semibold uppercase tracking-widest py-3 px-6 text-xs transition-all duration-300 rounded-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Deposit in Vault</span>
                </button>

                <button
                  onClick={() => onInquire(activeWatchDummyForInquiry)}
                  className="w-full sm:col-span-2 bg-[#c5a059] text-[#0a0a0a] hover:bg-yellow-600 font-semibold uppercase tracking-widest py-3 px-6 text-xs transition-all duration-300 rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#c5a059]/15"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Secure Bespoke Acquisition</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
