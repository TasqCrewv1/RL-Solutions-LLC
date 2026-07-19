export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  overview: string;
  benefits: string[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  related: string[];
  icon: string;
  image: string;
};

export const services: Service[] = [
  {
    slug: "kitchen-remodeling",
    title: "Kitchen Remodeling",
    shortTitle: "Kitchens",
    summary:
      "Functional, beautiful kitchens designed for how your family actually cooks, gathers, and lives.",
    overview:
      "A kitchen remodel should solve real problems—limited storage, outdated layouts, inefficient workflows—while elevating the heart of your home. RL Solutions plans and builds kitchens that balance craftsmanship, durability, and everyday usability across Delaware and Southeastern Pennsylvania.",
    benefits: [
      "Custom layouts that improve traffic flow and storage",
      "Quality cabinetry, counters, and finishes built to last",
      "Clear timelines and honest communication from start to finish",
      "Coordination of plumbing, electrical, and finishing trades",
    ],
    process: [
      {
        title: "Discovery & Measurement",
        description:
          "We walk your space, discuss goals and budget, and identify the practical constraints that shape a smart plan.",
      },
      {
        title: "Design Direction",
        description:
          "You receive a clear scope covering layout options, materials, and the sequence of work before anything is demolished.",
      },
      {
        title: "Build & Finish",
        description:
          "Our team executes with clean job sites, careful detailing, and consistent updates until your kitchen is ready for daily use.",
      },
    ],
    faqs: [
      {
        question: "How long does a typical kitchen remodel take?",
        answer:
          "Most full kitchen remodels take several weeks depending on layout changes, material lead times, and the scope of plumbing or electrical updates. We provide a realistic schedule before work begins.",
      },
      {
        question: "Can you work within an existing footprint?",
        answer:
          "Yes. Many of our projects refresh cabinetry, surfaces, lighting, and appliances without major structural changes. We also plan larger redesigns when a new layout better serves your home.",
      },
    ],
    related: ["bathroom-remodeling", "flooring", "painting", "general-contracting"],
    icon: "ChefHat",
    image: "/images/services/kitchen.svg",
  },
  {
    slug: "bathroom-remodeling",
    title: "Bathroom Remodeling",
    shortTitle: "Bathrooms",
    summary:
      "Clean, durable bathrooms that feel refreshed, function better, and stand up to daily use.",
    overview:
      "From compact guest baths to primary suites, we remodel bathrooms with waterproofing, smart layouts, and finishes that stay sharp for years. Every project is planned to reduce surprises and protect the rest of your home while work is underway.",
    benefits: [
      "Moisture-resistant assemblies and proper waterproofing",
      "Improved storage, lighting, and accessibility options",
      "Tile, vanity, shower, and fixture upgrades executed cleanly",
      "Respect for your home with contained, orderly work areas",
    ],
    process: [
      {
        title: "Scope Definition",
        description:
          "We clarify whether you need a refresh, a full gut remodel, or accessibility improvements.",
      },
      {
        title: "Material Selection",
        description:
          "We help you choose tile, fixtures, and vanities that fit your style and maintenance expectations.",
      },
      {
        title: "Precise Installation",
        description:
          "Waterproofing, tile work, and finish details are installed with care so your bathroom performs as well as it looks.",
      },
    ],
    faqs: [
      {
        question: "Do you handle plumbing and electrical updates?",
        answer:
          "Yes. Bathroom remodels often require fixture relocation, exhaust improvements, and lighting upgrades. We coordinate those details as part of a complete project plan.",
      },
      {
        question: "Can you remodel one bathroom while we stay in the home?",
        answer:
          "In most cases, yes. We sequence the work to keep disruption manageable and keep the job site as clean and contained as possible.",
      },
    ],
    related: ["kitchen-remodeling", "flooring", "painting", "whole-home-remodeling"],
    icon: "Bath",
    image: "/images/services/bathroom.svg",
  },
  {
    slug: "whole-home-remodeling",
    title: "Whole Home Remodeling",
    shortTitle: "Whole Home",
    summary:
      "Coordinated renovations that transform multiple spaces under one accountable team.",
    overview:
      "Whole-home remodeling requires more than isolated upgrades. RL Solutions manages sequencing, design consistency, and trade coordination so your renovation feels intentional from entryway to finished living spaces.",
    benefits: [
      "One point of accountability across multiple rooms",
      "Consistent materials, trim profiles, and finish details",
      "Phased planning that protects livability when needed",
      "Problem-solving approach for older homes and complex layouts",
    ],
    process: [
      {
        title: "Priority Mapping",
        description:
          "We identify what must be improved first, what can be phased, and where investment delivers the strongest return.",
      },
      {
        title: "Integrated Planning",
        description:
          "Structural, mechanical, and finish decisions are aligned before construction begins.",
      },
      {
        title: "Managed Execution",
        description:
          "You receive clear progress updates while we keep the project moving toward a cohesive final result.",
      },
    ],
    faqs: [
      {
        question: "Can a whole-home remodel be completed in phases?",
        answer:
          "Yes. Many homeowners prefer phased renovations. We can build a roadmap that improves key areas now while planning future phases intelligently.",
      },
      {
        question: "Do you help with design consistency?",
        answer:
          "Absolutely. We help align flooring, paint, trim, lighting, and architectural details so the finished home feels unified rather than pieced together.",
      },
    ],
    related: ["home-additions", "kitchen-remodeling", "basement-finishing", "general-contracting"],
    icon: "Home",
    image: "/images/services/whole-home.svg",
  },
  {
    slug: "home-additions",
    title: "Home Additions",
    shortTitle: "Additions",
    summary:
      "Thoughtful expansions that add living space without compromising the character of your home.",
    overview:
      "Whether you need a primary suite, family room, or multi-room expansion, we plan additions that connect cleanly to your existing structure, match exterior detailing, and solve the space problem that prompted the project.",
    benefits: [
      "Structural planning tied to how you use the home",
      "Exterior transitions designed to look original, not bolted on",
      "Room for future needs without unnecessary complexity",
      "Transparent budgeting around foundation, framing, and finishes",
    ],
    process: [
      {
        title: "Feasibility Review",
        description:
          "We evaluate lot constraints, existing structure, and the addition concept that best solves your space needs.",
      },
      {
        title: "Buildable Design",
        description:
          "Plans move from concept to a construction-ready scope with clear material and system decisions.",
      },
      {
        title: "Construction & Integration",
        description:
          "Framing through finish work is managed so the new space feels like a natural extension of your home.",
      },
    ],
    faqs: [
      {
        question: "Do additions require permits?",
        answer:
          "Most do. We help navigate local permitting requirements in Delaware and Southeastern Pennsylvania so the project proceeds properly.",
      },
      {
        question: "Can an addition match my home’s existing style?",
        answer:
          "Yes. Matching roof lines, siding, windows, and trim details is a core part of how we plan additions.",
      },
    ],
    related: ["garages", "deck-construction", "roofing", "general-contracting"],
    icon: "Expand",
    image: "/images/services/additions.svg",
  },
  {
    slug: "deck-construction",
    title: "Deck Construction",
    shortTitle: "Decks",
    summary:
      "Strong, well-built outdoor living spaces designed for entertaining, relaxing, and lasting value.",
    overview:
      "A quality deck starts with sound structure and ends with details that feel intentional. We build decks that expand your usable living space and stand up to regional weather.",
    benefits: [
      "Proper footings, framing, and fastener systems",
      "Composite or wood options based on maintenance preferences",
      "Railings, stairs, and layout details planned for safety and flow",
      "Clean installation that protects landscaping and home exteriors",
    ],
    process: [
      {
        title: "Site Assessment",
        description:
          "We review elevation, access, drainage, and how the deck should connect to doors and yard areas.",
      },
      {
        title: "Material Guidance",
        description:
          "You choose materials and finishes with a clear understanding of durability and upkeep.",
      },
      {
        title: "Build & Final Walkthrough",
        description:
          "We construct the deck to plan and walk the finished space with you before project closeout.",
      },
    ],
    faqs: [
      {
        question: "Should I choose wood or composite?",
        answer:
          "It depends on your budget, preferred look, and maintenance tolerance. We explain the tradeoffs clearly so you can decide with confidence.",
      },
      {
        question: "Can you add a deck to an existing patio door?",
        answer:
          "Yes. Many projects are designed around existing openings, while others include door or threshold improvements for better transitions.",
      },
    ],
    related: ["home-additions", "concrete", "painting", "general-contracting"],
    icon: "Trees",
    image: "/images/services/deck.svg",
  },
  {
    slug: "roofing",
    title: "Roofing",
    shortTitle: "Roofing",
    summary:
      "Protective roofing solutions installed with care for long-term weather resistance and curb appeal.",
    overview:
      "Your roof is one of the most important systems protecting your home. RL Solutions provides dependable roofing work focused on proper preparation, clean installation, and materials suited to Delaware and Southeastern Pennsylvania conditions.",
    benefits: [
      "Thorough assessment before recommending replacement or repair",
      "Attention to flashing, ventilation, and water management details",
      "Material options that balance performance and appearance",
      "Respectful cleanup of the job site after installation",
    ],
    process: [
      {
        title: "Roof Evaluation",
        description:
          "We inspect condition, age, and vulnerability points so recommendations are based on facts, not pressure.",
      },
      {
        title: "Transparent Proposal",
        description:
          "You receive a clear scope covering materials, preparation, and what is included in the work.",
      },
      {
        title: "Installation & Cleanup",
        description:
          "Work is completed efficiently with attention to protecting landscaping and removing debris.",
      },
    ],
    faqs: [
      {
        question: "How do I know if I need a repair or full replacement?",
        answer:
          "We evaluate the roof’s overall condition, leak history, and remaining service life, then explain the most responsible option for your home.",
      },
      {
        question: "Do you help with storm-related roofing needs?",
        answer:
          "Yes. We can assess damage and outline a practical path forward after severe weather events.",
      },
    ],
    related: ["siding", "windows-doors", "garages", "general-contracting"],
    icon: "CloudRain",
    image: "/images/services/roofing.svg",
  },
  {
    slug: "siding",
    title: "Siding",
    shortTitle: "Siding",
    summary:
      "Exterior siding upgrades that improve protection, curb appeal, and long-term home performance.",
    overview:
      "Siding is both armor and first impression. We install and replace siding with careful attention to weather barrier details, trim transitions, and a finished look that elevates your home’s exterior.",
    benefits: [
      "Improved weather resistance and exterior appearance",
      "Options suited to your maintenance preferences",
      "Clean transitions at windows, doors, corners, and rooflines",
      "Coordinated exterior upgrades when needed",
    ],
    process: [
      {
        title: "Exterior Review",
        description:
          "We inspect existing siding, substrate conditions, and trim details that affect performance.",
      },
      {
        title: "Product Selection",
        description:
          "You choose siding and accent details with guidance on durability and visual impact.",
      },
      {
        title: "Professional Installation",
        description:
          "Panels, trim, and weather details are installed for a crisp, lasting finish.",
      },
    ],
    faqs: [
      {
        question: "Can siding be replaced without replacing windows?",
        answer:
          "Often yes. We can replace siding around existing windows and doors, or coordinate window upgrades when that creates a better result.",
      },
      {
        question: "What siding styles do you install?",
        answer:
          "We work with common residential systems used in the region and help match style to your home’s architecture and budget.",
      },
    ],
    related: ["roofing", "windows-doors", "painting", "general-contracting"],
    icon: "PanelsTopLeft",
    image: "/images/services/siding.svg",
  },
  {
    slug: "windows-doors",
    title: "Windows & Doors",
    shortTitle: "Windows & Doors",
    summary:
      "Better-fitting windows and doors that improve comfort, efficiency, and the look of your home.",
    overview:
      "Drafty, worn, or poorly operating openings affect comfort every day. We install windows and doors with proper flashing, sealing, and finish work so they perform as intended and look finished from inside and out.",
    benefits: [
      "Improved energy comfort and operation",
      "Clean interior and exterior finish details",
      "Guidance on styles that suit your home",
      "Careful protection of surrounding finishes during installation",
    ],
    process: [
      {
        title: "Opening Assessment",
        description:
          "We measure carefully and identify any framing or moisture concerns around existing units.",
      },
      {
        title: "Product Planning",
        description:
          "You select window and door options based on performance, style, and budget priorities.",
      },
      {
        title: "Install & Seal",
        description:
          "Units are installed, sealed, and trimmed so the finished result is secure and polished.",
      },
    ],
    faqs: [
      {
        question: "Can you replace only a few windows?",
        answer:
          "Yes. We can replace selected openings or plan a whole-home update depending on your priorities.",
      },
      {
        question: "Do you install entry doors and patio doors?",
        answer:
          "Yes. Entry, patio, and exterior door replacements are part of our windows and doors services.",
      },
    ],
    related: ["siding", "home-additions", "painting", "general-contracting"],
    icon: "DoorOpen",
    image: "/images/services/windows-doors.svg",
  },
  {
    slug: "concrete",
    title: "Concrete",
    shortTitle: "Concrete",
    summary:
      "Flatwork and structural concrete solutions built for durability and clean finished appearance.",
    overview:
      "From walkways and patios to slabs that support future construction, our concrete work focuses on preparation, proper mix and finish, and results that hold up under real use.",
    benefits: [
      "Solid base preparation for lasting performance",
      "Clean edges, joints, and finish quality",
      "Practical solutions for drainage and slope concerns",
      "Support for garages, additions, and outdoor living projects",
    ],
    process: [
      {
        title: "Site Preparation Plan",
        description:
          "We review grade, access, and reinforcement needs before forming begins.",
      },
      {
        title: "Form & Pour",
        description:
          "Forms are set carefully and concrete is placed with attention to level, slope, and finish.",
      },
      {
        title: "Cure & Protect",
        description:
          "We guide you on curing and early use so the finished surface develops properly.",
      },
    ],
    faqs: [
      {
        question: "What concrete projects do you handle?",
        answer:
          "Common projects include patios, walkways, slabs, and concrete work tied to garages, additions, and outdoor living improvements.",
      },
      {
        question: "Can concrete fix drainage issues near my home?",
        answer:
          "In many cases, yes. Proper slope and placement can direct water away from vulnerable areas. We evaluate each site individually.",
      },
    ],
    related: ["garages", "deck-construction", "home-additions", "pole-barns"],
    icon: "SquareStack",
    image: "/images/services/concrete.svg",
  },
  {
    slug: "garages",
    title: "Garages",
    shortTitle: "Garages",
    summary:
      "Attached and detached garage projects that add storage, protection, and property value.",
    overview:
      "A well-planned garage solves storage and parking needs while improving the property’s function and curb appeal. We build garage projects with structural integrity and clean finishing in mind.",
    benefits: [
      "Practical layouts for vehicles, tools, and storage",
      "Durable framing and exterior detailing",
      "Options for workshops, storage systems, and future conversion",
      "Coordination with driveways, concrete, and roofing",
    ],
    process: [
      {
        title: "Needs Assessment",
        description:
          "We define bay count, storage goals, access, and how the garage should relate to the home.",
      },
      {
        title: "Structural Planning",
        description:
          "Foundation, framing, roofing, and exterior finishes are planned as one complete package.",
      },
      {
        title: "Buildout",
        description:
          "Construction proceeds with clear milestones from slab through finished exterior.",
      },
    ],
    faqs: [
      {
        question: "Do you build both attached and detached garages?",
        answer:
          "Yes. We evaluate which approach fits your lot, home layout, and long-term goals.",
      },
      {
        question: "Can a garage include workshop space?",
        answer:
          "Absolutely. Many clients ask for additional depth, lighting, or electrical planning for workshop use.",
      },
    ],
    related: ["pole-barns", "concrete", "roofing", "home-additions"],
    icon: "Warehouse",
    image: "/images/services/garages.svg",
  },
  {
    slug: "pole-barns",
    title: "Pole Barns",
    shortTitle: "Pole Barns",
    summary:
      "Versatile pole barn structures for storage, equipment, workshops, and property support.",
    overview:
      "Pole barns are a practical solution when you need durable covered space without overcomplicating the build. We help define the right footprint, openings, and finishes for how the building will actually be used.",
    benefits: [
      "Efficient structures for storage and utility needs",
      "Custom sizing for equipment and access requirements",
      "Practical door, lighting, and layout decisions",
      "Clear communication around scope and schedule",
    ],
    process: [
      {
        title: "Use-Case Planning",
        description:
          "We start with how the building will be used so dimensions and openings are correct from day one.",
      },
      {
        title: "Structure Design",
        description:
          "Posts, spans, roof style, and exterior finishes are selected for durability and function.",
      },
      {
        title: "Construction",
        description:
          "The building is erected with attention to alignment, weather details, and usable finished space.",
      },
    ],
    faqs: [
      {
        question: "What can a pole barn be used for?",
        answer:
          "Common uses include equipment storage, workshops, vehicle housing, and general property support buildings.",
      },
      {
        question: "Can a pole barn be customized?",
        answer:
          "Yes. Size, door placement, overhangs, and interior layout can be adapted to your property needs.",
      },
    ],
    related: ["garages", "concrete", "roofing", "general-contracting"],
    icon: "Barn",
    image: "/images/services/pole-barns.svg",
  },
  {
    slug: "basement-finishing",
    title: "Basement Finishing",
    shortTitle: "Basements",
    summary:
      "Finished lower levels that add living space, comfort, and long-term value to your home.",
    overview:
      "A finished basement can become a family room, guest suite, office, or recreation space—when moisture, egress, and layout are handled correctly. We finish basements with a practical eye for comfort and durability.",
    benefits: [
      "Smart layouts that maximize usable square footage",
      "Attention to moisture management and insulation",
      "Comfortable lighting, flooring, and finish selections",
      "Potential for bathrooms, storage, and flexible living zones",
    ],
    process: [
      {
        title: "Condition Check",
        description:
          "We review moisture history, ceiling height, mechanicals, and egress before recommending a finish plan.",
      },
      {
        title: "Space Planning",
        description:
          "Rooms, storage, and traffic flow are planned around existing structure and future use.",
      },
      {
        title: "Finish Construction",
        description:
          "Framing, insulation, electrical, flooring, and trim come together into a space ready for everyday living.",
      },
    ],
    faqs: [
      {
        question: "Should moisture issues be addressed before finishing?",
        answer:
          "Yes. A dry, stable basement is the foundation of a successful finish. We discuss what needs to be resolved before cosmetic work begins.",
      },
      {
        question: "Can you add a bathroom in the basement?",
        answer:
          "In many homes, yes. We evaluate plumbing access and code considerations as part of the planning process.",
      },
    ],
    related: ["bathroom-remodeling", "flooring", "painting", "whole-home-remodeling"],
    icon: "Layers",
    image: "/images/services/basement.svg",
  },
  {
    slug: "flooring",
    title: "Flooring",
    shortTitle: "Flooring",
    summary:
      "Flooring installations that elevate comfort underfoot and unify the look of your home.",
    overview:
      "The right flooring changes how a room feels every day. We install hardwood, vinyl, tile, and other common residential flooring systems with careful prep and clean finishing details.",
    benefits: [
      "Proper subfloor preparation for lasting results",
      "Material guidance for traffic, moisture, and style",
      "Clean transitions between rooms and existing floors",
      "Coordination with remodeling projects for a seamless finish",
    ],
    process: [
      {
        title: "Material Consultation",
        description:
          "We help match flooring products to each room’s use, moisture exposure, and design goals.",
      },
      {
        title: "Surface Prep",
        description:
          "Uneven or damaged substrates are addressed before installation begins.",
      },
      {
        title: "Install & Detail",
        description:
          "Flooring, transitions, and edge details are completed for a polished final look.",
      },
    ],
    faqs: [
      {
        question: "What flooring types do you install?",
        answer:
          "We commonly install hardwood, engineered wood, luxury vinyl, and tile, and we help you choose the right product for each space.",
      },
      {
        question: "Can flooring be part of a larger remodel?",
        answer:
          "Yes. Flooring is often coordinated with kitchen, bath, basement, and whole-home projects for a cohesive finish.",
      },
    ],
    related: ["kitchen-remodeling", "bathroom-remodeling", "basement-finishing", "painting"],
    icon: "Grid3x3",
    image: "/images/services/flooring.svg",
  },
  {
    slug: "painting",
    title: "Painting",
    shortTitle: "Painting",
    summary:
      "Interior and exterior painting that refreshes surfaces and protects your investment.",
    overview:
      "Professional painting is about preparation as much as color. We prepare surfaces properly, protect surrounding areas, and apply finishes that look sharp and hold up over time.",
    benefits: [
      "Thorough prep for smoother, longer-lasting results",
      "Color and sheen guidance for each room or exterior elevation",
      "Clean cut lines and careful protection of floors and fixtures",
      "Ideal finishing step for renovations and additions",
    ],
    process: [
      {
        title: "Surface Evaluation",
        description:
          "We identify repairs, priming needs, and conditions that affect paint performance.",
      },
      {
        title: "Color Planning",
        description:
          "You select colors and finishes with practical recommendations for light, wear, and maintenance.",
      },
      {
        title: "Prep & Paint",
        description:
          "Surfaces are prepared and coated carefully for an even, professional finish.",
      },
    ],
    faqs: [
      {
        question: "Do you paint interiors and exteriors?",
        answer:
          "Yes. We handle interior rooms, whole-home interiors, and exterior painting as standalone work or as part of larger projects.",
      },
      {
        question: "Should repairs be done before painting?",
        answer:
          "In most cases, yes. Addressing cracks, stains, and surface defects first is what makes a paint job look premium.",
      },
    ],
    related: ["siding", "whole-home-remodeling", "home-additions", "general-contracting"],
    icon: "Paintbrush",
    image: "/images/services/painting.svg",
  },
  {
    slug: "general-contracting",
    title: "General Contracting",
    shortTitle: "General Contracting",
    summary:
      "End-to-end project leadership for homeowners who want one accountable partner.",
    overview:
      "Complex projects succeed when planning, communication, and craftsmanship stay aligned. As your general contractor, RL Solutions manages scope, scheduling, and quality so you always know who is responsible for the outcome.",
    benefits: [
      "Single point of contact for multi-trade projects",
      "Honest scoping and dependable scheduling",
      "Quality control across every phase of work",
      "A problem-solving mindset when conditions change",
    ],
    process: [
      {
        title: "Project Definition",
        description:
          "We clarify goals, constraints, and success criteria before assembling the plan.",
      },
      {
        title: "Coordination",
        description:
          "Trades, materials, and inspections are sequenced to keep the project moving responsibly.",
      },
      {
        title: "Delivery & Closeout",
        description:
          "We finish with punch-list discipline and a clear walkthrough of the completed work.",
      },
    ],
    faqs: [
      {
        question: "When should I hire a general contractor?",
        answer:
          "If your project involves multiple trades, structural changes, or a renovation that must stay coordinated, a general contractor reduces risk and keeps the process organized.",
      },
      {
        question: "Do you take on both large and targeted projects?",
        answer:
          "Yes. We handle focused improvements and larger renovations, always matching the level of planning to the complexity of the work.",
      },
    ],
    related: ["whole-home-remodeling", "home-additions", "kitchen-remodeling", "roofing"],
    icon: "HardHat",
    image: "/images/services/general-contracting.svg",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(slugs: string[]) {
  return services.filter((service) => slugs.includes(service.slug));
}
