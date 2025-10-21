import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { 
  Shield, 
  FileText, 
  Eye, 
  Lock, 
  CheckCircle,
  AlertTriangle,
  Scale,
  Users
} from "lucide-react";

export const Route = createFileRoute("/risk/")({
  component: Risk,
});

function Risk() {
  const riskMitigationStrategies = [
    {
      icon: Lock,
      title: "Asset Control",
      description: "Vehicle title retention by Luvium",
      details: "We maintain legal ownership of all financed vehicles until full repayment, ensuring asset security and recovery capability."
    },
    {
      icon: Eye,
      title: "Active Monitoring",
      description: "Monthly on-site inspections and digital ledgering",
      details: "Regular physical inspections combined with digital tracking systems provide real-time visibility into inventory status."
    },
    {
      icon: Shield,
      title: "Collateral Security",
      description: "Additional collateral held where available",
      details: "Supplementary security measures including personal guarantees and additional assets where appropriate."
    },
    {
      icon: FileText,
      title: "Insurance Coverage",
      description: "Comprehensive dealership stock insurance",
      details: "All financed inventory is covered by comprehensive insurance policies protecting against theft, damage, and other risks."
    }
  ];

  const complianceAreas = [
    {
      title: "NCR Registration",
      status: "Revived and Active",
      description: "National Credit Regulator license ensuring regulatory compliance"
    },
    {
      title: "Corporate Governance",
      status: "Clean Structure",
      description: "Transparent ownership and governance framework"
    },
    {
      title: "Financial Reporting",
      status: "IFRS Compliant",
      description: "International financial reporting standards adherence"
    },
    {
      title: "Risk Management",
      status: "Framework Active",
      description: "Comprehensive risk assessment and monitoring protocols"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            A Robust Model Built on Security and Accountability
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto">
            Our comprehensive risk management approach ensures investor protection 
            while maintaining operational excellence.
          </p>
        </div>
      </div>

      {/* Risk Mitigation Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Multi-Layered Risk Mitigation Strategy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our risk management framework combines traditional asset-backed security 
              with innovative monitoring and control mechanisms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {riskMitigationStrategies.map((strategy, index) => {
              const Icon = strategy.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg mr-4 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-red-600" />
                      </div>
                      <CardTitle className="text-xl text-navy-900">{strategy.title}</CardTitle>
                    </div>
                    <p className="text-gray-600 font-medium">{strategy.description}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm leading-relaxed">{strategy.details}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Risk Assessment Framework */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-6">
                Comprehensive Risk Assessment
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Every dealership partnership undergoes rigorous due diligence and ongoing 
                risk assessment to ensure portfolio quality and performance.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-navy-900">Financial Analysis</h3>
                    <p className="text-gray-600 text-sm">Comprehensive review of financial statements, cash flow, and operational metrics</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-navy-900">Operational Assessment</h3>
                    <p className="text-gray-600 text-sm">Evaluation of business premises, inventory management, and operational processes</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-navy-900">Credit History Review</h3>
                    <p className="text-gray-600 text-sm">Analysis of credit history, payment patterns, and industry standing</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-navy-900">Market Analysis</h3>
                    <p className="text-gray-600 text-sm">Local market conditions, competition analysis, and growth potential assessment</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                alt="Risk assessment and analysis"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Legal & Governance */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Legal Framework & Governance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Operating within a robust legal and regulatory framework ensures 
              transparency, accountability, and investor protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {complianceAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-navy-900">{area.title}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {area.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Monitoring & Reporting */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-navy-900 mb-6">
                Continuous Monitoring & Reporting
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our monitoring framework provides real-time visibility into portfolio 
                performance and risk indicators, enabling proactive management and 
                transparent reporting to investors.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-3">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                      <h3 className="font-semibold text-navy-900">Early Warning System</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Automated alerts for payment delays, inventory changes, and risk indicators
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-3">
                      <FileText className="h-5 w-5 text-blue-500 mr-2" />
                      <h3 className="font-semibold text-navy-900">Regular Reporting</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Monthly portfolio reports and quarterly investor updates
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <Card className="bg-white h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Scale className="h-6 w-6 text-primary-600 mr-2" />
                    Governance Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      Independent Board Oversight
                    </li>
                    <li className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      Regular Compliance Audits
                    </li>
                    <li className="flex items-center">
                      <Shield className="h-4 w-4 text-gray-400 mr-2" />
                      Risk Committee Structure
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-gray-400 mr-2" />
                      Transparent Reporting
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Invest with Confidence
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Our comprehensive risk management framework provides the security and 
            transparency institutional investors require.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-800 bg-accent-400 hover:bg-accent-500 transition-colors"
            >
              Review Investment Terms
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-slate-800 transition-colors"
            >
              Request Due Diligence Pack
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
