import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  MapPin, 
  Award,
  Target,
  Heart,
  Globe
} from "lucide-react";

export const Route = createFileRoute("/impact/")({
  component: Impact,
});

function Impact() {
  const impactMetrics = [
    {
      icon: Building2,
      number: "57",
      label: "Dealerships Financed",
      description: "Independent dealerships receiving working capital support"
    },
    {
      icon: Users,
      number: "500+",
      label: "Jobs Created",
      description: "Direct and indirect employment opportunities generated"
    },
    {
      icon: Award,
      number: "50+",
      label: "Businesses Formalized",
      description: "SMEs transitioning to formal business operations"
    },
    {
      icon: MapPin,
      number: "Multiple",
      label: "Communities Served",
      description: "Rural and underserved regions across South Africa"
    }
  ];

  const esgPillars = [
    {
      icon: Heart,
      title: "Social Impact",
      description: "Creating meaningful employment and supporting local communities",
      initiatives: [
        "Job creation in underserved areas",
        "SME formalization and growth",
        "Skills development and training",
        "Community economic empowerment"
      ]
    },
    {
      icon: Globe,
      title: "Economic Development",
      description: "Driving inclusive economic growth and transformation",
      initiatives: [
        "Local spend stimulation",
        "Financial inclusion advancement",
        "Market access improvement",
        "Value chain strengthening"
      ]
    },
    {
      icon: Target,
      title: "Governance Excellence",
      description: "Maintaining highest standards of corporate governance",
      initiatives: [
        "Transparent reporting practices",
        "Robust risk management",
        "Regulatory compliance",
        "Stakeholder engagement"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Driving Inclusive Growth and Economic Transformation
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Our investment model delivers measurable social impact while generating 
            attractive financial returns for institutional investors.
          </p>
        </div>
      </div>

      {/* PIC Alignment */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-6">
                Aligned with PIC's Developmental Investment Objectives
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Luvium Capital's floor plan finance solution directly supports the Public 
                Investment Corporation's mandate to drive economic transformation and 
                inclusive growth across South Africa.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our model addresses key developmental priorities including job creation, 
                SME support, and financial inclusion while maintaining commercial viability 
                and competitive returns for investors.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-3">Key Alignment Areas</h3>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Economic transformation and B-BBEE advancement</li>
                  <li>• SME development and formalization</li>
                  <li>• Job creation in underserved communities</li>
                  <li>• Financial inclusion and market access</li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                alt="Community development and economic growth"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Indicators */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Measurable Impact Indicators</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our success is measured not just in financial returns, but in the tangible 
              positive impact we create across communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-navy-900 mb-2">{metric.number}</div>
                    <h3 className="text-lg font-semibold text-navy-900 mb-3">{metric.label}</h3>
                    <p className="text-gray-600 text-sm">{metric.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ESG Framework */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Our ESG Framework</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Environmental, Social, and Governance principles are embedded in every 
              aspect of our business model and investment approach.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {esgPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary-100 rounded-lg mb-4 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <CardTitle className="text-xl text-navy-900">{pillar.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{pillar.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pillar.initiatives.map((initiative, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700 text-sm">{initiative}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-2">Industry Recognition</h3>
            </div>
            <blockquote className="text-lg text-gray-700 italic mb-6">
              "Luvium Capital represents the kind of innovative financial solution that South Africa 
              needs to drive inclusive economic growth. Their model successfully combines commercial 
              viability with meaningful developmental impact."
            </blockquote>
            <p className="text-gray-500 text-sm">
              - Industry Professional (Testimonial placeholder for future partner quote)
            </p>
          </div>
        </div>
      </section>

      {/* Development Objectives */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy-900 text-center mb-12">
            Our Development Objectives
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  Strengthening Local Economies
                </h3>
                <p className="text-gray-700 mb-4">
                  By providing working capital to underserved dealerships, we enable them to 
                  increase inventory, expand operations, and contribute more significantly to 
                  their local economies.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Increased local procurement and spending</li>
                  <li>• Enhanced tax base for municipalities</li>
                  <li>• Improved economic multiplier effects</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  Stimulating Employment
                </h3>
                <p className="text-gray-700 mb-4">
                  Our financing enables dealerships to expand their operations, creating direct 
                  employment opportunities and supporting indirect job creation throughout the 
                  automotive value chain.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Direct employment at dealership level</li>
                  <li>• Support services and suppliers</li>
                  <li>• Skills development and training opportunities</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Invest in South Africa's Future
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join us in creating positive social impact while earning competitive returns 
            through our developmental investment approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-navy-900 bg-accent-400 hover:bg-accent-500 transition-colors"
            >
              Access Investment Terms
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-navy-900 transition-colors"
            >
              Schedule Discussion
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
