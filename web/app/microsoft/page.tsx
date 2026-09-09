import {pageMetadata} from "@/lib/metadata";
import {BreadcrumbJsonLd} from "@/components/seo/json-ld";
import {ExtendedPracticePage} from "@/components/sections/extended-practice-page";
export const metadata=pageMetadata("/microsoft/",{title:"Microsoft services",description:"Dynamics 365, Microsoft 365, SharePoint and Azure cloud services from In2IT EBS."});
export default function MicrosoftPage(){return <><BreadcrumbJsonLd path="/microsoft/" /><ExtendedPracticePage practice="microsoft"/></>;}
