import {pageMetadata} from "@/lib/metadata";
import {BreadcrumbJsonLd} from "@/components/seo/json-ld";
import {ExtendedPracticePage} from "@/components/sections/extended-practice-page";
export const metadata=pageMetadata("/oracle/",{title:"Oracle services",description:"Oracle E-Business Suite, Cloud ERP, JD Edwards, database and middleware services from In2IT EBS."});
export default function OraclePage(){return <><BreadcrumbJsonLd path="/oracle/" /><ExtendedPracticePage practice="oracle"/></>;}
