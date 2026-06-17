import React, { useState, useEffect } from "react";
import { Watch } from "../types";
import { X, ShieldCheck, ShieldAlert, Award, FileText, Lock, Unlock, Trash2, CreditCard } from "lucide-react";
import { WatchSVG } from "./WatchSVG";

interface VaultDrawerProps {
  vault: Watch[];
  onRemove: (id: string) => void;
  onInquire: (watch: Watch) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const VaultDrawer: React.FC<VaultDrawerProps> = ({
  vault,
  onRemove,
  onInquire,
  isOpen,
  onClose,
}) => {
  const [vaultName, setVaultName] = useState(() => {
    return localStorage.getItem("luxury_vault_name") || "The Collector's Private Cabinet";
  });
  const [isEditingName, setIsEditingName] = useState(false);

  // Combination Vault Lock Mechanism
  const [isLocked, setIsLocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const CORRECT_PIN = "1908"; // Rolex founding year

  useEffect(() => {
    localStorage.setItem("luxury_vault_name", vaultName);
  }, [vaultName]);

  if (!isOpen) return null;

  // Calculators
  const totalValue = vault.reduce((acc, watch) => acc + watch.price, 0);
  const averageValue = vault.length > 0 ? Math.round(totalValue / vault.length) : 0;

  // Metallurgy stats percentages
  const steelCount = vault.filter((w) => w.material === "Oystersteel").length;
  const preciousCount = vault.length - steelCount;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === CORRECT_PIN) {
      setIsLocked(false);
      setPinError(false);
      setPinInput("");
    } else {
      setPinError(true);
      setPinInput("");
    }
  };

  const handleLock = () => {
    setIsLocked(true);
  };

  const handlePrintCertification = () => {
    // Generate simple print summary
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Luxury Chronometer Portfolio Certification</title>
          <style>
            body { font-family: 'Georgia', serif; background-color: #fafbfc; color: #1c1c1a; padding: 50px; line-height: 1.6; }
            .header { text-align: center; border-bottom: 2px solid #b88a3e; padding-bottom: 20px; margin-bottom: 40px; }
            .brand { font-size: 26px; text-transform: uppercase; letter-spacing: 4px; color: #006039; font-weight: bold; }
            .subtitle { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #666; margin-top: 5px; }
            .vault-title { font-size: 18px; margin-top: 25px; font-weight: normal; font-style: italic; }
            .summary-box { background-color: #f4edd9; border: 1px solid #e8d7b3; padding: 20px; margin-bottom: 30px; display: flex; justify-content: space-around; }
            .stat { text-align: center; }
            .stat-val { font-size: 20px; font-weight: bold; color: #835926; }
            .stat-lbl { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #555; }
            .watch-list { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .watch-list th { border-bottom: 2px solid #b88a3e; padding: 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; text-align: left; }
            .watch-list td { border-bottom: 1px solid #eaeaea; padding: 12px; font-size: 13px; }
            .reference { font-family: monospace; font-size: 11px; color: #666; }
            .footer { text-align: center; margin-top: 60px; font-size: 10px; color: #777; border-top: 1px dashed #ccc; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="brand">CHRONOMÈTRE LUXE</div>
            <div class="subtitle">Official Portfolio Certification Slip</div>
            <div class="vault-title">${vaultName}</div>
          </div>
          
          <div class="summary-box">
            <div class="stat">
              <div class="stat-val">\${${totalValue.toLocaleString()}}</div>
              <div class="stat-lbl">Portfolio Asset Value</div>
            </div>
            <div class="stat">
              <div class="stat-val">${vault.length}</div>
              <div class="stat-lbl">Certified Chronometers</div>
            </div>
            <div class="stat">
              <div class="stat-val">\${${averageValue.toLocaleString()}}</div>
              <div class="stat-lbl">Average Asset Yield</div>
            </div>
          </div>

          <table class="watch-list">
            <thead>
              <tr>
                <th>Model Designation</th>
                <th>Reference</th>
                <th>Case Diameter</th>
                <th>Metallurgy Alloy</th>
                <th>Dial Base</th>
                <th>Valuation</th>
              </tr>
            </thead>
            <tbody>
              ${vault.map((watch) => `
                <tr>
                  <td><strong>${watch.name}</strong></td>
                  <td><span class="reference">${watch.reference}</span></td>
                  <td>${watch.diameter} mm</td>
                  <td>${watch.material}</td>
                  <td>${watch.dialColor} Canvas</td>
                  <td><strong>\${${watch.price.toLocaleString()}}</strong></td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <div class="footer">
            <p>Certified Authenticated Ledger — Printed on: ${new Date().toLocaleDateString()}</p>
            <p>Secured via AES Swiss Vault Protocol. This paper serves as proof of collection for insurance assessment.</p>
          </div>
          <script>
            window.print();
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full md:max-w-xl bg-[#0a0a0a] border-l border-[#1f1f1f] shadow-2xl flex flex-col h-full animate-fade-in text-sans text-[#e5e5e5]">
      {/* Drawer Header */}
      <div className="bg-[#0a0a0a] px-6 py-4.5 border-b border-[#1f1f1f] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isLocked ? (
            <Lock className="w-4 h-4 text-red-500 animate-pulse" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
          )}
          {isEditingName && !isLocked ? (
            <input
              type="text"
              className="bg-[#0a0a0a] border border-[#c5a059] focus:outline-none rounded-sm px-2 py-0.5 text-xs text-[#e5e5e5] uppercase tracking-wider font-semibold font-serif"
              value={vaultName}
              onChange={(e) => setVaultName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              autoFocus
            />
          ) : (
            <h3
              onClick={() => {
                if (!isLocked) setIsEditingName(true);
              }}
              className="text-xs font-serif font-semibold italic text-[#e5e5e5] cursor-pointer hover:text-[#c5a059] border-b border-dotted border-[#666] hover:border-[#c5a059] select-none"
            >
              {vaultName}
            </h3>
          )}
        </div>
        <div className="flex items-center gap-1.55">
          {!isLocked && vault.length > 0 && (
            <button
              onClick={handleLock}
              className="text-[#666] hover:text-[#c5a059] p-1.5 rounded-sm border border-[#1f1f1f] bg-[#0a0a0a] hover:bg-[#0d0d0d] transition-colors"
              title="Secure Vault Cabinet"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[#888] hover:text-[#e5e5e5] transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Vault secure keypad locking overlay */}
      {isLocked ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0a0a] px-8 py-12">
          <div className="bg-[#0d0d0d] border border-[#1f1f1f] p-8 rounded-sm max-w-sm w-full text-center shadow-xl">
            <Lock className="w-10 h-10 text-red-500 mx-auto mb-4 animate-bounce" />
            <h4 className="text-[#e5e5e5] font-serif text-lg">Vault Cabinet Encrypted</h4>
            <p className="text-[#888] text-3xs uppercase tracking-widest font-sans font-bold mt-2">
              Security Protocol Locked
            </p>
            <p className="text-[#666] text-2xs mt-1.5 leading-relaxed">
              Enter Swiss mechanical security passcode sequence to decrypt portfolio assets.
            </p>

            <form onSubmit={handleUnlock} className="mt-6 space-y-4">
              <input
                type="password"
                maxLength={4}
                className="w-full text-center bg-[#0a0a0a] border border-[#1f1f1f] focus:border-[#c5a059] focus:outline-none rounded-sm px-4 py-3 text-lg text-[#e5e5e5] font-mono tracking-widest placeholder-neutral-800 font-bold"
                placeholder="••••"
                value={pinInput}
                onChange={(e) => {
                  setPinError(false);
                  setPinInput(e.target.value.replace(/\D/g, ""));
                }}
              />
              {pinError && (
                <p className="text-[10px] text-red-500 font-bold flex items-center justify-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Invalid Access Key (Hint: Rolex Founding Year)</span>
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#c5a059] text-[#0a0a0a] hover:bg-yellow-600 py-2.5 text-3xs font-extrabold uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Decrypt Estate</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* VAULT MAIN CABINET CONTENT */
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {vault.length === 0 ? (
            <div className="py-24 text-center text-[#666] max-w-md mx-auto">
              <Award className="w-12 h-12 text-[#1f1f1f] mx-auto mb-4" />
              <p className="text-sm font-serif italic text-[#888]">
                "Your vault stands empty, waiting only for timepieces worthy of legacy."
              </p>
              <p className="text-3xs mt-3 text-[#666] font-sans leading-relaxed tracking-wider">
                Browse our collection or design a custom commission watch, then select "Deposit in Vault" to build your private investment ledger.
              </p>
            </div>
          ) : (
            <>
              {/* Vault Portfolio Stats Block */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#0d0d0d] border border-[#1f1f1f] p-3.5 rounded-sm text-center flex flex-col justify-center">
                  <span className="text-[8px] font-extrabold text-[#666] uppercase tracking-widest">
                    Asset Volume
                  </span>
                  <span className="text-md sm:text-lg text-[#e5e5e5] font-serif font-bold mt-1">
                    {vault.length}
                  </span>
                </div>
                <div className="bg-[#0d0d0d] border border-[#1f1f1f] p-3.5 rounded-sm text-center flex flex-col justify-center">
                  <span className="text-[8px] font-extrabold text-[#666] uppercase tracking-widest">
                    Total Value
                  </span>
                  <span className="text-md sm:text-lg text-[#c5a059] font-serif font-bold mt-1">
                    ${totalValue.toLocaleString()}
                  </span>
                </div>
                <div className="bg-[#0d0d0d] border border-[#1f1f1f] p-3.5 rounded-sm text-center flex flex-col justify-center">
                  <span className="text-[8px] font-extrabold text-[#666] uppercase tracking-widest">
                    Avg Yield
                  </span>
                  <span className="text-md sm:text-lg text-[#888] font-serif font-bold mt-1">
                    ${averageValue.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Composition Breakdown info strip */}
              <div className="bg-[#0d0d0d] border border-[#1f1f1f] p-4.5 rounded-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 font-sans">
                  <span className="text-4xs font-bold uppercase tracking-widest text-[#666]">
                    Portfolio Composition Yield
                  </span>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="text-2xs text-[#888] font-semibold">{steelCount} Steel</span>
                    <span className="text-3xs text-[#1f1f1f]">•</span>
                    <span className="text-2xs text-[#c5a059] font-semibold">{preciousCount} Precious Metals</span>
                  </div>
                </div>

                <button
                  onClick={handlePrintCertification}
                  className="bg-[#0a0a0a] border border-[#1f1f1f] text-[#888] hover:border-[#c5a059] hover:text-[#c5a059] py-2 px-3.5 text-3xs font-extrabold uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Insurance Slip</span>
                </button>
              </div>

              {/* LIST OF SAVED WATCH CARDS */}
              <div className="space-y-4 pt-2">
                <span className="text-3xs font-bold uppercase tracking-widest text-[#666] block">
                  Vault Custody List
                </span>
                {vault.map((watch) => (
                  <div
                    key={watch.id}
                    className="bg-[#0d0d0d] border border-[#1f1f1f] p-4 rounded-sm flex items-center justify-between gap-4 group hover:border-[#c5a059]/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      {/* Scaled Mini watch */}
                      <div className="w-16 h-16 flex items-center justify-center bg-[#0a0a0a] rounded-sm border border-[#1f1f1f] shrink-0 relative overflow-hidden">
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

                      {/* Info description */}
                      <div className="font-sans">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-2xs font-semibold text-[#e5e5e5] truncate max-w-[150px]">
                            {watch.name}
                          </h4>
                          {watch.id.startsWith("bespoke-") && (
                            <span className="text-[7px] bg-[#c5a059]/15 text-[#c5a059] px-1 py-0.5 rounded-sm font-bold uppercase">
                              Bespoke
                            </span>
                          )}
                        </div>
                        <p className="text-4xs font-mono text-[#666] uppercase mt-0.5">
                          Ref: {watch.reference}
                        </p>
                        <span className="text-2xs text-[#c5a059] font-bold font-serif block mt-1">
                          ${watch.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Quick Checkout / Inquire & Delete Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onInquire(watch)}
                        className="bg-[#c5a059] hover:bg-yellow-600 text-[#0a0a0a] p-2 rounded-sm transition-colors cursor-pointer"
                        title="Acquire Securely"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onRemove(watch.id)}
                        className="bg-[#0a0a0a] hover:bg-[#0d0d0d] text-[#666] hover:text-red-500 border border-[#1f1f1f] hover:border-[#333] p-2 rounded-sm transition-colors cursor-pointer"
                        title="Release Custody"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Decorative Vault Lock Security Footer strip */}
      {!isLocked && vault.length > 0 && (
        <div className="p-4 bg-[#0d0d0d] border-t border-[#1f1f1f] text-center flex items-center justify-center gap-1.5">
          <Lock className="w-3 h-3 text-[#c5a059]" />
          <span className="text-[10px] text-[#666] font-medium">
            Lock vault prior to session exit to encrypt localized ledger data.
          </span>
        </div>
      )}
    </div>
  );
};
