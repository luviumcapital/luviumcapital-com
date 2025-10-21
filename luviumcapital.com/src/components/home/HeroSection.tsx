import { ArrowRight, Play } from "lucide-react";
import { Button } from "~/components/ui/Button";
import { Link } from "@tanstack/react-router";

export function HeroSection() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1562141961-d0a5d8d82a13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-navy-900/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Unlocking Capital for 
            <span className="text-accent-400 block">Underserved Vehicle Dealerships</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Luvium provides a scalable floor plan finance solution for underserved vehicle dealerships 
            in rural and underserved regions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-4">
              <Link to="/register" className="flex items-center gap-2">
                View Investment Terms
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-navy-900">
              <Link to="/contact" className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Learn More
              </Link>
            </Button>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-400">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-400 mb-2">~9.7%</div>
              <div className="text-gray-200 text-lg">Expected Returns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-400 mb-2">57</div>
              <div className="text-gray-200 text-lg">Target Dealerships</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-400 mb-2">500+</div>
              <div className="text-gray-200 text-lg">Jobs Created</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
