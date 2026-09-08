/** Adapted summaries of the supplied scraped/news archive, not new product announcements. */
export const insightBodies: Record<string, {date:string; author?:string; sections:{heading:string; text:string}[]}> = {
  'rise-with-sap-s4hana-cloud-transform-business': {date:'', sections:[
    {heading:'Start with the business process',text:'The archived perspective introduces SAP S/4HANA Cloud across finance, procurement, supply chain, manufacturing and sales. Its central argument is that a shared operational view can help teams make decisions using current information instead of disconnected reports.'},
    {heading:'Plan the transformation, not just the migration',text:'RISE with SAP is discussed as a programme supporting the move to cloud ERP, including migration, deployment and ongoing support. Commercial scope, configuration and responsibilities need to be established for the specific programme.'},
    {heading:'Five steps to get started',text:'Assess current processes and pain points. Define the modules, deployment approach, timeline and budget. Select an implementation partner. Prepare deployment, training and change management together. Establish maintenance and support so the system can evolve after go-live.'},
  ]},
  'revolutionizing-hr-with-sap-successfactors': {date:'',sections:[
    {heading:'A common workforce foundation',text:'The archived guide describes Employee Central as the foundation for consolidating workforce information. It connects that foundation with recruitment and onboarding, performance and goals, learning, compensation, succession and workforce planning.'},
    {heading:'Connect the employee lifecycle',text:'Recruitment and onboarding support the move from candidate to employee. Performance and goals connect individual objectives with business priorities. Learning, compensation and succession help organisations develop skills, recognise contribution and prepare future leaders.'},
    {heading:'Make implementation a people programme',text:'The perspective links effective implementation with employee engagement, reduced repetitive administration and better-informed HR decisions. Its discussion of analytics and AI places workforce planning and employee support alongside the core transactional system.'},
  ]},
  'successfactors-ai-innovations-successconnect': {date:'',sections:[
    {heading:'An archived conference perspective',text:'The original report from SuccessConnect in Las Vegas explored AI across recruitment, internal mobility, learning and performance management. It is an account of those announcements, not a statement of current licensing or feature availability.'},
    {heading:'Generative assistance and Joule',text:'The report highlighted assistance with job descriptions and personalised learning recommendations. It introduced Joule as a natural-language copilot embedded in business solutions.'},
    {heading:'A shared view of skills',text:'Talent Intelligence Hub was presented as a way to connect skills, attributes, strengths and preferences with recruiting, onboarding, learning, development, performance and succession. The underlying theme was using a common skills model across the employee experience.'},
  ]},
  'top-benefits-of-crm-for-your-business': {date:'2022-04-18',author:'Kunwar Krishna Menon',sections:[
    {heading:'Understand the relationship',text:'A shared customer record gives sales, service and marketing teams a consistent starting point. The original article argues that making relationship information accessible helps teams communicate with more context and less repetition.'},
    {heading:'Segment, retain and anticipate',text:'Grouping customers by relevant criteria supports more focused campaigns. Purchase history and regular follow-up can help teams recognise needs, respond to concerns and maintain the relationship after the initial sale.'},
    {heading:'Communicate consistently',text:'Reusable templates for quotations, proposals and customer communications can reduce repetitive work. The value comes from combining that efficiency with accurate customer information and an appropriate message.'},
    {heading:'Manage customer data responsibly',text:'The archived article also raises data privacy. CRM controls can support responsible data handling, but software alone does not establish compliance. Access, retention and communication preferences need appropriate organisational processes.'},
  ]},
  'how-erp-software-identifies-business-inefficiencies': {date:'2022-04-05',author:'Sridhar Ayalam',sections:[
    {heading:'Reduce repeated manual entry',text:'The original perspective identifies repetitive data entry as a source of delay and mistakes. A shared ERP system can reduce re-keying when processes, integrations and data ownership are designed together.'},
    {heading:'Connect teams and their information',text:'Disconnected departments can work from different versions of the same information. Shared workflows and records help expose hand-off delays and make it easier for teams and vendors to coordinate.'},
    {heading:'Make customer commitments more informed',text:'The article connects sales order and inventory visibility with customer service. Knowing stock availability and replenishment status helps teams provide clearer delivery information.'},
    {heading:'Consolidate the operational view',text:'Bringing departmental information together can reduce the time managers spend reconciling documents and spreadsheets. The practical aim is to identify inconsistencies and operational problems sooner, not to assume that installing software automatically resolves them.'},
  ]},
};
