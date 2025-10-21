import { createFileRoute } from "@tanstack/react-router";
import { DocumentAccess } from "~/components/investor/DocumentAccess";
import { Card, CardContent } from "~/components/ui/Card";
import { TrendingUp, Users, Building, Shield } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
});

function Dashboard() {
  const highlights = [
    {
      icon: TrendingUp,
      title: "Expected Returns",
      value: "JIBAR + 3%",
      description: "Competitive returns with developmental impact"
    },
    {
      icon: Building,
      title: "Target Dealerships", 
      value: "57",
      description: "Independent dealerships to be financed"
    },
    {
      icon: Users,
      title: "Job Creation",
      value: "500+",
      description: "Direct and indirect employment opportunities"
    },
    {
      icon: Shield,
      title: "Asset Security",
      value: "100%",
      description: "Vehicle title retention and insurance coverage"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-900">
            Investor Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Access exclusive investment documentation and portfolio information.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{highlight.title}</p>
                      <p className="text-2xl font-semibold text-navy-900">{highlight.value}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{highlight.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Document Access */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">
            Investment Documentation
          </h2>
          <DocumentAccess />
        </div>

        {/* Contact Information */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-navy-900 mb-4">
              Need Assistance?
            </h3>
            <p className="text-gray-600 mb-4">
              Our investment team is available to answer any questions about our 
              floor plan finance solution or investment terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:admin@luviumcapital.com"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Email Our Team
              </a>
              <a
                href="tel:0615892144"
                className="inline-flex items-center justify-center px-4 py-2 border border-primary-600 text-sm font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
              >
                Call: 061 589 2144
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
