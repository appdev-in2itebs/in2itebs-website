export const dynamic = "force-dynamic";
export function GET() {
  return Response.json({app:"in2it-ebs-website",release:"2026-09-07-remediation",status:"ok",leadDeliveryConfigured:Boolean(process.env.LEAD_WEBHOOK_URL && process.env.LEAD_WEBHOOK_TOKEN)}, {headers:{"Cache-Control":"no-store"}});
}
