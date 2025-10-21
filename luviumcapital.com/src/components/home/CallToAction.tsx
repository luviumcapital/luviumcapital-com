import { ArrowRight, FileText } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { Link } from "@tanstack/react-router";

export function CallToAction() {
  return (
    <section className="py-20 bg-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Invest in South Africa's Future?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join institutional investors in unlocking capital for underserved markets. 
            Access our comprehensive investment documentation and term sheet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
              <Link to="/dashboard" className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                View Investment Documents
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600">
              <Link to="/contact" className="flex items-center gap-2">
                Schedule a Meeting
              </Link>
            </Button>
          </div>

          <div className="text-sm text-blue-100">
            <p>Minimum investment: R100,000 | Expected returns: JIBAR + 3%</p>
            <p className="mt-2">
              Contact us to discuss investment opportunities and access detailed documentation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
