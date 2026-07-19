export type ConfidenceLevel = 'low' | 'medium' | 'high';
export type ComplexityLevel = 'simple' | 'moderate' | 'complex' | 'very-complex';

export interface ProjectTypePricing {
  baseUnit: 'sqft' | 'lnft' | 'unit' | 'flat';
  basePrice: [number, number];
  laborShare: number;
  materialShare: number;
  timelineBase: [number, number];
  timelinePerUnit: [number, number];
  minSize: number;
  maxSize: number;
  sizeDiscounts?: { threshold: number; discount: number }[];
}

export interface MaterialMultiplier {
  label: string;
  multiplier: number;
}

export interface ComplexityTier {
  maxPoints: number;
  label: ComplexityLevel;
  costMultiplier: number;
  timelineMultiplier: number;
}

export interface RegionalFactor {
  label: string;
  costMultiplier: number;
}

export interface PricingConfig {
  version: string;
  projectTypes: Record<string, ProjectTypePricing>;
  materials: Record<string, Record<string, MaterialMultiplier>>;
  complexityTiers: ComplexityTier[];
  regionalFactors: Record<string, RegionalFactor>;
  defaultRegion: string;
  confidenceRanges: Record<ConfidenceLevel, number>;
  fallbackProjectType: string;
  defaultMaterialMultiplier: number;
}

export const pricingConfig: PricingConfig = {
  version: '1.0.0',
  fallbackProjectType: 'general-remodel',
  defaultMaterialMultiplier: 1.0,
  defaultRegion: 'DE',

  projectTypes: {
    deck: {
      baseUnit: 'sqft',
      basePrice: [35, 75],
      laborShare: 0.45,
      materialShare: 0.55,
      timelineBase: [3, 5],
      timelinePerUnit: [0.01, 0.02],
      minSize: 20,
      maxSize: 2000,
      sizeDiscounts: [
        { threshold: 300, discount: 0.05 },
        { threshold: 500, discount: 0.10 },
      ],
    },
    fence: {
      baseUnit: 'lnft',
      basePrice: [18, 65],
      laborShare: 0.40,
      materialShare: 0.60,
      timelineBase: [1, 3],
      timelinePerUnit: [0.005, 0.01],
      minSize: 10,
      maxSize: 1000,
    },
    kitchen: {
      baseUnit: 'sqft',
      basePrice: [100, 500],
      laborShare: 0.35,
      materialShare: 0.65,
      timelineBase: [10, 21],
      timelinePerUnit: [0.05, 0.1],
      minSize: 40,
      maxSize: 600,
    },
    bathroom: {
      baseUnit: 'sqft',
      basePrice: [120, 600],
      laborShare: 0.35,
      materialShare: 0.65,
      timelineBase: [5, 14],
      timelinePerUnit: [0.05, 0.1],
      minSize: 20,
      maxSize: 300,
    },
    ramp: {
      baseUnit: 'lnft',
      basePrice: [80, 140],
      laborShare: 0.50,
      materialShare: 0.50,
      timelineBase: [1, 3],
      timelinePerUnit: [0.02, 0.04],
      minSize: 2,
      maxSize: 50,
    },
    'accessibility-mod': {
      baseUnit: 'flat',
      basePrice: [150, 2500],
      laborShare: 0.40,
      materialShare: 0.60,
      timelineBase: [1, 5],
      timelinePerUnit: [0, 0],
      minSize: 1,
      maxSize: 50,
    },
    porch: {
      baseUnit: 'sqft',
      basePrice: [45, 85],
      laborShare: 0.45,
      materialShare: 0.55,
      timelineBase: [3, 7],
      timelinePerUnit: [0.02, 0.03],
      minSize: 20,
      maxSize: 500,
    },
    patio: {
      baseUnit: 'sqft',
      basePrice: [8, 30],
      laborShare: 0.40,
      materialShare: 0.60,
      timelineBase: [2, 5],
      timelinePerUnit: [0.01, 0.02],
      minSize: 20,
      maxSize: 2000,
    },
    'general-remodel': {
      baseUnit: 'sqft',
      basePrice: [50, 350],
      laborShare: 0.40,
      materialShare: 0.60,
      timelineBase: [7, 30],
      timelinePerUnit: [0.03, 0.08],
      minSize: 20,
      maxSize: 3000,
    },
    repair: {
      baseUnit: 'flat',
      basePrice: [150, 5000],
      laborShare: 0.60,
      materialShare: 0.40,
      timelineBase: [1, 5],
      timelinePerUnit: [0, 0],
      minSize: 1,
      maxSize: 500,
    },
    roofing: {
      baseUnit: 'sqft',
      basePrice: [4, 40],
      laborShare: 0.35,
      materialShare: 0.65,
      timelineBase: [2, 7],
      timelinePerUnit: [0.002, 0.005],
      minSize: 200,
      maxSize: 10000,
      sizeDiscounts: [
        { threshold: 3000, discount: 0.05 },
      ],
    },
    siding: {
      baseUnit: 'sqft',
      basePrice: [5, 22],
      laborShare: 0.40,
      materialShare: 0.60,
      timelineBase: [3, 14],
      timelinePerUnit: [0.003, 0.006],
      minSize: 200,
      maxSize: 10000,
    },
    windows: {
      baseUnit: 'unit',
      basePrice: [400, 1600],
      laborShare: 0.30,
      materialShare: 0.70,
      timelineBase: [1, 3],
      timelinePerUnit: [0.2, 0.4],
      minSize: 1,
      maxSize: 40,
    },
    custom: {
      baseUnit: 'flat',
      basePrice: [1000, 100000],
      laborShare: 0.40,
      materialShare: 0.60,
      timelineBase: [7, 60],
      timelinePerUnit: [0, 0],
      minSize: 1,
      maxSize: 100000,
    },
  },

  materials: {
    deck: {
      wood: { label: 'Pressure-treated wood', multiplier: 0.7 },
      composite: { label: 'Composite', multiplier: 1.1 },
      pvc: { label: 'PVC / Capped polymer', multiplier: 1.5 },
    },
    fence: {
      wood: { label: 'Wood', multiplier: 0.6 },
      vinyl: { label: 'Vinyl', multiplier: 0.9 },
      aluminum: { label: 'Aluminum', multiplier: 1.2 },
      'chain-link': { label: 'Chain link', multiplier: 0.4 },
    },
    kitchen: {
      basic: { label: 'Essential', multiplier: 0.5 },
      mid: { label: 'Mid-range', multiplier: 1.0 },
      high: { label: 'Premium', multiplier: 1.8 },
    },
    bathroom: {
      basic: { label: 'Essential', multiplier: 0.5 },
      mid: { label: 'Mid-range', multiplier: 1.0 },
      high: { label: 'Premium', multiplier: 1.7 },
    },
    'general-remodel': {
      low: { label: 'Essential', multiplier: 0.5 },
      mid: { label: 'Mid-range', multiplier: 1.0 },
      high: { label: 'Premium', multiplier: 1.7 },
    },
    patio: {
      paver: { label: 'Paver stones', multiplier: 1.4 },
      concrete: { label: 'Poured concrete', multiplier: 0.7 },
      stamped: { label: 'Stamped concrete', multiplier: 1.1 },
    },
    roofing: {
      asphalt: { label: 'Architectural asphalt', multiplier: 0.3 },
      metal: { label: 'Standing seam metal', multiplier: 0.8 },
      rubber: { label: 'Rubber / EPDM', multiplier: 0.5 },
      slate: { label: 'Slate or tile', multiplier: 1.7 },
    },
    siding: {
      vinyl: { label: 'Vinyl', multiplier: 0.5 },
      'fiber-cement': { label: 'Fiber cement', multiplier: 0.9 },
      cedar: { label: 'Cedar', multiplier: 1.3 },
      stucco: { label: 'Stucco', multiplier: 1.1 },
    },
    windows: {
      vinyl: { label: 'Vinyl frame', multiplier: 0.5 },
      fiberglass: { label: 'Fiberglass frame', multiplier: 0.8 },
      wood: { label: 'Wood-clad frame', multiplier: 1.2 },
    },
  },

  complexityTiers: [
    { maxPoints: 1, label: 'simple', costMultiplier: 1.0, timelineMultiplier: 1.0 },
    { maxPoints: 3, label: 'moderate', costMultiplier: 1.15, timelineMultiplier: 1.2 },
    { maxPoints: 6, label: 'complex', costMultiplier: 1.35, timelineMultiplier: 1.5 },
    { maxPoints: 99, label: 'very-complex', costMultiplier: 1.6, timelineMultiplier: 2.0 },
  ],

  regionalFactors: {
    DE: { label: 'Delaware', costMultiplier: 1.0 },
    PA: { label: 'Pennsylvania', costMultiplier: 1.05 },
  },

  confidenceRanges: {
    high: 0.10,
    medium: 0.20,
    low: 0.30,
  },
};

export function getComplexityTier(points: number): ComplexityTier {
  for (const tier of pricingConfig.complexityTiers) {
    if (points <= tier.maxPoints) return tier;
  }
  return pricingConfig.complexityTiers[pricingConfig.complexityTiers.length - 1];
}

export const COMPLEXITY_FEATURE_POINTS: Record<string, number> = {
  pergola: 2,
  builtInSeating: 1,
  lighting: 1,
  island: 2,
  pantry: 1,
  newAppliances: 1,
  newTub: 1,
  walkInShower: 2,
  doubleVanity: 1,
  heatedFloor: 2,
  firePit: 1,
  seatingWall: 1,
  thresholdRamps: 1,
  grabBars: 1,
  doorsWidened: 2,
};

export const COMPLEXITY_BOOLEANS: Record<string, number> = {
  deck_demolition: 1,
  porch_roofing: 1,
  roofing_leak: 2,
  roofing_gutters: 1,
  siding_insulation: 1,
  siding_trim: 1,
  siding_removal: 1,
  windows_rot: 2,
  deck_hoa: 1,
};
