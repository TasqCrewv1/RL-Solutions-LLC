export interface SummaryTemplate {
  summary: string;
  nextSteps: string[];
  concerns: string[];
}

export const summaryTemplates: Record<string, SummaryTemplate> = {
  deck: {
    summary:
      'A {size} sq ft {material} deck{region}. {features}. This estimate covers labor, materials, and typical site prep.',
    nextSteps: [
      'Schedule a site visit to confirm footing requirements',
      'Finalize railing and stair design',
      'Pull permits if required by your township',
    ],
    concerns: [
      'Ground slope and soil type can affect footing cost',
      'Railing height requirements vary by jurisdiction',
    ],
  },
  fence: {
    summary:
      'A {size} linear ft {material} fence{region}. {features}. Includes posts, panels, and installation.',
    nextSteps: [
      'Verify property lines and utility easements',
      'Confirm post depth for your soil type',
      'Check HOA restrictions on height and style',
    ],
    concerns: [
      'Underground utilities must be marked before digging',
      'Frost line depth affects post longevity',
    ],
  },
  kitchen: {
    summary:
      'A {size} sq ft {material} kitchen remodel{region}. {features}. Includes cabinetry, counters, labor, and finish work.',
    nextSteps: [
      'Finalize cabinet layout and appliance selections',
      'Confirm plumbing and electrical rough-in locations',
      'Plan a temporary kitchen during construction',
    ],
    concerns: [
      'Hidden water damage behind old cabinets is common',
      'Load-bearing wall removal needs engineering sign-off',
    ],
  },
  bathroom: {
    summary:
      'A {size} sq ft {material} bathroom remodel{region}. {features}. Includes fixtures, tile, plumbing, and finish work.',
    nextSteps: [
      'Select fixtures, tile, and vanity before demolition',
      'Confirm waterproofing method for shower area',
      'Verify vent fan capacity for the room size',
    ],
    concerns: [
      'Subfloor damage is common around old toilets',
      'Poor ventilation leads to future mold issues',
    ],
  },
  accessibility: {
    summary:
      'A {size} sq ft {material} accessibility modification{region}. {features}. Includes ramp or grab-bar install and layout adjustments.',
    nextSteps: [
      'Confirm ADA slope and landing requirements',
      'Verify doorway widths for wheelchair access',
      'Plan grab-bar placement with the user',
    ],
    concerns: [
      'Threshold transitions must be flush',
      'Ramp slope above 1:12 is not ADA compliant',
    ],
  },
};

export const fallbackTemplate: SummaryTemplate = {
  summary:
    'A {size} sq ft {material} project{region}. {features}. This estimate covers labor and materials.',
  nextSteps: ['Schedule a site visit to confirm scope and access'],
  concerns: ['Final pricing depends on on-site conditions'],
};

summaryTemplates['ramp'] = {
  summary: 'A {material} accessibility ramp{region}. {features}. Code-compliant design with proper slope and landings.',
  nextSteps: ['Schedule a site visit to measure the rise and confirm landing placement'],
  concerns: ['Permit requirements vary by municipality', 'Ramp slope must meet ADA guidelines'],
};
summaryTemplates['accessibility-mod'] = {
  summary: 'Accessibility modifications{region} using {material}. {features}. Designed for safe, independent living.',
  nextSteps: ['Schedule a site visit to assess current doorways and thresholds'],
  concerns: ['Exact placement confirmed during site visit'],
};
summaryTemplates['porch'] = {
  summary: 'A {size} sq ft {material}{region}. {features}. Built to last with proper footings and drainage.',
  nextSteps: ['Schedule a site visit to confirm footing depth and access'],
  concerns: ['Roof tie-in details confirmed on site'],
};
summaryTemplates['patio'] = {
  summary: 'A {size} sq ft {material} patio{region}. {features}. Proper base preparation ensures long-lasting results.',
  nextSteps: ['Schedule a site visit to check ground conditions and drainage'],
  concerns: ['Base preparation may vary with soil conditions'],
};
summaryTemplates['general-remodel'] = {
  summary: 'A {size} sq ft remodel with {material}{region}. {features}. Includes demolition, framing, and finish work.',
  nextSteps: ['Schedule a site visit to confirm scope and access'],
  concerns: ['Hidden conditions may affect final scope'],
};
summaryTemplates['repair'] = {
  summary: '{material} work{region}. {features}. Focused on restoring function and appearance.',
  nextSteps: ['Schedule a site visit to assess the full extent of the repair'],
  concerns: ['Underlying damage may be discovered once work begins'],
};
summaryTemplates['roofing'] = {
  summary: 'A {size} sq ft {material} roof{region}. {features}. Includes underlayment, flashing, and ventilation.',
  nextSteps: ['Schedule a roof inspection to confirm layers and condition'],
  concerns: ['Decking repair may be needed if rot is found'],
};
summaryTemplates['siding'] = {
  summary: '{material} on a {size} sq ft wall area{region}. {features}. Includes house wrap and flashing details.',
  nextSteps: ['Schedule a site visit to assess current siding and sheathing'],
  concerns: ['Sheathing repair may be needed if damage is found'],
};
summaryTemplates['windows'] = {
  summary: 'Window replacement{region} with {material} frames. {features}. Includes installation, trim, and disposal of old units.',
  nextSteps: ['Schedule a site visit to measure each opening and check for rot'],
  concerns: ['Rotted framing may require full-frame replacement'],
};
summaryTemplates['custom'] = {
  summary: 'A custom project{region}. {features}. We will design and build to your exact specifications.',
  nextSteps: ['Schedule a consultation to discuss your vision in detail'],
  concerns: ['Pricing depends on final design and material selections'],
};
