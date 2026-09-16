// "What People Say" as published on in2itebs.com, copied 1:1 on 2026-09-16 at the owner's request:
// the five written quotes in the live slider's order with their avatars (public/testimonials/), and
// the five video testimonies below it in the live card order, each with the live site's own
// thumbnail saved as public/testimonials/<youtube id>.jpg. The live slider also carries four
// template placeholder slides ("Audit Marketing", "Finance Consulting", ...); those were not copied.
export type Testimonial = { slug: string; name: string; role: string; quote: string; avatar: string };
export type TestimonialVideo = { id: string; title: string };

export const testimonials: Testimonial[] = [
  {
    slug: "amy-halter",
    name: "Amy Halter",
    role: "VP Operations and HR",
    quote:
      "At Accion Labs, our growth are just not in revenue numbers but also in challenging mindsets of our employees with right interventions via power of analytics, enablement and employee experience. When we started our journey with SAP SuccessFactors, we were looking to enrich our HR Processes with an integrated end to end business solution. In2IT EBS enabled us to achieve our vision through right business planning and governance and implementing the entire SuccessFactors suite of solutions across 27 countries. Congratulations to the Accion Labs and In2IT EBS teams for this milestone achievement.",
    avatar: "/testimonials/amy-halter.jpg",
  },
  {
    slug: "mausam-joshi",
    name: "Mausam Joshi",
    role: "General Manager - HR, MG Motor India",
    quote:
      "Being one of the world's most celebrated automotive brands, MG India is driven by Innovation, Customer Centricity, Community Care and Diversity. Our aim is to provide an ideal work atmosphere for all employees to nurture and grow in their roles. By implementing SAP SuccessFactors, we bring best of employee experience that results in increased HR productivity and enable us to achieve desired business outcomes. We choose In2IT EBS as our trusted SAP SuccessFactors AMC partner. In2IT EBS is a Gold Partner of SAP, by enabling the partnership we have seen improvements that helps us keeping the pace with our expanding and changing business needs.",
    avatar: "/testimonials/mausam-joshi.jpg",
  },
  {
    slug: "sanjeev-kumarr-dixit",
    name: "Dr. Sanjeev Kumarr Dixit",
    role: "CHRO - Mrs. Bectors Food Specialities Ltd.",
    quote:
      "9th May 2022 is a day to remember and celebrate as a MBFSL team as together are taking a LEAP (Leveraging Effectiveness thru Automating Processes) by moving from manual way of working to online cloud based globally acclaimed Human Capital Management system – SAP SuccessFactors. At this juncture like to thank with lots of humility to each and every team member from HR team for putting their sincere hard work and compete dedicated time to complete the entire LEAP project in record time from end to end in 04 months which by all standard is a stretched target. Also, this feat won’t be possible without expert contribution and able project management by our implementation partner In2IT who also worked with HR team shoulder to shoulder to achieve the deadline.",
    avatar: "/testimonials/sanjeev-kumarr-dixit.jpg",
  },
  {
    slug: "kavita-mathur",
    name: "Kavita Mathur",
    role: "Chief People Officer at Trilegal",
    quote:
      "Trileagal is consistently recognised as the best Indian law firm for the quality for their services and client satisfaction. We are recognised for our sheer commitment to diversity, equality and sustainability and to bring best of employee experience we have decided to go for HR Digital Transformation with SAP SuccessFactors. We chosen In2IT EBS as our trusted implementation partner and by enabling the partnership from the day 1 In2IT EBS team has took the ownership of the project, turn it around, tackling the stringent deadline and made this HR Digital Transformation journey successful.",
    avatar: "/testimonials/kavita-mathur.jpg",
  },
  {
    slug: "kunal-shah",
    name: "Kunal Shah",
    role: "CFO at Aknamed",
    quote:
      "Aknamed was founded in 2018, by a team of founders with decades of experience in healthcare, to streamline Healthcare Delivery in India. We’re a new-age support system that helps hospitals evolve and better tackle the complexities in healthcare. We saw the need for a reliable solution to help simplify our Finance, Supply Chain, CRM, SRM, HR, etc",
    avatar: "/testimonials/kunal-shah.jpg",
  },
];

export const testimonialVideos: TestimonialVideo[] = [
  {
    id: "Q-lVgdURheQ",
    title: "Customer Testimony : Milind Mohile - Vice President of Strategy & Growth, Triveni Turbine Ltd",
  },
  { id: "g7nhiMaPYNA", title: "Customer Testimony - Bhanumathi Santhosh, CHRO Wissen Infotech" },
  { id: "3EJqv949acU", title: "Transforming HR with SAP PMGM & In2IT EBS!" },
  { id: "YN2y9STqw9A", title: "Neeraj Pandey, Vice President-IBG" },
  {
    id: "g0PBxc5hZnc",
    title: "Customer Testimony-Dr. Yatindra Dwivedi, Director Personnel- Power Grid Corporation of India Limited",
  },
];
