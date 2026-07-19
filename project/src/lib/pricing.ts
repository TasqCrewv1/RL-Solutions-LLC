export interface PriceComponent {
  label: string;
  amount: number;
}

export interface PriceBreakdown {
  components: PriceComponent[];
  low: number;
  high: number;
  disclaimer: string;
}

interface RateSheet {
  decks: {
    woodPerSqft: [number, number];
    compositePerSqft: [number, number];
    pvcPerSqft: [number, number];
    railingPerLnft: [number, number];
    stairsPerStep: [number, number];
    pergolaFlat: [number, number];
    builtInSeatingFlat: [number, number];
    lightingFlat: [number, number];
    demoPerSqft: [number, number];
    permitFlat: [number, number];
  };
  fencing: {
    woodPerLnft: [number, number];
    vinylPerLnft: [number, number];
    aluminumPerLnft: [number, number];
    chainLinkPerLnft: [number, number];
    gateFlat: [number, number];
    doubleGateFlat: [number, number];
    demoPerLnft: [number, number];
    permitFlat: [number, number];
  };
  kitchens: {
    basicPerSqft: [number, number];
    midPerSqft: [number, number];
    highPerSqft: [number, number];
    islandFlat: [number, number];
    pantryFlat: [number, number];
    newAppliancesFlat: [number, number];
    demoFlat: [number, number];
    permitFlat: [number, number];
  };
  bathrooms: {
    basicPerSqft: [number, number];
    midPerSqft: [number, number];
    highPerSqft: [number, number];
    newTubFlat: [number, number];
    walkInShowerFlat: [number, number];
    doubleVanityFlat: [number, number];
    heatedFloorFlat: [number, number];
    demoFlat: [number, number];
    permitFlat: [number, number];
  };
  accessibility: {
    rampPerLnft: [number, number];
    landingFlat: [number, number];
    handrailPerLnft: [number, number];
    thresholdRampFlat: [number, number];
    grabBarsFlat: [number, number];
    doorWideningFlat: [number, number];
    permitFlat: [number, number];
  };
  porch: {
    perSqft: [number, number];
    roofingPerSqft: [number, number];
    columns: [number, number];
    railingPerLnft: [number, number];
    stepsPerStep: [number, number];
    demoPerSqft: [number, number];
    permitFlat: [number, number];
  };
  patio: {
    paverPerSqft: [number, number];
    concretePerSqft: [number, number];
    stampedPerSqft: [number, number];
    firePitFlat: [number, number];
    seatingWallFlat: [number, number];
    lightingFlat: [number, number];
    demoPerSqft: [number, number];
    permitFlat: [number, number];
  };
  generalRemodel: {
    lowPerSqft: [number, number];
    midPerSqft: [number, number];
    highPerSqft: [number, number];
    demoFlat: [number, number];
    permitFlat: [number, number];
  };
  repair: {
    hourlyRate: [number, number];
    minProject: [number, number];
    drywallPerSheet: [number, number];
    flooringPerSqft: [number, number];
    paintPerSqft: [number, number];
    fixtureReplaceFlat: [number, number];
  };
  roofing: {
    asphaltPerSqft: [number, number];
    metalPerSqft: [number, number];
    rubberPerSqft: [number, number];
    slatePerSqft: [number, number];
    tearoffPerSqft: [number, number];
    gutterPerLnft: [number, number];
    leakRepairFlat: [number, number];
    permitFlat: [number, number];
  };
  siding: {
    vinylPerSqft: [number, number];
    fiberCementPerSqft: [number, number];
    cedarPerSqft: [number, number];
    stuccoPerSqft: [number, number];
    insulationPerSqft: [number, number];
    trimPerLnft: [number, number];
    removalPerSqft: [number, number];
    permitFlat: [number, number];
  };
  windows: {
    vinylPerUnit: [number, number];
    fiberglassPerUnit: [number, number];
    woodCladPerUnit: [number, number];
    triplePaneAdder: [number, number];
    fullFrameAdder: [number, number];
    rotRepairFlat: [number, number];
    permitFlat: [number, number];
  };
}

export const rates: RateSheet = {
  decks: {
    woodPerSqft: [35, 55],
    compositePerSqft: [45, 75],
    pvcPerSqft: [60, 95],
    railingPerLnft: [45, 85],
    stairsPerStep: [150, 250],
    pergolaFlat: [2500, 5000],
    builtInSeatingFlat: [800, 1800],
    lightingFlat: [600, 1500],
    demoPerSqft: [4, 8],
    permitFlat: [150, 350],
  },
  fencing: {
    woodPerLnft: [18, 32],
    vinylPerLnft: [25, 45],
    aluminumPerLnft: [35, 65],
    chainLinkPerLnft: [12, 22],
    gateFlat: [300, 600],
    doubleGateFlat: [600, 1200],
    demoPerLnft: [3, 6],
    permitFlat: [75, 200],
  },
  kitchens: {
    basicPerSqft: [100, 175],
    midPerSqft: [175, 300],
    highPerSqft: [300, 500],
    islandFlat: [1500, 4500],
    pantryFlat: [800, 2500],
    newAppliancesFlat: [2000, 6000],
    demoFlat: [500, 1500],
    permitFlat: [200, 500],
  },
  bathrooms: {
    basicPerSqft: [120, 200],
    midPerSqft: [200, 350],
    highPerSqft: [350, 600],
    newTubFlat: [1200, 3500],
    walkInShowerFlat: [2000, 6000],
    doubleVanityFlat: [800, 2500],
    heatedFloorFlat: [1000, 3000],
    demoFlat: [400, 1000],
    permitFlat: [150, 400],
  },
  accessibility: {
    rampPerLnft: [80, 140],
    landingFlat: [300, 600],
    handrailPerLnft: [30, 55],
    thresholdRampFlat: [200, 500],
    grabBarsFlat: [150, 400],
    doorWideningFlat: [400, 900],
    permitFlat: [100, 300],
  },
  porch: {
    perSqft: [45, 85],
    roofingPerSqft: [20, 40],
    columns: [300, 700],
    railingPerLnft: [45, 85],
    stepsPerStep: [150, 250],
    demoPerSqft: [4, 8],
    permitFlat: [150, 350],
  },
  patio: {
    paverPerSqft: [15, 30],
    concretePerSqft: [8, 15],
    stampedPerSqft: [12, 25],
    firePitFlat: [500, 2000],
    seatingWallFlat: [800, 2500],
    lightingFlat: [400, 1200],
    demoPerSqft: [3, 6],
    permitFlat: [100, 250],
  },
  generalRemodel: {
    lowPerSqft: [50, 100],
    midPerSqft: [100, 200],
    highPerSqft: [200, 350],
    demoFlat: [500, 2000],
    permitFlat: [200, 600],
  },
  repair: {
    hourlyRate: [65, 95],
    minProject: [150, 300],
    drywallPerSheet: [60, 120],
    flooringPerSqft: [5, 15],
    paintPerSqft: [2, 6],
    fixtureReplaceFlat: [100, 350],
  },
  roofing: {
    asphaltPerSqft: [4, 7],
    metalPerSqft: [10, 18],
    rubberPerSqft: [6, 12],
    slatePerSqft: [20, 40],
    tearoffPerSqft: [1.5, 3],
    gutterPerLnft: [8, 15],
    leakRepairFlat: [300, 800],
    permitFlat: [100, 300],
  },
  siding: {
    vinylPerSqft: [5, 9],
    fiberCementPerSqft: [9, 15],
    cedarPerSqft: [12, 22],
    stuccoPerSqft: [10, 20],
    insulationPerSqft: [2, 4],
    trimPerLnft: [8, 18],
    removalPerSqft: [1.5, 3],
    permitFlat: [100, 300],
  },
  windows: {
    vinylPerUnit: [400, 800],
    fiberglassPerUnit: [600, 1100],
    woodCladPerUnit: [900, 1600],
    triplePaneAdder: [150, 400],
    fullFrameAdder: [200, 500],
    rotRepairFlat: [150, 600],
    permitFlat: [50, 150],
  },
};

function range(
  parts: { low: number; high: number; label: string }[],
): PriceBreakdown {
  const low = parts.reduce((s, p) => s + p.low, 0);
  const high = parts.reduce((s, p) => s + p.high, 0);
  return {
    components: parts.map((p) => ({ label: p.label, amount: Math.round((p.low + p.high) / 2) })),
    low: Math.round(low / 10) * 10,
    high: Math.round(high / 10) * 10,
    disclaimer:
      'This estimate is an approximation based on regional material and labor averages. A firm quote follows an on-site evaluation.',
  };
}

export type CalculatorId =
  | 'deck'
  | 'fence'
  | 'kitchen'
  | 'bathroom'
  | 'ramp'
  | 'accessibility-mod'
  | 'porch'
  | 'patio'
  | 'general-remodel'
  | 'custom'
  | 'repair'
  | 'roofing'
  | 'siding'
  | 'windows';

interface DeckSelections {
  material: 'wood' | 'composite' | 'pvc';
  length: number;
  width: number;
  railingLength: number;
  stairs: number;
  pergola: boolean;
  builtInSeating: boolean;
  lighting: boolean;
  demolition: boolean;
  existingSqft: number;
  permit: boolean;
}

export function calcDeck(s: DeckSelections): PriceBreakdown {
  const r = rates.decks;
  const sqft = s.length * s.width;
  const matRate = s.material === 'wood' ? r.woodPerSqft : s.material === 'composite' ? r.compositePerSqft : r.pvcPerSqft;
  const parts: { low: number; high: number; label: string }[] = [
    { label: `Decking (${sqft} sq ft, ${s.material})`, low: sqft * matRate[0], high: sqft * matRate[1] },
  ];
  if (s.railingLength > 0)
    parts.push({ label: `Railing (${s.railingLength} ln ft)`, low: s.railingLength * r.railingPerLnft[0], high: s.railingLength * r.railingPerLnft[1] });
  if (s.stairs > 0)
    parts.push({ label: `Stairs (${s.stairs} steps)`, low: s.stairs * r.stairsPerStep[0], high: s.stairs * r.stairsPerStep[1] });
  if (s.pergola) parts.push({ label: 'Pergola', low: r.pergolaFlat[0], high: r.pergolaFlat[1] });
  if (s.builtInSeating) parts.push({ label: 'Built-in seating', low: r.builtInSeatingFlat[0], high: r.builtInSeatingFlat[1] });
  if (s.lighting) parts.push({ label: 'Deck lighting', low: r.lightingFlat[0], high: r.lightingFlat[1] });
  if (s.demolition && s.existingSqft > 0)
    parts.push({ label: `Demolition (${s.existingSqft} sq ft)`, low: s.existingSqft * r.demoPerSqft[0], high: s.existingSqft * r.demoPerSqft[1] });
  if (s.permit) parts.push({ label: 'Permit (est.)', low: r.permitFlat[0], high: r.permitFlat[1] });
  return range(parts);
}

interface FenceSelections {
  material: 'wood' | 'vinyl' | 'aluminum' | 'chain-link';
  totalLength: number;
  gates: number;
  doubleGates: number;
  demolition: boolean;
  existingLength: number;
  permit: boolean;
}

export function calcFence(s: FenceSelections): PriceBreakdown {
  const r = rates.fencing;
  const matRate = r[`${s.material === 'chain-link' ? 'chainLinkPerLnft' : s.material + 'PerLnft'}` as keyof typeof r] as [number, number];
  const parts: { low: number; high: number; label: string }[] = [
    { label: `Fencing (${s.totalLength} ln ft, ${s.material})`, low: s.totalLength * matRate[0], high: s.totalLength * matRate[1] },
  ];
  if (s.gates > 0)
    parts.push({ label: `${s.gates} gate${s.gates > 1 ? 's' : ''}`, low: s.gates * r.gateFlat[0], high: s.gates * r.gateFlat[1] });
  if (s.doubleGates > 0)
    parts.push({ label: `${s.doubleGates} double gate${s.doubleGates > 1 ? 's' : ''}`, low: s.doubleGates * r.doubleGateFlat[0], high: s.doubleGates * r.doubleGateFlat[1] });
  if (s.demolition && s.existingLength > 0)
    parts.push({ label: `Demolition (${s.existingLength} ln ft)`, low: s.existingLength * r.demoPerLnft[0], high: s.existingLength * r.demoPerLnft[1] });
  if (s.permit) parts.push({ label: 'Permit (est.)', low: r.permitFlat[0], high: r.permitFlat[1] });
  return range(parts);
}

interface KitchenSelections {
  tier: 'basic' | 'mid' | 'high';
  sqft: number;
  island: boolean;
  pantry: boolean;
  newAppliances: boolean;
  demolition: boolean;
  permit: boolean;
}

export function calcKitchen(s: KitchenSelections): PriceBreakdown {
  const r = rates.kitchens;
  const rate = s.tier === 'basic' ? r.basicPerSqft : s.tier === 'mid' ? r.midPerSqft : r.highPerSqft;
  const parts: { low: number; high: number; label: string }[] = [
    { label: `Cabinets & finishes (${s.sqft} sq ft, ${s.tier})`, low: s.sqft * rate[0], high: s.sqft * rate[1] },
  ];
  if (s.island) parts.push({ label: 'Kitchen island', low: r.islandFlat[0], high: r.islandFlat[1] });
  if (s.pantry) parts.push({ label: 'Walk-in pantry', low: r.pantryFlat[0], high: r.pantryFlat[1] });
  if (s.newAppliances) parts.push({ label: 'New appliances', low: r.newAppliancesFlat[0], high: r.newAppliancesFlat[1] });
  if (s.demolition) parts.push({ label: 'Demolition', low: r.demoFlat[0], high: r.demoFlat[1] });
  if (s.permit) parts.push({ label: 'Permit (est.)', low: r.permitFlat[0], high: r.permitFlat[1] });
  return range(parts);
}

interface BathroomSelections {
  tier: 'basic' | 'mid' | 'high';
  sqft: number;
  newTub: boolean;
  walkInShower: boolean;
  doubleVanity: boolean;
  heatedFloor: boolean;
  demolition: boolean;
  permit: boolean;
}

export function calcBathroom(s: BathroomSelections): PriceBreakdown {
  const r = rates.bathrooms;
  const rate = s.tier === 'basic' ? r.basicPerSqft : s.tier === 'mid' ? r.midPerSqft : r.highPerSqft;
  const parts: { low: number; high: number; label: string }[] = [
    { label: `Fixtures & finishes (${s.sqft} sq ft, ${s.tier})`, low: s.sqft * rate[0], high: s.sqft * rate[1] },
  ];
  if (s.newTub) parts.push({ label: 'New soaking tub', low: r.newTubFlat[0], high: r.newTubFlat[1] });
  if (s.walkInShower) parts.push({ label: 'Walk-in shower', low: r.walkInShowerFlat[0], high: r.walkInShowerFlat[1] });
  if (s.doubleVanity) parts.push({ label: 'Double vanity', low: r.doubleVanityFlat[0], high: r.doubleVanityFlat[1] });
  if (s.heatedFloor) parts.push({ label: 'Radiant floor heating', low: r.heatedFloorFlat[0], high: r.heatedFloorFlat[1] });
  if (s.demolition) parts.push({ label: 'Demolition', low: r.demoFlat[0], high: r.demoFlat[1] });
  if (s.permit) parts.push({ label: 'Permit (est.)', low: r.permitFlat[0], high: r.permitFlat[1] });
  return range(parts);
}

interface RampSelections {
  length: number;
  landings: number;
  handrailLength: number;
  permit: boolean;
}

export function calcRamp(s: RampSelections): PriceBreakdown {
  const r = rates.accessibility;
  const parts: { low: number; high: number; label: string }[] = [
    { label: `Ramp structure (${s.length} ln ft)`, low: s.length * r.rampPerLnft[0], high: s.length * r.rampPerLnft[1] },
  ];
  if (s.landings > 0)
    parts.push({ label: `${s.landings} landing${s.landings > 1 ? 's' : ''}`, low: s.landings * r.landingFlat[0], high: s.landings * r.landingFlat[1] });
  if (s.handrailLength > 0)
    parts.push({ label: `Handrails (${s.handrailLength} ln ft)`, low: s.handrailLength * r.handrailPerLnft[0], high: s.handrailLength * r.handrailPerLnft[1] });
  if (s.permit) parts.push({ label: 'Permit (est.)', low: r.permitFlat[0], high: r.permitFlat[1] });
  return range(parts);
}

interface AccessibilityModSelections {
  thresholdRamps: number;
  grabBars: number;
  doorsWidened: number;
  permit: boolean;
}

export function calcAccessibilityMod(s: AccessibilityModSelections): PriceBreakdown {
  const r = rates.accessibility;
  const parts: { low: number; high: number; label: string }[] = [];
  if (s.thresholdRamps > 0)
    parts.push({ label: `${s.thresholdRamps} threshold ramp${s.thresholdRamps > 1 ? 's' : ''}`, low: s.thresholdRamps * r.thresholdRampFlat[0], high: s.thresholdRamps * r.thresholdRampFlat[1] });
  if (s.grabBars > 0)
    parts.push({ label: `${s.grabBars} grab bar${s.grabBars > 1 ? 's' : ''}`, low: s.grabBars * r.grabBarsFlat[0], high: s.grabBars * r.grabBarsFlat[1] });
  if (s.doorsWidened > 0)
    parts.push({ label: `${s.doorsWidened} door${s.doorsWidened > 1 ? 's' : ''} widened`, low: s.doorsWidened * r.doorWideningFlat[0], high: s.doorsWidened * r.doorWideningFlat[1] });
  if (s.permit) parts.push({ label: 'Permit (est.)', low: r.permitFlat[0], high: r.permitFlat[1] });
  if (parts.length === 0)
    return { components: [], low: 0, high: 0, disclaimer: 'Select modifications to see pricing.' };
  return range(parts);
}

interface PorchSelections {
  sqft: number;
  roofing: boolean;
  roofingSqft: number;
  columns: number;
  railingLength: number;
  steps: number;
  demolition: boolean;
  existingSqft: number;
  permit: boolean;
}

export function calcPorch(s: PorchSelections): PriceBreakdown {
  const r = rates.porch;
  const parts: { low: number; high: number; label: string }[] = [
    { label: `Porch structure (${s.sqft} sq ft)`, low: s.sqft * r.perSqft[0], high: s.sqft * r.perSqft[1] },
  ];
  if (s.roofing && s.roofingSqft > 0)
    parts.push({ label: `Roofing (${s.roofingSqft} sq ft)`, low: s.roofingSqft * r.roofingPerSqft[0], high: s.roofingSqft * r.roofingPerSqft[1] });
  if (s.columns > 0)
    parts.push({ label: `${s.columns} column${s.columns > 1 ? 's' : ''}`, low: s.columns * r.columns[0], high: s.columns * r.columns[1] });
  if (s.railingLength > 0)
    parts.push({ label: `Railing (${s.railingLength} ln ft)`, low: s.railingLength * r.railingPerLnft[0], high: s.railingLength * r.railingPerLnft[1] });
  if (s.steps > 0)
    parts.push({ label: `Steps (${s.steps})`, low: s.steps * r.stepsPerStep[0], high: s.steps * r.stepsPerStep[1] });
  if (s.demolition && s.existingSqft > 0)
    parts.push({ label: `Demolition (${s.existingSqft} sq ft)`, low: s.existingSqft * r.demoPerSqft[0], high: s.existingSqft * r.demoPerSqft[1] });
  if (s.permit) parts.push({ label: 'Permit (est.)', low: r.permitFlat[0], high: r.permitFlat[1] });
  return range(parts);
}

interface PatioSelections {
  material: 'paver' | 'concrete' | 'stamped';
  sqft: number;
  firePit: boolean;
  seatingWall: boolean;
  lighting: boolean;
  demolition: boolean;
  existingSqft: number;
  permit: boolean;
}

export function calcPatio(s: PatioSelections): PriceBreakdown {
  const r = rates.patio;
  const matRate = s.material === 'paver' ? r.paverPerSqft : s.material === 'concrete' ? r.concretePerSqft : r.stampedPerSqft;
  const parts: { low: number; high: number; label: string }[] = [
    { label: `Surface (${s.sqft} sq ft, ${s.material})`, low: s.sqft * matRate[0], high: s.sqft * matRate[1] },
  ];
  if (s.firePit) parts.push({ label: 'Fire pit', low: r.firePitFlat[0], high: r.firePitFlat[1] });
  if (s.seatingWall) parts.push({ label: 'Seating wall', low: r.seatingWallFlat[0], high: r.seatingWallFlat[1] });
  if (s.lighting) parts.push({ label: 'Landscape lighting', low: r.lightingFlat[0], high: r.lightingFlat[1] });
  if (s.demolition && s.existingSqft > 0)
    parts.push({ label: `Demolition (${s.existingSqft} sq ft)`, low: s.existingSqft * r.demoPerSqft[0], high: s.existingSqft * r.demoPerSqft[1] });
  if (s.permit) parts.push({ label: 'Permit (est.)', low: r.permitFlat[0], high: r.permitFlat[1] });
  return range(parts);
}

interface GeneralRemodelSelections {
  tier: 'low' | 'mid' | 'high';
  sqft: number;
  demolition: boolean;
  permit: boolean;
}

export function calcGeneralRemodel(s: GeneralRemodelSelections): PriceBreakdown {
  const r = rates.generalRemodel;
  const rate = s.tier === 'low' ? r.lowPerSqft : s.tier === 'mid' ? r.midPerSqft : r.highPerSqft;
  const parts: { low: number; high: number; label: string }[] = [
    { label: `Remodel (${s.sqft} sq ft, ${s.tier}-grade)`, low: s.sqft * rate[0], high: s.sqft * rate[1] },
  ];
  if (s.demolition) parts.push({ label: 'Demolition', low: r.demoFlat[0], high: r.demoFlat[1] });
  if (s.permit) parts.push({ label: 'Permit (est.)', low: r.permitFlat[0], high: r.permitFlat[1] });
  return range(parts);
}

interface RepairSelections {
  type: 'drywall' | 'flooring' | 'paint' | 'fixture' | 'general';
  quantity: number;
}

export function calcRepair(s: RepairSelections): PriceBreakdown {
  const r = rates.repair;
  const parts: { low: number; high: number; label: string }[] = [];
  if (s.type === 'drywall')
    parts.push({ label: `Drywall repair (${s.quantity} sheet${s.quantity > 1 ? 's' : ''})`, low: s.quantity * r.drywallPerSheet[0], high: s.quantity * r.drywallPerSheet[1] });
  else if (s.type === 'flooring')
    parts.push({ label: `Flooring (${s.quantity} sq ft)`, low: s.quantity * r.flooringPerSqft[0], high: s.quantity * r.flooringPerSqft[1] });
  else if (s.type === 'paint')
    parts.push({ label: `Painting (${s.quantity} sq ft)`, low: s.quantity * r.paintPerSqft[0], high: s.quantity * r.paintPerSqft[1] });
  else if (s.type === 'fixture')
    parts.push({ label: `${s.quantity} fixture${s.quantity > 1 ? 's' : ''} replaced`, low: s.quantity * r.fixtureReplaceFlat[0], high: s.quantity * r.fixtureReplaceFlat[1] });
  else
    parts.push({ label: `General repair (${s.quantity} hour${s.quantity > 1 ? 's' : ''})`, low: Math.max(s.quantity * r.hourlyRate[0], r.minProject[0]), high: Math.max(s.quantity * r.hourlyRate[1], r.minProject[1]) });
  return range(parts);
}

export function calcCustom(): PriceBreakdown {
  return {
    components: [],
    low: 0,
    high: 0,
    disclaimer:
      'Custom projects are priced per project. Share your vision and we will provide a detailed quote after an on-site evaluation.',
  };
}

export function fmt(n: number): string {
  return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

interface RoofingSelections {
  material: 'asphalt' | 'metal' | 'rubber' | 'slate';
  sqft: number;
  tearoff: boolean;
  leak: boolean;
  gutters: boolean;
  gutterLnft: number;
  permit: boolean;
}

export function calcRoofing(s: RoofingSelections): PriceBreakdown {
  const r = rates.roofing;
  const matRate = s.material === 'asphalt' ? r.asphaltPerSqft : s.material === 'metal' ? r.metalPerSqft : s.material === 'rubber' ? r.rubberPerSqft : r.slatePerSqft;
  const parts: { low: number; high: number; label: string }[] = [
    { label: `Roofing (${s.sqft} sq ft, ${s.material})`, low: s.sqft * matRate[0], high: s.sqft * matRate[1] },
  ];
  if (s.tearoff)
    parts.push({ label: `Tear-off (${s.sqft} sq ft)`, low: s.sqft * r.tearoffPerSqft[0], high: s.sqft * r.tearoffPerSqft[1] });
  if (s.leak)
    parts.push({ label: 'Leak inspection & repair', low: r.leakRepairFlat[0], high: r.leakRepairFlat[1] });
  if (s.gutters && s.gutterLnft > 0)
    parts.push({ label: `Gutters (${s.gutterLnft} ln ft)`, low: s.gutterLnft * r.gutterPerLnft[0], high: s.gutterLnft * r.gutterPerLnft[1] });
  if (s.permit) parts.push({ label: 'Permit (est.)', low: r.permitFlat[0], high: r.permitFlat[1] });
  return range(parts);
}

interface SidingSelections {
  material: 'vinyl' | 'fiber-cement' | 'cedar' | 'stucco';
  sqft: number;
  insulation: boolean;
  trim: boolean;
  trimLnft: number;
  removal: boolean;
  permit: boolean;
}

export function calcSiding(s: SidingSelections): PriceBreakdown {
  const r = rates.siding;
  const matRate = s.material === 'vinyl' ? r.vinylPerSqft : s.material === 'fiber-cement' ? r.fiberCementPerSqft : s.material === 'cedar' ? r.cedarPerSqft : r.stuccoPerSqft;
  const parts: { low: number; high: number; label: string }[] = [
    { label: `Siding (${s.sqft} sq ft, ${s.material})`, low: s.sqft * matRate[0], high: s.sqft * matRate[1] },
  ];
  if (s.insulation)
    parts.push({ label: `Insulated underlayment (${s.sqft} sq ft)`, low: s.sqft * r.insulationPerSqft[0], high: s.sqft * r.insulationPerSqft[1] });
  if (s.trim && s.trimLnft > 0)
    parts.push({ label: `Trim & soffits (${s.trimLnft} ln ft)`, low: s.trimLnft * r.trimPerLnft[0], high: s.trimLnft * r.trimPerLnft[1] });
  if (s.removal)
    parts.push({ label: `Old siding removal (${s.sqft} sq ft)`, low: s.sqft * r.removalPerSqft[0], high: s.sqft * r.removalPerSqft[1] });
  if (s.permit) parts.push({ label: 'Permit (est.)', low: r.permitFlat[0], high: r.permitFlat[1] });
  return range(parts);
}

interface WindowsSelections {
  count: number;
  frame: 'vinyl' | 'fiberglass' | 'wood';
  glass: 'double' | 'triple';
  installType: 'full-frame' | 'insert';
  rot: boolean;
  permit: boolean;
}

export function calcWindows(s: WindowsSelections): PriceBreakdown {
  const r = rates.windows;
  const frameRate = s.frame === 'vinyl' ? r.vinylPerUnit : s.frame === 'fiberglass' ? r.fiberglassPerUnit : r.woodCladPerUnit;
  const parts: { low: number; high: number; label: string }[] = [
    { label: `${s.count} window${s.count > 1 ? 's' : ''} (${s.frame})`, low: s.count * frameRate[0], high: s.count * frameRate[1] },
  ];
  if (s.glass === 'triple')
    parts.push({ label: `Triple-pane upgrade (${s.count} units)`, low: s.count * r.triplePaneAdder[0], high: s.count * r.triplePaneAdder[1] });
  if (s.installType === 'full-frame')
    parts.push({ label: `Full-frame install (${s.count} units)`, low: s.count * r.fullFrameAdder[0], high: s.count * r.fullFrameAdder[1] });
  if (s.rot)
    parts.push({ label: 'Rot repair & framing', low: r.rotRepairFlat[0], high: r.rotRepairFlat[1] });
  if (s.permit) parts.push({ label: 'Permit (est.)', low: r.permitFlat[0], high: r.permitFlat[1] });
  return range(parts);
}
