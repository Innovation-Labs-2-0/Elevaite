export const sampleIdeas = [
  {
    id: "idea-1",
    createdBy: "user-1",
    fullName: "Amit Sharma",
    serviceline: "Digital Engineering",
    bu: "BFSI",
    customerName: "ABC Bank",
    role: "Senior Developer",
    ideaTitle: "AI-Based Fraud Detection Engine",

    problem:
      "Financial institutions struggle to detect real-time fraud due to high transaction volumes and rule-based systems causing false positives.",

    painPoints:
      "High false positives, delayed fraud alerts, manual investigation overhead",

    impactedAreas:
      "Transaction Monitoring, Risk Management, Compliance Operations",

    availableData: "Yes",

    solution:
      "An AI-powered fraud detection engine using machine learning models trained on historical transaction data to flag suspicious activities in real time.",

    benefits:
      "Reduced fraud losses, faster detection, improved customer trust",

    benefittedAreas: [
      "Cost Reduction",
      "Risk Reduction",
      "Customer Experience",
      "Innovation Enablement",
    ],

    techStack: "Python, FastAPI, Kafka, TensorFlow, AWS",

    collateralsLink: "https://drive.google.com/fraud-collateral",
    architectureLink: "https://miro.com/fraud-architecture",

    status: "approved",

    judgments: {
      reviewer1: {
        business: 4,
        operational: 5,
        technical: 4,
      },
      reviewer2: {
        business: 5,
        operational: 4,
        technical: 4,
      },
    },
  },

  {
    id: "idea-2",
    fullName: "Sneha Patil",
    serviceline: "Consulting",
    bu: "Healthcare",
    customerName: "MedCare Hospitals",
    role: "Business Analyst",
    ideaTitle: "Predictive Patient No-Show Management",

    problem:
      "Hospitals face revenue loss and resource wastage due to high patient no-show rates.",

    painPoints:
      "Inefficient scheduling, unused doctor slots, reduced patient throughput",

    impactedAreas:
      "Appointment Scheduling, Hospital Operations",

    availableData: "Partially Available",

    solution:
      "A predictive analytics system that forecasts patient no-shows and dynamically adjusts scheduling or sends smart reminders.",

    benefits:
      "Improved resource utilization, reduced revenue loss",

    benefittedAreas: [
      "Revenue Growth",
      "Productivity Improvement",
      "Customer Experience",
    ],

    techStack: "React, Python, Scikit-learn, PostgreSQL",

    collateralsLink: "https://drive.google.com/healthcare-collateral",
    architectureLink: "https://draw.io/healthcare-architecture",

    status: "reviewing",

    judgments: {
      reviewer1: {
        business: 4,
        operational: 4,
        technical: 3,
      },
    },
  },

  {
    id: "idea-3",
    fullName: "Rahul Verma",
    serviceline: "Cloud & Infrastructure",
    bu: "Retail",
    customerName: "ShopFast",
    role: "Cloud Architect",
    ideaTitle: "Auto-Scaling Retail Demand Forecast Platform",

    problem:
      "Retail platforms face unpredictable traffic spikes during promotions, leading to downtime or over-provisioning.",

    painPoints:
      "Manual scaling, cloud cost overruns, performance degradation",

    impactedAreas:
      "Cloud Infrastructure, Cost Management, Customer Experience",

    availableData: "Yes",

    solution:
      "A demand forecasting system that predicts traffic surges and auto-scales cloud infrastructure proactively.",

    benefits:
      "Lower cloud costs, improved uptime, better user experience",

    benefittedAreas: [
      "Cost Reduction",
      "Productivity Improvement",
      "Customer Experience",
    ],

    techStack: "AWS, Terraform, Python, React, Prometheus",

    collateralsLink: "https://drive.google.com/retail-collateral",
    architectureLink: "https://miro.com/retail-architecture",

    status: "rejected",

    judgments: {}, // no reviews yet
  },

  {
    id: "idea-4",
    fullName: "Rahul Verma",
    serviceline: "Cloud & Infrastructure",
    bu: "Retail",
    customerName: "ShopFast",
    role: "Cloud Architect",
    ideaTitle: "Auto-Scaling Retail Demand Forecast Platform",
  
    problem:
      "Retail platforms face unpredictable traffic spikes during promotions, leading to downtime or over-provisioning.",
  
    painPoints:
      "Manual scaling, cloud cost overruns, performance degradation",
  
    impactedAreas:
      "Cloud Infrastructure, Cost Management, Customer Experience",
  
    availableData: "Yes",
  
    solution:
      "A demand forecasting system that predicts traffic surges and auto-scales cloud infrastructure proactively.",
  
    benefits:
      "Lower cloud costs, improved uptime, better user experience",
  
    benefittedAreas: [
      "Cost Reduction",
      "Productivity Improvement",
      "Customer Experience",
    ],
  
    techStack: "AWS, Terraform, Python, React, Prometheus",
  
    collateralsLink: "https://drive.google.com/retail-collateral",
    architectureLink: "https://miro.com/retail-architecture",
  
    status: "approved for hackathon",
  
    judgments: {
      reviewer1: {
        business: 5,
        operational: 5,
        technical: 5,
      },
    }, // no reviews yet
  },
];
