import type {Metadata} from "next";
import {SITE_URL} from "./utils";
const BRAND = "In2IT EBS";
export function pageMetadata(path:string, input:Metadata): Metadata {
  const canonical = new URL(path, SITE_URL).toString();
  const absolute = typeof input.title === "object" && input.title !== null && "absolute" in input.title ? String(input.title.absolute) : null;
  const plain = typeof input.title === "string" ? input.title : null;
  const socialTitle = absolute ?? (plain ? `${plain} · ${BRAND}` : BRAND);
  const description = input.description ?? "Enterprise platforms, advisory and digital engineering from In2IT EBS.";
  return {...input, alternates:{canonical},
    openGraph:{type:"website",siteName:BRAND,title:socialTitle,description,url:canonical,images:[{url:"/opengraph-image/",width:1200,height:630,alt:"In2IT EBS: enterprise transformation"}]},
    twitter:{card:"summary_large_image",site:"@in2itebs_",title:socialTitle,description,images:["/opengraph-image/"]},
  };
}
