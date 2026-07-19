import type { Answers, ProjectSummary, DimensionsValue } from '../types';
import { summaryTemplates, fallbackTemplate } from '../config/summary';

function isDimensions(v: unknown): v is DimensionsValue {
  return typeof v === 'object' && v !== null && 'lengthFt' in v && 'widthFt' in v;
}

function dimensionsToSqFt(d: DimensionsValue): number {
  const lengthFt = d.lengthFt + d.lengthIn / 12;
  const widthFt = d.widthFt + d.widthIn / 12;
  return Math.round(lengthFt * widthFt * 100) / 100;
}

function resolveMaterial(answers: Answers): string {
  const pt = (answers.projectType as string) ?? '';
  const matKeys: Record<string, string> = {
    deck: 'deckMaterial', fence: 'fenceMaterial', kitchen: 'kitchenMaterial',
    bathroom: 'bathroomMaterial', accessibility: 'accessibilityMaterial',
    'accessibility-mod': 'accessibilityMaterial', ramp: 'accessibilityMaterial',
    porch: 'porchMaterial', patio: 'patioMaterial', 'general-remodel': 'remodelTier',
    repair: 'repairType', roofing: 'roofingMaterial', siding: 'sidingMaterial', windows: 'windowsFrame',
  };
  return matKeys[pt] ? ((answers[matKeys[pt]] as string) ?? 'standard') : 'standard';
}

function resolveFeatures(answers: Answers): string[] {
  const featureKeys = ['deckFeatures', 'fenceFeatures', 'kitchenScope', 'bathroomScope', 'accessibilityScope', 'porchFeatures', 'patioFeatures', 'remodelScope', 'roofingFeatures', 'sidingFeatures'];
  let features: string[] = [];
  for (const k of featureKeys) {
    if (Array.isArray(answers[k])) features = [...features, ...(answers[k] as string[])];
  }
  if (answers.demolition === true) features = [...features, 'demolition'];
  return features;
}

const detailLabelMap: Record<string, Record<string, string>> = {
  deckHeight: {
    'ground-level': 'Ground-level deck (under 30")',
    low: 'Low deck (30"–48")',
    mid: 'Elevated deck (48"–96")',
    high: 'High deck (over 96")',
  },
  deckAttachment: {
    attached: 'Attached to house (ledger board)',
    freestanding: 'Freestanding',
    'not-sure': 'Attachment TBD',
  },
  kitchenLayoutChange: {
    same: 'Same layout',
    minor: 'Minor layout changes',
    major: 'Major reconfiguration',
  },
  kitchenAppliances: {
    keep: 'Keeping existing appliances',
    'replace-standard': 'Replacing with standard appliances',
    'replace-premium': 'Replacing with premium appliances',
    'not-sure': 'Appliances TBD',
  },
  bathroomType: {
    full: 'Full bath',
    half: 'Half bath / powder room',
    master: 'Master bath',
  },
  bathroomShowerType: {
    'tub-shower-combo': 'Tub/shower combo',
    'walk-in-shower': 'Walk-in shower',
    'soaking-tub': 'Soaking / freestanding tub',
    'roll-in': 'Roll-in (curbless) shower',
  },
  bathroomPlumbingMove: {
    'no-move': 'Plumbing stays in place',
    'minor-move': 'Minor plumbing moves',
    'major-move': 'Major plumbing relocation',
  },
  rampRise: {},
  rampUserType: {
    wheelchair: 'Wheelchair user (ADA 1:12 slope)',
    walker: 'Walker / cane user',
    both: 'Multiple users',
  },
  rampEntryLocation: {
    'front-door': 'Ramp to front door',
    'back-door': 'Ramp to back / side door',
    garage: 'Ramp to garage',
    'porch-deck': 'Ramp to porch or deck',
  },
  porchHeight: {
    'ground-level': 'Ground-level porch',
    low: 'Low porch (12"–36")',
    elevated: 'Elevated porch (over 36")',
  },
  patioBaseCondition: {
    lawn: 'Lawn / grass base (needs excavation)',
    'bare-soil': 'Bare soil base',
    'old-surface': 'Existing surface to remove',
  },
  patioDrainage: {
    none: 'No drainage concerns',
    some: 'Some drainage concerns',
    significant: 'Significant drainage issues',
    'not-sure': 'Drainage TBD',
  },
  remodelRoomType: {
    basement: 'Basement remodel',
    garage: 'Garage remodel',
    bedroom: 'Bedroom remodel',
    'living-room': 'Living room remodel',
    'dining-room': 'Dining room remodel',
    office: 'Home office remodel',
    'whole-floor': 'Whole-floor remodel',
    other: 'Other remodel',
  },
  remodelElectrical: {
    no: 'No electrical work',
    minor: 'Minor electrical updates',
    major: 'Major electrical update',
    'not-sure': 'Electrical TBD',
  },
  repairUrgency: {
    emergency: 'Emergency repair',
    soon: 'Needs attention soon',
    planning: 'Planning ahead',
  },
  roofingPitch: {
    flat: 'Flat / low-slope roof',
    standard: 'Standard pitch roof',
    steep: 'Steep pitch roof',
    'not-sure': 'Pitch TBD',
  },
  roofingLayers: {
    '1': 'One existing layer',
    '2-plus': 'Two or more layers (tear-off required)',
    none: 'New construction',
    'not-sure': 'Layers TBD',
  },
  roofingAge: {
    new: 'Roof under 10 years',
    aging: 'Roof 10–20 years',
    old: 'Roof over 20 years',
    'not-sure': 'Roof age TBD',
  },
  sidingStories: {
    '1': 'Single story',
    '2': 'Two stories',
    '3-plus': 'Three or more stories',
  },
  sidingCurrentCondition: {
    good: 'Good condition — remove and replace',
    damaged: 'Damaged — possible rot/water issues',
    none: 'New construction',
    'not-sure': 'Condition TBD',
  },
  fenceHeight: { '4ft': '4 ft tall', '6ft': '6 ft tall', '8ft': '8 ft tall' },
  fenceLayout: {
    flat: 'Flat, level terrain',
    slope: 'Sloped / uneven terrain',
    mixed: 'Mixed terrain',
  },
  fenceGates: {
    none: 'No gates',
    'walk-only': 'Walk gates',
    'double-only': 'Double drive gates',
    both: 'Walk and drive gates',
  },
};

function resolveProjectDetails(answers: Answers): string[] {
  const out: string[] = [];
  for (const [key, labelMap] of Object.entries(detailLabelMap)) {
    const val = answers[key];
    if (typeof val === 'string' && val) {
      if (key === 'rampRise') {
        out.push(`${val} inches of rise to entry`);
      } else if (labelMap[val]) {
        out.push(labelMap[val]);
      }
    }
  }
  // Numeric measurements specific to project types
  const nums: Record<string, { key: string; label: string }> = {
    deck: { key: 'deckRailingLength', label: 'railing' },
    fence: { key: 'fenceLength', label: 'fence length' },
    porch: { key: 'porchColumns', label: 'columns' },
  };
  const pt = (answers.projectType as string) ?? '';
  if (nums[pt]) {
    const v = answers[nums[pt].key];
    if (typeof v === 'number' && v > 0) out.push(`${v} ${nums[pt].label}`);
  }
  // Checkbox-location detail groups
  const locKeys: Record<string, { key: string; label: string }> = {
    'accessibility-mod': { key: 'accessModLocation', label: 'Modification locations' },
    repair: { key: 'repairLocation', label: 'Repair locations' },
    windows: { key: 'windowStyles', label: 'Window styles' },
  };
  if (locKeys[pt]) {
    const arr = answers[locKeys[pt].key];
    if (Array.isArray(arr) && arr.length) out.push(`${locKeys[pt].label}: ${arr.join(', ')}`);
  }
  return out;
}

export function generateSummary(answers: Answers): ProjectSummary {
  const projectType = (answers.projectType as string) ?? 'unknown';
  const template = summaryTemplates[projectType] ?? fallbackTemplate;

  const size = isDimensions(answers.dimensions)
    ? String(dimensionsToSqFt(answers.dimensions))
    : 'unknown';
  const material = resolveMaterial(answers);
  const region = answers.region === 'PA' ? ' in Pennsylvania' : answers.region === 'DE' ? ' in Delaware' : '';
  const features = resolveFeatures(answers);
  const featuresStr = features.length ? `with ${features.join(', ')}` : 'no extra features';
  const details = resolveProjectDetails(answers);
  const detailsStr = details.length ? ` Project specifics: ${details.join('; ')}.` : '';

  const summary = (template.summary
    .replace('{size}', size)
    .replace('{material}', material)
    .replace('{region}', region)
    .replace('{features}', featuresStr)) + detailsStr;

  const missingInfo: string[] = [];
  if (!answers.dimensions) missingInfo.push('Project dimensions');
  if (!resolveMaterial(answers) || resolveMaterial(answers) === 'standard') missingInfo.push('Material preference');
  if (!answers.region) missingInfo.push('Project region');
  if (!Array.isArray(answers.photos) || (answers.photos as unknown[]).length === 0) {
    missingInfo.push('Photos of existing space');
  }
  if (!answers.siteAccess) missingInfo.push('Site access details');
  if (!answers.contactName) missingInfo.push('Contact name');
  if (!answers.contactEmail) missingInfo.push('Contact email');

  return {
    summary,
    nextSteps: template.nextSteps,
    concerns: template.concerns,
    missingInfo,
  };
}

export const summaryService = { generateSummary };
