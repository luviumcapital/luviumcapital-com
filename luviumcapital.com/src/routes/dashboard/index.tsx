import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DocumentAccess } from "~/components/investor/DocumentAccess";
import { Card, CardContent } from "~/components/ui/Card";
import { TrendingUp, Users, Building, Shield, LogOut, Lock } from "lucide-react";
import toast from "react-hot-toast";

export const Route = createFileRoute("/dashboard/")({ component: Dashboard });

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{name: string; email: string; role: string} | null>(null);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadForm, setLeadForm] = useState({ fullName: "", phone: "", company: "", interest: "" });

  useEffect(() => {
    const token = localStorage.getItem("luvium_token");
    const userData = localStorage.getItem("luvium_user");
    if (!token || !userData) {
      navigate({ to: "/login" });
      return;
    }
    try {
      setUser(JSON.parse(userData));
      const submitted = localStorage.getItem("luvium_lead_submitted");
      if (submitted) setLeadSubmitted(true);
    } catch {
      navigate({ to: "/login" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("luvium_token");
    localStorage.removeItem("luvium_user");
    toast.success("Signed out successfully");
    navigate({ to: "/login" });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.fullName || !leadForm.phone) {
      toast.error("Please provide your name and phone number");
      return;
    }
    setLeadLoading(true);
    try {
      const res = await fetch("/trpc/contact.submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ json: {
          name: leadForm.fullName,
          email: user?.email || "",
          message: `INVESTOR DOC REQUEST | Phone: ${leadForm.phone} | Company: ${leadForm.company} | Interest: ${leadForm.interest}`,
        }}),
      });
      localStorage.setItem("luvium_lead_submitted", "true");
      setLeadSubmitted(true);
      toast.success("Thank you! Document access granted.");
    } catch {
      toast.error("Submission failed. Please try again.");
    } finally {
      setLeadLoading(false);
    }
  };

  if (!user) return null;

  const highlights = [
    { icon: TrendingUp, title: "Expected Returns", value: "JIBAR + 3%", description: "Competitive returns with developmental impact" },
    { icon: Building, title: "Target Dealerships", value: "57", description: "Independent dealerships to be financed" },
    { icon: Users, title: "Job Creation", value: "500+", description: "Direct and indirect employment opportunities" },
    { icon: Shield, title: "Asset Security", value: "100%", description: "Vehicle title retention and insurance coverage" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Luvium Capital — Investor Portal</h1>
          <p className="text-primary-200 text-sm">Welcome, {user.name}</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-primary-200 hover:text-white transition-colors">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{h.title}</p>
                      <p className="text-2xl font-semibold text-navy-900">{h.value}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{h.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Investor Lead Gate */}
        {!leadSubmitted ? (
          <Card className="mb-8 border-2 border-primary-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Lock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-navy-900">Investment Documentation — Access Required</h2>
                  <p className="text-sm text-gray-500">Please provide your details to unlock the investor pack. Your information is kept strictly confidential.</p>
                </div>
              </div>
              <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input value={leadForm.fullName} onChange={e => setLeadForm({...leadForm, fullName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Your full name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input value={leadForm.phone} onChange={e => setLeadForm({...leadForm, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="+27 XX XXX XXXX" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company / Organisation</label>
                  <input value={leadForm.company} onChange={e => setLeadForm({...leadForm, company: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="PIC, SEFA, Family Office, etc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Investment Interest</label>
                  <select value={leadForm.interest} onChange={e => setLeadForm({...leadForm, interest: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="">Select range</option>
                    <option>R1M – R10M</option>
                    <option>R10M – R50M</option>
                    <option>R50M – R100M</option>
                    <option>R100M+</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" disabled={leadLoading} className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors disabled:opacity-50">
                    {leadLoading ? "Submitting..." : "Unlock Investor Documents"}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">Investment Documentation</h2>
            <DocumentAccess />
          </div>
        )}

        {/* Contact */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-navy-900 mb-2">Need Assistance?</h3>
            <p className="text-gray-600 mb-4">Our investment team is available to answer any questions about our floor plan finance solution.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:admin@luviumcapital.com" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">Email Our Team</a>
              <a href="tel:0615892144" className="inline-flex items-center justify-center px-4 py-2 border border-primary-600 text-sm font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50">Call: 061 589 2144</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
