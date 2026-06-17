import React, { useState } from "react";
import { Watch, Order } from "../types";
import { X, Award, FileCheck } from "lucide-react";
import { WatchSVG } from "./WatchSVG";

interface CheckoutModalProps {
  watch: Watch | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderPlaced?: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  watch,
  isOpen,
  onClose,
  onOrderPlaced,
}) => {
  if (!isOpen || !watch) return null;

  // Form states
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("concierge");
  const [customEngraving, setCustomEngraving] = useState("");
  const [premiumBox, setPremiumBox] = useState(false);

  // Success state
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedSerial, setGeneratedSerial] = useState("");

  const handleAcquireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) return;

    // Generate random luxury serial number
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const countryCode = "CH"; // Switzerland
    const serial = `RX-${watch.reference.split("-")[0] || "SW"}-${randomNum}-${countryCode}`;

    setGeneratedSerial(serial);
    setIsSuccess(true);

    if (onOrderPlaced) {
      onOrderPlaced({
        orderNumber: serial,
        clientName,
        clientEmail,
        clientPhone,
        deliveryMethod,
        customEngraving: customEngraving || undefined,
        premiumBox,
        watch,
        price: watch.price + (premiumBox ? 350 : 0),
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        status: "Registered",
      });
    }
  };


  const finalPrice = watch.price + (premiumBox ? 350 : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-sm shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in text-[#e5e5e5]">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsSuccess(false);
            onClose();
          }}
          className="absolute top-4 right-4 text-[#888] hover:text-[#e5e5e5] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* SUCCESS TRANSACTION SUMMARY SCREEN */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#006039]/20 border border-[#006039]/40 text-emerald-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <FileCheck className="w-8 h-8" strokeWidth={1.5} />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c5a059] block">
                Acquisition Confirmed
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-[#e5e5e5]">
                Chronometer Commended
              </h3>
              <p className="text-[#888] text-xs max-w-md mx-auto leading-relaxed">
                Dear <strong className="text-[#e5e5e5]">{clientName}</strong>, your secure order file has been registered. An official concierge watchmaker will contact your private phone line in less than 2 hours.
              </p>
            </div>

            {/* Generated Certificate UI */}
            <div className="bg-[#0d0d0d] border border-[#c5a059]/30 p-6 rounded-sm max-w-md mx-auto text-left relative space-y-4 shadow-lg">
              <div className="flex justify-between items-center border-b border-[#1f1f1f] pb-3">
                <span className="text-serif font-semibold text-[#888] text-xs italic">
                  Chronometer Certificate of Origin
                </span>
                <span className="text-[9px] font-bold text-[#c5a059] font-mono uppercase tracking-widest">
                  Authentic Swiss Model
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-2xs">
                <div>
                  <span className="text-[#666] block">Instrument model</span>
                  <span className="text-[#e5e5e5] font-bold block">{watch.name}</span>
                </div>
                <div>
                  <span className="text-[#666] block">Assigned Serial No.</span>
                  <span className="text-[#c5a059] font-mono font-bold block">{generatedSerial}</span>
                </div>
                <div>
                  <span className="text-[#666] block">Metallurgy case alloy</span>
                  <span className="text-[#e5e5e5] font-semibold block">{watch.material}</span>
                </div>
                <div>
                  <span className="text-[#666] block">Assessor Email</span>
                  <span className="text-[#e5e5e5] font-semibold block truncate">{clientEmail}</span>
                </div>
                {customEngraving && (
                  <div className="col-span-2">
                    <span className="text-[#666] block">Bespoke Diamond Engraving</span>
                    <span className="text-[#c5a059] font-serif italic text-xs block">
                      "{customEngraving}"
                    </span>
                  </div>
                )}
                <div className="col-span-2 pt-2 border-t border-[#1f1f1f] flex justify-between items-center text-xs">
                  <span className="text-[#666] uppercase tracking-widest text-[9px] font-bold">
                    Official Valuation
                  </span>
                  <span className="text-medium text-[#e5e5e5] font-serif font-bold">
                    ${finalPrice.toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* Security Seal */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none transform rotate-12 scale-125">
                <Award className="w-32 h-32 text-[#c5a059]" />
              </div>
            </div>

            <div className="pt-4 flex flex-col items-center">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="bg-[#c5a059] text-[#0a0a0a] hover:bg-yellow-600 font-bold uppercase tracking-widest py-3 px-8 text-2xs rounded-sm transition-all duration-300 cursor-pointer"
              >
                Dismiss Ledger
              </button>
              <span className="text-[10px] text-[#666] mt-3 font-mono leading-normal">
                Ledger Sync Certified under AES-Swiss protocols. For urgent questions, contact Support at <a href="tel:8182087120" className="text-[#c5a059] hover:underline">818-208-7120</a>.
              </span>
            </div>
          </div>
        ) : (
          /* FORM ENTRY SCREEN */
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: SELECTED WATCH CARD */}
            <div className="md:col-span-5 flex flex-col items-center text-center bg-[#0d0d0d] border border-[#1f1f1f] rounded-sm p-4 h-full min-h-[350px] justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#c5a059,transparent_75%)] opacity-[0.05] pointer-events-none" />
              <div className="relative z-10 w-full">
                <span className="text-[9px] bg-[#c5a059]/15 text-[#c5a059] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider block w-max mx-auto mb-3">
                  Securing Allocation
                </span>
                <h4 className="text-[#e5e5e5] font-serif font-semibold text-md">{watch.name}</h4>
                <p className="text-3xs font-mono text-[#666] uppercase mt-0.5">
                  Ref: {watch.reference}
                </p>
              </div>

              <div className="my-6 relative z-10">
                <WatchSVG
                  dialColor={watch.dialColor}
                  material={watch.material}
                  bezelStyle={watch.bezelStyle}
                  bracelet={watch.bracelet}
                  collection={watch.collection}
                  size="sm"
                />
              </div>

              <div className="w-full border-t border-[#1f1f1f] pt-4 relative z-10">
                <span className="text-4xs font-bold uppercase tracking-widest text-[#666] block">
                  Casing Metallurgy
                </span>
                <span className="text-2xs text-[#888] block mt-0.5">{watch.material}</span>
                <span className="text-4xs font-bold uppercase tracking-widest text-[#666] block mt-3">
                  Casing Diameter
                </span>
                <span className="text-2xs text-[#888] block mt-0.5">{watch.diameter} mm</span>
              </div>
            </div>

            {/* RIGHT COLUMN: CLIENT INFORMATION FORM */}
            <form onSubmit={handleAcquireSubmit} className="md:col-span-7 space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-serif text-[#e5e5e5]">Bespoke Client Inquiry</h3>
                <p className="text-[#888] text-2xs leading-relaxed mt-1">
                  Private registration for exclusive timepieces. All data is encrypted and handled in compliance with Swiss banking secrecy. For direct concierge assistance or immediate customer support, call us at <a href="tel:8182087120" className="text-[#c5a059] font-semibold hover:underline">818-208-7120</a>.
                </p>
              </div>

              {/* Form inputs */}
              <div className="space-y-3.5">
                <div>
                  <label className="text-4xs font-bold uppercase tracking-widest text-[#666] block mb-1.55">
                    Client Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-[#0a0a0a] border border-[#1f1f1f] focus:border-[#c5a059] focus:outline-none rounded-sm px-3.5 py-2 text-xs text-[#e5e5e5] placeholder-neutral-800"
                    placeholder="e.g. Baron Arthur Pendleton"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-4xs font-bold uppercase tracking-widest text-[#666] block mb-1.55">
                      Private Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-[#0a0a0a] border border-[#1f1f1f] focus:border-[#c5a059] focus:outline-none rounded-sm px-3.5 py-2 text-xs text-[#e5e5e5] placeholder-neutral-800"
                      placeholder="client@luxuryportfolio.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-4xs font-bold uppercase tracking-widest text-[#666] block mb-1.55">
                      Secure Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full bg-[#0a0a0a] border border-[#1f1f1f] focus:border-[#c5a059] focus:outline-none rounded-sm px-3.5 py-2 text-xs text-[#e5e5e5] placeholder-neutral-800"
                      placeholder="+41 44 200 0000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                    />
                  </div>
                </div>

                {/* Delivery Options */}
                <div>
                  <label className="text-4xs font-bold uppercase tracking-widest text-[#666] block mb-1.55">
                    Concierge Delivery Configuration
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "concierge", label: "VIP Jewel Hand-Delivery" },
                      { id: "armored", label: "Armored Carriage" },
                      { id: "zurich", label: "Zurich HQ Showroom" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setDeliveryMethod(m.id)}
                        className={`p-2.5 border rounded-sm text-center font-sans transition-all duration-200 cursor-pointer ${
                          deliveryMethod === m.id
                            ? "border-[#c5a059] bg-[#c5a059]/5 text-[#c5a059]"
                            : "border-[#1f1f1f] text-[#888] hover:border-[#666] hover:text-[#e5e5e5]"
                        }`}
                      >
                        <span className="text-[9px] font-bold block uppercase leading-snug">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Diamond Engraving notes */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-4xs font-bold uppercase tracking-widest text-[#666]">
                      Bespoke Back-Case Engraving (Optional)
                    </label>
                    <span className="text-3xs text-[#666]">Max 15 chars</span>
                  </div>
                  <input
                    type="text"
                    maxLength={15}
                    className="w-full bg-[#0a0a0a] border border-[#1f1f1f] focus:border-[#c5a059] focus:outline-none rounded-sm px-3.5 py-2 text-xs text-[#c5a059] font-mono uppercase"
                    placeholder="e.g. FAMILIE FIRST"
                    value={customEngraving}
                    onChange={(e) => setCustomEngraving(e.target.value.toUpperCase())}
                  />
                </div>

                {/* Presentation Box Upgrade */}
                <label className="flex items-center gap-2.5 p-3.5 bg-[#0d0d0d] border border-[#1f1f1f] rounded-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="accent-[#c5a059] rounded-sm bg-[#0a0a0a] border border-[#1f1f1f] text-[#c5a059] w-4.5 h-4.5"
                    checked={premiumBox}
                    onChange={(e) => setPremiumBox(e.target.checked)}
                  />
                  <div className="font-sans">
                    <div className="flex items-center gap-1.5">
                      <span className="text-2xs font-bold text-[#e5e5e5]">
                        Upgrade: Royal Mahogany Lock Box (+$350)
                      </span>
                      <span className="text-[7px] bg-[#c5a059]/15 text-[#c5a059] px-1 py-0.5 rounded-sm font-bold uppercase">
                        Premium
                      </span>
                    </div>
                    <p className="text-3xs text-[#888] mt-0.5 leading-normal">
                      French mahogany wood lining, secure leather pouch, and brass key latch mechanism.
                    </p>
                  </div>
                </label>
              </div>

              {/* Total calculations block */}
              <div className="bg-[#0d0d0d] p-4 border border-[#1f1f1f] rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-4xs font-bold uppercase tracking-widest text-[#666]">
                    Boutique Valuations Summary
                  </span>
                  <div className="flex flex-col text-2xs text-[#888] mt-1">
                    <span>Base Chronometer Tag: ${watch.price.toLocaleString()}</span>
                    {premiumBox && <span>Mahogany Premium upgrade: +$350</span>}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-4xs font-bold uppercase tracking-widest text-[#666] block">
                    TOTAL INVESTMENT
                  </span>
                  <span className="text-xl md:text-2xl font-serif text-[#c5a059] font-bold block mt-0.5">
                    ${finalPrice.toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* Form buttons */}
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#0a0a0a] hover:bg-[#0d0d0d] text-[#666] border border-[#1f1f1f] hover:border-neutral-700 font-bold uppercase tracking-widest py-3 text-2xs rounded-sm transition-all duration-150 cursor-pointer text-center"
                >
                  Return to Salon
                </button>
                <button
                  type="submit"
                  className="bg-[#c5a059] text-[#0a0a0a] hover:bg-yellow-600 font-bold uppercase tracking-widest py-3 text-2xs rounded-sm transition-all duration-300 cursor-pointer text-center shadow-lg hover:shadow-[#c5a059]/15"
                >
                  Initiate Procurement
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
