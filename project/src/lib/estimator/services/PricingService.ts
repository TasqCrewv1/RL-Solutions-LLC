import type { Answers, EstimateResult, DimensionsValue } from '../types';
import { pricingConfig } from '../config/pricing';

const fmtRegion = (region: string) => ` in ${region === 'PA' ? 'Pennsylvania' : 'Delaware'}`;

const fmtFeatures = (features: string[] | undefined): string => {
  if (!features || features.length === 0) return 'no extra features selected';
  return `with ${features.join(', ')}`;
};

function isDimensions(v: unknown): v is DimensionsValue {
  return typeof v === 'object' && v !== null && 'lengthFt' in v && 'widthFt' in v;
}

function dimensionsToSqFt(d: DimensionsValue): number {
  const lengthFt = d.lengthFt + d.lengthIn / 12;
  const widthFt = d.widthFt + d.widthIn / 12;
  return Math.round(lengthFt * widthFt * 100) / 100;
}

function resolveMaterial(answers: Answers): { key: string; label: string } {
  const pt = (answers.projectType as string) ?? '';
  const matKeys: Record<string, string> = {
    deck: 'deckMaterial',
    fence: 'fenceMaterial',
    kitchen: 'kitchenMaterial',
    bathroom: 'bathroomMaterial',
    accessibility: 'accessibilityMaterial',
    'accessibility-mod': 'accessibilityMaterial',
    ramp: 'accessibilityMaterial',
    porch: 'porchMaterial',
    patio: 'patioMaterial',
    'general-remodel': 'remodelTier',
    repair: 'repairType',
    roofing: 'roofingMaterial',
    siding: 'sidingMaterial',
    windows: 'windowsFrame',
    custom: '',
  };
  const key = matKeys[pt] ? ((answers[matKeys[pt]] as string) ?? 'standard') : 'standard';
  const labels: Record<string, string> = {
    'pressure-treated': 'pressure-treated wood', cedar: 'cedar', composite: 'composite',
    pvc: 'PVC', 'exotic-hardwood': 'exotic hardwood', vinyl: 'vinyl', aluminum: 'aluminum',
    'chain-link': 'chain link', 'wrought-iron': 'wrought iron',
    'stock-laminate': 'stock cabinets + laminate', 'semi-custom-quartz': 'semi-custom + quartz',
    'custom-quartz': 'custom + quartz', 'custom-marble': 'custom + marble',
    'standard-tile': 'standard tile + fixtures', 'upgraded-tile': 'upgraded tile + fixtures',
    'premium-tile': 'premium tile + fixtures', 'luxury-tile': 'luxury tile + fixtures',
    'wood-ramp': 'wood ramp', 'aluminum-ramp': 'aluminum ramp', 'concrete-ramp': 'concrete ramp',
    'grab-bars-only': 'grab bars / door widening',
    'porch-basic': 'open porch', 'porch-screened': 'screened porch', 'porch-covered': 'covered porch',
    paver: 'paver stones', concrete: 'concrete', stamped: 'stamped concrete',
    'remodel-essential': 'essential finishes', 'remodel-mid': 'mid-range finishes', 'remodel-premium': 'premium finishes',
    drywall: 'drywall repair', flooring: 'flooring repair', paint: 'painting', fixture: 'fixture replacement', general: 'general handyman',
    asphalt: 'asphalt roofing', metal: 'metal roofing', rubber: 'rubber roofing', slate: 'slate roofing',
    'vinyl-siding': 'vinyl siding', 'fiber-cement': 'fiber cement siding', 'cedar-siding': 'cedar siding', stucco: 'stucco siding',
    'wood-clad': 'wood-clad frames', fiberglass: 'fiberglass frames',
  };
  return { key, label: labels[key] ?? key };
}

export function calculateEstimate(answers: Answers): EstimateResult {
  const projectType = (answers.projectType as string) ?? '';
  const region = (answers.region as string) ?? 'DE';
  const { key: materialKey, label: materialLabel } = resolveMaterial(answers);
  const size = isDimensions(answers.dimensions) ? dimensionsToSqFt(answers.dimensions) : 0;

  const featureKeys = ['deckFeatures', 'fenceFeatures', 'kitchenScope', 'bathroomScope', 'accessibilityScope', 'porchFeatures', 'patioFeatures', 'remodelScope', 'roofingFeatures', 'sidingFeatures'];
  let features: string[] = [];
  for (const k of featureKeys) {
    if (Array.isArray(answers[k])) features = [...features, ...(answers[k] as string[])];
  }
  if (answers.demolition === true) features = [...features, 'demolition'];

  const regionMult = pricingConfig.regionalMultipliers[region] ?? 1.0;
  const materialMult = pricingConfig.materialMultipliers[materialKey] ?? pricingConfig.materialMultipliers.standard;

  // Collect project-specific detail answers as complexity features
  const detailKeys: Record<string, string[]> = {
    deck: ['deckHeight', 'deckAttachment'],
    fence: ['fenceHeight', 'fenceLayout', 'fenceGates'],
    kitchen: ['kitchenLayoutChange', 'kitchenAppliances'],
    bathroom: ['bathroomType', 'bathroomShowerType', 'bathroomPlumbingMove'],
    ramp: ['rampUserType', 'rampEntryLocation'],
    porch: ['porchHeight'],
    patio: ['patioBaseCondition', 'patioDrainage'],
    'general-remodel': ['remodelRoomType', 'remodelElectrical'],
    repair: ['repairUrgency'],
    roofing: ['roofingPitch', 'roofingLayers', 'roofingAge'],
    siding: ['sidingStories', 'sidingCurrentCondition'],
    windows: ['windowRot', 'windowsInstallType'],
  };
  const ptDetails = detailKeys[projectType] ?? [];
  for (const dk of ptDetails) {
    const val = answers[dk];
    if (typeof val === 'string' && val) features = [...features, `${dk}:${val}`];
  }
  // Normalize detail values into complexity multiplier keys
  const detailFeatureKeys: Record<string, string> = {
    'deckHeight:high': 'deck-high',
    'deckHeight:ground-level': 'deck-ground-level',
    'deckAttachment:freestanding': 'deck-freestanding',
    'fenceHeight:8ft': 'fence-8ft',
    'fenceLayout:slope': 'fence-slope',
    'fenceLayout:mixed': 'fence-mixed',
    'fenceGates:double-only': 'double-gate',
    'fenceGates:both': 'double-gate',
    'kitchenLayoutChange:major': 'kitchen-major-change',
    'kitchenAppliances:replace-premium': 'kitchen-replace-premium',
    'bathroomType:master': 'bathroom-master',
    'bathroomShowerType:walk-in-shower': 'bathroom-walk-in-shower',
    'bathroomShowerType:soaking-tub': 'bathroom-soaking-tub',
    'bathroomShowerType:roll-in': 'bathroom-roll-in',
    'bathroomPlumbingMove:major-move': 'bathroom-major-move',
    'rampUserType:wheelchair': 'ramp-wheelchair',
    'rampEntryLocation:back-door': 'ramp-back-door',
    'patioBaseCondition:old-surface': 'patio-old-surface',
    'patioDrainage:some': 'patio-some-drainage',
    'patioDrainage:significant': 'patia-significant-drainage',
    'remodelRoomType:basement': 'remodel-basement',
    'remodelRoomType:garage': 'remodel-garage',
    'remodelRoomType:whole-floor': 'remodel-whole-floor',
    'remodelElectrical:major': 'remodel-major',
    'repairUrgency:emergency': 'repair-emergency',
    'roofingPitch:steep': 'roofing-steep',
    'roofingLayers:2-plus': 'roofing-2-plus',
    'roofingAge:old': 'roofing-old',
    'sidingStories:2': 'siding-2',
    'sidingStories:3-plus': 'siding-3-plus',
    'sidingCurrentCondition:damaged': 'siding-damaged',
    'windowRot:some': 'window-some-rot',
    'windowsInstallType:full-frame': 'window-full-frame',
  };
  for (const f of features) {
    const mapped = detailFeatureKeys[f];
    if (mapped) features = [...features, mapped];
  }

  // Windows: count-based pricing (not sqft)
  if (projectType === 'windows') {
    const count = typeof answers.windowsCount === 'number' ? answers.windowsCount : 0;
    if (count <= 0) return emptyEstimate(projectType, region, materialLabel, features);
    const perWindow = 650 * materialMult * regionMult;
    const installMult = (answers.windowsInstallType as string) === 'full-frame' ? 1.25 : 1.0;
    const glassMult = (answers.windowsGlass as string) === 'triple' ? 1.4 : 1.0;
    const subtotal = count * perWindow * installMult * glassMult;
    const confidence = computeConfidence(count, materialKey, features, projectType, answers);
    const spread = subtotal * confidence.rangePercent;
    const labor = count * 150 * regionMult;
    const materials = subtotal - labor;
    return {
      costRange: { low: Math.round(subtotal - spread), high: Math.round(subtotal + spread), mid: Math.round(subtotal) },
      breakdown: { labor: Math.round(labor), materials: Math.round(materials), other: 0 },
      labor: { low: Math.round(labor * 0.9), high: Math.round(labor * 1.1) },
      materials: { low: Math.round(materials * 0.9), high: Math.round(materials * 1.15) },
      other: { low: 0, high: 0 },
      timeline: { lowWeeks: Math.max(1, Math.ceil(count / 4)), highWeeks: Math.min(Math.ceil(count / 4) + 3, 10), lowDays: Math.max(1, Math.ceil(count / 2)), highDays: Math.ceil(count / 2) + 5 },
      complexity: computeComplexity(features, count, materialKey, answers),
      confidence: { ...confidence, description: confidenceDescription(confidence.level) },
      unknowns: collectUnknowns(answers, count),
      assumptions: collectAssumptions(count, materialLabel, region, features, answers),
      calculationBasis: `Based on ${count} windows, ${materialLabel}${fmtRegion(region)}. ${fmtFeatures(features)}.`,
    };
  }

  // Custom: placeholder range based on description
  if (projectType === 'custom') {
    const desc = typeof answers.customDescription === 'string' ? answers.customDescription : '';
    if (!desc) return emptyEstimate(projectType, region, materialLabel, features);
    const confidence = computeConfidence(1, materialKey, features, projectType, answers);
    const mid = 5000 * regionMult;
    const spread = mid * confidence.rangePercent;
    return {
      costRange: { low: Math.round(mid - spread), high: Math.round(mid + spread), mid: Math.round(mid) },
      breakdown: { labor: 2000, materials: 2500, other: 500 },
      labor: { low: 1800, high: 2400 },
      materials: { low: 2250, high: 3000 },
      other: { low: 400, high: 700 },
      timeline: { lowWeeks: 1, highWeeks: 2, lowDays: 3, highDays: 14 },
      complexity: { level: 'complex', score: 3 },
      confidence: { ...confidence, description: confidenceDescription(confidence.level) },
      unknowns: ['Project scope needs detailed discussion', 'Materials not yet specified'],
      assumptions: collectAssumptions(0, materialLabel, region, features, answers),
      calculationBasis: `Custom project — placeholder range pending detailed scope review${fmtRegion(region)}.`,
    };
  }

  const base = pricingConfig.baseCosts[projectType];
  if (!base || size <= 0) {
    return emptyEstimate(projectType, region, materialLabel, features);
  }

  let complexityMult = 1.0;
  for (const f of features) {
    complexityMult *= pricingConfig.complexityMultipliers[f] ?? 1.0;
  }

  const siteAccess = (answers.siteAccess as string) ?? 'easy';
  const siteMult = pricingConfig.siteAccessMultipliers[siteAccess] ?? 1.0;
  complexityMult *= siteMult;

  const condition = (answers.existingCondition as string) ?? 'good';
  const conditionMult = pricingConfig.conditionMultipliers[condition] ?? 1.0;
  complexityMult *= conditionMult;

  const labor = base.laborPerSqFt * size * regionMult * siteMult;
  const materials = base.materialPerSqFt * size * materialMult * regionMult;
  const other = base.basePerSqFt * 0.2 * size * complexityMult * conditionMult;
  const subtotal = labor + materials + other;

  const confidence = computeConfidence(size, materialKey, features, projectType, answers);
  const spread = subtotal * confidence.rangePercent;
  const low = Math.round(subtotal - spread);
  const high = Math.round(subtotal + spread);
  const mid = Math.round(subtotal);

  const timeline = computeTimeline(projectType, size, features);
  const complexity = computeComplexity(features, size, materialKey, answers);

  return {
    costRange: { low, high, mid },
    breakdown: { labor: Math.round(labor), materials: Math.round(materials), other: Math.round(other) },
    labor: { low: Math.round(labor * 0.9), high: Math.round(labor * 1.1) },
    materials: { low: Math.round(materials * 0.9), high: Math.round(materials * 1.15) },
    other: { low: Math.round(other * 0.85), high: Math.round(other * 1.2) },
    timeline,
    complexity,
    confidence: { ...confidence, description: confidenceDescription(confidence.level) },
    unknowns: collectUnknowns(answers, size),
    assumptions: collectAssumptions(size, materialLabel, region, features, answers),
    calculationBasis: `Based on ${size} sq ft, ${materialLabel}${fmtRegion(region)}. ${fmtFeatures(features)}.`,
  };
}

function emptyEstimate(
  projectType: string,
  region: string,
  materialLabel: string,
  features: string[],
): EstimateResult {
  return {
    costRange: { low: 0, high: 0, mid: 0 },
    breakdown: { labor: 0, materials: 0, other: 0 },
    labor: { low: 0, high: 0 },
    materials: { low: 0, high: 0 },
    other: { low: 0, high: 0 },
    timeline: { lowWeeks: 0, highWeeks: 0, lowDays: 0, highDays: 0 },
    complexity: { level: 'simple', score: 1 },
    confidence: { level: 'low', rangePercent: 0.5, description: confidenceDescription('low') },
    unknowns: ['Project size not provided', 'Material selection pending'],
    assumptions: [`Project type: ${projectType || 'unknown'}`, `Region: ${region}`, `Material: ${materialLabel}`],
    calculationBasis: `Awaiting project details. ${fmtFeatures(features)}.`,
  };
}

function computeConfidence(
  size: number,
  materialKey: string,
  features: string[],
  projectType: string,
  answers: Answers,
): { level: 'low' | 'medium' | 'high'; rangePercent: number } {
  let score = 0;
  if (size > 0) score += 1;
  if (materialKey && materialKey !== 'standard') score += 1;
  if (features.length > 0) score += 1;
  if (projectType) score += 1;
  if (answers.region) score += 1;
  if (answers.siteAccess) score += 1;
  if (answers.timeline) score += 1;
  if (answers.budgetRange) score += 1;
  if (score >= 7) return { level: 'high', rangePercent: 0.15 };
  if (score >= 4) return { level: 'medium', rangePercent: 0.3 };
  return { level: 'low', rangePercent: 0.5 };
}

function confidenceDescription(level: 'low' | 'medium' | 'high'): string {
  if (level === 'high') return 'High confidence — a site visit should confirm this range with minor adjustments.';
  if (level === 'medium') return 'Medium confidence — a site visit will tighten this range meaningfully.';
  return 'Low confidence — several details are unknown. A site visit is needed to firm up pricing.';
}

function computeTimeline(
  projectType: string,
  size: number,
  features: string[],
): { lowWeeks: number; highWeeks: number; lowDays: number; highDays: number } {
  const baseDays: Record<string, number> = {
    deck: Math.max(3, Math.round(size / 50)),
    fence: Math.max(2, Math.round(size / 80)),
    kitchen: Math.max(10, Math.round(size / 8)),
    bathroom: Math.max(7, Math.round(size / 10)),
    accessibility: Math.max(2, Math.round(size / 60)),
  };
  let low = baseDays[projectType] ?? 5;
  if (features.includes('demolition')) low += 2;
  if (features.includes('design')) low += 3;
  if (features.includes('wall-removal')) low += 3;
  if (features.includes('plumbing-move')) low += 2;
  if (features.includes('island')) low += 2;
  if (features.includes('multi-level')) low += 2;
  if (features.includes('double-gate')) low += 1;
  if (features.includes('ramp')) low += 2;
  if (features.includes('roll-shower')) low += 3;
  return { lowWeeks: Math.ceil(low / 5), highWeeks: Math.ceil((low + 4) / 5), lowDays: low, highDays: low + 4 };
}

function computeComplexity(
  features: string[],
  size: number,
  materialKey: string,
  answers: Answers,
): { level: 'simple' | 'moderate' | 'complex' | 'very-complex'; score: number } {
  let score = 1;
  if (features.includes('demolition')) score += 1;
  if (features.includes('design')) score += 1;
  if (features.includes('wall-removal')) score += 2;
  if (features.includes('plumbing-move')) score += 2;
  if (features.includes('island')) score += 1;
  if (features.includes('multi-level')) score += 1;
  if (features.includes('heated-floor')) score += 1;
  if (features.includes('roll-shower')) score += 1;
  if (materialKey.includes('custom') || materialKey.includes('luxury') || materialKey.includes('marble') || materialKey.includes('exotic')) score += 1;
  if (size > 500) score += 1;
  if ((answers.siteAccess as string) === 'difficult') score += 1;
  if ((answers.existingCondition as string) === 'poor') score += 1;
  const level = score >= 6 ? 'very-complex' : score >= 4 ? 'complex' : score >= 2 ? 'moderate' : 'simple';
  return { level, score };
}

function collectUnknowns(answers: Answers, size: number): string[] {
  const unknowns: string[] = [];
  if (size <= 0) unknowns.push('Exact project size');
  if (!answers.dimensions) unknowns.push('Project dimensions');
  if (!Array.isArray(answers.photos) || answers.photos.length === 0) unknowns.push('Site photos');
  if (!answers.siteAccess) unknowns.push('Site access difficulty');
  if (!answers.timeline) unknowns.push('Desired start timeline');
  return unknowns;
}

function collectAssumptions(
  size: number,
  materialLabel: string,
  region: string,
  features: string[],
  answers: Answers,
): string[] {
  return [
    `Size: ${size || 'assumed average'} sq ft`,
    `Material: ${materialLabel}`,
    `Region: ${region}`,
    `Scope: ${(answers.projectScope as string) ?? 'not specified'}`,
    `Features: ${features.length ? features.join(', ') : 'none'}`,
    `Site access: ${(answers.siteAccess as string) ?? 'assumed easy'}`,
    'Standard site conditions unless noted otherwise',
  ];
}

export const pricingService = { calculateEstimate };
