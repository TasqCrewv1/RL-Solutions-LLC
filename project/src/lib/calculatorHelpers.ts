export interface MeasurementValue {
  lengthFt: number;
  lengthIn: number;
  widthFt: number;
  widthIn: number;
  unknown?: boolean;
}

export type Selections = Record<string, string | number | boolean | string[] | MeasurementValue>;

export const str = (s: Selections, k: string, d = ''): string =>
  typeof s[k] === 'string' ? (s[k] as string) : d;

export const num = (s: Selections, k: string, d = 0): number =>
  typeof s[k] === 'number' ? (s[k] as number) : typeof s[k] === 'string' && s[k] ? parseFloat(s[k] as string) || d : d;

export const arr = (s: Selections, k: string): string[] =>
  Array.isArray(s[k]) ? (s[k] as string[]) : [];

export const bool = (s: Selections, k: string): boolean => s[k] === true;

export const dimensions = (s: Selections): { length: number; width: number; sqft: number } => {
  const d = s['dimensions'];
  if (d && typeof d === 'object' && !Array.isArray(d)) {
    const v = d as MeasurementValue;
    if (v.unknown) return { length: 0, width: 0, sqft: 0 };
    const l = (v.lengthFt || 0) + (v.lengthIn || 0) / 12;
    const w = (v.widthFt || 0) + (v.widthIn || 0) / 12;
    return { length: l, width: w, sqft: Math.round(l * w) };
  }
  return { length: 0, width: 0, sqft: 0 };
};

export function sqftLabel(s: Selections): string | null {
  const d = s['dimensions'];
  if (d && typeof d === 'object' && !Array.isArray(d) && (d as MeasurementValue).unknown) {
    return 'Size to be measured on-site';
  }
  const sqft = dimensions(s).sqft;
  if (sqft > 0) return `${sqft} sq ft`;
  if (typeof s['sqft'] === 'number' && s['sqft'] > 0) return `${s['sqft']} sq ft`;
  return null;
}

export function fmtRange(low: number, high: number): string {
  if (low === high) return `${low} day${low === 1 ? '' : 's'}`;
  return `${low}\u2013${high} days`;
}

const materialMap: Record<string, string> = {
  wood: 'Wood',
  composite: 'Composite',
  pvc: 'PVC / Capped Polymer',
  vinyl: 'Vinyl',
  aluminum: 'Aluminum',
  'chain-link': 'Chain Link',
  paver: 'Paver Stones',
  concrete: 'Concrete',
  stamped: 'Stamped Concrete',
};

export function humanizeMaterial(value: string): string {
  return materialMap[value] ?? value;
}

const tierMap: Record<string, string> = {
  basic: 'Essential',
  mid: 'Mid-Range',
  high: 'Premium',
  low: 'Essential',
};

export function humanizeTier(value: string): string {
  return tierMap[value] ?? value;
}

const featureMap: Record<string, string> = {
  pergola: 'Pergola Overhead',
  builtInSeating: 'Built-in Bench Seating',
  lighting: 'Integrated Lighting',
  island: 'Kitchen Island',
  pantry: 'Walk-in Pantry',
  newAppliances: 'New Appliances',
  newTub: 'New Soaking Tub',
  walkInShower: 'Walk-in Shower',
  doubleVanity: 'Double Vanity',
  heatedFloor: 'Radiant Floor Heating',
  firePit: 'Fire Pit',
  seatingWall: 'Seating Wall',
  thresholdRamps: 'Threshold Ramps',
  grabBars: 'Grab Bar Installation',
  doorsWidened: 'Door Widening',
};

export function humanizeFeature(value: string): string {
  return featureMap[value] ?? value;
}

const repairMap: Record<string, string> = {
  drywall: 'Drywall Repair',
  flooring: 'Flooring Repair',
  paint: 'Painting',
  fixture: 'Fixture Replacement',
  general: 'General Handyman',
};

export function humanizeRepairType(value: string): string {
  return repairMap[value] ?? value;
}
