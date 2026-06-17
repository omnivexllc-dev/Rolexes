export interface WatchSpecs {
  calibre: string;
  powerReserve: string;
  waterResistance: string;
  clasp: string;
  bezelDescription: string;
  movement: string;
}

export interface Watch {
  id: string;
  collection: "Submariner" | "Cosmograph Daytona" | "Datejust" | "Day-Date" | "GMT-Master II" | "Oyster Perpetual" | "Yacht-Master" | "Sky-Dweller" | "Explorer" | "Air-King" | "Milgauss" | "Sea-Dweller" | "1908";
  name: string;
  reference: string;
  diameter: number; // in mm
  material: "Oystersteel" | "Yellow Gold" | "Everose Gold" | "White Gold" | "Platinum" | "Rolesor";
  dialColor: "Black" | "Blue" | "Green" | "Champagne" | "Silver" | "Slate" | "Ice Blue" | "Chocolate" | "White" | "Meteorite";
  bezelStyle: "Fluted" | "Polished" | "Cerachrom" | "Tachymeter";
  bezelColor: string;
  bracelet: "Oyster" | "Jubilee" | "President" | "Oysterflex";
  price: number;
  specifications: WatchSpecs;
  popular: boolean;
  featuredText: string;
  intro: string;
}

export interface FilterState {
  collections: string[];
  materials: string[];
  dialColors: string[];
  diameters: number[];
  priceRange: [number, number];
  searchQuery: string;
}

export interface DesignConfigState {
  material: "Oystersteel" | "Yellow Gold" | "Everose Gold" | "White Gold" | "Platinum" | "Rolesor";
  dialColor: "Black" | "Blue" | "Green" | "Champagne" | "Silver" | "Slate" | "Ice Blue" | "Chocolate" | "White" | "Meteorite";
  bezelStyle: "Fluted" | "Polished" | "Cerachrom" | "Tachymeter";
  bracelet: "Oyster" | "Jubilee" | "President" | "Oysterflex";
  diameter: number;
}
