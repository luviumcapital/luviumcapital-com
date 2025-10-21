import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { 
  DollarSign, 
  TrendingUp, 
  RefreshCw, 
  CheckCircle, 
  Car,
  Users,
  Shield,
  Target
} from "lucide-react";

export const Route = createFileRoute("/solution/")({
  component: Solution,
});

function Solution() {
  const modelSteps = [
    {
      icon: DollarSign,
      title: "Fund",
      description: "We provide floor plan finance of R3.5M per dealer",
      details: "Working capital injection to acquire quality vehicle inventory"
    },
    {
      icon: TrendingUp,
      title: "Grow",
      description: "Dealers acquire stock, increase sales, and generate revenue",
      details: "Enhanced inventory levels drive higher sales volume and profitability"
    },
    {
      icon: RefreshCw,
      title: "Repay",
      description: "Dealers repay monthly interest and principal upon sale or within 90 days",
      details: "Flexible repayment structure aligned with dealership cash flow cycles"
    }
  ];

  const dealershipCharacteristics = [
    "R2M+ monthly revenue demonstrating established operations",
    "RMI (Retail Motor Industry) or NADA affiliation ensuring industry standards",
    "Operational track record of at least 2 years in vehicle retail",
    "Established customer base and local market presence",
    "Proper business registration and tax compliance",
    "Suitable premises and operational infrastructure"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            A Hybrid of Commercial Returns and Developmental Impact
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our innovative floor plan finance solution bridges the gap between traditional 
            banking and underserved vehicle dealerships.
          </p>
        </div>
      </div>

      {/* Problem Statement */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-6">The Challenge</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                The current financing landscape leaves a significant gap for smaller, independent 
                vehicle dealerships. Traditional banks often view these businesses as too risky 
                or too small to warrant comprehensive floor plan financing solutions.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                This financing gap limits inventory capacity, restricts growth potential, and 
                prevents many dealerships from formalizing their operations. The result is 
                missed opportunities for both dealerships and the broader economy.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 mb-2">Market Gap</h3>
                <p className="text-red-700 text-sm">
                  R10 billion underserved used car market with limited access to working capital financing.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                alt="Independent car dealership lot"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">How Our Model Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple, three-step process that creates value for dealerships, investors, and communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modelSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <CardTitle className="text-xl text-navy-900">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 font-medium mb-3">{step.description}</p>
                    <p className="text-gray-500 text-sm">{step.details}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-50 px-6 py-3 rounded-full">
              <RefreshCw className="h-5 w-5 text-primary-600" />
              <span className="text-primary-800 font-medium">90-day maximum term with flexible early repayment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Target Dealerships */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-6">
                Target Dealership Profile
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We partner with established, professional dealerships that demonstrate 
                strong operational fundamentals and growth potential.
              </p>

              <div className="space-y-4">
                {dealershipCharacteristics.map((characteristic, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{characteristic}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-accent-50 border-accent-200">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Target className="h-6 w-6 text-accent-600 mr-3" />
                    <h3 className="font-semibold text-navy-900">Ideal Partner Profile</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Monthly revenue: R2M+</li>
                    <li>• Industry affiliation: RMI/NADA</li>
                    <li>• Operating history: 2+ years</li>
                    <li>• Legal compliance: Fully registered</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-primary-50 border-primary-200">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-primary-600 mr-3" />
                    <h3 className="font-semibold text-navy-900">Risk Mitigation</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Vehicle title retention</li>
                    <li>• Monthly on-site inspections</li>
                    <li>• Digital inventory tracking</li>
                    <li>• Comprehensive insurance coverage</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Car className="h-6 w-6 text-green-600 mr-3" />
                    <h3 className="font-semibold text-navy-900">Market Impact</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 57 dealerships to be financed</li>
                    <li>• 500+ jobs to be created</li>
                    <li>• 50+ businesses to be formalized</li>
                    <li>• Local economic development</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Learn More?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover how our innovative solution can deliver strong returns while 
            driving positive social impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <a href="/register" className="flex items-center">
                Access Investment Terms
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900">
              <a href="/contact" className="flex items-center">
                Schedule Consultation
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
