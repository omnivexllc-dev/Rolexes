import React from "react";
import { Watch } from "../types";
import { X, Scale, CreditCard } from "lucide-react";
import { WatchSVG } from "./WatchSVG";

interface CompareDrawerProps {
  compareList: Watch[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onInquire: (watch: Watch) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  compareList,
  onRemove,
  onClearAll,
  onInquire,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-[#0a0a0a] border-t border-[#1f1f1f] shadow-2xl animate-fade-in max-h-screen overflow-y-auto">
      {/* Drawer Header */}
      <div className="bg-[#0a0a0a] px-6 py-4.5 border-b border-[#1f1f1f] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#c5a059]" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#e5e5e5]">
            Chronometer Comparative Desk ({compareList.length} / 3)
          </h3>
        </div>
        <div className="flex items-center gap-4">
          {compareList.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-3xs uppercase tracking-widest font-extrabold text-[#666] hover:text-[#c5a059] transition-colors"
            >
              Clear Comparison
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[#888] hover:text-[#e5e5e5] transition-colors"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {compareList.length === 0 ? (
        <div className="py-12 text-center text-[#666] max-w-sm mx-auto">
          <Scale className="w-8 h-8 mx-auto mb-3 text-[#1f1f1f] opacity-60" />
          <p className="text-xs font-serif italic text-[#888]">
            "Comparative wisdom is the first anchor of luxury investments."
          </p>
          <p className="text-3xs mt-2 uppercase font-semibold text-[#666]">
            Choose up to 3 watches from the catalogue below to evaluate side-by-side.
          </p>
        </div>
      ) : (
        <div className="px-6 py-8 max-w-7xl mx-auto">
          {/* Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {compareList.map((watch) => (
              <div
                key={watch.id}
                className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-sm p-5 relative group transition-all duration-300 hover:border-[#c5a059]/40"
              >
                {/* Remove button */}
                <button
                  onClick={() => onRemove(watch.id)}
                  className="absolute top-3 right-3 text-[#666] hover:text-red-400 transition-colors bg-[#0a0a0a]/80 hover:bg-[#0a0a0a] p-1 rounded-full border border-[#1f1f1f]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* Watch Render Header */}
                <div className="flex flex-col items-center justify-center pb-5 border-b border-[#1f1f1f]">
                  <div className="p-4 bg-[#141414] border border-[#1f1f1f] rounded-sm relative overflow-hidden flex items-center justify-center w-full max-w-[150px] aspect-square mb-3">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#c5a059,transparent_75%)] opacity-[0.05] pointer-events-none" />
                    <WatchSVG
                      dialColor={watch.dialColor}
                      material={watch.material}
                      bezelStyle={watch.bezelStyle}
                      bracelet={watch.bracelet}
                      collection={watch.collection}
                      size="sm"
                    />
                  </div>
                  <h4 className="font-serif text-sm text-[#e5e5e5] font-semibold text-center mt-1">
                    {watch.name}
                  </h4>
                  <p className="text-3xs font-mono text-[#666] uppercase mt-0.5 tracking-wider">
                    Ref: {watch.reference}
                  </p>
                  
                  {/* Elegant Divider */}
                  <div className="h-[1px] w-6 bg-[#c5a059] my-2" />

                  <span className="text-sm font-serif text-[#c5a059] font-bold">
                    ${watch.price.toLocaleString()}
                  </span>
                </div>

                {/* Specs breakdown rows */}
                <div className="py-4 space-y-3 text-2xs font-sans">
                  <div className="flex justify-between pb-2 border-b border-[#1f1f1f]">
                    <span className="text-[#666]">Collection</span>
                    <span className="text-[#e5e5e5] font-semibold">{watch.collection}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#1f1f1f]">
                    <span className="text-[#666]">Diameter</span>
                    <span className="text-[#e5e5e5] font-semibold">{watch.diameter} mm</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#1f1f1f]">
                    <span className="text-[#666]">Metallurgy</span>
                    <span className="text-[#e5e5e5] font-semibold">{watch.material}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#1f1f1f]">
                    <span className="text-[#666]">Dial Base</span>
                    <span className="text-[#e5e5e5] font-semibold">{watch.dialColor} Dial</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#1f1f1f]">
                    <span className="text-[#666]">Bezel Architecture</span>
                    <span className="text-[#e5e5e5] font-semibold truncate max-w-[140px]" title={`${watch.bezelStyle} Bezel`}>
                      {watch.bezelStyle} Bezel
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#1f1f1f]">
                    <span className="text-[#666]">Bracelet Inlay</span>
                    <span className="text-[#e5e5e5] font-semibold">{watch.bracelet}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#1f1f1f]">
                    <span className="text-[#666]">Clasp Lock</span>
                    <span className="text-[#888] font-mono text-[10px] text-right truncate max-w-[150px]" title={watch.specifications.clasp}>
                      {watch.specifications.clasp}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#1f1f1f]">
                    <span className="text-[#666]">Calibre</span>
                    <span className="text-[#e5e5e5] font-mono font-bold text-[10px]">{watch.specifications.calibre}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#1f1f1f]">
                    <span className="text-[#666]">Power Reserve</span>
                    <span className="text-[#e5e5e5] font-semibold">{watch.specifications.powerReserve}</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-[#666]">Hermetic Seal</span>
                    <span className="text-[#e5e5e5] font-semibold">{watch.specifications.waterResistance}</span>
                  </div>
                </div>

                {/* Instant inquiry inside comparative columns */}
                <button
                  onClick={() => onInquire(watch)}
                  className="w-full mt-2 bg-[#0a0a0a] text-[#e5e5e5] border border-[#1f1f1f] hover:border-[#c5a059] hover:text-[#c5a059] py-2 text-3xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Procure This Model</span>
                </button>
              </div>
            ))}
            {compareList.length < 3 &&
              Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-[#0a0a0a]/20 border-2 border-dashed border-[#1f1f1f] rounded-sm py-28 text-center flex flex-col justify-center items-center text-[#666] font-sans"
                >
                  <Scale className="w-6 h-6 mb-2 text-[#1f1f1f] opacity-40" />
                  <span className="text-3xs uppercase font-extrabold tracking-widest">
                    Available Bench
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
