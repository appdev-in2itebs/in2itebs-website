// "Meet Our Team" as published on in2itebs.com, copied 1:1 on 2026-09-16 at the owner's request
// (card order as the live slider shows it; photos resized into public/leadership/). The live cards
// for Kunwar Krishna Menon and Sudhansu Mishra end with the site's own "..", and only Abhijit Shukla
// has a full bio page on the live site, so his card carries the complete text from that page.
export type Leader = { slug: string; name: string; title: string; bio: string; photo: string };

export const leadership: Leader[] = [
  {
    slug: "abhijit-shukla",
    name: "Abhijit Shukla",
    title: "Chief Revenue Officer (CRO)",
    bio: "Abhijit Shukla serves as Chief Revenue Officer (CRO) at In2IT EBS, leading global sales, revenue growth, strategic partnerships, and market expansion. With extensive experience in enterprise technology and digital transformation, he has a proven track record of building high-performing teams and delivering customer-centric outcomes across international markets. Abhijit combines strategic vision with execution excellence to accelerate sustainable growth and strengthen the company’s global footprint.",
    photo: "/leadership/abhijit-shukla.png",
  },
  {
    slug: "kunwar-krishna-menon",
    name: "Kunwar Krishna Menon",
    title: "Country Sales Manager",
    bio: "A committed Business Development Manager with experience in selling Products like SAP Success Factors, S4HANA..",
    photo: "/leadership/kunwar-krishna-menon.png",
  },
  {
    slug: "sudhansu-mishra",
    name: "Sudhansu Mishra",
    title: "Chief Operating Officer (COO)",
    bio: "An IT professional with 21 years’ experience in Pre-Sales, Project Management, Bid Management, Tender Management..",
    photo: "/leadership/sudhansu-mishra.png",
  },
  {
    slug: "rudra-shankar-shatapathy",
    name: "Rudra Shankar Shatapathy",
    title: "Managing Director",
    bio: "Rudra has provided vision and dedicated leadership in building and aligning solutions to clients across multiple geographies.",
    photo: "/leadership/rudra-shankar-shatapathy.png",
  },
];
