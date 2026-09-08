import type {Metadata} from "next";
import {SITE_URL} from "./utils";
export function pageMetadata(path:string, input:Metadata): Metadata {
  const canonical = new URL(path, SITE_URL).toString();
  const title = typeof input.title === "string" ? input.title : "In2IT EBS";
  const description = input.description ?? "Enterprise platforms, advisory and digital engineering from In2IT EBS.";
  return {...input, alternates:{canonical},
    openGraph:{type:"website",siteName:"In2IT EBS",title,description,url:canonical,images:[{url:"/opengraph-image",width:1200,height:630,alt:"In2IT EBS: enterprise transformation"}]},
    twitter:{card:"summary_large_image",title,description,images:["/opengraph-image"]},
  };
}
