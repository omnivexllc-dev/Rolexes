import React, { useState } from "react";
import { Order, Watch } from "../types";
import { WatchSVG } from "./WatchSVG";
import {
  Search,
  Clock,
  ShieldCheck,
  Truck,
  Heart,
  PhoneCall,
  Package,
  CheckCircle2,
  MapPin,
  AlertCircle,
  FileText,
  Calendar,
  Layers,
  ChevronRight,
  Info
} from "lucide-react";

interface OrderTrackerProps {
  orders: Order[];
  onSearchSimulatedClick?: () => void;
}

// Exemplary demo records for testing
const DEMO_ORDERS: Order[] = [
  {
    orderNumber: "BW8KQPBM8W9V",
    clientName: "His Grace, Duke of Geneva",
    clientEmail: "heritage@genevafunds.com",
    clientPhone: "+1 (818) 208-7120",
    deliveryMethod: "VIP Armored Transport (Shipped)",
    premiumBox: true,
    price: 4600,
    date: "June 17, 2026",
    status: "Handed to Courier", // Shipped status
    watch: {
      id: "bw8-sky-dweller-blue",
      collection: "Sky-Dweller",
      name: "Sky-Dweller Blue",
      reference: "6934",
      diameter: 42,
      material: "Yellow Gold",
      dialColor: "Blue",
      bezelStyle: "Fluted",
      bezelColor: "Yellow Gold",
      bracelet: "Oyster",
      price: 4600,
      popular: true,
      featuredText: "Sky-Dweller Blue luxury masterpiece.",
      intro: "An extraordinary dual-time annual calendar timepiece with a majestic blue dial on yellow gold command bezel and oyster series.",
      specifications: {
        calibre: "9001 manufacture Rolex",
        powerReserve: "Approximately 72 hours",
        waterResistance: "Waterproof to 100 meters / 330 feet",
        clasp: "Oysterclasp safety system",
        bezelDescription: "Bidirectional rotatable Ring Command",
        movement: "Perpetual, mechanical, dual time zones, annual calendar"
      }
    }
  },
  {
    orderNumber: "RX-DAYTONA-818208-CH",
    clientName: "Countess Isabella Thorne",
    clientEmail: "i.thorne@genevafunds.com",
    clientPhone: "+81 90-1122-3344",
    deliveryMethod: "concierge",
    customEngraving: "TEMPUS FUGIT",
    premiumBox: true,
    price: 36850,
    date: "June 14, 2026",
    status: "Quality Control",
    watch: {
      id: "demo-daytona",
      collection: "Cosmograph Daytona",
      name: "Cosmograph Daytona 'Bespoke Platinum'",
      reference: "116506-0001",
      diameter: 40,
      material: "Platinum",
      dialColor: "Ice Blue",
      bezelStyle: "Cerachrom",
      bezelColor: "Chestnut Brown",
      bracelet: "Oyster",
      price: 36500,
      popular: true,
      featuredText: "The ultimate luxury racing chronograph.",
      intro: "An iconic status symbol with breathtaking custom ice blue dial.",
      specifications: {
        calibre: "4131 manufacture Rolex",
        powerReserve: "Approximately 72 hours",
        waterResistance: "Waterproof up to 100 meters / 330 feet",
        clasp: "Oysterlock safety clasp with Easylink 5mm extension",
        bezelDescription: "Monobloc brown Cerachrom bezel with tachymetric scale",
        movement: "Perpetual mechanical chronograph, self-winding"
      }
    }
  },
  {
    orderNumber: "RX-SUBMARINER-505411-CH",
    clientName: "Dr. Alistair Sterling",
    clientEmail: "sterling@northseasculptures.org",
    clientPhone: "+1 (818) 208-7120",
    deliveryMethod: "armored",
    premiumBox: false,
    price: 11200,
    date: "June 15, 2026",
    status: "Handed to Courier",
    watch: {
      id: "demo-submariner",
      collection: "Submariner",
      name: "Submariner Date 'Emerald Marine'",
      reference: "126610LV-0002",
      diameter: 41,
      material: "Oystersteel",
      dialColor: "Black",
      bezelStyle: "Cerachrom",
      bezelColor: "Green",
      bracelet: "Oyster",
      price: 11200,
      popular: true,
      featuredText: "The archetype of the ultimate divers' timepiece.",
      intro: "Lauded for its beautiful emerald ceramic insert bezel.",
      specifications: {
        calibre: "3235 manufacture Rolex",
        powerReserve: "Approximately 70 hours",
        waterResistance: "Waterproof up to 300 meters / 1,000 feet",
        clasp: "Glidelock fine-adjustment extension clasp system",
        bezelDescription: "Unidirectional rotatable 60-minute Cerachrom insert",
        movement: "Perpetual, mechanical, self-winding"
      }
    }
  }
];

export const OrderTracker: React.FC<OrderTrackerProps> = ({ orders }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [matchedOrder, setMatchedOrder] = useState<Order | null>(null);

  // Combine live orders placed by the user this session with the stable demonstration catalog
  const allAvailableOrders = [...orders, ...DEMO_ORDERS];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    if (!query) return;

    const matched = allAvailableOrders.find(
      (o) => o.orderNumber.toUpperCase() === query || 
             o.orderNumber.includes(query) || 
             o.clientName.toUpperCase().includes(query)
    );

    setMatchedOrder(matched || null);
    setSearched(true);
  };

  const handleSelectDemo = (no: string) => {
    setSearchQuery(no);
    const matched = allAvailableOrders.find((o) => o.orderNumber === no);
    setMatchedOrder(matched || null);
    setSearched(true);
  };

  // Checkpoints logic to display full Swiss high-end assembly
  const checkpoints = [
    {
      id: "Registered",
      title: "Ledger Registry",
      desc: "Chronometer successfully synchronized into Geneva's boutique ledger",
      icon: FileText
    },
    {
      id: "Processing",
      title: "Watchmaker Review",
      desc: "Allocations approved by Head Horologist & bespoke parts secured",
      icon: Clock
    },
    {
      id: "Quality Control",
      title: "Chronometre Calibre Check",
      desc: "Passed the traditional 15-day casing precision test (-2/+2 sec daily deviation)",
      icon: ShieldCheck
    },
    {
      id: "Secured in Depot",
      title: "Secured in Depot",
      desc: "Deposited in maximum-security Zurich Vault and certified safe",
      icon: Package
    },
    {
      id: "Handed to Courier",
      title: "Bespoke In Transit",
      desc: "Handed to trusted armored carrier or dispatch VIP transport team",
      icon: Truck
    },
    {
      id: "Delivered",
      title: "Delivered & Signed",
      desc: "Boutique handover complete. Official physical certificate signed by Master Artisan",
      icon: CheckCircle2
    }
  ];

  // Map state indexing to show checkpoint timeline fill
  const getCurrentStatusIndex = (status: string) => {
    const idx = checkpoints.findIndex((c) => c.id === status);
    return idx === -1 ? 0 : idx;
  };

  const currentIdx = matchedOrder ? getCurrentStatusIndex(matchedOrder.status) : 0;

  return (
    <div className="bg-[#0a0a0a] min-h-[600px] py-12 px-4 md:px-12 text-[#e5e5e5] font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Titles */}
        <div className="text-center space-y-3 mb-10">
          <span className="text-3xs uppercase font-extrabold tracking-widest text-[#c5a059] bg-[#c5a059]/5 border border-[#c5a059]/20 px-3 py-1 rounded-full inline-block">
            Bespoke Order Ledger
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#e5e5e5]">
            Chronometer Registry Tracker
          </h2>
          <p className="text-[#888] text-2xs md:text-xs max-w-xl mx-auto leading-relaxed">
            Verify progress of your luxury timepiece from development inside our secure Swiss manufacture down to custom presentation, security checking, and armored courier transport.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SEARCH SYSTEM COLUMN */}
          <div className="lg:col-span-4 bg-[#0d0d0d] border border-[#1f1f1f] p-6 rounded-sm space-y-6">
            <h3 className="text-2xs font-extrabold uppercase tracking-widest text-[#666] border-b border-[#1f1f1f] pb-3">
              Locate Order File
            </h3>

            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-wider text-[#888]">
                  Order Number or Client Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. RX-DAYTONA-818208-CH"
                    className="w-full bg-[#050505] border border-[#1f1f1f] focus:border-[#c5a059] focus:outline-none rounded-sm pl-9 pr-3 py-2.5 text-xs text-[#e5e5e5] placeholder-neutral-800 uppercase font-mono font-bold tracking-widest"
                  />
                  <Search className="absolute left-3 top-3 w-4 h-4 text-[#444] pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#c5a059] text-[#0a0a0a] hover:bg-yellow-600 font-extrabold uppercase tracking-widest text-[10px] rounded-sm transition-all duration-300 cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Examine Registry</span>
              </button>
            </form>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-2 text-3xs text-[#666] font-extrabold uppercase tracking-widest">
                <Info className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Test Demonstrations</span>
              </div>
              <p className="text-3xs text-[#666] leading-normal">
                Click a certified sample registry code or check client names to observe tracking status:
              </p>
              <div className="space-y-2">
                {DEMO_ORDERS.map((o) => (
                  <button
                    key={o.orderNumber}
                    onClick={() => handleSelectDemo(o.orderNumber)}
                    className="w-full text-left p-2.5 bg-[#050505] hover:bg-[#0c0c0c] border border-[#1f1f1f] rounded-sm transition-all text-xs flex flex-col font-mono cursor-pointer"
                  >
                    <span className="text-[#c5a059] text-[10px] font-bold tracking-wider">{o.orderNumber}</span>
                    <div className="flex justify-between items-center text-[9px] text-[#666] mt-1">
                      <span>{o.clientName.split(" ")[0]} ({o.watch.collection})</span>
                      <span className="bg-[#1f1f1f] px-1.5 py-0.5 rounded text-neutral-400 font-sans font-bold leading-none text-[8px] uppercase">
                        {o.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {orders.length > 0 && (
              <div className="pt-2 border-t border-[#1f1f1f] space-y-2">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#888] block">
                  Active Session Orders ({orders.length})
                </span>
                <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                  {orders.map((o) => (
                    <button
                      key={o.orderNumber}
                      onClick={() => handleSelectDemo(o.orderNumber)}
                      className="w-full text-left p-2 bg-[#050505] hover:bg-[#0c0c0c] border border-[#1f1f1f] rounded-sm transition-all font-mono text-[10px] flex justify-between items-center cursor-pointer text-neutral-300"
                    >
                      <span className="truncate max-w-[120px] font-bold text-[#c5a059]">{o.orderNumber}</span>
                      <span className="text-[8px] px-1 bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 font-sans font-bold uppercase">
                        Active
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Contact Support Direct Card */}
            <div className="bg-[#c5a059]/5 border border-[#c5a059]/20 p-4 rounded-sm text-center space-y-2.5">
              <PhoneCall className="w-5 h-5 text-[#c5a059] mx-auto" />
              <p className="text-3xs text-[#888] leading-relaxed">
                Direct lines to Genevan watchmaker support desk:
              </p>
              <a href="tel:8182087120" className="text-xs font-mono font-bold text-[#e5e5e5] hover:text-[#c5a059] underline tracking-widest block">
                (818) 208-7120
              </a>
            </div>
          </div>

          {/* RESULTS COLUMN */}
          <div className="lg:col-span-8">
            {!searched ? (
              /* INITIAL PLACEHOLDER */
              <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-sm p-12 text-center flex flex-col items-center justify-center min-h-[420px] space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#111111] border border-[#1f1f1f] flex items-center justify-center text-neutral-700">
                  <ShieldCheck strokeWidth={1} className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-md font-serif text-neutral-400">Ledger Awaiting Access</p>
                  <p className="text-2xs text-[#666] max-w-sm mx-auto leading-relaxed">
                    Enter one of the generated Swiss serial order numbers above or select from the preloaded testing records to reveal the real-time horological checkpoint ledger.
                  </p>
                </div>
              </div>
            ) : matchedOrder ? (
              /* FOUND ACTIVE ORDER */
              <div className="space-y-6">
                
                {/* 1. Brief Order Overview Header Card */}
                <div className="bg-[#0d0d0d] border border-[#1f1f1f] p-6 rounded-sm relative overflow-hidden">
                  <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#c5a059]/5 to-transparent pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.55">
                      <div className="flex items-center gap-2">
                        <span className="text-4xs font-bold uppercase tracking-widest text-[#666]">
                          Exquisite Commission Portfolio
                        </span>
                        <span className="px-2 py-0.5 text-[8px] font-bold bg-[#c5a059]/10 text-[#c5a059] rounded border border-[#c5a059]/25 uppercase font-mono tracking-wider animate-pulse">
                          SHIPPED IN TRANSIT
                        </span>
                      </div>
                      <h3 className="font-mono text-md md:text-lg text-[#c5a059] font-bold tracking-wider">
                        {matchedOrder.orderNumber}
                      </h3>
                      <p className="text-3xs text-[#888]">
                        Registered Client: <span className="text-[#e5e5e5] font-semibold">{matchedOrder.clientName}</span> • Signed on <span className="text-[#e5e5e5]">{matchedOrder.date}</span>
                      </p>
                    </div>

                    <div className="text-left md:text-right space-y-1 bg-[#121212] p-3 rounded border border-[#1f1f1f] md:min-w-[170px]">
                      <span className="text-4xs text-[#666] uppercase tracking-widest block font-bold">
                        Bespoke Commission Pool
                      </span>
                      <span className="text-md md:text-lg font-serif text-[#e5e5e5] font-bold block">
                        {matchedOrder.orderNumber === "BW8KQPBM8W9V" ? "$4,600.00" : `$${matchedOrder.price.toLocaleString()} USD`}
                      </span>
                      <span className="text-[9px] text-[#888] font-semibold block">
                        Tax and Swiss clearance paid
                      </span>
                    </div>
                  </div>
                </div>

                {/* SPECIAL PROMINENT ALERT BANNER FOR BW8KQPBM8W9V OR HIGH-END SHIPPED STATUS */}
                {matchedOrder.orderNumber === "BW8KQPBM8W9V" && (
                  <div className="bg-[#c5a059]/10 border-2 border-[#c5a059]/40 p-5 rounded-sm flex items-start gap-4 animate-fade-in">
                    <div className="p-2 bg-[#c5a059]/20 rounded text-[#c5a059] shrink-0">
                      <Truck className="w-6 h-6 animate-bounce" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#c5a059] font-mono">
                        Active Ship Registry Transmitted
                      </h4>
                      <p className="text-xs text-[#e5e5e5] leading-relaxed font-semibold">
                        Good news! This product has been shipped and it will be delivered within 4 business days.
                      </p>
                      <p className="text-3xs text-[#888] font-medium">
                        Secure armored carrier #GEN-AR-992 with biometric signature required on delivery.
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. Interactive Checkpoints Timeline and Watch Card */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Left sub-column: Watch View details */}
                  <div className="md:col-span-5 bg-[#0d0d0d] border border-[#1f1f1f] p-5 rounded-sm flex flex-col justify-between items-center text-center relative overflow-hidden min-h-[380px]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#c5a059,transparent_75%)] opacity-[0.03]" />
                    
                    <div className="w-full relative z-10">
                      <h4 className="text-2xs font-bold uppercase tracking-widest text-[#666]">
                        ALLOCATED CHRONOMETER
                      </h4>
                      <p className="font-serif text-[#e5e5e5] text-md mt-1 font-semibold">{matchedOrder.watch.name}</p>
                      <span className="font-mono text-3xs text-[#c5a059] border border-[#c5a059]/20 bg-[#c5a059]/5 px-2 py-0.5 rounded-sm inline-block mt-1">
                        Ref: {matchedOrder.watch.reference}
                      </span>
                    </div>

                    <div className="my-4 relative z-10 scale-95 md:scale-100">
                      <WatchSVG
                        dialColor={matchedOrder.watch.dialColor}
                        material={matchedOrder.watch.material}
                        bezelStyle={matchedOrder.watch.bezelStyle}
                        bracelet={matchedOrder.watch.bracelet}
                        collection={matchedOrder.watch.collection}
                        size="sm"
                      />
                    </div>

                    <div className="w-full pt-4 border-t border-[#1f1f1f] space-y-2 text-3xs text-left relative z-10">
                      <div className="flex justify-between">
                        <span className="text-[#666] font-bold uppercase">Product Name:</span>
                        <span className="text-[#c5a059] font-serif font-bold text-2xs truncate max-w-[130px]">{matchedOrder.watch.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#666] font-bold uppercase">Model/Reference:</span>
                        <span className="text-neutral-200 font-mono font-semibold">#{matchedOrder.watch.reference}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#666] font-bold uppercase">Color:</span>
                        <span className="text-neutral-200 font-semibold">{matchedOrder.orderNumber === "BW8KQPBM8W9V" ? "Golden" : matchedOrder.watch.dialColor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#666] font-bold uppercase">Material:</span>
                        <span className="text-neutral-300 font-semibold">{matchedOrder.watch.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#666] font-bold uppercase">Price:</span>
                        <span className="text-[#c5a059] font-mono font-bold">
                          {matchedOrder.orderNumber === "BW8KQPBM8W9V" ? "$4,600.00" : `$${matchedOrder.price.toLocaleString()} USD`}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-[#1f1f1f]/60">
                        <span className="text-[#666] font-bold uppercase">Payment Method:</span>
                        <span className="text-emerald-400 font-medium font-mono text-[9px] text-right">
                          {matchedOrder.orderNumber === "BW8KQPBM8W9V" 
                            ? "Credit card/ Bank Transfer/ Cash" 
                            : "Secured Bank Wire Pre-pay"}
                        </span>
                      </div>
                      {matchedOrder.customEngraving && (
                        <div className="pt-2 border-t border-[#1f1f1f]/50">
                          <span className="text-[#666] uppercase block font-bold mb-0.5">Diamond Engraving:</span>
                          <span className="text-[#c5a059] font-serif italic text-2xs">"{matchedOrder.customEngraving}"</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right sub-column: Ledger checklist timeline */}
                  <div className="md:col-span-7 bg-[#0d0d0d] border border-[#1f1f1f] p-5 rounded-sm space-y-4">
                    <h4 className="text-2xs font-extrabold uppercase tracking-widest text-[#666] border-b border-[#1f1f1f] pb-3 flex justify-between items-center">
                      <span>Swiss Horologist Checkpoint Log</span>
                      <span className="text-[#c5a059] font-mono lowercase text-[10px] tracking-wider">active tracking live</span>
                    </h4>

                    <div className="relative pl-6 space-y-5.5 before:content-[''] before:absolute before:left-[11px] before:top-2.5 before:bottom-2 before:w-[1px] before:bg-[#1f1f1f]">
                      {checkpoints.map((cp, idx) => {
                        const isDone = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;
                        const IconComponent = cp.icon;

                        return (
                          <div key={cp.id} className="relative flex gap-4 text-xs transition-opacity duration-300">
                            {/* Checkpoint Dot */}
                            <div className={`absolute -left-6 w-[23px] h-[23px] rounded-full border flex items-center justify-center transition-all ${
                              isCurrent
                                ? "bg-[#c5a059]/15 border-[#c5a059] text-[#c5a059] ring-4 ring-[#c5a059]/10"
                                : isDone
                                ? "bg-[#0a0a0a] border-[#006039] text-[#006039]"
                                : "bg-[#0d0d0d] border-[#141414] text-neutral-800"
                            }`}>
                              {isDone && !isCurrent ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-950/30" />
                              ) : (
                                <IconComponent className="w-3 h-3" />
                              )}
                            </div>

                            {/* Informational bubble text */}
                            <div className="space-y-1">
                              <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                                isCurrent
                                  ? "text-[#c5a059]"
                                  : isDone
                                  ? "text-neutral-300"
                                  : "text-neutral-600"
                              }`}>
                                {cp.title}
                                {isCurrent && (
                                  <span className="ml-2 bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 text-[7px] tracking-widest px-1.5 py-0.5 rounded font-mono uppercase inline-block animate-pulse align-middle">
                                    Current Status
                                  </span>
                                )}
                              </span>
                              <p className={`text-3xs leading-relaxed ${
                                isCurrent || isDone ? "text-neutral-400" : "text-neutral-700 font-sans"
                              }`}>
                                {cp.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* 3. Swiss Banking Policy Notice */}
                <div className="bg-[#0c0c0c] border border-[#1f1f1f] p-4.5 rounded-sm flex items-start gap-3.5 text-3xs text-[#666] leading-relaxed">
                  <Clock className="w-4.5 h-4.5 text-[#c5a059] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-serif font-semibold text-[#888] mb-0.5">Assurance Certifications</h5>
                    <p>
                      Precision timekeeping certificates and international customs transport receipts are stored in encrypted physical vaults at Genovese headquarters. Deliveries are made in covert vehicles by vetted former military security guards. Call the support desk at <a href="tel:8182087120" className="text-[#c5a059] underline font-bold font-mono">(818) 208-7120</a> to redirect delivery or secure physical signatures.
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              /* SEARCHED BUT NOT FOUND */
              <div className="bg-[#0d0d0d] border border-red-950/20 rounded-sm p-12 text-center flex flex-col items-center justify-center min-h-[420px] space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-950/5 border border-red-900/10 flex items-center justify-center text-red-500/50">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-md font-serif text-red-400">Order Registry File Not Located</p>
                  <p className="text-2xs text-[#888] max-w-sm mx-auto leading-relaxed">
                    No active Swiss chronometer inquiry matches '<span className="text-[#e5e5e5] font-mono">{searchQuery}</span>'. Please verify the spelling or select any of our verified testing records in the sidebar.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSearched(false);
                  }}
                  className="px-4 py-1.5 border border-[#1f1f1f] hover:border-[#c5a059]/30 text-[#888] hover:text-[#c5a059] transition-all rounded text-3xs uppercase tracking-widest font-bold cursor-pointer"
                >
                  Clear Entry
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
