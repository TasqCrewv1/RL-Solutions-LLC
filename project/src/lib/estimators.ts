import type { CalculatorId, PriceBreakdown } from './pricing';
import {
  calcDeck, calcFence, calcKitchen, calcBathroom, calcRamp,
  calcAccessibilityMod, calcPorch, calcPatio, calcGeneralRemodel,
  calcRepair, calcCustom, calcRoofing, calcSiding, calcWindows,
} from './pricing';
import type { LucideIcon } from 'lucide-react';
import {
  Hammer, Fence, ChefHat, Bath, Accessibility, Home, Trees,
  Wrench, Sparkles, Blocks, PersonStanding, Layers, Square,
} from 'lucide-react';
import type { Selections } from './calculatorHelpers';
import {
  str, num, arr, bool, dimensions, sqftLabel, fmtRange,
  humanizeMaterial, humanizeTier, humanizeFeature, humanizeRepairType,
} from './calculatorHelpers';

export interface SelectOption {
  value: string;
  label: string;
  sub?: string;
}

export interface StepConfig {
  id: string;
  title: string;
  subtitle: string;
  type: 'choice' | 'multi' | 'number' | 'measurement' | 'text' | 'textarea' | 'boolean' | 'dropdown' | 'slider';
  options?: SelectOption[];
  unit?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  showIf?: (s: Selections) => boolean;
  help?: string;
}

export interface CalculatorConfig {
  id: CalculatorId;
  name: string;
  shortName: string;
  icon: LucideIcon;
  description: string;
  category: string;
  steps: StepConfig[];
  stepLabels: string[];
  compute: (s: Selections) => PriceBreakdown;
  timeline: (s: Selections) => string;
  summary: (s: Selections) => string[];
}

export interface ProjectSummary {
  timeline: string;
  items: string[];
}

const permitIncluded = (s: Selections): boolean => bool(s, 'permit');

function baseItems(s: Selections): string[] {
  const items: string[] = [];
  if (bool(s, 'demolition')) items.push('Existing structure removal');
  if (permitIncluded(s)) items.push('Permit included (est.)');
  return items;
}

export const calculators: CalculatorConfig[] = [
  {
    id: 'deck',
    name: 'Deck Cost Calculator',
    shortName: 'Deck',
    icon: Hammer,
    description: 'Plan your custom deck and get an instant price range.',
    category: 'Outdoor',
    steps: [
      {
        id: 'material',
        title: 'What material are you drawn to?',
        subtitle: 'Each material has different maintenance and longevity profiles.',
        help: 'Pressure-treated wood is the most affordable but needs regular sealing. Composite and PVC cost more upfront but require almost no maintenance.',
        type: 'choice',
        required: true,
        options: [
          { value: 'wood', label: 'Pressure-treated wood', sub: 'Budget-friendly, needs periodic sealing' },
          { value: 'composite', label: 'Composite', sub: 'Low maintenance, 25-yr warranty' },
          { value: 'pvc', label: 'PVC / Capped polymer', sub: 'Premium, moisture-proof, fade-resistant' },
        ],
      },
      {
        id: 'dimensions',
        title: 'How big will your deck be?',
        subtitle: 'Enter the length and width of your deck.',
        type: 'measurement',
        required: true,
      },
      {
        id: 'railingLength',
        title: 'Will the deck need railing?',
        subtitle: 'Linear feet of railing needed. Enter 0 if none.',
        help: 'Building code typically requires railing if the deck surface is more than 30 inches above grade.',
        type: 'number',
        unit: 'ln ft',
        min: 0, max: 300, required: true, placeholder: '40',
      },
      {
        id: 'stairs',
        title: 'How will you get up and down?',
        subtitle: 'Count individual steps (not staircases).',
        type: 'number',
        unit: 'steps',
        min: 0, max: 30, required: true, placeholder: '4',
      },
      {
        id: 'features',
        title: 'Any extras you are dreaming of?',
        subtitle: 'Select any upgrades you want included.',
        type: 'multi',
        options: [
          { value: 'pergola', label: 'Pergola overhead' },
          { value: 'builtInSeating', label: 'Built-in bench seating' },
          { value: 'lighting', label: 'Integrated deck lighting' },
        ],
      },
      {
        id: 'demolition',
        title: 'Is there an existing deck to remove?',
        subtitle: 'We factor demolition into your estimate.',
        type: 'boolean',
        required: true,
      },
      {
        id: 'existingSqft',
        title: 'Existing deck size',
        subtitle: 'Square footage of the deck being removed.',
        type: 'number',
        unit: 'sq ft',
        min: 0, max: 2000, placeholder: '200',
        showIf: (s) => bool(s, 'demolition'),
      },
      {
        id: 'permit',
        title: 'Will a permit be needed?',
        subtitle: 'Most decks over 30 inches high require one. When in doubt, select yes.',
        type: 'boolean',
        required: true,
      },
    ],
    stepLabels: ['Material', 'Size', 'Railings', 'Stairs', 'Features', 'Demo', 'Permit'],
    compute: (s) => {
      const d = dimensions(s);
      const f = arr(s, 'features');
      return calcDeck({
        material: str(s, 'material', 'wood') as 'wood' | 'composite' | 'pvc',
        length: d.length, width: d.width,
        railingLength: num(s, 'railingLength'), stairs: num(s, 'stairs'),
        pergola: f.includes('pergola'),
        builtInSeating: f.includes('builtInSeating'),
        lighting: f.includes('lighting'),
        demolition: bool(s, 'demolition'), existingSqft: num(s, 'existingSqft'), permit: permitIncluded(s),
      });
    },
    timeline: (s) => {
      const sqft = dimensions(s).sqft;
      const base = Math.max(2, Math.ceil(sqft / 120));
      const stairs = num(s, 'stairs');
      const max = Math.min(base + 4 + Math.ceil(stairs / 3), 15);
      return fmtRange(base, max);
    },
    summary: (s) => {
      const items: string[] = [];
      const mat = str(s, 'material');
      if (mat) items.push(humanizeMaterial(mat) + ' Decking');
      const sq = sqftLabel(s);
      if (sq) items.push(`${sq} deck area`);
      if (num(s, 'railingLength') > 0) items.push(`${num(s, 'railingLength')} ln ft of railings`);
      if (num(s, 'stairs') > 0) items.push(`${num(s, 'stairs')} stair step${num(s, 'stairs') > 1 ? 's' : ''}`);
      for (const f of arr(s, 'features')) items.push(humanizeFeature(f));
      items.push(...baseItems(s));
      return items;
    },
  },
  {
    id: 'fence',
    name: 'Fence Cost Calculator',
    shortName: 'Fence',
    icon: Fence,
    description: 'Estimate your fencing project with materials and gates.',
    category: 'Outdoor',
    steps: [
      {
        id: 'material',
        title: 'Fence material',
        subtitle: 'Material affects both cost and maintenance.',
        type: 'choice',
        required: true,
        options: [
          { value: 'wood', label: 'Wood (cedar / PT)', sub: 'Natural look, needs maintenance' },
          { value: 'vinyl', label: 'Vinyl', sub: 'Low maintenance, fade-resistant' },
          { value: 'aluminum', label: 'Aluminum', sub: 'Elegant, rust-proof' },
          { value: 'chain-link', label: 'Chain link', sub: 'Economical, durable' },
        ],
      },
      {
        id: 'totalLength',
        title: 'Total fence length',
        subtitle: 'Linear feet of fence line (not including gates).',
        type: 'number',
        unit: 'ln ft',
        min: 10, max: 1000, required: true, placeholder: '120',
      },
      {
        id: 'gates',
        title: 'Single gates',
        subtitle: 'Standard walk-through gates.',
        type: 'number',
        unit: 'gates',
        min: 0, max: 6, required: true, placeholder: '1',
      },
      {
        id: 'doubleGates',
        title: 'Double / drive gates',
        subtitle: 'Wide gates for equipment or vehicle access.',
        type: 'number',
        unit: 'gates',
        min: 0, max: 3, required: true, placeholder: '0',
      },
      {
        id: 'demolition',
        title: 'Remove existing fence?',
        subtitle: 'We include removal and disposal in the estimate.',
        type: 'boolean',
        required: true,
      },
      {
        id: 'existingLength',
        title: 'Existing fence length',
        subtitle: 'Linear feet of fence to remove.',
        type: 'number',
        unit: 'ln ft',
        min: 0, max: 1000, placeholder: '120',
        showIf: (s) => bool(s, 'demolition'),
      },
      {
        id: 'permit',
        title: 'Permit required?',
        subtitle: 'Some municipalities require permits for fencing.',
        type: 'boolean',
        required: true,
      },
    ],
    stepLabels: ['Material', 'Length', 'Gates', 'Double Gates', 'Demo', 'Permit'],
    compute: (s) =>
      calcFence({
        material: str(s, 'material', 'wood') as 'wood' | 'vinyl' | 'aluminum' | 'chain-link',
        totalLength: num(s, 'totalLength'), gates: num(s, 'gates'), doubleGates: num(s, 'doubleGates'),
        demolition: bool(s, 'demolition'), existingLength: num(s, 'existingLength'), permit: permitIncluded(s),
      }),
    timeline: (s) => {
      const len = num(s, 'totalLength');
      const base = Math.max(1, Math.ceil(len / 100));
      const max = Math.min(base + 3, 8);
      return fmtRange(base, max);
    },
    summary: (s) => {
      const items: string[] = [];
      const mat = str(s, 'material');
      if (mat) items.push(humanizeMaterial(mat) + ' Fencing');
      if (num(s, 'totalLength') > 0) items.push(`${num(s, 'totalLength')} ln ft of fence`);
      if (num(s, 'gates') > 0) items.push(`${num(s, 'gates')} single gate${num(s, 'gates') > 1 ? 's' : ''}`);
      if (num(s, 'doubleGates') > 0) items.push(`${num(s, 'doubleGates')} double gate${num(s, 'doubleGates') > 1 ? 's' : ''}`);
      items.push(...baseItems(s));
      return items;
    },
  },
  {
    id: 'kitchen',
    name: 'Kitchen Remodel Calculator',
    shortName: 'Kitchen',
    icon: ChefHat,
    description: 'Scope your kitchen renovation with finish tiers and upgrades.',
    category: 'Interior',
    steps: [
      {
        id: 'tier',
        title: 'What level of finishes are you looking for?',
        subtitle: 'Your finish level drives cabinetry, countertops, and fixture quality.',
        help: 'Essential = stock cabinets + laminate. Elevated = semi-custom + quartz. Premium = custom cabinetry + luxury finishes.',
        type: 'choice',
        required: true,
        options: [
          { value: 'basic', label: 'Essential', sub: 'Stock cabinets, laminate counters' },
          { value: 'mid', label: 'Mid-range', sub: 'Semi-custom cabinets, quartz counters' },
          { value: 'high', label: 'Premium', sub: 'Custom cabinetry, premium stone' },
        ],
      },
      {
        id: 'dimensions',
        title: 'How big is your kitchen?',
        subtitle: 'Enter the length and width of your kitchen.',
        type: 'measurement',
        required: true,
      },
      {
        id: 'upgrades',
        title: 'Upgrades',
        subtitle: 'Select the features you want included.',
        type: 'multi',
        options: [
          { value: 'island', label: 'Kitchen island' },
          { value: 'pantry', label: 'Walk-in pantry' },
          { value: 'newAppliances', label: 'New appliances' },
        ],
      },
      {
        id: 'demolition',
        title: 'Full demolition needed?',
        subtitle: 'Removing existing cabinets, counters, and flooring.',
        type: 'boolean',
        required: true,
      },
      {
        id: 'permit',
        title: 'Permit required?',
        subtitle: 'Typically needed for electrical or plumbing changes.',
        type: 'boolean',
        required: true,
      },
    ],
    stepLabels: ['Finish', 'Size', 'Upgrades', 'Demo', 'Permit'],
    compute: (s) => {
      const d = dimensions(s);
      const u = arr(s, 'upgrades');
      return calcKitchen({
        tier: str(s, 'tier', 'mid') as 'basic' | 'mid' | 'high',
        sqft: d.sqft,
        island: u.includes('island'),
        pantry: u.includes('pantry'),
        newAppliances: u.includes('newAppliances'),
        demolition: bool(s, 'demolition'), permit: permitIncluded(s),
      });
    },
    timeline: (s) => {
      const sqft = dimensions(s).sqft;
      const base = Math.max(7, Math.ceil(sqft / 30));
      const max = Math.min(base + 14, 35);
      return fmtRange(base, max);
    },
    summary: (s) => {
      const items: string[] = [];
      const tier = str(s, 'tier');
      if (tier) items.push(humanizeTier(tier) + ' finish');
      const sq = sqftLabel(s);
      if (sq) items.push(`${sq} kitchen`);
      for (const f of arr(s, 'upgrades')) items.push(humanizeFeature(f));
      items.push(...baseItems(s));
      return items;
    },
  },
  {
    id: 'bathroom',
    name: 'Bathroom Remodel Calculator',
    shortName: 'Bathroom',
    icon: Bath,
    description: 'Plan your bathroom renovation with fixture and finish options.',
    category: 'Interior',
    steps: [
      {
        id: 'tier',
        title: 'What level of finishes are you considering?',
        subtitle: 'Drives tile, vanity, and fixture quality.',
        help: 'Essential = standard fixtures + basic tile. Elevated = upgraded fixtures + natural stone. Premium = luxury fixtures + custom tilework.',
        type: 'choice',
        required: true,
        options: [
          { value: 'basic', label: 'Essential', sub: 'Standard fixtures, basic tile' },
          { value: 'mid', label: 'Mid-range', sub: 'Upgraded fixtures, porcelain tile' },
          { value: 'high', label: 'Premium', sub: 'Luxury fixtures, natural stone' },
        ],
      },
      {
        id: 'dimensions',
        title: 'How large is the bathroom?',
        subtitle: 'Enter the length and width of your bathroom.',
        type: 'measurement',
        required: true,
      },
      {
        id: 'upgrades',
        title: 'Upgrades',
        subtitle: 'Select the features you want included.',
        type: 'multi',
        options: [
          { value: 'newTub', label: 'New soaking tub' },
          { value: 'walkInShower', label: 'Walk-in shower' },
          { value: 'doubleVanity', label: 'Double vanity' },
          { value: 'heatedFloor', label: 'Radiant floor heating' },
        ],
      },
      {
        id: 'demolition',
        title: 'Full demolition needed?',
        subtitle: 'Removing existing fixtures, tile, and vanity.',
        type: 'boolean',
        required: true,
      },
      {
        id: 'permit',
        title: 'Permit required?',
        subtitle: 'Usually required for plumbing changes.',
        type: 'boolean',
        required: true,
      },
    ],
    stepLabels: ['Finish', 'Size', 'Upgrades', 'Demo', 'Permit'],
    compute: (s) => {
      const d = dimensions(s);
      const u = arr(s, 'upgrades');
      return calcBathroom({
        tier: str(s, 'tier', 'mid') as 'basic' | 'mid' | 'high',
        sqft: d.sqft,
        newTub: u.includes('newTub'),
        walkInShower: u.includes('walkInShower'),
        doubleVanity: u.includes('doubleVanity'),
        heatedFloor: u.includes('heatedFloor'),
        demolition: bool(s, 'demolition'), permit: permitIncluded(s),
      });
    },
    timeline: (s) => {
      const sqft = dimensions(s).sqft;
      const base = Math.max(4, Math.ceil(sqft / 25));
      const max = Math.min(base + 10, 21);
      return fmtRange(base, max);
    },
    summary: (s) => {
      const items: string[] = [];
      const tier = str(s, 'tier');
      if (tier) items.push(humanizeTier(tier) + ' finish');
      const sq = sqftLabel(s);
      if (sq) items.push(`${sq} bathroom`);
      for (const f of arr(s, 'upgrades')) items.push(humanizeFeature(f));
      items.push(...baseItems(s));
      return items;
    },
  },
  {
    id: 'ramp',
    name: 'Accessibility Ramp Calculator',
    shortName: 'Ramp',
    icon: PersonStanding,
    description: 'Design a safe, code-compliant accessibility ramp.',
    category: 'Accessibility',
    steps: [
      {
        id: 'length',
        title: 'Ramp length',
        subtitle: 'Total linear feet of the ramp run.',
        type: 'number',
        unit: 'ln ft',
        min: 4, max: 60, required: true, placeholder: '16',
      },
      {
        id: 'landings',
        title: 'Number of landings',
        subtitle: 'Rest platforms. Required every 12 ft of run.',
        type: 'number',
        unit: 'landings',
        min: 0, max: 6, required: true, placeholder: '1',
      },
      {
        id: 'handrailLength',
        title: 'Handrail length',
        subtitle: 'Total linear feet of handrails (both sides).',
        type: 'number',
        unit: 'ln ft',
        min: 0, max: 120, required: true, placeholder: '32',
      },
      {
        id: 'permit',
        title: 'Permit required?',
        subtitle: 'Most ramp projects require a building permit.',
        type: 'boolean',
        required: true,
      },
    ],
    stepLabels: ['Length', 'Landings', 'Handrails', 'Permit'],
    compute: (s) =>
      calcRamp({
        length: num(s, 'length'), landings: num(s, 'landings'),
        handrailLength: num(s, 'handrailLength'), permit: permitIncluded(s),
      }),
    timeline: (s) => {
      const len = num(s, 'length');
      const base = Math.max(1, Math.ceil(len / 20));
      const max = Math.min(base + 2, 5);
      return fmtRange(base, max);
    },
    summary: (s) => {
      const items: string[] = [];
      if (num(s, 'length') > 0) items.push(`${num(s, 'length')} ln ft ramp run`);
      if (num(s, 'landings') > 0) items.push(`${num(s, 'landings')} landing${num(s, 'landings') > 1 ? 's' : ''}`);
      if (num(s, 'handrailLength') > 0) items.push(`${num(s, 'handrailLength')} ln ft of handrails`);
      if (permitIncluded(s)) items.push('Permit included (est.)');
      return items;
    },
  },
  {
    id: 'accessibility-mod',
    name: 'Accessibility Modification Calculator',
    shortName: 'Accessibility Mods',
    icon: Accessibility,
    description: 'Estimate grab bars, threshold ramps, and door widening.',
    category: 'Accessibility',
    steps: [
      {
        id: 'mods',
        title: 'Which modifications do you need?',
        subtitle: 'Select all that apply.',
        type: 'multi',
        required: true,
        options: [
          { value: 'thresholdRamps', label: 'Threshold ramps' },
          { value: 'grabBars', label: 'Grab bar installation' },
          { value: 'doorsWidened', label: 'Door widening' },
        ],
      },
      {
        id: 'thresholdCount',
        title: 'Number of threshold ramps',
        subtitle: 'How many door thresholds need ramps?',
        type: 'number',
        unit: 'ramps',
        min: 0, max: 10, placeholder: '2',
        showIf: (s) => arr(s, 'mods').includes('thresholdRamps'),
      },
      {
        id: 'grabBarCount',
        title: 'Number of grab bars',
        subtitle: 'Individual grab bars to install.',
        type: 'number',
        unit: 'bars',
        min: 0, max: 20, placeholder: '4',
        showIf: (s) => arr(s, 'mods').includes('grabBars'),
      },
      {
        id: 'doorCount',
        title: 'Number of doors to widen',
        subtitle: 'Doorways that need widening for wheelchair access.',
        type: 'number',
        unit: 'doors',
        min: 0, max: 10, placeholder: '1',
        showIf: (s) => arr(s, 'mods').includes('doorsWidened'),
      },
      {
        id: 'permit',
        title: 'Permit required?',
        subtitle: 'Door widening may trigger a permit depending on scope.',
        type: 'boolean',
        required: true,
      },
    ],
    stepLabels: ['Modifications', 'Details', 'Permit'],
    compute: (s) => {
      const mods = arr(s, 'mods');
      return calcAccessibilityMod({
        thresholdRamps: mods.includes('thresholdRamps') ? num(s, 'thresholdCount') : 0,
        grabBars: mods.includes('grabBars') ? num(s, 'grabBarCount') : 0,
        doorsWidened: mods.includes('doorsWidened') ? num(s, 'doorCount') : 0,
        permit: permitIncluded(s),
      });
    },
    timeline: () => fmtRange(1, 3),
    summary: (s) => {
      const items: string[] = [];
      for (const m of arr(s, 'mods')) items.push(humanizeFeature(m));
      if (permitIncluded(s)) items.push('Permit included (est.)');
      return items;
    },
  },
  {
    id: 'porch',
    name: 'Porch Calculator',
    shortName: 'Porch',
    icon: Home,
    description: 'Plan a new porch or rebuild an existing one.',
    category: 'Outdoor',
    steps: [
      {
        id: 'dimensions',
        title: 'How big will your porch be?',
        subtitle: 'Enter the length and width of your porch.',
        type: 'measurement',
        required: true,
      },
      {
        id: 'roofing',
        title: 'Include a roof?',
        subtitle: 'Covered porch with roofing structure.',
        type: 'boolean',
        required: true,
      },
      {
        id: 'roofingSqft',
        title: 'Roof area',
        subtitle: 'Square footage of the porch roof.',
        type: 'number',
        unit: 'sq ft',
        min: 0, max: 600, placeholder: '80',
        showIf: (s) => bool(s, 'roofing'),
      },
      {
        id: 'columns',
        title: 'Number of support columns',
        subtitle: 'Decorative or structural columns.',
        type: 'number',
        unit: 'columns',
        min: 0, max: 12, required: true, placeholder: '2',
      },
      {
        id: 'railingLength',
        title: 'Railing length',
        subtitle: 'Linear feet of porch railing. Enter 0 if none.',
        type: 'number',
        unit: 'ln ft',
        min: 0, max: 200, required: true, placeholder: '20',
      },
      {
        id: 'steps',
        title: 'Number of steps',
        subtitle: 'Individual steps leading to the porch.',
        type: 'number',
        unit: 'steps',
        min: 0, max: 20, required: true, placeholder: '3',
      },
      {
        id: 'demolition',
        title: 'Remove existing porch?',
        subtitle: 'Demolition of current structure.',
        type: 'boolean',
        required: true,
      },
      {
        id: 'existingSqft',
        title: 'Existing porch size',
        subtitle: 'Square footage to demolish.',
        type: 'number',
        unit: 'sq ft',
        min: 0, max: 600, placeholder: '80',
        showIf: (s) => bool(s, 'demolition'),
      },
      {
        id: 'permit',
        title: 'Permit required?',
        subtitle: 'Most porch structures require a permit.',
        type: 'boolean',
        required: true,
      },
    ],
    stepLabels: ['Size', 'Roof', 'Columns', 'Railings', 'Steps', 'Demo', 'Permit'],
    compute: (s) => {
      const d = dimensions(s);
      return calcPorch({
        sqft: d.sqft, roofing: bool(s, 'roofing'), roofingSqft: num(s, 'roofingSqft'),
        columns: num(s, 'columns'), railingLength: num(s, 'railingLength'),
        steps: num(s, 'steps'), demolition: bool(s, 'demolition'),
        existingSqft: num(s, 'existingSqft'), permit: permitIncluded(s),
      });
    },
    timeline: (s) => {
      const sqft = dimensions(s).sqft;
      const roofing = bool(s, 'roofing') ? 2 : 0;
      const base = Math.max(2, Math.ceil(sqft / 60) + roofing);
      const max = Math.min(base + 5, 12);
      return fmtRange(base, max);
    },
    summary: (s) => {
      const items: string[] = [];
      const sq = sqftLabel(s);
      if (sq) items.push(`${sq} porch`);
      if (bool(s, 'roofing')) items.push('Covered with roof');
      if (num(s, 'columns') > 0) items.push(`${num(s, 'columns')} column${num(s, 'columns') > 1 ? 's' : ''}`);
      if (num(s, 'railingLength') > 0) items.push(`${num(s, 'railingLength')} ln ft of railings`);
      if (num(s, 'steps') > 0) items.push(`${num(s, 'steps')} step${num(s, 'steps') > 1 ? 's' : ''}`);
      items.push(...baseItems(s));
      return items;
    },
  },
  {
    id: 'patio',
    name: 'Patio Calculator',
    shortName: 'Patio',
    icon: Trees,
    description: 'Estimate a paver, concrete, or stamped concrete patio.',
    category: 'Outdoor',
    steps: [
      {
        id: 'material',
        title: 'Patio surface',
        subtitle: 'Choose your surface material.',
        type: 'choice',
        required: true,
        options: [
          { value: 'paver', label: 'Paver stones', sub: 'Premium look, repairable' },
          { value: 'concrete', label: 'Concrete', sub: 'Durable, economical' },
          { value: 'stamped', label: 'Stamped concrete', sub: 'Decorative, textured finish' },
        ],
      },
      {
        id: 'dimensions',
        title: 'How big will your patio be?',
        subtitle: 'Enter the length and width of your patio.',
        type: 'measurement',
        required: true,
      },
      {
        id: 'features',
        title: 'Additional features',
        subtitle: 'Select any extras.',
        type: 'multi',
        options: [
          { value: 'firePit', label: 'Fire pit' },
          { value: 'seatingWall', label: 'Seating wall' },
          { value: 'lighting', label: 'Landscape lighting' },
        ],
      },
      {
        id: 'demolition',
        title: 'Remove existing surface?',
        subtitle: 'Demo of old concrete or pavers.',
        type: 'boolean',
        required: true,
      },
      {
        id: 'existingSqft',
        title: 'Existing surface size',
        subtitle: 'Square footage to remove.',
        type: 'number',
        unit: 'sq ft',
        min: 0, max: 2000, placeholder: '200',
        showIf: (s) => bool(s, 'demolition'),
      },
      {
        id: 'permit',
        title: 'Permit required?',
        subtitle: 'Some patio projects require permits depending on size.',
        type: 'boolean',
        required: true,
      },
    ],
    stepLabels: ['Material', 'Size', 'Features', 'Demo', 'Permit'],
    compute: (s) => {
      const d = dimensions(s);
      const f = arr(s, 'features');
      return calcPatio({
        material: str(s, 'material', 'paver') as 'paver' | 'concrete' | 'stamped',
        sqft: d.sqft,
        firePit: f.includes('firePit'),
        seatingWall: f.includes('seatingWall'),
        lighting: f.includes('lighting'),
        demolition: bool(s, 'demolition'), existingSqft: num(s, 'existingSqft'), permit: permitIncluded(s),
      });
    },
    timeline: (s) => {
      const sqft = dimensions(s).sqft;
      const base = Math.max(1, Math.ceil(sqft / 150));
      const max = Math.min(base + 4, 8);
      return fmtRange(base, max);
    },
    summary: (s) => {
      const items: string[] = [];
      const mat = str(s, 'material');
      if (mat) items.push(humanizeMaterial(mat) + ' Surface');
      const sq = sqftLabel(s);
      if (sq) items.push(`${sq} patio`);
      for (const f of arr(s, 'features')) items.push(humanizeFeature(f));
      items.push(...baseItems(s));
      return items;
    },
  },
  {
    id: 'general-remodel',
    name: 'General Remodeling Calculator',
    shortName: 'General Remodel',
    icon: Blocks,
    description: 'Estimate a basement, garage, or whole-room remodel.',
    category: 'Interior',
    steps: [
      {
        id: 'tier',
        title: 'What level of finishes do you want?',
        subtitle: 'Drives material quality and finish detail.',
        type: 'choice',
        required: true,
        options: [
          { value: 'low', label: 'Essential', sub: 'Basic finishes, functional space' },
          { value: 'mid', label: 'Mid-range', sub: 'Upgraded finishes, drywall, trim' },
          { value: 'high', label: 'Premium', sub: 'High-end finishes, custom details' },
        ],
      },
      {
        id: 'dimensions',
        title: 'How big is the remodel area?',
        subtitle: 'Enter the length and width of the space.',
        type: 'measurement',
        required: true,
      },
      {
        id: 'demolition',
        title: 'Demolition required?',
        subtitle: 'Tear-out of existing finishes.',
        type: 'boolean',
        required: true,
      },
      {
        id: 'permit',
        title: 'Permit required?',
        subtitle: 'Most remodels involving electrical or plumbing need permits.',
        type: 'boolean',
        required: true,
      },
    ],
    stepLabels: ['Finish', 'Size', 'Demo', 'Permit'],
    compute: (s) => {
      const d = dimensions(s);
      return calcGeneralRemodel({
        tier: str(s, 'tier', 'mid') as 'low' | 'mid' | 'high',
        sqft: d.sqft, demolition: bool(s, 'demolition'), permit: permitIncluded(s),
      });
    },
    timeline: (s) => {
      const sqft = dimensions(s).sqft;
      const base = Math.max(3, Math.ceil(sqft / 50));
      const max = Math.min(base + 14, 30);
      return fmtRange(base, max);
    },
    summary: (s) => {
      const items: string[] = [];
      const tier = str(s, 'tier');
      if (tier) items.push(humanizeTier(tier) + ' finish');
      const sq = sqftLabel(s);
      if (sq) items.push(`${sq} remodel area`);
      items.push(...baseItems(s));
      return items;
    },
  },
  {
    id: 'repair',
    name: 'Repair Project Calculator',
    shortName: 'Repairs',
    icon: Wrench,
    description: 'Estimate common home repairs from drywall to fixture swaps.',
    category: 'Repairs',
    steps: [
      {
        id: 'type',
        title: 'Repair type',
        subtitle: 'What needs fixing?',
        type: 'choice',
        required: true,
        options: [
          { value: 'drywall', label: 'Drywall repair', sub: 'Patching, replacement' },
          { value: 'flooring', label: 'Flooring repair', sub: 'Board, tile, or panel replacement' },
          { value: 'paint', label: 'Painting', sub: 'Interior or exterior' },
          { value: 'fixture', label: 'Fixture replacement', sub: 'Light, faucet, hardware' },
          { value: 'general', label: 'General handyman', sub: 'Multi-item or unclear scope' },
        ],
      },
      {
        id: 'quantity',
        title: 'Scope of work',
        subtitle: 'Enter the quantity that matches your repair type.',
        type: 'number',
        required: true,
        min: 1, max: 1000, placeholder: '4',
        unit: 'units',
      },
    ],
    stepLabels: ['Type', 'Scope'],
    compute: (s) =>
      calcRepair({
        type: str(s, 'type', 'general') as 'drywall' | 'flooring' | 'paint' | 'fixture' | 'general',
        quantity: num(s, 'quantity', 1),
      }),
    timeline: () => fmtRange(1, 3),
    summary: (s) => {
      const items: string[] = [];
      const type = str(s, 'type');
      if (type) items.push(humanizeRepairType(type));
      const qty = num(s, 'quantity');
      const unitLabel = (() => {
        switch (str(s, 'type')) {
          case 'drywall': return 'sheets';
          case 'flooring':
          case 'paint': return 'sq ft';
          case 'fixture': return 'fixtures';
          default: return 'hours';
        }
      })();
      if (qty > 0) items.push(`${qty} ${unitLabel} of work`);
      return items;
    },
  },
  {
    id: 'custom',
    name: 'Custom Project Calculator',
    shortName: 'Custom',
    icon: Sparkles,
    description: 'Have something unique in mind? Tell us about it.',
    category: 'Other',
    steps: [
      {
        id: 'projectDescription',
        title: 'Describe your project',
        subtitle: 'Tell us what you envision. The more detail, the better we can prepare.',
        type: 'textarea',
        required: true,
        placeholder: 'e.g. Built-in bookshelves flanking a fireplace with hidden storage below...',
      },
    ],
    stepLabels: ['Description'],
    compute: () => calcCustom(),
    timeline: () => fmtRange(1, 14),
    summary: (s) => {
      const desc = str(s, 'projectDescription');
      if (desc) {
        const preview = desc.length > 120 ? desc.slice(0, 120) + '…' : desc;
        return ['Custom project', preview];
      }
      return [];
    },
  },
  {
    id: 'roofing',
    name: 'Roofing Cost Calculator',
    shortName: 'Roofing',
    icon: Home,
    description: 'Estimate a roof replacement with materials and tear-off.',
    category: 'Exterior',
    steps: [
      { id: 'roofing_material', title: 'Roofing material', subtitle: 'Material drives most of the cost and lifespan.', type: 'choice', required: true, options: [
        { value: 'asphalt', label: 'Architectural asphalt', sub: 'Most common, 30-yr warranty' },
        { value: 'metal', label: 'Standing seam metal', sub: '50-yr lifespan' },
        { value: 'rubber', label: 'Rubber / EPDM', sub: 'For flat roofs' },
        { value: 'slate', label: 'Slate or tile', sub: 'Premium, 75+ yr' },
      ] },
      { id: 'roofing_sqft', title: 'Roof size', subtitle: 'Square footage of roof surface area.', type: 'number', unit: 'sq ft', min: 200, max: 10000, required: true, placeholder: '2000' },
      { id: 'roofing_tearoff', title: 'Tear off old roof?', subtitle: 'Tear-off lasts longer; overlay is cheaper.', type: 'boolean', required: true },
      { id: 'roofing_leak', title: 'Any active leaks?', subtitle: 'Helps us prioritize inspection.', type: 'boolean' },
      { id: 'roofing_gutters', title: 'New gutters?', subtitle: 'Bundling saves on labor.', type: 'boolean' },
      { id: 'permit', title: 'Permit needed?', subtitle: 'We handle the paperwork.', type: 'boolean', required: true },
    ],
    stepLabels: ['Material', 'Size', 'Tear-Off', 'Leaks', 'Gutters', 'Permit'],
    compute: (s) => calcRoofing({
      material: str(s, 'roofing_material', 'asphalt') as 'asphalt' | 'metal' | 'rubber' | 'slate',
      sqft: num(s, 'roofing_sqft'),
      tearoff: str(s, 'roofing_tearoff') === 'tearoff' || bool(s, 'roofing_tearoff') || str(s, 'roofing_layers') === '2+',
      leak: bool(s, 'roofing_leak'),
      gutters: bool(s, 'roofing_gutters'),
      gutterLnft: Math.max(80, Math.ceil(dimensions(s).sqft / 10)),
      permit: permitIncluded(s),
    }),
    timeline: (s) => {
      const sqft = num(s, 'roofing_sqft');
      const base = Math.max(2, Math.ceil(sqft / 1000));
      return fmtRange(base, Math.min(base + 4, 14));
    },
    summary: (s) => {
      const items: string[] = [];
      const mat = str(s, 'roofing_material');
      if (mat) items.push(humanizeMaterial(mat) + ' Roofing');
      if (num(s, 'roofing_sqft') > 0) items.push(`${num(s, 'roofing_sqft')} sq ft roof area`);
      if (bool(s, 'roofing_leak')) items.push('Leak inspection & repair');
      if (bool(s, 'roofing_gutters')) items.push('New gutters');
      items.push(...baseItems(s));
      return items;
    },
  },
  {
    id: 'siding',
    name: 'Siding Cost Calculator',
    shortName: 'Siding',
    icon: Layers,
    description: 'Estimate siding installation with materials and trim.',
    category: 'Exterior',
    steps: [
      { id: 'siding_material', title: 'Siding material', subtitle: 'Material affects cost, maintenance, and curb appeal.', type: 'choice', required: true, options: [
        { value: 'vinyl', label: 'Vinyl', sub: 'Budget-friendly, low maintenance' },
        { value: 'fiber-cement', label: 'Fiber cement (Hardie)', sub: 'Durable, wood-like look' },
        { value: 'cedar', label: 'Cedar', sub: 'Natural beauty, needs upkeep' },
        { value: 'stucco', label: 'Stucco', sub: 'Long-lasting' },
      ] },
      { id: 'siding_sqft', title: 'Wall area', subtitle: 'Square footage of exterior wall surface.', type: 'number', unit: 'sq ft', min: 200, max: 10000, required: true, placeholder: '1800' },
      { id: 'siding_insulation', title: 'Add insulated underlayment?', subtitle: 'Improves energy efficiency.', type: 'boolean' },
      { id: 'siding_trim', title: 'Replace trim and soffits?', subtitle: 'Completes the look and prevents rot.', type: 'boolean' },
      { id: 'permit', title: 'Permit needed?', subtitle: 'We handle the paperwork.', type: 'boolean', required: true },
    ],
    stepLabels: ['Material', 'Area', 'Insulation', 'Trim', 'Permit'],
    compute: (s) => calcSiding({
      material: str(s, 'siding_material', 'vinyl') as 'vinyl' | 'fiber-cement' | 'cedar' | 'stucco',
      sqft: num(s, 'siding_sqft'),
      insulation: bool(s, 'siding_insulation'),
      trim: bool(s, 'siding_trim'),
      trimLnft: Math.ceil(num(s, 'siding_sqft') / 8),
      removal: bool(s, 'siding_removal'),
      permit: permitIncluded(s),
    }),
    timeline: (s) => {
      const sqft = num(s, 'siding_sqft');
      const base = Math.max(3, Math.ceil(sqft / 500));
      return fmtRange(base, Math.min(base + 5, 18));
    },
    summary: (s) => {
      const items: string[] = [];
      const mat = str(s, 'siding_material');
      if (mat) items.push(humanizeMaterial(mat) + ' Siding');
      if (num(s, 'siding_sqft') > 0) items.push(`${num(s, 'siding_sqft')} sq ft wall area`);
      if (bool(s, 'siding_insulation')) items.push('Insulated underlayment');
      if (bool(s, 'siding_trim')) items.push('Trim & soffit replacement');
      items.push(...baseItems(s));
      return items;
    },
  },
  {
    id: 'windows',
    name: 'Window Replacement Calculator',
    shortName: 'Windows',
    icon: Square,
    description: 'Estimate window replacement with frame and glass options.',
    category: 'Exterior',
    steps: [
      { id: 'windows_count', title: 'How many windows?', subtitle: 'Count each window unit.', type: 'slider', unit: 'windows', min: 1, max: 40, required: true },
      { id: 'windows_frame', title: 'Frame material', subtitle: 'Affects energy efficiency and maintenance.', type: 'choice', required: true, options: [
        { value: 'vinyl', label: 'Vinyl', sub: 'Affordable, low maintenance' },
        { value: 'fiberglass', label: 'Fiberglass', sub: 'Stronger, paintable' },
        { value: 'wood', label: 'Wood-clad', sub: 'Premium look' },
      ] },
      { id: 'windows_glass', title: 'Glass package', subtitle: 'Double or triple pane.', type: 'choice', required: true, options: [
        { value: 'double', label: 'Double-pane, Low-E', sub: 'Standard efficient' },
        { value: 'triple', label: 'Triple-pane, Low-E', sub: 'Maximum efficiency' },
      ] },
      { id: 'windows_install_type', title: 'Install type', subtitle: 'Full-frame or insert.', type: 'choice', required: true, options: [
        { value: 'full-frame', label: 'Full-frame', sub: 'Complete tear-out' },
        { value: 'insert', label: 'Insert (pocket)', sub: 'Reuse existing frame' },
      ] },
      { id: 'windows_rot', title: 'Any rot around frames?', subtitle: 'May require full-frame replacement.', type: 'boolean' },
      { id: 'permit', title: 'Permit needed?', subtitle: 'We handle the paperwork.', type: 'boolean', required: true },
    ],
    stepLabels: ['Count', 'Frame', 'Glass', 'Install', 'Rot', 'Permit'],
    compute: (s) => calcWindows({
      count: num(s, 'windows_count', 1),
      frame: str(s, 'windows_frame', 'vinyl') as 'vinyl' | 'fiberglass' | 'wood',
      glass: str(s, 'windows_glass', 'double') as 'double' | 'triple',
      installType: str(s, 'windows_install_type', 'insert') as 'full-frame' | 'insert',
      rot: bool(s, 'windows_rot'),
      permit: permitIncluded(s),
    }),
    timeline: (s) => {
      const count = num(s, 'windows_count', 1);
      const base = Math.max(1, Math.ceil(count / 4));
      return fmtRange(base, Math.min(base + 3, 10));
    },
    summary: (s) => {
      const items: string[] = [];
      const count = num(s, 'windows_count', 0);
      if (count > 0) items.push(`${count} window${count > 1 ? 's' : ''}`);
      const frame = str(s, 'windows_frame');
      if (frame) items.push(humanizeMaterial(frame) + ' frames');
      const glass = str(s, 'windows_glass');
      if (glass === 'triple') items.push('Triple-pane glass');
      if (str(s, 'windows_install_type') === 'full-frame') items.push('Full-frame installation');
      if (bool(s, 'windows_rot')) items.push('Rot repair');
      items.push(...baseItems(s));
      return items;
    },
  },
];

export const calculatorMap: Record<CalculatorId, CalculatorConfig> = Object.fromEntries(
  calculators.map((c) => [c.id, c]),
) as Record<CalculatorId, CalculatorConfig>;

export function getCalculator(id: CalculatorId): CalculatorConfig {
  return calculatorMap[id];
}
