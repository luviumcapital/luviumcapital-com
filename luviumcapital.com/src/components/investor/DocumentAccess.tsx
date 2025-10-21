import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import { FileText, Calendar, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function DocumentAccess() {
  const documents = [
    {
      title: "Investment Proposal",
      description: "Comprehensive overview of Luvium's floor plan finance model and market opportunity",
      size: "2.4 MB",
      type: "PDF",
    },
    {
      title: "Term Sheet",
      description: "Detailed investment terms including JIBAR + 3% returns and minimum R100,000 investment",
      size: "856 KB", 
      type: "PDF",
    },
    {
      title: "Due Diligence Pack",
      description: "Financial statements, risk assessments, and regulatory compliance documentation",
      size: "5.2 MB",
      type: "ZIP",
    },
    {
      title: "Market Analysis",
      description: "South African used car market analysis and dealership financing landscape",
      size: "1.8 MB",
      type: "PDF", 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center mb-2">
          <Calendar className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="font-semibold text-blue-800">Investment Documentation</h3>
        </div>
        <p className="text-blue-700 text-sm mb-3">
          Our comprehensive investment documentation is available to qualified institutional investors. 
          All documents are regularly updated and reflect our latest financial projections and market analysis.
        </p>
        <Link 
          to="/contact"
          className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800"
        >
          <Mail className="h-4 w-4 mr-1" />
          Contact us to request access
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-lg">{doc.title}</span>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {doc.type}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{doc.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{doc.size}</span>
                <Link to="/contact">
                  <Button size="sm">
                    <Mail className="h-4 w-4 mr-1" />
                    Request Access
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary-50 border-primary-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-navy-900 mb-3">Investment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-primary-800">Expected Returns:</span>
              <p className="text-gray-700">JIBAR + 3%</p>
            </div>
            <div>
              <span className="font-medium text-primary-800">Minimum Investment:</span>
              <p className="text-gray-700">R100,000</p>
            </div>
            <div>
              <span className="font-medium text-primary-800">Investment Term:</span>
              <p className="text-gray-700">90-day cycles</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
