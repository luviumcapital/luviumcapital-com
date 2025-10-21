import { TrendingUp, Users, Target, Shield, Building } from "lucide-react";
import { Card, CardContent } from "~/components/ui/Card";

export function KeyHighlights() {
  const highlights = [
    {
      icon: TrendingUp,
      title: "Strong Financial Returns",
      description: "Delivering approximately 9.7% returns through our innovative floor plan finance model.",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Users,
      title: "Financial Inclusion",
      description: "Formalizing SMEs and driving growth in underserved automotive retail markets.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Target,
      title: "Market Opportunity",
      description: "Addressing a R10 billion underserved used car market with significant growth potential.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Comprehensive inspection protocols and asset-backed security model ensure portfolio protection.",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      icon: Building,
      title: "Economic Development",
      description: "Strengthening local economies and creating sustainable employment opportunities.",
      color: "text-accent-600",
      bgColor: "bg-accent-100",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Why Choose Luvium Capital
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our unique approach combines commercial returns with developmental impact, 
            creating value for investors and communities alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${highlight.bgColor} mb-6`}>
                    <Icon className={`h-8 w-8 ${highlight.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
