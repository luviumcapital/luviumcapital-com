import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "~/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export const Route = createFileRoute("/contact/")({
  component: Contact,
});

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    // Create mailto link with form data
    const subject = encodeURIComponent(`Investment Inquiry from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Company: ${data.company || 'N/A'}\n` +
      `Phone: ${data.phone || 'N/A'}\n\n` +
      `Message:\n${data.message}`
    );
    
    const mailtoLink = `mailto:admin@luviumcapital.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    toast.success("Opening your email client. Please send the pre-filled message.");
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-navy-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to explore investment opportunities? Contact our team to schedule a consultation 
            and learn more about our floor plan finance solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-6">
              Contact Information
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-primary-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy-900">Email</h3>
                  <a 
                    href="mailto:admin@luviumcapital.com" 
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    admin@luviumcapital.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-primary-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy-900">Phone</h3>
                  <a 
                    href="tel:0615892144" 
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    061 589 2144
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-primary-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-navy-900">Location</h3>
                  <p className="text-gray-600">South Africa</p>
                </div>
              </div>
            </div>

            <Card className="bg-primary-50 border-primary-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-navy-900 mb-2">
                  Investment Opportunities
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  Interested in our floor plan finance solutions? Our minimum investment 
                  is R100,000 with expected returns of JIBAR + 3%.
                </p>
                <div className="text-xs text-gray-600">
                  <p>• Institutional investor focused</p>
                  <p>• Asset-backed security model</p>
                  <p>• Comprehensive due diligence</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register("name")}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company / Organization
                    </label>
                    <input
                      id="company"
                      type="text"
                      {...register("company")}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                    {errors.company && (
                      <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      {...register("message")}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Tell us about your investment interests or any questions you have..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                  >
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    This will open your email client with a pre-filled message
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
