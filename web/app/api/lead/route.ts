import {handleLead} from "@/lib/lead-service";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request:Request) { return handleLead(request); }
