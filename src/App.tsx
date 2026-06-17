import { useState, useEffect } from "react";
import { WATCHES } from "./data/watches";
import { FilterState, Watch, Order } from "./types";
import { WatchSVG } from "./components/WatchSVG";
import { FiltersBar } from "./components/FiltersBar";
import { BespokeBuilder } from "./components/BespokeBuilder";
import { CompareDrawer } from "./components/CompareDrawer";
import { VaultDrawer } from "./components/VaultDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { OrderTracker } from "./components/OrderTracker";
import {
  Clock,
  Compass,
  Award,
  Scale,
  ShieldCheck,
  Check,
  ChevronRight,
  Info,
  Sliders,
  Sparkles,
  Heart,
  ChevronLast,
  X,
  Wallet,
  AlertTriangle
} from "lucide-react";

export default function App() {
  // Views navigation
  const [activeTab, setActiveTab] = useState<"browse" | "customizer" | "tracker">("browse");

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    collections: [],
    materials: [],
    dialColors: [],
    diameters: [],
    priceRange: [5000, 45000],
    searchQuery: "",
  });

  const [sortOrder, setSortOrder] = useState<string>("popular");

  // Dynamic lists
  const [compareList, setCompareList] = useState<Watch[]>([]);
  const [vault, setVault] = useState<Watch[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

    // Open modals / Drawers triggers
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [selectedDetailWatch, setSelectedDetailWatch] = useState<Watch | null>(null);
  const [selectedCheckoutWatch, setSelectedCheckoutWatch] = useState<Watch | null>(null);

  // MetaMask Wallet Sync States
  const [walletAddress, setWalletAddress] = useState<string | null>(() => {
    return localStorage.getItem("luxury_wallet_address") || null;
  });
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(false);

  const connectWallet = async () => {
    setIsWalletConnecting(true);
    setWalletError(null);
    try {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        try {
          const accounts = await (window as any).ethereum.request({
            method: "eth_requestAccounts",
          });
          if (accounts && accounts[0]) {
            setWalletAddress(accounts[0]);
            localStorage.setItem("luxury_wallet_address", accounts[0]);
            setWalletError(null);
          } else {
            throw new Error("No accounts found in MetaMask.");
          }
        } catch (err: any) {
          console.error("MetaMask connection failed:", err);
          throw new Error(err?.message || "Failed to connect to MetaMask");
        }
      } else {
        throw new Error("Failed to connect to MetaMask: Extension not detected in preview browser.");
      }
    } catch (err: any) {
      setWalletError(err.message || "Failed to connect to MetaMask");
    } finally {
      setIsWalletConnecting(false);
    }
  };

  const simulateWalletConnect = () => {
    setIsWalletConnecting(true);
    setWalletError(null);
    setTimeout(() => {
      const mockAddr = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      setWalletAddress(mockAddr);
      localStorage.setItem("luxury_wallet_address", mockAddr);
      setIsWalletConnecting(false);
      setWalletError(null);
    }, 600);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    localStorage.removeItem("luxury_wallet_address");
    setWalletError(null);
  };

  // Live Swiss Clock Interval
  const [genevaTime, setGenevaTime] = useState("");

  // Load lists from localStorage on mount safely
  useEffect(() => {
    const savedVault = localStorage.getItem("luxury_collector_vault");
    if (savedVault) {
      try {
        setVault(JSON.parse(savedVault));
      } catch (e) {
        console.error("Failed to load vault:", e);
      }
    }

    const savedCompare = localStorage.getItem("luxury_collector_compare");
    if (savedCompare) {
      try {
        setCompareList(JSON.parse(savedCompare));
      } catch (e) {
        console.error("Failed to load comparison desk:", e);
      }
    }

    const savedOrders = localStorage.getItem("luxury_collector_orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Failed to load orders:", e);
      }
    }
  }, []);

  // Sync vault to localStorage
  const saveVaultToLocalStorage = (newVault: Watch[]) => {
    setVault(newVault);
    localStorage.setItem("luxury_collector_vault", JSON.stringify(newVault));
  };

  const saveCompareToLocalStorage = (newCompare: Watch[]) => {
    setCompareList(newCompare);
    localStorage.setItem("luxury_collector_compare", JSON.stringify(newCompare));
  };

  const saveOrdersToLocalStorage = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem("luxury_collector_orders", JSON.stringify(newOrders));
  };


  // Geneva Clock updating
  useEffect(() => {
    const updateTime = () => {
      // Create formatter in Zurich/Geneva (Europe/Zurich) timezone
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Zurich",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setGenevaTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter Categories Lists compilation
  const collectionsList = Array.from(new Set(WATCHES.map((w) => w.collection)));
  const materialsList = Array.from(new Set(WATCHES.map((w) => w.material)));
  const dialColorsList = Array.from(new Set(WATCHES.map((w) => w.dialColor)));
  const diametersList = Array.from(new Set(WATCHES.map((w) => w.diameter))).sort((a, b) => a - b);

  // Filter Logic execution
  const filteredWatches = WATCHES.filter((watch) => {
    // Search query
    if (
      filters.searchQuery &&
      !watch.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !watch.reference.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !watch.collection.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Collections
    if (filters.collections.length > 0 && !filters.collections.includes(watch.collection)) {
      return false;
    }

    // Materials
    if (filters.materials.length > 0 && !filters.materials.includes(watch.material)) {
      return false;
    }

    // Dial colors
    if (filters.dialColors.length > 0 && !filters.dialColors.includes(watch.dialColor)) {
      return false;
    }

    // Diameters
    if (filters.diameters.length > 0 && !filters.diameters.includes(watch.diameter)) {
      return false;
    }

    // Price range
    if (watch.price < filters.priceRange[0] || watch.price > filters.priceRange[1]) {
      return false;
    }

    return true;
  });

  // Sort logic execution
  const sortedWatches = [...filteredWatches].sort((a, b) => {
    if (sortOrder === "price_asc") {
      return a.price - b.price;
    }
    if (sortOrder === "price_desc") {
      return b.price - a.price;
    }
    if (sortOrder === "collection_asc") {
      return a.collection.localeCompare(b.collection);
    }
    if (sortOrder === "popular") {
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    }
    return 0;
  });

  // Compare toggles (max 3)
  const handleToggleCompare = (watch: Watch) => {
    const exists = compareList.find((w) => w.id === watch.id);
    if (exists) {
      const updated = compareList.filter((w) => w.id !== watch.id);
      saveCompareToLocalStorage(updated);
    } else {
      if (compareList.length >= 3) {
        alert("Comparison Desk handles up to 3 luxury models concurrently.");
        return;
      }
      const updated = [...compareList, watch];
      saveCompareToLocalStorage(updated);
      setIsCompareOpen(true); // Auto expand drawer to give feedback
    }
  };

  // Vault toggles
  const handleToggleVault = (watch: Watch) => {
    const exists = vault.find((w) => w.id === watch.id);
    let updated;
    if (exists) {
      updated = vault.filter((w) => w.id !== watch.id);
    } else {
      updated = [...vault, watch];
    }
    saveVaultToLocalStorage(updated);
  };

  const handleRemoveFromVault = (id: string) => {
    const updated = vault.filter((w) => w.id !== id);
    saveVaultToLocalStorage(updated);
  };

  const handleSaveBespokeToVault = (customWatch: Watch) => {
    const updated = [customWatch, ...vault];
    saveVaultToLocalStorage(updated);
    setIsVaultOpen(true); // slide open vault to reveal bespoke addition
  };

  const handleInquireFromPlatform = (watch: Watch) => {
    setSelectedCheckoutWatch(watch);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] flex flex-col font-sans antialiased overflow-x-hidden">
      
      {/* ================= HEADER BAR ================= */}
      <header className="bg-[#0a0a0a] border-b border-[#1f1f1f] sticky top-0 z-50 py-4 px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center p-1.5 bg-[#006039] rounded-full border border-[#c5a059]/20 shadow">
            {/* Minimal Vector Watch Crown Emblem */}
            <svg viewBox="0 0 100 100" className="w-5.5 h-5.5 fill-current text-[#c5a059]">
              <path d="M 12 85 L 20 20 L 35 48 L 50 15 L 65 48 L 80 20 L 88 85 Z" />
              <circle cx="20" cy="11" r="5" />
              <circle cx="50" cy="6" r="5" />
              <circle cx="80" cy="11" r="5" />
              <rect x="10" y="88" width="80" height="6" rx="2" fill="#EAEAEA" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm md:text-md uppercase font-serif tracking-widest text-[#e5e5e5] font-semibold">
              CHRONOMÈTRE LUXE
            </h1>
            <span className="text-[8px] text-[#666] font-bold uppercase tracking-wider block">
              Official Collector's Salon
            </span>
          </div>
        </div>

        {/* Live Zurich/Geneva GMT Timepiece & Concierge Support */}
        <div className="hidden md:flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-[#0d0d0d] border border-[#1f1f1f] rounded-full text-[10px] text-[#888] font-semibold uppercase tracking-wider shadow-inner">
            <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Geneva Time:</span>
            <span className="font-mono text-[#c5a059] font-bold">{genevaTime || "12:15:32"}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0d0d0d] border border-[#1f1f1f] rounded-full text-[10px] text-[#888] font-semibold uppercase tracking-wider shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse"></span>
            <span className="text-[#666]">Support:</span>
            <a href="tel:8182087120" className="text-[#c5a059] font-mono font-bold tracking-wider hover:underline">(818) 208-7120</a>
          </div>
        </div>

        {/* Vault & Compare Desk Nav Triggers */}
        <div className="flex items-center gap-3">
          {/* MetaMask Web3 Ledger Sync */}
          <div className="relative">
            <button
              onClick={() => setIsWalletMenuOpen(!isWalletMenuOpen)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border rounded-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer bg-[#0d0d0d] hover:bg-[#141414] ${
                walletAddress ? "border-[#c5a059] text-[#c5a059]" : "border-[#1f1f1f] text-[#888]"
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-mono">
                {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Sync Ledger"}
              </span>
              <span className="md:hidden">
                {walletAddress ? "Sync" : "Sync"}
              </span>
              {walletAddress ? (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              )}
            </button>

            {isWalletMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#0a0a0a] border border-[#1f1f1f] p-4 rounded-sm shadow-xl z-50 animate-fade-in text-left">
                <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-2 mb-3">
                  <span className="text-3xs font-extrabold uppercase tracking-widest text-[#666]">
                    Swiss Web3 Ledger Sync
                  </span>
                  <button
                    onClick={() => setIsWalletMenuOpen(false)}
                    className="text-[#666] hover:text-[#e5e5e5] text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>

                {walletError && (
                  <div className="p-2.5 mb-3 bg-red-950/20 border border-red-900/50 rounded-sm text-[10px] text-red-500 space-y-1.5">
                    <div className="flex gap-1.5 items-start">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold leading-none">Connection Error</p>
                        <p className="opacity-90 leading-relaxed mt-1 font-mono text-[9px] break-words">{walletError}</p>
                      </div>
                    </div>
                    <button
                      onClick={simulateWalletConnect}
                      className="w-full py-1 bg-[#c5a059]/10 hover:bg-[#c5a059]/20 border border-[#c5a059]/30 text-[#c5a059] font-bold uppercase rounded-sm text-center text-[9px] tracking-wider transition-colors cursor-pointer"
                    >
                      Bypass & Connect Sandbox Wallet
                    </button>
                  </div>
                )}

                {walletAddress ? (
                  <div className="space-y-3">
                    <div className="space-y-1 bg-[#121212] p-2.5 rounded-sm border border-[#1f1f1f]">
                      <span className="text-[#666] text-4xs uppercase tracking-widest block font-bold">
                        Active Account
                      </span>
                      <span className="font-mono text-2xs text-[#e5e5e5] block break-all font-semibold">
                        {walletAddress}
                      </span>
                      <span className="text-[10px] text-emerald-500 font-semibold block mt-1">
                        ● Chronometer Ledger Synchronized
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        disconnectWallet();
                        setIsWalletMenuOpen(false);
                      }}
                      className="w-full py-2 bg-[#0d0d0d] hover:bg-neutral-900 border border-[#1f1f1f] text-neutral-400 hover:text-red-500 font-bold uppercase tracking-widest rounded-sm text-center text-3xs transition-all duration-300 cursor-pointer"
                    >
                      Disconnect Identity
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-3xs text-[#888] leading-relaxed">
                      Authenticate with your MetaMask wallet to digitally sign certified timepieces, secure custom commissions, and log insurance certificates.
                    </p>

                    <div className="space-y-2">
                      <button
                        onClick={connectWallet}
                        disabled={isWalletConnecting}
                        className="w-full py-2 bg-[#c5a059] text-[#0a0a0a] hover:bg-yellow-600 font-extrabold uppercase tracking-widest rounded-sm text-center text-3xs transition-all duration-300 cursor-pointer disabled:opacity-50"
                      >
                        {isWalletConnecting ? "Requesting MetaMask..." : "Connect MetaMask"}
                      </button>

                      <button
                        onClick={simulateWalletConnect}
                        className="w-full py-2 bg-[#0d0d0d] hover:bg-[#141414] border border-[#1f1f1f] hover:border-[#c5a059]/30 text-[#888] hover:text-[#c5a059] font-extrabold uppercase tracking-widest rounded-sm text-center text-3xs transition-all duration-300 cursor-pointer"
                      >
                        Ledger Simulator
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setIsCompareOpen(!isCompareOpen);
              setIsVaultOpen(false);
            }}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border rounded-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:border-[#c5a059] ${
              compareList.length > 0 ? "border-[#c5a059] text-[#c5a059]" : "border-[#1f1f1f] text-[#888]"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compare</span>
            {compareList.length > 0 && (
              <span className="bg-[#c5a059] text-[#0a0a0a] rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">
                {compareList.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setIsVaultOpen(!isVaultOpen);
              setIsCompareOpen(false);
            }}
            className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider border rounded-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer bg-[#0d0d0d] hover:bg-[#141414] ${
              vault.length > 0 ? "border-[#c5a059] text-[#c5a059]" : "border-[#1f1f1f] text-[#888]"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Private Vault</span>
            {vault.length > 0 && (
              <span className="bg-[#c5a059] text-[#0a0a0a] rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">
                {vault.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ================= HERO EDITORIAL SECTION ================= */}
      <section className="relative w-full overflow-hidden bg-[#0a0a0a] border-b border-[#1f1f1f]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-10" />
        <img
          src="/src/assets/images/luxury_watch_hero_1781720669287.jpg"
          alt="Luxury Watch Close-Up Background"
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-25 md:opacity-40 select-none z-0 mix-blend-luminosity hover:opacity-50 transition-opacity duration-1000"
          referrerPolicy="no-referrer"
        />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 relative z-20 flex flex-col justify-center min-h-[350px]">
          <div className="inline-flex items-center gap-1.5 text-[#c5a059] text-xs uppercase tracking-widest font-extrabold mb-4">
            <Compass className="w-4 h-4" />
            <span>Official Catalogue & Configurator</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-[#e5e5e5] tracking-wide leading-tight max-w-2xl font-normal">
            Find Your Watch
          </h2>
          <p className="text-[#888] font-sans text-xs md:text-sm mt-4 max-w-xl leading-relaxed">
            Rolex watches are crafted from the finest raw materials and assembled with scrupulous attention to detail. Every component is designed, developed and produced in-house to the most exacting standards. Explore the collection, design a bespoke commission piece, or add models to your private portfolio.
          </p>

          {/* Tab Navigation selectors */}
          <div className="flex flex-wrap gap-4.5 mt-10">
            <button
              onClick={() => setActiveTab("browse")}
              className={`pb-2.5 text-xs font-bold uppercase tracking-widest border-b-2 transition-all duration-300 cursor-pointer ${
                activeTab === "browse"
                  ? "border-[#c5a059] text-[#c5a059]"
                  : "border-transparent text-[#666] hover:text-[#e5e5e5]"
              }`}
            >
              Browse The Collection
            </button>
            <button
              onClick={() => setActiveTab("customizer")}
              className={`pb-2.5 text-xs font-bold uppercase tracking-widest border-b-2 transition-all duration-300 cursor-pointer ${
                activeTab === "customizer"
                  ? "border-[#c5a059] text-[#c5a059]"
                  : "border-transparent text-[#666] hover:text-[#e5e5e5]"
              }`}
            >
              The Bespoke Commission Salon
            </button>
            <button
              onClick={() => setActiveTab("tracker")}
              className={`pb-2.5 text-xs font-bold uppercase tracking-widest border-b-2 transition-all duration-300 cursor-pointer ${
                activeTab === "tracker"
                  ? "border-[#c5a059] text-[#c5a059]"
                  : "border-transparent text-[#666] hover:text-[#e5e5e5]"
              }`}
            >
              Order Tracking Registry
            </button>
          </div>
        </div>
      </section>

      {/* ================= VIEW: COMMISSION CUSTOMIZER ================= */}
      {activeTab === "customizer" && (
        <BespokeBuilder onSaveToVault={handleSaveBespokeToVault} onInquire={handleInquireFromPlatform} />
      )}

      {/* ================= VIEW: ORDER REGISTRY TRACKER ================= */}
      {activeTab === "tracker" && (
        <OrderTracker orders={orders} />
      )}

      {/* ================= VIEW: BROWSE CATALOGUE ================= */}
      {activeTab === "browse" && (
        <div>
          {/* Advanced Horizontal Filter Bar */}
          <FiltersBar
            filters={filters}
            setFilters={setFilters}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            collectionsList={collectionsList}
            materialsList={materialsList}
            dialColorsList={dialColorsList}
            diametersList={diametersList}
          />

          {/* CATALOGUE TIMEPIECES GRID */}
          <div className="w-full bg-[#0a0a0a] py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              
              {/* Grid Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f1f1f] pb-4 mb-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="text-3xs uppercase font-extrabold tracking-widest text-[#666]">
                    Timepieces matching requirements: {sortedWatches.length} of {WATCHES.length}
                  </span>
                  
                  {filters.collections.length > 0 && (
                    <span className="text-3xs bg-[#0d0d0d] text-[#888] border border-[#1f1f1f] px-2.5 py-0.5 rounded-sm font-semibold uppercase tracking-widest w-max">
                      Showing {filters.collections.join(", ")} lines
                    </span>
                  )}
                </div>

                {/* Elegant Customer Support Banner */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d0d0d] border border-[#1f1f1f] rounded-full text-3xs text-[#888] font-semibold uppercase tracking-wider shadow-inner">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse"></span>
                  <span className="text-[#666]">Premium Concierge Support:</span>
                  <a href="tel:8182087120" className="text-[#c5a059] hover:underline font-mono font-bold tracking-widest">(818) 208-7120</a>
                </div>
              </div>

              {sortedWatches.length === 0 ? (
                <div className="py-24 text-center text-[#666] max-w-sm mx-auto">
                  <Sliders className="w-10 h-10 mx-auto mb-4 text-[#1f1f1f]" />
                  <p className="text-sm font-serif italic text-[#888]">
                    "Great aesthetics are rare and highly specific."
                  </p>
                  <p className="text-3xs mt-2 uppercase font-semibold text-[#666] tracking-wider">
                    Adjust your case metallurgy or diameter parameters to find matching watches.
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        collections: [],
                        materials: [],
                        dialColors: [],
                        diameters: [],
                        priceRange: [5000, 45000],
                        searchQuery: "",
                      });
                    }}
                    className="mt-6 bg-[#0d0d0d] hover:bg-[#141414] text-[#c5a059] border border-[#1f1f1f] rounded-sm px-6 py-2.5 text-3xs font-extrabold uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Reset Filter Bench
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-x-10 md:gap-y-12">
                  {sortedWatches.map((watch) => {
                    const isInVault = vault.some((w) => w.id === watch.id);
                    const isInCompare = compareList.some((w) => w.id === watch.id);

                    return (
                      <div
                        key={watch.id}
                        className="bg-[#0d0d0d] border border-[#1f1f1f] p-4.5 rounded-sm flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:border-[#c5a059]/40"
                      >
                        {/* Interactive Compare & Vault Overlay triggers (Float) */}
                        <div className="absolute top-6 left-6 z-30 flex items-center gap-1.5">
                          <button
                            onClick={() => handleToggleVault(watch)}
                            className={`p-1.5 rounded-full border bg-[#0a0a0a]/90 hover:bg-[#0a0a0a] transition-colors cursor-pointer ${
                              isInVault
                                ? "border-red-500 text-red-500"
                                : "border-[#1f1f1f] text-[#666] hover:text-[#e5e5e5]"
                            }`}
                            title={isInVault ? "In Custom Vault" : "Add to Vault"}
                          >
                            <Heart className="w-3.5 h-3.5 fill-current" style={{ fillOpacity: isInVault ? 1 : 0 }} />
                          </button>

                          <button
                            onClick={() => handleToggleCompare(watch)}
                            className={`p-1.5 rounded-full border bg-[#0a0a0a]/90 hover:bg-[#0a0a0a] transition-colors cursor-pointer ${
                              isInCompare
                                ? "border-[#c5a059] text-[#c5a059]"
                                : "border-[#1f1f1f] text-[#666] hover:text-[#e5e5e5]"
                            }`}
                            title={isInCompare ? "Comparing" : "Compare Specs"}
                          >
                            <Scale className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Top Badge: Popular / Desired */}
                        {watch.popular && (
                          <div className="absolute top-6 right-6 z-30 flex items-center gap-1 px-2.5 py-0.5 bg-[#c5a059]/15 border border-[#c5a059]/30 rounded-full text-[8px] text-[#c5a059] font-bold uppercase tracking-wider select-none">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Highly Sought</span>
                          </div>
                        )}

                        {/* Beautifully Rendered live watch */}
                        <div
                          className="w-full aspect-square flex items-center justify-center p-6 bg-[#141414] border border-[#1f1f1f] rounded-sm transition-all duration-500 cursor-pointer relative overflow-hidden group/thumb"
                          onClick={() => setSelectedDetailWatch(watch)}
                        >
                          {/* Pulsing visual gold radial gradient backdrop */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#c5a059,transparent_70%)] opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700 pointer-events-none" />
                          
                          <div className="transform group-hover:scale-105 transition-transform duration-500">
                            <WatchSVG
                              dialColor={watch.dialColor}
                              material={watch.material}
                              bezelStyle={watch.bezelStyle}
                              bracelet={watch.bracelet}
                              collection={watch.collection}
                              size="md"
                            />
                          </div>
                        </div>

                        {/* Card Details information */}
                        <div className="pt-4 flex flex-col flex-1 justify-between font-sans">
                          <div>
                            {/* Collection Family text */}
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c5a059] block">
                              {watch.collection}
                            </span>
                            
                            {/* Watch Name and brief Metallurgy description */}
                            <h4
                              className="text-xs md:text-sm font-serif font-bold text-[#e5e5e5] hover:text-[#c5a059] cursor-pointer transition-colors mt-1 block leading-snug"
                              onClick={() => setSelectedDetailWatch(watch)}
                            >
                              {watch.name}
                            </h4>
                            
                            {/* Elegant Gold Divider line */}
                            <div className="h-[1px] w-8 bg-[#c5a059] my-2" />

                            <p className="text-[10px] text-[#888] mt-1 lines-clamp-2 min-h-[30px] leading-relaxed">
                              {watch.diameter} mm, {watch.material}, {watch.dialColor} Dial
                            </p>
                          </div>

                          {/* Price Tag & Shopping Trigger panel */}
                          <div className="mt-4 pt-3 border-t border-[#1f1f1f] flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-4xs font-extrabold uppercase tracking-widest text-[#666]">
                                Acquisition Price
                              </span>
                              <span className="text-xs font-serif text-[#e5e5e5] font-bold block mt-0.5">
                                ${watch.price.toLocaleString()}
                              </span>
                            </div>

                            <div className="flex gap-2">
                              {/* Open detail info button */}
                              <button
                                onClick={() => setSelectedDetailWatch(watch)}
                                className="bg-[#0a0a0a] hover:bg-[#141414] border border-[#1f1f1f] text-[#888] hover:text-[#e5e5e5] p-2 rounded-sm transition-all"
                                title="Specific Mechanical Specifications"
                              >
                                <Info className="w-3.5 h-3.5" />
                              </button>

                              {/* Procure trigger */}
                              <button
                                onClick={() => handleInquireFromPlatform(watch)}
                                className="bg-[#c5a059] hover:bg-yellow-600 text-[#0a0a0a] font-extrabold uppercase tracking-widest text-3xs py-2 px-3 transition-all duration-300 rounded-sm cursor-pointer shadow hover:shadow-[#c5a059]/10"
                              >
                                Procure
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= SPECIFICATIONS MASTER SLIDE OVER MODAL ================= */}
      {selectedDetailWatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-end p-0 bg-black/75 backdrop-blur-sm animate-fade-in font-sans">
          <div className="w-full max-w-lg h-full bg-[#0a0a0a] border-l border-[#1f1f1f] p-8 overflow-y-auto flex flex-col justify-between relative shadow-2xl animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setSelectedDetailWatch(null)}
              className="absolute top-4 right-4 text-[#888] hover:text-[#e5e5e5] p-1.5 transition-colors animate-pulse"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-6">
              {/* Header block */}
              <div>
                <span className="text-3xs font-extrabold uppercase tracking-widest text-[#c5a059] block">
                  {selectedDetailWatch.collection} Chronometer
                </span>
                <h3 className="text-2xl font-serif text-[#e5e5e5] mt-1 leading-snug">{selectedDetailWatch.name}</h3>
                <p className="text-3xs font-mono text-[#666] uppercase mt-0.5">
                  Reference: {selectedDetailWatch.reference}
                </p>
                <span className="text-md font-serif text-[#c5a059] font-bold block mt-3">
                  ${selectedDetailWatch.price.toLocaleString()} USD
                </span>
              </div>

              {/* Watch Illustration */}
              <div className="my-8 flex justify-center bg-[#141414] border border-[#1f1f1f] rounded-sm p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#c5a059,transparent_75%)] opacity-[0.06] pointer-events-none" />
                <WatchSVG
                  dialColor={selectedDetailWatch.dialColor}
                  material={selectedDetailWatch.material}
                  bezelStyle={selectedDetailWatch.bezelStyle}
                  bracelet={selectedDetailWatch.bracelet}
                  collection={selectedDetailWatch.collection}
                  size="md"
                />
              </div>

              {/* Watch Technical Narrative */}
              <div className="space-y-2 pb-4 border-b border-[#1f1f1f]">
                <h4 className="text-3xs font-extrabold uppercase tracking-widest text-[#888]">
                  Model Significance
                </h4>
                <p className="text-xs text-[#e5e5e5] italic font-serif leading-relaxed">
                  "{selectedDetailWatch.featuredText}"
                </p>
                <p className="text-2xs text-[#888] leading-normal">
                  {selectedDetailWatch.intro}
                </p>
              </div>

              {/* Detailed Specs Sheet list */}
              <div className="space-y-4">
                <h4 className="text-3xs font-extrabold uppercase tracking-widest text-[#888]">
                  Mechanical Specifications
                </h4>
                <div className="grid grid-cols-1 gap-2.5 text-2xs">
                  <div className="p-3 bg-[#0d0d0d] border border-[#1f1f1f] flex justify-between gap-4">
                    <span className="text-[#666] font-medium lowercase tracking-wide block uppercase text-4xs">Movement</span>
                    <span className="text-[#e5e5e5] font-semibold text-right max-w-xs leading-normal">{selectedDetailWatch.specifications.movement}</span>
                  </div>
                  <div className="p-3 bg-[#0d0d0d] border border-[#1f1f1f] flex justify-between gap-4">
                    <span className="text-[#666] font-medium lowercase tracking-wide block uppercase text-4xs">In-House Calibre</span>
                    <span className="text-[#e5e5e5] font-mono font-bold text-right">{selectedDetailWatch.specifications.calibre}</span>
                  </div>
                  <div className="p-3 bg-[#0d0d0d] border border-[#1f1f1f] flex justify-between gap-4">
                    <span className="text-[#666] font-medium lowercase tracking-wide block uppercase text-4xs">Power Reserve</span>
                    <span className="text-[#e5e5e5] font-semibold text-right">{selectedDetailWatch.specifications.powerReserve}</span>
                  </div>
                  <div className="p-3 bg-[#0d0d0d] border border-[#1f1f1f] flex justify-between gap-4">
                    <span className="text-[#666] font-medium lowercase tracking-wide block uppercase text-4xs">Bezel Configuration</span>
                    <span className="text-[#e5e5e5] font-semibold text-right max-w-xs leading-normal">{selectedDetailWatch.specifications.bezelDescription}</span>
                  </div>
                  <div className="p-3 bg-[#0d0d0d] border border-[#1f1f1f] flex justify-between gap-4">
                    <span className="text-[#666] font-medium lowercase tracking-wide block uppercase text-4xs">Hermetics Seal</span>
                    <span className="text-[#e5e5e5] font-semibold text-right">{selectedDetailWatch.specifications.waterResistance}</span>
                  </div>
                  <div className="p-3 bg-[#0d0d0d] border border-[#1f1f1f] flex justify-between gap-4">
                    <span className="text-[#666] font-medium lowercase tracking-wide block uppercase text-4xs">Clasp / safety lock</span>
                    <span className="text-[#e5e5e5] font-semibold text-right text-[#888] max-w-[250px] leading-normal">{selectedDetailWatch.specifications.clasp}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Footer inside Details */}
            <div className="grid grid-cols-2 gap-3 pt-8 border-t border-[#1f1f1f] mt-8">
              <button
                onClick={() => {
                  handleToggleVault(selectedDetailWatch);
                }}
                className={`w-full py-3 text-3xs font-extrabold uppercase tracking-widest border transition-all duration-200 rounded-sm cursor-pointer ${
                  vault.some((w) => w.id === selectedDetailWatch.id)
                    ? "border-red-500 text-red-500 bg-red-950/5"
                    : "border-[#1f1f1f] text-[#888] hover:border-[#c5a059] hover:text-[#e5e5e5]"
                }`}
              >
                {vault.some((w) => w.id === selectedDetailWatch.id) ? "Deposited in Vault" : "Deposit in Vault"}
              </button>

              <button
                onClick={() => {
                  handleInquireFromPlatform(selectedDetailWatch);
                  setSelectedDetailWatch(null);
                }}
                className="w-full bg-[#c5a059] text-[#0a0a0a] hover:bg-yellow-600 font-extrabold uppercase tracking-widest py-3 text-3xs rounded-sm transition-all duration-300 cursor-pointer shadow hover:shadow-[#c5a059]/15"
              >
                Inquire & Procure
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FLOATING DRAWERS PORTALS ================= */}
      
      {/* 1. Comparison drawer deck */}
      <CompareDrawer
        compareList={compareList}
        isOpen={isCompareOpen}
        onClearAll={() => saveCompareToLocalStorage([])}
        onRemove={(id) => {
          const updated = compareList.filter((w) => w.id !== id);
          saveCompareToLocalStorage(updated);
        }}
        onInquire={(w) => {
          setIsCompareOpen(false);
          handleInquireFromPlatform(w);
        }}
        onClose={() => setIsCompareOpen(false)}
      />

      {/* 2. Collection cabinet vault drawer */}
      <VaultDrawer
        vault={vault}
        isOpen={isVaultOpen}
        onRemove={handleRemoveFromVault}
        onInquire={(w) => {
          setIsVaultOpen(false);
          handleInquireFromPlatform(w);
        }}
        onClose={() => setIsVaultOpen(false)}
      />

      {/* 3. Procurement order modal overlay */}
      <CheckoutModal
        watch={selectedCheckoutWatch}
        isOpen={selectedCheckoutWatch !== null}
        onClose={() => setSelectedCheckoutWatch(null)}
        onOrderPlaced={(newOrder) => {
          const updated = [newOrder, ...orders];
          saveOrdersToLocalStorage(updated);
        }}
      />

      {/* ================= FOOTER LANDING ================= */}
      <footer className="bg-[#0a0a0a] border-t border-[#1f1f1f] py-12 px-6 md:px-12 text-center text-[#666] text-xs mt-auto font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#1f1f1f]">
          
          <div className="flex items-center gap-2.5">
            {/* Tiny brand representation */}
            <div className="p-1 px-1.5 bg-[#006039] text-[#c5a059] text-serif font-bold text-[8px] rounded-sm">R</div>
            <span className="text-[10px] font-serif uppercase text-[#888] tracking-wider font-semibold">
              CHRONOMÈTRE LUXE CORP
            </span>
          </div>

          {/* Luxury assurances notes */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-3xs uppercase font-extrabold tracking-widest text-[#666]">
            <span>COSC certified chronometer</span>
            <span className="text-[#1f1f1f]">•</span>
            <span>Five-Year guarantee lease</span>
            <span className="text-[#1f1f1f]">•</span>
            <span>Worldwide boutique service</span>
            <span className="text-[#1f1f1f]">•</span>
            <span className="text-[#888]">Customer Support: <a href="tel:8182087120" className="text-[#c5a059] font-mono hover:underline">(818) 208-7120</a></span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-4xs uppercase font-bold tracking-wider text-[#666]">
          <span>© 2026 Chronomètre Luxe Corp. Geneva, Switzerland. All Rights Reserved.</span>
          <span>Bespoke commissions subject to authorized watchmaking allocation quotas.</span>
        </div>
      </footer>
    </div>
  );
}
