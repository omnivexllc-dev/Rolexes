import React, { useState } from "react";
import { FilterState } from "../types";
import { SlidersHorizontal, ArrowUpDown, X, Search } from "lucide-react";

interface FiltersBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  collectionsList: string[];
  materialsList: string[];
  dialColorsList: string[];
  diametersList: number[];
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  filters,
  setFilters,
  sortOrder,
  setSortOrder,
  collectionsList,
  materialsList,
  dialColorsList,
  diametersList,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to toggle multi-select filters
  const handleToggle = (key: keyof FilterState, value: any) => {
    setFilters((prev) => {
      const currentList = prev[key] as any[];
      const newList = currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value];

      return {
        ...prev,
        [key]: newList,
      };
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const val = parseInt(e.target.value);
    setFilters((prev) => {
      const newRange = [...prev.priceRange] as [number, number];
      newRange[index] = val;
      return {
        ...prev,
        priceRange: newRange,
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      collections: [],
      materials: [],
      dialColors: [],
      diameters: [],
      priceRange: [5000, 45000],
      searchQuery: "",
    });
  };

  const totalActiveFilters =
    filters.collections.length +
    filters.materials.length +
    filters.dialColors.length +
    filters.diameters.length +
    (filters.priceRange[0] > 5000 || filters.priceRange[1] < 45000 ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <div className="w-full bg-[#0a0a0a] border-y border-[#1f1f1f] py-4 px-6 md:px-12 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#666]">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            className="w-full bg-[#0d0d0d] border border-[#1f1f1f] focus:border-[#c5a059] focus:outline-none rounded-sm py-2 pl-10 pr-4 text-xs text-[#e5e5e5] placeholder-[#555] transition-colors"
            placeholder="Search timepiece or reference... (e.g. 126610LN)"
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, searchQuery: "" }))}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#666] hover:text-[#e5e5e5]"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Buttons: Filter Toggle & Sort */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider border rounded-sm transition-all duration-300 ${
              isOpen || totalActiveFilters > 0
                ? "border-[#c5a059] text-[#c5a059] bg-[#c5a059]/10"
                : "border-[#1f1f1f] text-[#888] hover:border-[#666] hover:text-[#e5e5e5]"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Refine Model</span>
            {totalActiveFilters > 0 && (
              <span className="bg-[#c5a059] text-[#0a0a0a] rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">
                {totalActiveFilters}
              </span>
            )}
          </button>

          {/* Sort Menu */}
          <div className="relative flex items-center h-full">
            <span className="text-[#666] text-[10px] uppercase font-bold tracking-widest mr-2 hidden sm:inline">
              Sort By:
            </span>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-[#666]">
                <ArrowUpDown className="w-3.5 h-3.5" />
              </span>
              <select
                className="appearance-none bg-[#0d0d0d] border border-[#1f1f1f] rounded-sm py-2 pl-8 pr-10 text-xs font-semibold text-[#e5e5e5] focus:outline-none focus:border-[#c5a059] cursor-pointer uppercase tracking-wider"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="collection_asc">Collection: A to Z</option>
                <option value="popular">Most Desired</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#666]">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Collapse Filters Block */}
      {isOpen && (
        <div className="max-w-7xl mx-auto mt-6 p-6 bg-[#0d0d0d] border border-[#1f1f1f] rounded-sm animate-fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Collection Filter */}
          <div>
            <h4 className="text-[#e5e5e5] text-[10px] font-bold uppercase tracking-widest border-b border-[#1f1f1f] pb-2 mb-3">
              Collection Line
            </h4>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {collectionsList.map((col) => (
                <label key={col} className="flex items-center text-xs text-[#888] hover:text-[#e5e5e5] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="accent-[#c5a059] mr-2.5 rounded-sm border-[#1f1f1f] bg-[#0a0a0a] focus:ring-[#c5a059] text-[#c5a059]"
                    checked={filters.collections.includes(col)}
                    onChange={() => handleToggle("collections", col)}
                  />
                  <span>{col}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Material Filter */}
          <div>
            <h4 className="text-[#e5e5e5] text-[10px] font-bold uppercase tracking-widest border-b border-[#1f1f1f] pb-2 mb-3">
              Case Metallurgy
            </h4>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {materialsList.map((mat) => (
                <label key={mat} className="flex items-center text-xs text-[#888] hover:text-[#e5e5e5] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="accent-[#c5a059] mr-2.5 rounded-sm border-[#1f1f1f] bg-[#0a0a0a] text-[#c5a059]"
                    checked={filters.materials.includes(mat)}
                    onChange={() => handleToggle("materials", mat)}
                  />
                  <span>{mat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Dial Color Filter */}
          <div>
            <h4 className="text-[#e5e5e5] text-[10px] font-bold uppercase tracking-widest border-b border-[#1f1f1f] pb-2 mb-3">
              Dial Canvas Color
            </h4>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {dialColorsList.map((color) => (
                <label key={color} className="flex items-center text-xs text-[#888] hover:text-[#e5e5e5] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="accent-[#c5a059] mr-2.5 rounded-sm border-[#1f1f1f] bg-[#0a0a0a] text-[#c5a059]"
                    checked={filters.dialColors.includes(color)}
                    onChange={() => handleToggle("dialColors", color)}
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Diameter & Price Ranger */}
          <div className="flex flex-col gap-6">
            {/* Diameter */}
            <div>
              <h4 className="text-[#e5e5e5] text-[10px] font-bold uppercase tracking-widest border-b border-[#1f1f1f] pb-2 mb-3">
                Casing Diameter
              </h4>
              <div className="flex flex-wrap gap-2">
                {diametersList.map((dia) => (
                  <button
                    key={dia}
                    onClick={() => handleToggle("diameters", dia)}
                    className={`px-3 py-1.5 text-2xs font-semibold border rounded-sm transition-all duration-200 ${
                      filters.diameters.includes(dia)
                        ? "border-[#c5a059] text-[#c5a059] bg-[#c5a059]/10"
                        : "border-[#1f1f1f] text-[#888] hover:border-[#666] hover:text-[#e5e5e5]"
                    }`}
                  >
                    {dia} mm
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex justify-between items-center mb-2 border-b border-[#1f1f1f] pb-1.5">
                <h4 className="text-[#e5e5e5] text-[10px] font-bold uppercase tracking-widest">
                  Acquisition Budget
                </h4>
                <span className="text-2xs text-[#c5a059] font-mono font-bold">
                  ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-3xs text-[#666]">
                    <span>Min: ${filters.priceRange[0].toLocaleString()}</span>
                    <span>Max: ${filters.priceRange[1].toLocaleString()}</span>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="range"
                      min="5000"
                      max="20000"
                      step="500"
                      className="w-full h-1 bg-[#1f1f1f] rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                    />
                    <input
                      type="range"
                      min="20000"
                      max="45000"
                      step="500"
                      className="w-full h-1 bg-[#1f1f1f] rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Chips */}
      {totalActiveFilters > 0 && (
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-[#1f1f1f]">
          <span className="text-3xs font-bold uppercase tracking-widest text-[#666]">
            Refining by:
          </span>
          {filters.collections.map((col) => (
            <span key={col} className="bg-[#0d0d0d] border border-[#1f1f1f] px-2.5 py-1 text-2xs text-[#e5e5e5] flex items-center gap-1.5 rounded-sm">
              <span>{col}</span>
              <button onClick={() => handleToggle("collections", col)} className="text-[#666] hover:text-[#e5e5e5]">
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
          {filters.materials.map((mat) => (
            <span key={mat} className="bg-[#0d0d0d] border border-[#1f1f1f] px-2.5 py-1 text-2xs text-[#e5e5e5] flex items-center gap-1.5 rounded-sm">
              <span>{mat}</span>
              <button onClick={() => handleToggle("materials", mat)} className="text-[#666] hover:text-[#e5e5e5]">
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
          {filters.dialColors.map((col) => (
            <span key={col} className="bg-[#0d0d0d] border border-[#1f1f1f] px-2.5 py-1 text-2xs text-[#e5e5e5] flex items-center gap-1.5 rounded-sm">
              <span>{col} Dial</span>
              <button onClick={() => handleToggle("dialColors", col)} className="text-[#666] hover:text-[#e5e5e5]">
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
          {filters.diameters.map((dia) => (
            <span key={dia} className="bg-[#0d0d0d] border border-[#1f1f1f] px-2.5 py-1 text-2xs text-[#e5e5e5] flex items-center gap-1.5 rounded-sm">
              <span>{dia} mm</span>
              <button onClick={() => handleToggle("diameters", dia)} className="text-[#666] hover:text-[#e5e5e5]">
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
          {(filters.priceRange[0] > 5000 || filters.priceRange[1] < 45000) && (
            <span className="bg-[#0d0d0d] border border-[#1f1f1f] px-2.5 py-1 text-2xs text-[#c5a059] flex items-center gap-1.5 rounded-sm">
              <span>
                ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
              </span>
              <button
                onClick={() => setFilters((prev) => ({ ...prev, priceRange: [5000, 45000] }))}
                className="text-[#666] hover:text-[#e5e5e5]"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          )}

          <button
            onClick={clearFilters}
            className="text-3xs uppercase font-extrabold tracking-widest text-[#c5a059] hover:text-[#e5e5e5] border-b border-[#c5a059] hover:border-white pb-0.5 ml-2 transition-all duration-150"
          >
            Reset All
          </button>
        </div>
      )}
    </div>
  );
};
