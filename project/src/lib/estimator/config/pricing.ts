export interface ProjectPricingConfig {
  basePerSqFt: number;
  laborPerSqFt: number;
  materialPerSqFt: number;
}

export interface PricingConfig {
  baseCosts: Record<string, ProjectPricingConfig>;
  materialMultipliers: Record<string, number>;
  complexityMultipliers: Record<string, number>;
  regionalMultipliers: Record<string, number>;
  siteAccessMultipliers: Record<string, number>;
  conditionMultipliers: Record<string, number>;
}

export const pricingConfig: PricingConfig = {
  baseCosts: {
    deck: { basePerSqFt: 35, laborPerSqFt: 20, materialPerSqFt: 15 },
    fence: { basePerSqFt: 28, laborPerSqFt: 16, materialPerSqFt: 12 },
    kitchen: { basePerSqFt: 180, laborPerSqFt: 80, materialPerSqFt: 100 },
    bathroom: { basePerSqFt: 220, laborPerSqFt: 100, materialPerSqFt: 120 },
    accessibility: { basePerSqFt: 95, laborPerSqFt: 45, materialPerSqFt: 50 },
    'accessibility-mod': { basePerSqFt: 75, laborPerSqFt: 40, materialPerSqFt: 35 },
    ramp: { basePerSqFt: 120, laborPerSqFt: 55, materialPerSqFt: 65 },
    porch: { basePerSqFt: 65, laborPerSqFt: 30, materialPerSqFt: 35 },
    patio: { basePerSqFt: 22, laborPerSqFt: 10, materialPerSqFt: 12 },
    'general-remodel': { basePerSqFt: 110, laborPerSqFt: 50, materialPerSqFt: 60 },
    repair: { basePerSqFt: 45, laborPerSqFt: 30, materialPerSqFt: 15 },
    roofing: { basePerSqFt: 8, laborPerSqFt: 3, materialPerSqFt: 5 },
    siding: { basePerSqFt: 12, laborPerSqFt: 5, materialPerSqFt: 7 },
    windows: { basePerSqFt: 0, laborPerSqFt: 0, materialPerSqFt: 0 },
    custom: { basePerSqFt: 0, laborPerSqFt: 0, materialPerSqFt: 0 },
  },
  materialMultipliers: {
    standard: 1.0,
    // Deck
    'pressure-treated': 1.0,
    cedar: 1.25,
    composite: 1.5,
    pvc: 1.7,
    'exotic-hardwood': 1.9,
    // Fence
    vinyl: 1.4,
    aluminum: 1.6,
    'chain-link': 0.8,
    'wrought-iron': 2.0,
    // Kitchen
    'stock-laminate': 1.0,
    'semi-custom-quartz': 1.35,
    'custom-quartz': 1.7,
    'custom-marble': 2.1,
    // Bathroom
    'standard-tile': 1.0,
    'upgraded-tile': 1.3,
    'premium-tile': 1.6,
    'luxury-tile': 2.0,
    // Accessibility
    'wood-ramp': 1.0,
    'aluminum-ramp': 1.3,
    'concrete-ramp': 1.5,
    'grab-bars-only': 0.6,
    // Porch
    'porch-basic': 1.0,
    'porch-screened': 1.2,
    'porch-covered': 1.35,
    // Patio
    paver: 1.2,
    concrete: 1.0,
    stamped: 1.3,
    // General remodel
    'remodel-essential': 1.0,
    'remodel-mid': 1.35,
    'remodel-premium': 1.8,
    // Repair
    'drywall': 1.0,
    'flooring': 1.1,
    'paint': 0.9,
    'fixture': 1.0,
    'general': 1.0,
    // Roofing
    'asphalt': 1.0,
    'metal': 1.8,
    'rubber': 1.3,
    'slate': 2.5,
    // Siding
    'fiber-cement': 1.5,
    'stucco': 1.4,
    'vinyl-siding': 1.0,
    'cedar-siding': 1.6,
    // Windows
    'fiberglass': 1.3,
    'wood-clad': 1.6,
    'double': 1.0,
    'triple': 1.4,
    'full-frame': 1.25,
    'insert': 1.0,
    // Legacy
    premium: 1.35,
    luxury: 1.8,
  },
  complexityMultipliers: {
    // Legacy
    demolition: 1.15,
    permits: 1.05,
    design: 1.1,
    rush: 1.2,
    // Deck
    railings: 1.08,
    stairs: 1.12,
    skirting: 1.04,
    'built-in-seating': 1.1,
    'planter-boxes': 1.05,
    lighting: 1.05,
    pergola: 1.25,
    'multi-level': 1.2,
    'deck-attached': 1.0,
    'deck-freestanding': 1.08,
    'deck-ground-level': 0.95,
    'deck-high': 1.2,
    // Fence
    gate: 1.08,
    'double-gate': 1.15,
    'post-caps': 1.03,
    'lattice-top': 1.05,
    stain: 1.05,
    removal: 1.1,
    'fence-8ft': 1.25,
    'fence-slope': 1.15,
    'fence-mixed': 1.1,
    // Kitchen
    cabinets: 1.0,
    counters: 1.0,
    appliances: 1.1,
    'sink-faucet': 1.03,
    flooring: 1.12,
    backsplash: 1.08,
    'wall-removal': 1.2,
    island: 1.15,
    pantry: 1.08,
    'kitchen-major-change': 1.25,
    'kitchen-replace-premium': 1.2,
    // Bathroom
    'tub-shower': 1.1,
    'tile-shower': 1.15,
    vanity: 1.05,
    toilet: 1.03,
    'plumbing-move': 1.2,
    'linen-storage': 1.05,
    'heated-floor': 1.15,
    'bathroom-master': 1.15,
    'bathroom-walk-in-shower': 1.12,
    'bathroom-soaking-tub': 1.18,
    'bathroom-roll-in': 1.15,
    'bathroom-major-move': 1.2,
    // Accessibility
    ramp: 1.2,
    'grab-bars': 1.03,
    'widen-doors': 1.08,
    'lower-counters': 1.05,
    'roll-shower': 1.15,
    handrails: 1.05,
    thresholds: 1.03,
    'stair-lift': 1.1,
    'ramp-wheelchair': 1.1,
    'ramp-back-door': 1.05,
    // Porch
    'porch-covered': 1.3,
    'porch-elevated': 1.15,
    'porch-screened': 1.2,
    // Patio
    'patio-old-surface': 1.15,
    'patio-some-drainage': 1.08,
    'patia-significant-drainage': 1.15,
    // General remodel
    'remodel-basement': 1.2,
    'remodel-garage': 1.1,
    'remodel-whole-floor': 1.25,
    'remodel-major': 1.2,
    // Repair
    'repair-emergency': 1.15,
    // Roofing
    'roofing-steep': 1.2,
    'roofing-2-plus': 1.15,
    'roofing-old': 1.1,
    'roofing-tearoff': 1.12,
    // Siding
    'siding-2': 1.12,
    'siding-3-plus': 1.25,
    'siding-damaged': 1.15,
    // Windows
    'window-some-rot': 1.15,
    'window-full-frame': 1.25,
    'window-bay-bow': 1.2,
  },
  regionalMultipliers: {
    DE: 1.0,
    PA: 1.05,
  },
  siteAccessMultipliers: {
    easy: 1.0,
    moderate: 1.08,
    difficult: 1.18,
  },
  conditionMultipliers: {
    good: 1.0,
    fair: 1.1,
    poor: 1.25,
    unknown: 1.15,
  },
};
