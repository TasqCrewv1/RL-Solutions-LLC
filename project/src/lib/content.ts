import {
  Hammer,
  Fence,
  Bath,
  ChefHat,
  Accessibility,
  Wrench,
  ShieldCheck,
  Clock,
  HeartHandshake,
  Sparkles,
  Phone,
  type LucideIcon,
} from 'lucide-react';

export type ServiceId =
  | 'decks'
  | 'fencing'
  | 'bathrooms'
  | 'kitchens'
  | 'accessibility'
  | 'repairs';

export interface Service {
  id: ServiceId;
  title: string;
  blurb: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    id: 'decks',
    title: 'Decks',
    blurb: 'Custom decks built for Delaware weather — pressure-treated wood, low-maintenance composite, or premium PVC. Sealed right and fastened to last.',
    icon: Hammer,
  },
  {
    id: 'fencing',
    title: 'Fencing',
    blurb: 'Privacy and curb appeal in wood, vinyl, aluminum, or chain link. Built straight, set level, and anchored properly so it stays that way.',
    icon: Fence,
  },
  {
    id: 'bathrooms',
    title: 'Bathrooms',
    blurb: 'From a single fixture swap to a full gut. Waterproofing done right the first time, finishes that hold up for years.',
    icon: Bath,
  },
  {
    id: 'kitchens',
    title: 'Kitchens',
    blurb: 'Cabinetry, countertops, islands, and appliances. Layouts that make sense for how your family actually cooks and eats.',
    icon: ChefHat,
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    blurb: "ADA-compliant ramps, grab bars, threshold transitions, and door widening. Safe access that doesn't look like an afterthought.",
    icon: Accessibility,
  },
  {
    id: 'repairs',
    title: 'General Repairs',
    blurb: 'Drywall, flooring, painting, fixtures, and the small fixes that keep your house from falling apart. No job too small.',
    icon: Wrench,
  },
];

export interface ValueItem {
  title: string;
  blurb: string;
  icon: LucideIcon;
}

export const values: ValueItem[] = [
  {
    title: 'Licensed & Insured',
    blurb: 'Fully licensed and insured on every project. Happy to send the documentation before we ever pick up a tool.',
    icon: ShieldCheck,
  },
  {
    title: 'Honest Pricing',
    blurb: 'You get a written quote after we come out and look. No surprise charges, no vague line items.',
    icon: Phone,
  },
  {
    title: 'On-Time Delivery',
    blurb: "We commit to a schedule and stick to it. You know when we start, when we finish, and what's happening in between.",
    icon: Clock,
  },
  {
    title: 'Problem-Solving Approach',
    blurb: 'We figure out what actually needs fixing before we recommend anything. That saves you money and keeps us from coming back.',
    icon: HeartHandshake,
  },
  {
    title: 'Clean Job Sites',
    blurb: "We treat your house like it's ours. Tools put away, debris contained, things cleaned up at the end of every day.",
    icon: Sparkles,
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: ServiceId | 'other';
  location: string;
  image: string;
  span?: boolean;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Cedar Wraparound Deck',
    category: 'decks',
    location: 'Greenville, DE',
    image:
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp',
    span: true,
  },
  {
    id: 'g2',
    title: 'Modern Open-Plan Kitchen',
    category: 'kitchens',
    location: 'Hockessin, DE',
    image:
      'https://images.pexels.com/photos/3773577/pexels-photo-3773577.png?auto=compress&cs=tinysrgb&w=1200&fm=webp',
  },
  {
    id: 'g3',
    title: 'Spa-Inspired Primary Bath',
    category: 'bathrooms',
    location: 'Brandywine, DE',
    image:
      'https://images.pexels.com/photos/6207943/pexels-photo-6207943.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp',
  },
  {
    id: 'g4',
    title: 'Horizontal-Slat Privacy Fence',
    category: 'fencing',
    location: 'New Castle, DE',
    image:
      'https://images.pexels.com/photos/2093151/pexels-photo-2093151.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp',
  },
  {
    id: 'g5',
    title: 'Accessible Front Entrance',
    category: 'accessibility',
    location: 'Bear, DE',
    image:
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp',
  },
  {
    id: 'g6',
    title: 'Chef\'s Kitchen Remodel',
    category: 'kitchens',
    location: 'North Wilmington, DE',
    image:
      'https://images.pexels.com/photos/10827196/pexels-photo-10827196.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp',
    span: true,
  },
  {
    id: 'g7',
    title: 'Floating Vanity Bath',
    category: 'bathrooms',
    location: 'Newark, DE',
    image:
      'https://images.pexels.com/photos/6492397/pexels-photo-6492397.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp',
  },
  {
    id: 'g8',
    title: 'Composite Deck with Pergola',
    category: 'decks',
    location: 'Middletown, DE',
    image:
      'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp',
  },
  {
    id: 'g9',
    title: 'Estate Entrance Fence',
    category: 'fencing',
    location: 'Wilmington, DE',
    image:
      'https://images.pexels.com/photos/259600/pexels-photo-259600.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp',
  },
  {
    id: 'g10',
    title: 'Ramp with Covered Porch',
    category: 'accessibility',
    location: 'New Castle, DE',
    image:
      'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp',
  },
  {
    id: 'g11',
    title: 'Porch Repair & Refinish',
    category: 'repairs',
    location: 'Wilmington, DE',
    image:
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp',
  },
  {
    id: 'g12',
    title: 'Custom Workbench & Trim',
    category: 'other',
    location: 'Wilmington, DE',
    image:
      'https://images.pexels.com/photos/6790973/pexels-photo-6790973.jpeg?auto=compress&cs=tinysrgb&w=1200&fm=webp',
  },
];

export interface GalleryFilter {
  id: ServiceId | 'all' | 'other';
  label: string;
}

export const galleryFilters: GalleryFilter[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'decks', label: 'Decks' },
  { id: 'fencing', label: 'Fencing' },
  { id: 'bathrooms', label: 'Bathrooms' },
  { id: 'kitchens', label: 'Kitchens' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'other', label: 'Other Projects' },
];
