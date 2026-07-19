export interface SummaryTemplate {
  summary: string;
  nextSteps: string[];
  concerns: string[];
}

export const summaryTemplates: Record<string, SummaryTemplate> = {
  deck: {
    summary:
      'This project involves a {size} {material} deck{features_clause}. The client has indicated {priority} as their top priority, with a target timeline of {timeline}. Located in {region}, this estimate accounts for regional labor and material costs.',
    nextSteps: [
      'Schedule a site visit to confirm measurements, inspect the existing structure, and assess ground conditions.',
      'Review material samples with the client and confirm the chosen finish level.',
      'Verify property lines and setback requirements before finalizing the layout.',
      'Submit permit drawings and apply for the building permit if required.',
    ],
    concerns: [
      '{demolition_clause}',
      '{hoa_clause}',
      '{permit_clause}',
      'Underground utilities should be marked via 811 before any digging for footings.',
    ],
  },
  fence: {
    summary:
      'This project involves {size} of {material} fencing with {gate_count} gates. The property is in {region}, and the client wants to start {timeline}. The primary goal is {priority}.',
    nextSteps: [
      'Schedule a site visit to confirm the fence line, check for slopes, and mark gate locations.',
      'Verify property lines and any shared boundary agreements with neighbors.',
      'Confirm post material and spacing based on wind exposure and soil conditions.',
    ],
    concerns: [
      '{demolition_clause}',
      '{hoa_clause}',
      '{permit_clause}',
      'Underground utilities should be marked via 811 before drilling post holes.',
    ],
  },
  kitchen: {
    summary:
      'This project is a {tier} kitchen remodel covering approximately {size}. The client wants {features_clause} and has prioritized {priority}. Located in {region}, the project is targeting a {timeline} start.',
    nextSteps: [
      'Schedule a site visit to inspect existing plumbing, electrical, and wall conditions.',
      'Confirm cabinet layout, appliance selections, and countertop material.',
      'Order materials with adequate lead time — cabinetry can take 4–8 weeks.',
      'Plan a temporary kitchen setup for the homeowner during construction.',
    ],
    concerns: [
      '{demolition_clause}',
      '{utilities_clause}',
      '{permit_clause}',
      'Older homes may have hidden plumbing or electrical issues behind walls that increase scope.',
    ],
  },
  bathroom: {
    summary:
      'This project is a {tier} bathroom remodel of approximately {size}. The client is interested in {features_clause} and has prioritized {priority}. The property is in {region} with a {timeline} timeline.',
    nextSteps: [
      'Schedule a site visit to inspect the existing tub/shower, plumbing rough-in, and subfloor.',
      'Confirm tile selection, fixture finishes, and vanity configuration.',
      'Verify waterproofing approach for wet areas (shower walls, tub surrounds).',
    ],
    concerns: [
      '{demolition_clause}',
      '{utilities_clause}',
      '{permit_clause}',
      'Water damage or rot under existing fixtures is common and may not be visible until demolition.',
    ],
  },
  porch: {
    summary:
      'This project involves a {size} porch{roof_clause} with {columns} columns and {railing} of railing. The property is in {region}, and the client wants to start {timeline}. The primary focus is {priority}.',
    nextSteps: [
      'Schedule a site visit to confirm dimensions, entry height, and foundation requirements.',
      'Verify whether the porch roof ties into the existing house roof or stands alone.',
      'Confirm railing style and material to match the home aesthetic.',
    ],
    concerns: [
      '{demolition_clause}',
      '{hoa_clause}',
      '{permit_clause}',
      'Foundation and drainage must be evaluated to prevent settling and water pooling.',
    ],
  },
  patio: {
    summary:
      'This project involves a {size} {material} patio{features_clause}. Located in {region}, the client wants a {timeline} start and has prioritized {priority}.',
    nextSteps: [
      'Schedule a site visit to assess ground slope, soil type, and drainage patterns.',
      'Confirm base preparation approach (gravel + sand vs. concrete slab).',
      'Verify any needed grading or retaining work before installation.',
    ],
    concerns: [
      '{demolition_clause}',
      '{hoa_clause}',
      '{permit_clause}',
      'Poor drainage or soil movement can cause cracking or settling over time.',
    ],
  },
  roofing: {
    summary:
      'This project involves a {size} {material} roof replacement{tearoff_clause}. The property is in {region}, and the client wants to start {timeline}. The primary goal is {priority}.',
    nextSteps: [
      'Schedule a site visit to inspect the roof deck, flashing, and ventilation.',
      'Confirm the number of existing layers and whether a full tear-off is needed.',
      'Check for any active leaks and trace them to the source before re-roofing.',
      'Coordinate dumpster delivery and protect landscaping during tear-off.',
    ],
    concerns: [
      '{leak_clause}',
      '{layers_clause}',
      '{permit_clause}',
      'Rotting roof deck may not be visible until old shingles are removed.',
    ],
  },
  siding: {
    summary:
      'This project involves installing {material} siding on approximately {size} of wall area. The property is in {region}, and the client wants to start {timeline}. The primary focus is {priority}.',
    nextSteps: [
      'Schedule a site visit to inspect the existing exterior, sheathing, and house wrap.',
      'Confirm whether old siding needs removal or can be sided over.',
      'Check for any water damage or rot around windows, doors, and trim.',
    ],
    concerns: [
      '{removal_clause}',
      '{hoa_clause}',
      '{permit_clause}',
      'Hidden moisture damage behind existing siding may require sheathing replacement.',
    ],
  },
  windows: {
    summary:
      'This project involves replacing {size} {frame} windows with {glass} glass using {install_type} installation. The property is in {region}, and the client wants to start {timeline}. The priority is {priority}.',
    nextSteps: [
      'Schedule a site visit to measure each opening and inspect the existing frames.',
      'Confirm whether full-frame or insert replacement is appropriate for each window.',
      'Check for rot or water damage around sills and trim before ordering.',
    ],
    concerns: [
      '{rot_clause}',
      '{hoa_clause}',
      '{permit_clause}',
      'Window sizes may vary from standard — custom orders add 2–6 weeks lead time.',
    ],
  },
  ramp: {
    summary:
      'This project involves a {size} ADA-compliant wheelchair ramp with {landings} landings and {handrails} of handrails. The property is in {region}, targeting a {timeline} start.',
    nextSteps: [
      'Schedule a site visit to measure the entry height, confirm the ramp run, and check landing placement.',
      'Verify ADA slope requirements (1:12 ratio) and confirm the ramp path is clear of obstructions.',
      'Discuss material options (wood vs. composite) and weather protection.',
    ],
    concerns: [
      '{permit_clause}',
      'ADA compliance must be verified — slope, width, and handrail height are all code-specified.',
    ],
  },
  'accessibility-mod': {
    summary:
      'This project involves accessibility modifications including {features_clause}. The property is in {region}, and the client wants to start {timeline}.',
    nextSteps: [
      'Schedule a site visit to assess each doorway, bathroom, and threshold.',
      'Confirm grab bar placement and ensure wall framing can support them.',
      'Verify ADA clearances and turning radius for wheelchairs if needed.',
    ],
    concerns: [
      '{permit_clause}',
      'Grab bars require blocking in the wall — if not present, the wall must be opened.',
    ],
  },
  'general-remodel': {
    summary:
      'This project is a {tier} remodel of a {room} covering approximately {size}. The property is in {region}, and the client wants to start {timeline}. The priority is {priority}.',
    nextSteps: [
      'Schedule a site visit to inspect existing conditions, layout, and structural elements.',
      'Confirm the scope of work, material selections, and any structural changes.',
      'Verify electrical, plumbing, and HVAC capacity for the planned use.',
    ],
    concerns: [
      '{demolition_clause}',
      '{utilities_clause}',
      '{permit_clause}',
      'Asbestos or lead may be present in homes built before 1978 — testing may be required.',
    ],
  },
  repair: {
    summary:
      'This project involves {repair_type} repair work with a scope of {size} units. The urgency is {urgency}. The property is in {region}.',
    nextSteps: [
      'Schedule a site visit to assess the full extent of the damage.',
      'Identify and address the root cause to prevent recurrence.',
      'Confirm whether the repair requires matching existing materials or can use new ones.',
    ],
    concerns: [
      'The full extent of damage may not be visible until the area is opened up.',
      'If the issue is water-related, the source must be fixed before repair.',
    ],
  },
  custom: {
    summary:
      'The client has described a custom project: {description}. The property is in {region}, with a {timeline} timeline. Budget range: {budget}.',
    nextSteps: [
      'Schedule a site visit to fully understand the scope and existing conditions.',
      'Develop a detailed scope of work and material list.',
      'Confirm budget expectations and phased approach if needed.',
    ],
    concerns: [
      'Custom projects require a detailed scope before a firm quote can be provided.',
      'Permitting and zoning requirements should be verified for the specific use.',
    ],
  },
};

export const genericTemplate: SummaryTemplate = {
  summary:
    'This project is located in {region} with a target timeline of {timeline}. The client has prioritized {priority}. A detailed site visit is recommended to confirm scope and provide a firm quote.',
  nextSteps: [
    'Schedule a site visit to assess the project scope and existing conditions.',
    'Confirm material selections, measurements, and any special requirements.',
    'Verify permitting requirements for this project type.',
  ],
  concerns: [
    '{permit_clause}',
    'A site visit is needed to confirm the full scope before providing a firm quote.',
  ],
};

export const globalNextSteps = [
  'Confirm final material selections and color choices.',
  'Review and sign the project contract after the site visit.',
];

export const globalConcerns: string[] = [];

export const placeholderDefaults: Record<string, string> = {
  size: 'a standard-sized',
  material: 'standard',
  tier: 'mid-range',
  priority: 'a balance of value and quality',
  timeline: 'in the near future',
  region: 'Delaware',
  budget: 'not specified',
  features_clause: ' standard features',
  demolition_clause: '',
  hoa_clause: '',
  permit_clause: 'Building permits may be required — we handle the application.',
  utilities_clause: '',
  gate_count: 'standard',
  roof_clause: '',
  columns: 'supporting',
  railing: 'a modest amount of',
  tearoff_clause: '',
  leak_clause: '',
  layers_clause: '',
  removal_clause: '',
  rot_clause: '',
  install_type: 'insert',
  glass: 'double-pane',
  frame: 'vinyl',
  room: 'the space',
  repair_type: 'general',
  urgency: 'standard',
  landings: 'standard',
  handrails: 'a standard amount of',
  description: 'a project the client will describe in detail',
};
