export interface ServiceArea {
  name: string;
  slug: string;
  county: string;
  desc: string;
  state: 'DE' | 'PA';
}

export const serviceAreas: ServiceArea[] = [
  { name: 'Wilmington', slug: 'wilmington', county: 'New Castle County', desc: 'Our home base and the largest city in Delaware.', state: 'DE' },
  { name: 'Newark', slug: 'newark', county: 'New Castle County', desc: 'Home to the University of Delaware and a growing residential market.', state: 'DE' },
  { name: 'Bear', slug: 'bear', county: 'New Castle County', desc: 'A fast-growing suburban community south of Wilmington.', state: 'DE' },
  { name: 'Hockessin', slug: 'hockessin', county: 'New Castle County', desc: 'An affluent community with established homes and custom projects.', state: 'DE' },
  { name: 'Greenville', slug: 'greenville', county: 'New Castle County', desc: 'An upscale area with estate properties and custom work.', state: 'DE' },
  { name: 'Brandywine', slug: 'brandywine', county: 'New Castle County', desc: 'Historic homes along the Brandywine River valley.', state: 'DE' },
  { name: 'New Castle', slug: 'new-castle', county: 'New Castle County', desc: "One of Delaware's oldest towns with unique historic homes.", state: 'DE' },
  { name: 'Middletown', slug: 'middletown', county: 'New Castle County', desc: 'A rapidly growing town with new construction and remodels.', state: 'DE' },
  { name: 'Smyrna', slug: 'smyrna', county: 'Kent County', desc: 'A fast-growing town on the New Castle–Kent county line.', state: 'DE' },
  { name: 'Dover', slug: 'dover', county: 'Kent County', desc: 'The state capital and hub of central Delaware.', state: 'DE' },
  { name: 'Camden', slug: 'camden', county: 'Kent County', desc: 'A quiet community just south of Dover with growing neighborhoods.', state: 'DE' },
  { name: 'Milford', slug: 'milford', county: 'Kent County', desc: 'A charming town straddling Kent and Sussex counties.', state: 'DE' },
  { name: 'Lewes', slug: 'lewes', county: 'Sussex County', desc: 'A historic coastal town and gateway to the Delaware beaches.', state: 'DE' },
  { name: 'Rehoboth Beach', slug: 'rehoboth-beach', county: 'Sussex County', desc: "Delaware's premier beach town with year-round and vacation homes.", state: 'DE' },
  { name: 'Georgetown', slug: 'georgetown', county: 'Sussex County', desc: 'The Sussex County seat with a mix of historic and new construction.', state: 'DE' },
  { name: 'Seaford', slug: 'seaford', county: 'Sussex County', desc: 'A growing community along the Nanticoke River in western Sussex.', state: 'DE' },
  { name: 'Millsboro', slug: 'millsboro', county: 'Sussex County', desc: 'A rapidly expanding town near the inland bays.', state: 'DE' },
  { name: 'West Chester', slug: 'west-chester', county: 'Pennsylvania', desc: 'A vibrant Chester County borough with historic homes and new builds.', state: 'PA' },
  { name: 'Kennett Square', slug: 'kennett-square', county: 'Pennsylvania', desc: 'A charming Chester County town with established residential neighborhoods.', state: 'PA' },
  { name: 'Media', slug: 'media', county: 'Pennsylvania', desc: 'The Delaware County seat with a strong residential market.', state: 'PA' },
];

export const serviceAreaCounties = ['New Castle County', 'Kent County', 'Sussex County', 'Pennsylvania'] as const;

export const serviceCalcMap: Record<string, string> = {
  decks: 'deck', fencing: 'fence', bathrooms: 'bathroom',
  kitchens: 'kitchen', accessibility: 'ramp', repairs: 'repair',
};
