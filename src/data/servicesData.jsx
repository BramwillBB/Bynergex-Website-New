import { Zap, Shield, Settings, Activity, Network, CheckCircle, Database, BatteryCharging, ChartBar, LineChart, FileText, CloudCog, Cpu, Server, ServerCrash, Lightbulb, TrendingDown, Leaf, ShieldCheck, Battery, Power, Gauge } from 'lucide-react';

export const servicesData = [
  {
    id: 1,
    title: 'Power Systems Studies and Renewable Energy Grid Integration',
    desc: 'Protection coordination studies, arc flash analysis, grid code compliance (NRS 097), network impact assessments for solar PV and BESS connections, NERSA application support, wheeling framework advisory, BESS electrical integration design, power factor correction, and power quality assessments.',
    image: '/images/solar.png',
    slug: 'power-systems',
    detailHeroDesc: 'Specialist power systems analysis ensuring renewable energy installations connect safely, operate reliably, and comply with South African grid codes and municipal requirements.',
    detailBody: `
      <p>South Africa's embedded solar PV market for commercial, industrial, and agricultural clients is projected to reach R53 billion by 2030. Behind-the-meter battery energy storage will add another R10 billion. Every megawatt of new generation connected to the grid changes the fault current characteristics, voltage profiles, and protection coordination of the receiving network. Without proper engineering analysis, installations risk nuisance tripping, protection failures, voltage regulation problems, and regulatory non-compliance.</p>
      <p>Bynergex provides the independent power systems studies that utilities, municipalities, and asset owners require before embedded generation can be connected. Our work covers the full spectrum of analysis from protection coordination and arc flash through to grid code compliance and wheeling framework advisory. We use industry-standard modelling tools and deliver every study to the level of rigour required for utility approval and NERSA registration.</p>
      <p>We are a consulting-only practice. We do not sell solar panels, inverters, or batteries. We do not install. That independence means our analysis serves the client and the integrity of the network, not a product margin or an installation contract.</p>
    `,
    features: [
      { id: 1, icon: <ShieldCheck size={32} strokeWidth={1} />, title: "Protection Coordination", desc: "Fault current modelling and relay coordination studies ensuring protective devices operate in the correct sequence, isolating faults without cascading trips across the network." },
      { id: 2, icon: <Zap size={32} strokeWidth={1} />, title: "Arc Flash Analysis", desc: "Incident energy calculations in accordance with IEEE 1584, determining safe working distances and PPE requirements at every point in the electrical system." },
      { id: 3, icon: <Network size={32} strokeWidth={1} />, title: "Grid Code Compliance", desc: "Full NRS 097 assessments covering anti-islanding, voltage regulation, frequency response, power quality, and fault ride-through for LV and MV connected systems." },
      { id: 4, icon: <Battery size={32} strokeWidth={1} />, title: "BESS Integration", desc: "Battery energy storage electrical design covering inverter interface protection, DC bus architecture, grid-forming configuration, and coordination with existing network protection." }
    ],
    capabilities: [
      {
        name: 'Power Systems Analysis',
        items: [
          'Protection coordination studies for new and modified electrical installations',
          'Arc flash hazard analyses and incident energy calculations (IEEE 1584)',
          'Short-circuit studies verifying switchgear and cable fault ratings',
          'Load flow studies confirming voltage profiles under normal and contingency conditions',
          'Power quality assessments for harmonics, voltage unbalance, flicker, and transient events',
          'Power factor correction analysis, sizing, and capacitor bank specification'
        ]
      },
      {
        name: 'Renewable Energy Grid Connection',
        items: [
          'Grid code compliance assessments against NRS 097-2-1 (LV) and NRS 097-2-3 (MV)',
          'Network impact assessments for SSEG and IPP connections',
          'NERSA generation licence and registration application support',
          'Wheeling framework advisory covering connection agreements, metering, and system protection',
          'BESS electrical integration design including inverter interface and battery management coordination',
          'Municipal SSEG application preparation and technical documentation'
        ]
      }
    ],
    workflow: [
      { step: 'Step 1', title: 'Data Collection and Network Modelling', desc: 'We gather single-line diagrams, protection settings, equipment ratings, and utility network data, then build a validated power systems model of the installation and its grid connection point.' },
      { step: 'Step 2', title: 'Analysis and Compliance Verification', desc: 'We run the required studies including fault analysis, protection coordination, arc flash, load flow, and grid code compliance, then verify results against utility requirements and applicable standards.' },
      { step: 'Step 3', title: 'Report and Utility Submission', desc: 'We deliver a professional engineering report documenting all findings, compliance status, and recommendations. Where required, we prepare and support the formal submission to the utility or NERSA.' }
    ],
    faqs: [
      { q: "When is a protection coordination study required?", a: "A protection coordination study is required whenever a new generation source is connected to an existing electrical network, when switchgear is upgraded or replaced, when fault levels change due to utility network modifications, or when an arc flash risk assessment identifies that existing protection settings may not clear faults within safe time limits. Most municipalities and Eskom require a protection study before approving SSEG or IPP connections above a certain capacity threshold." },
      { q: "What is the difference between NRS 097-2-1 and NRS 097-2-3?", a: "NRS 097-2-1 applies to embedded generation systems connected at low voltage (up to 1 kV), which covers most commercial rooftop solar installations. NRS 097-2-3 applies to systems connected at medium voltage (above 1 kV), which includes larger industrial solar arrays, utility-scale projects, and systems connecting through dedicated MV switchgear. The MV standard has more stringent requirements for fault ride-through, voltage regulation, and active power curtailment." },
      { q: "Do I need a network impact assessment for a small rooftop solar system?", a: "It depends on the size of the system and your municipality's requirements. Many municipalities require a network impact assessment for systems above 350 kVA or when the combined SSEG capacity on a particular feeder exceeds a defined threshold. Even for smaller systems, a basic assessment is advisable to verify that the installation will not cause voltage rise, protection coordination issues, or reverse power flow problems at the point of connection." },
      { q: "What is the National Wheeling Framework and how does it affect my business?", a: "The National Wheeling Framework enables businesses to procure renewable energy from off-site generators and have it delivered through the existing Eskom or municipal grid. This creates opportunities for businesses that cannot install solar on their own premises but want to reduce electricity costs and carbon emissions through renewable energy procurement. The framework introduces technical complexity around connection agreements, metering configurations, network charges, and system protection that requires specialist engineering input." },
      { q: "Do you design and install the solar PV or BESS systems?", a: "No. Bynergex is a consulting-only practice. We perform the power systems studies, grid compliance assessments, and engineering analysis that verify whether a proposed installation will connect safely and compliantly. The physical design and installation are performed by solar EPC contractors. Our independence ensures that the analysis is impartial and that the results serve the asset owner, not the installer." }
    ]
  },
  {
    id: 2,
    title: 'Industrial Automation and SCADA Consulting',
    desc: 'SCADA system architecture review and design, PLC and HMI functional design specifications, control system audits, IT/OT network assessments and segmentation, OT cybersecurity gap assessments, control system migration planning, and telemetry system design.',
    image: '/images/plc_panel.png',
    slug: 'industrial-automation',
    detailHeroDesc: 'Independent control systems engineering for organisations that operate, maintain, or need to upgrade industrial automation and SCADA infrastructure. Vendor-agnostic. Process-grounded. Security-aware.',
    detailBody: `
      <p>Municipal water treatment plants, wastewater pump stations, food processing facilities, and manufacturing operations across the Western Cape depend on SCADA systems commissioned years ago. In most cases, the control system architecture has not been formally reviewed since installation. The operational environment has changed around them - IT and OT networks are now connected, remote access has become a cybersecurity exposure, and legacy controllers are running firmware that no longer receives security patches.</p>
      <p>Bynergex provides independent, vendor-agnostic control systems consulting. We draft functional design specifications that translate complex operational requirements into clear, auditable programming parameters. We bridge the gap between legacy hardware and modern telemetry protocols. We assess IT/OT network architectures and identify the segmentation failures that leave critical automated assets exposed.</p>
      <p>This is control systems engineering grounded in 26 years of hands-on experience with industrial platforms, process control logic, and the operational consequences of getting automation decisions wrong. We do not install or program. We design, specify, audit, and advise - ensuring that the integrators you appoint deliver exactly what your operation requires.</p>
    `,
    features: [
      { id: 1, icon: <CloudCog size={32} strokeWidth={1} />, title: "SCADA Architecture", desc: "System topology design, redundancy planning, and documented architectures that accurately reflect the physical installation and support future expansion." },
      { id: 2, icon: <Cpu size={32} strokeWidth={1} />, title: "PLC and HMI Specifications", desc: "Functional design specifications defining control logic, alarm setpoints, interlock conditions, and operator interface behaviour to a standard that supports competitive procurement." },
      { id: 3, icon: <Shield size={32} strokeWidth={1} />, title: "OT Cybersecurity", desc: "IT/OT network assessments, vulnerability gap analysis, access control audits, and segmentation strategies aligned with IEC 62443 principles." },
      { id: 4, icon: <Settings size={32} strokeWidth={1} />, title: "Control System Migration", desc: "Risk-managed upgrade planning for legacy platforms, with phased cutover strategies that minimise production disruption and unplanned downtime." }
    ],
    capabilities: [
      {
        name: 'Control System Design',
        items: [
          'Functional Design Specifications (FDS) for PLC and HMI programming',
          'SCADA system architecture review and topology engineering',
          'Telemetry and remote monitoring system design',
          'Industrial communication protocol design (Modbus, DNP3, IEC 61850, OPC UA, MQTT)',
          'Control system migration and legacy platform upgrade planning'
        ]
      },
      {
        name: 'OT and Network Security',
        items: [
          'IT/OT network segmentation assessment and architecture design',
          'Vulnerability and cybersecurity gap assessments',
          'Remote access control evaluation and remediation',
          'Industrial protocol traffic analysis and anomaly identification',
          'Prioritised remediation roadmaps aligned with IEC 62443'
        ]
      }
    ],
    workflow: [
      { step: 'Step 1', title: 'System Architecture Audit', desc: 'We document the existing control system, verify it against the physical installation, and identify gaps in architecture, security, and lifecycle status.' },
      { step: 'Step 2', title: 'Specification and Design', desc: 'We produce functional design specifications, network architecture drawings, and remediation roadmaps that define exactly what needs to be built, upgraded, or secured.' },
      { step: 'Step 3', title: 'Review and Handover', desc: 'We deliver the completed engineering deliverables, walk your team through the findings, and provide procurement-ready documentation for contractor appointment.' }
    ],
    faqs: [
      { q: "Do you install or program PLCs?", a: "No. Bynergex is a consulting-only practice. We design the architecture, draft the specifications, and audit the results. Installation and programming are performed by appointed integrators working from our specifications. This separation ensures independent quality assurance without conflict of interest." },
      { q: "What is an IT/OT network assessment?", a: "It is a structured evaluation of the boundary between your corporate IT network and your operational technology (OT) plant network. We identify whether industrial control traffic is properly isolated from business network traffic, assess remote access controls, and map uncontrolled communication paths that could allow a cyberattack to reach your SCADA system from the corporate network." },
      { q: "Can you help with upgrading legacy control systems?", a: "Yes. We develop control system migration plans that outline phased approaches to replace obsolete PLCs, HMIs, and SCADA servers. Each phase is designed to minimise production disruption, with risk-managed cutover strategies and rollback procedures. We also produce the functional specifications that allow you to competitively tender the integration work." },
      { q: "What industries do you serve?", a: "We work with municipalities and water utilities, food and beverage manufacturers, cold storage and logistics operators, wine cellars and agricultural processing facilities, and mining operations. Any organisation that operates a SCADA system or industrial control network is a potential client." },
      { q: "What does a SCADA audit deliver?", a: "A prioritised, site-specific remediation roadmap. The audit assesses documentation accuracy, hardware lifecycle status, software currency, alarm management effectiveness, network security posture, and backup integrity. The output tells you what to fix first, what can wait, and what the cost and risk implications are of each decision." }
    ]
  },
  {
    id: 3,
    title: 'Critical Power and Data Centre Electrical Infrastructure',
    desc: 'UPS system sizing and lifecycle management, generator sizing, ATS and synchronisation system design, data centre MV/LV power distribution, PDU specification, Tier classification consulting, PUE optimisation, and telecommunications site power design.',
    image: '/images/ups.png',
    slug: 'critical-power',
    detailHeroDesc: 'Electrical infrastructure consulting for facilities where power continuity is non-negotiable. Independent design, specification, and audit services for data centres, telecommunications, healthcare, and mission-critical industrial operations.',
    detailBody: `
      <p>South Africa's data centre market is valued at over USD 2.5 billion and is projected to exceed USD 5 billion by 2031. Teraco, Vantage, Africa Data Centres, and the major hyperscalers are all expanding their South African footprint, with Cape Town emerging as a key growth node alongside Johannesburg. Beyond data centres, hospitals, financial trading floors, telecommunications networks, and manufacturing facilities with critical process loads all share the same fundamental requirement: electrical power that does not fail.</p>
      <p>Designing electrical infrastructure for these environments is fundamentally different from standard commercial or industrial work. A Tier III data centre requires concurrent maintainability, meaning every electrical component from utility intake to server rack can be maintained without interrupting the critical load. A Tier IV facility requires fault tolerance, meaning a single component failure causes zero impact on the IT load. Achieving these standards demands rigorous engineering across power distribution, standby generation, uninterruptible power supply systems, and transfer switching.</p>
      <p>Bynergex brings 26 years of experience in telecommunications power systems, UPS lifecycle management, and standby power design. We do not install equipment or hold supply agreements with manufacturers. Our specifications and audit findings are independent, ensuring that procurement decisions are driven by engineering merit, not commercial relationships.</p>
    `,
    features: [
      { id: 1, icon: <BatteryCharging size={32} strokeWidth={1} />, title: "UPS Systems", desc: "Topology selection, battery technology assessment, autonomy calculations, and end-of-life replacement planning across VRLA-AGM, lithium-ion, and nickel-zinc chemistries." },
      { id: 2, icon: <Power size={32} strokeWidth={1} />, title: "Standby Generation", desc: "Generator sizing with load step analysis, fuel system specification, exhaust and ventilation engineering, and acoustic treatment for noise-sensitive environments." },
      { id: 3, icon: <Server size={32} strokeWidth={1} />, title: "Data Centre Design", desc: "MV and LV power distribution architecture, PDU specification, static transfer switch configuration, and busway distribution for high-density rack environments." },
      { id: 4, icon: <Gauge size={32} strokeWidth={1} />, title: "PUE Optimisation", desc: "Power Usage Effectiveness analysis targeting electrical distribution losses, transformer efficiency, and UPS operating modes to reduce facility energy overhead." }
    ],
    capabilities: [
      {
        name: 'Critical Power Systems',
        items: [
          'UPS system sizing, specification, and lifecycle management',
          'Generator sizing and procurement support with load step analysis',
          'Automatic transfer switch and synchronisation system design',
          'Critical power system audits identifying single points of failure',
          'Protection coordination for parallel generator and UPS configurations',
          'Telecommunications site power design covering rectifiers and DC distribution'
        ]
      },
      {
        name: 'Data Centre Electrical Infrastructure',
        items: [
          'MV and LV power distribution architecture for Tier II through Tier IV facilities',
          'Power distribution unit specification and rack-level power chain design',
          'Static transfer switch configuration for redundant power path delivery',
          'Tier classification consulting aligned with Uptime Institute standards',
          'Power Usage Effectiveness analysis and optimisation strategies',
          'Capacity planning and expansion design for phased facility growth'
        ]
      },
      {
        name: 'Specialist Applications',
        items: [
          'Hospital and healthcare facility essential power system design',
          'Financial institution trading floor and IT room power architecture',
          'Broadcast and media facility uninterruptible power specification',
          'Cold chain and pharmaceutical storage power continuity design',
          'Renewable energy integration for critical facilities including solar PV and BESS with backup coordination'
        ]
      }
    ],
    workflow: [
      { step: 'Step 1', title: 'Facility Assessment and Load Analysis', desc: 'We survey the existing electrical infrastructure, document the current power chain from utility intake to critical load, measure actual demand, and identify single points of failure, capacity constraints, and redundancy gaps.' },
      { step: 'Step 2', title: 'Design and Specification', desc: 'We produce detailed engineering specifications for UPS, generator, ATS, and power distribution systems, sized for current loads and planned growth. Every specification is procurement-ready and vendor-neutral.' },
      { step: 'Step 3', title: 'Review, Commissioning Support, and Handover', desc: 'We deliver the completed engineering package, support the client through contractor procurement, and provide commissioning oversight to verify that installed systems meet the design intent and tier requirements.' }
    ],
    faqs: [
      { q: "What is the difference between Tier III and Tier IV?", a: "Tier III requires concurrent maintainability. Every component in the power and cooling chain can be removed from service for planned maintenance without interrupting the critical load. This is achieved through redundant distribution paths and N+1 component redundancy. Tier IV requires fault tolerance, meaning an unplanned failure of any single component causes no impact on the IT load. This requires 2N or 2N+1 redundancy with fully independent distribution paths. The cost and complexity difference between Tier III and Tier IV is substantial, and the right choice depends on the business criticality and downtime cost of the facility." },
      { q: "Do you specify particular UPS or generator brands?", a: "No. Our specifications are vendor-neutral and performance-based. We define the technical requirements including topology, power rating, autonomy, efficiency, footprint, and environmental constraints. You then obtain competitive quotes from multiple suppliers against our specification. This ensures you get the best commercial outcome without being locked into a single manufacturer." },
      { q: "What is Power Usage Effectiveness and why does it matter?", a: "PUE is the ratio of total facility energy consumption to IT equipment energy consumption. A PUE of 2.0 means the facility uses twice as much total energy as the IT load alone, with the overhead going to cooling, lighting, power distribution losses, and UPS inefficiency. Best-in-class facilities target a PUE below 1.3. Reducing PUE directly reduces operating costs. For a facility consuming 10 MW of IT load, improving PUE from 1.8 to 1.4 eliminates 4 MW of overhead energy, which at current South African tariffs represents millions of rands per year in savings." },
      { q: "Can you audit an existing critical power installation?", a: "Yes. A critical power audit assesses the current state of your UPS, generator, ATS, and distribution infrastructure. We verify protection coordination, test redundancy configurations against the design intent, identify components that have reached or are approaching end of life, assess battery health and remaining capacity, and benchmark the installation against the applicable tier standard. The output is a prioritised remediation plan with cost estimates and risk rankings." },
      { q: "Do you provide installation or maintenance services?", a: "No. Bynergex is a consulting-only practice. We design, specify, and audit. We do not install, maintain, or supply equipment. This independence ensures our recommendations are driven by engineering analysis and the client's operational requirements, not by installation margins or supplier agreements." }
    ]
  },
  {
    id: 4,
    title: 'Energy Efficiency Auditing and Demand-Side Management',
    desc: 'Energy audits (Level 1 to Level 3), power factor correction analysis, load profiling and demand management, tariff optimisation, SANS 204 compliance, M&V baselining (SANS 50010), LED retrofit feasibility, and GHG emissions quantification for carbon tax and CBAM reporting.',
    image: '/images/power_meter.png',
    slug: 'energy-efficiency',
    detailHeroDesc: 'Structured, measurement-based energy management that identifies where your electricity spend is going and how to reduce it. Independent analysis. Quantified savings. Actionable recommendations.',
    detailBody: `
      <p>Electricity prices in South Africa have increased by more than 400% in real terms over fifteen years. For many commercial and industrial businesses, electricity is now the second or third largest operating cost. Yet most facilities have never had their electricity usage professionally analysed. The result is systematic overpayment that compounds year after year - poor power factor generating reactive energy penalties, wrong tariff structures costing thousands per month, oversized motors consuming more energy than they should, and demand peaks setting billing charges that persist for the entire billing period.</p>
      <p>Bynergex conducts structured energy audits that measure where electricity is being consumed, identify where it is being wasted, and quantify the savings available from each intervention. Our methodology follows SANS 50010 and the International Performance Measurement and Verification Protocol, ensuring that findings are credible, bankable, and defensible. We do not sell equipment or installation services. Our recommendations are based on engineering analysis, not product margins.</p>
      <p>The combined savings potential from addressing common inefficiencies typically ranges from 15% to 35% of the total electricity bill. For a facility spending R100,000 per month, that represents R180,000 to R420,000 per year in recoverable value. Most interventions pay for themselves within 12 to 24 months.</p>
    `,
    features: [
      { id: 1, icon: <Zap size={32} strokeWidth={1} />, title: "Energy Auditing", desc: "Level 1 walkthrough to Level 3 investment-grade audits with full financial analysis, payback calculations, and lifecycle cost comparisons." },
      { id: 2, icon: <TrendingDown size={32} strokeWidth={1} />, title: "Tariff Optimisation", desc: "Load profile analysis against all available tariff options to identify the most cost-effective structure. No capital required. Immediate implementation." },
      { id: 3, icon: <Activity size={32} strokeWidth={1} />, title: "Power Factor Correction", desc: "Measurement, analysis, and specification of capacitor bank or active filter solutions to eliminate reactive energy penalties. Typical payback: 12 to 24 months." },
      { id: 4, icon: <Leaf size={32} strokeWidth={1} />, title: "Carbon and Compliance", desc: "GHG emissions quantification for carbon tax compliance and EU CBAM reporting. SANS 204 energy modelling for new building developments." }
    ],
    capabilities: [
      {
        name: 'Energy Auditing and Analysis',
        items: [
          'Level 1 walkthrough audits benchmarking consumption against industry norms',
          'Level 2 detailed audits with measurement and analysis of major energy-consuming systems',
          'Level 3 investment-grade audits with financial modelling, IRR, and payback analysis',
          'Load profiling using interval meter data to map consumption patterns across time',
          'Power quality assessments identifying harmonics, voltage unbalance, and flicker'
        ]
      },
      {
        name: 'Demand-Side Management',
        items: [
          'Power factor correction analysis, sizing, and capacitor bank specification',
          'Demand peak analysis and load staggering strategies to reduce demand charges',
          'LED retrofit feasibility studies with lux modelling and payback projections',
          'Tariff structure analysis and optimisation across Eskom and municipal tariff options',
          'Measurement and Verification baselining in accordance with SANS 50010 and IPMVP'
        ]
      },
      {
        name: 'Regulatory and Compliance Support',
        items: [
          'SANS 204 energy modelling for SANS 10400-XA building compliance',
          'GHG emissions quantification for South African Carbon Tax Act reporting',
          'EU Carbon Border Adjustment Mechanism data preparation for exporting manufacturers',
          'Green Star SA rating support and ESG energy reporting assistance'
        ]
      }
    ],
    workflow: [
      { step: 'Step 1', title: 'Baseline Measurement', desc: 'We install calibrated measurement equipment at your main incomer and key distribution points to capture a minimum 30-day load profile, power factor, demand peaks, and power quality data.' },
      { step: 'Step 2', title: 'Analysis and Modelling', desc: 'We analyse the measured data against your tariff structure, benchmark your consumption against industry norms, and model the financial impact of each identified efficiency intervention.' },
      { step: 'Step 3', title: 'Report and Recommendations', desc: 'We deliver a prioritised audit report with quantified savings for each intervention, payback periods, implementation sequences, and procurement-ready specifications where applicable.' }
    ],
    faqs: [
      { q: "What is the difference between a Level 1, Level 2, and Level 3 energy audit?", a: "A Level 1 walkthrough audit provides a broad overview of consumption patterns and identifies obvious waste. A Level 2 detailed audit adds on-site measurement and engineering analysis of major systems such as motors, compressed air, lighting, and HVAC. A Level 3 investment-grade audit provides the financial rigour needed to justify capital expenditure, including detailed payback calculations, internal rates of return, and lifecycle cost comparisons. The right level depends on your objectives and the scale of potential investment." },
      { q: "How quickly does power factor correction pay for itself?", a: "Typically 12 to 24 months. Reactive energy penalties appear as a separate line item on most commercial and industrial electricity bills. A power factor correction system eliminates or substantially reduces this charge from the first month of operation. The payback depends on the severity of the existing power factor problem and the size of the installation." },
      { q: "What is tariff optimisation and does it cost anything to implement?", a: "Tariff optimisation is the process of analysing your actual load profile against all available Eskom or municipal tariff structures to identify the most cost-effective option for your consumption pattern. Switching tariffs requires no capital investment. The change can be implemented within one billing cycle. Many businesses are on the wrong tariff simply because nobody has reviewed it since the supply was first connected." },
      { q: "Do you install the energy efficiency equipment you recommend?", a: "No. Bynergex is a consulting-only practice. We measure, analyse, and specify. We produce procurement-ready specifications that allow you to obtain competitive quotes from suppliers and installers. Our independence means our recommendations are based on engineering analysis, not on what we have in stock or prefer to install." },
      { q: "What is CBAM and why does it affect South African manufacturers?", a: "The EU Carbon Border Adjustment Mechanism requires importers of certain goods into the European Union to report the embedded greenhouse gas emissions in those products. South African manufacturers exporting steel, aluminium, cement, fertiliser, electricity, or hydrogen to EU markets need verified emissions data. The electricity component of those emissions starts with an energy audit that quantifies consumption and calculates the associated carbon intensity. Getting ahead of this requirement protects market access and avoids last-minute compliance pressure." }
    ]
  }
];
