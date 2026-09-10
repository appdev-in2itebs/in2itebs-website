import { z } from "zod";
export const interests = [
  "SAP",
  "SuccessFactors",
  "Salesforce",
  "Workday",
  "Oracle",
  "Microsoft",
  "Advisory",
  "Digital, Data & AI",
  "Application engineering",
  "Managed services",
  "Not sure",
] as const;
export const offers = {
  conversation: "Start a conversation",
  pathway: "Two-week Pathway Assessment",
  workshop: "Discovery workshop",
} as const;
export const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(2).max(160),
  region: z.enum(["IN", "KE", "ZA", "ME"]),
  interest: z.enum(interests),
  message: z.string().trim().max(5000).default(""),
  offer: z.enum(["conversation", "pathway", "workshop"]).default("conversation"),
  assessment: z.enum(["RISE", "GROW", "Hybrid", ""]).default(""),
  company_url: z.string().max(200).optional().default(""),
});
export type Lead = z.infer<typeof leadSchema>;
