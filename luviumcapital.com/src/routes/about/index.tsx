import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "~/components/ui/Card";
import { Users, Target, Award, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/about/")({
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-navy-900 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Luvium Capital
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Pioneering financial inclusion through innovative floor plan finance solutions 
            for underserved vehicle dealerships across South Africa.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Luvium Capital was founded to address a critical gap in the South African automotive 
                finance market. We recognized that independent vehicle dealerships in rural and 
                underserved regions were being left behind by traditional financial institutions.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our mission is to unlock capital for these underserved dealerships, enabling them 
                to grow their businesses, formalize their operations, and contribute to local 
                economic development. We believe in the power of financial inclusion to transform 
                communities and create sustainable employment opportunities.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Through our innovative floor plan finance model, we provide dealerships with the 
                working capital they need while offering institutional investors attractive returns 
                backed by tangible assets.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                alt="Modern office building representing financial services"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Led by experienced professionals with deep expertise in automotive retail 
              and financial services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="text-white text-4xl" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">Experienced Leadership</h3>
                  <p className="text-primary-600 font-semibold mb-4">Automotive & Financial Services Experts</p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Our leadership team brings together decades of combined experience in the automotive retail 
                    sector and financial services industry. With deep understanding of dealership operations, 
                    market dynamics, and the unique challenges facing independent vehicle dealers across South Africa.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Through extensive hands-on experience in dealership management, strategic acquisitions, and 
                    financial product development, our team has developed innovative solutions that directly address 
                    real market needs and operational complexities in the automotive finance sector.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Our Vision & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Committed to financial inclusion, SME growth, and sustainable job creation 
              across South Africa's automotive sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900 mb-3">Financial Inclusion</h3>
                <p className="text-gray-600 text-sm">
                  Bridging the gap between traditional finance and underserved dealerships.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900 mb-3">SME Growth</h3>
                <p className="text-gray-600 text-sm">
                  Empowering small and medium enterprises to scale and formalize their operations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-accent-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8 text-accent-600" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900 mb-3">Job Creation</h3>
                <p className="text-gray-600 text-sm">
                  Creating sustainable employment opportunities in local communities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900 mb-3">Excellence</h3>
                <p className="text-gray-600 text-sm">
                  Maintaining the highest standards in financial services and risk management.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Partner with Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join us in transforming South Africa's automotive retail landscape through 
            innovative financial solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="/register"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary-600 transition-colors"
            >
              Investor Access
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
