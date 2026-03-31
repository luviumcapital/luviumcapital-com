import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "~/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { LogIn, ArrowRight, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Route = createFileRoute("/login/")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
            const res = await fetch("/api/trpc/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ json: { email: data.email, password: data.password } }),
      });
      const result = await res.json();
      if (result?.result?.data?.json?.token) {
        localStorage.setItem("luvium_token", result.result.data.json.token);
        localStorage.setItem("luvium_user", JSON.stringify(result.result.data.json.user));
        toast.success("Welcome back!");
        navigate({ to: "/dashboard" });
      } else {
        toast.error(result?.error?.message || "Invalid credentials. Please try again.");
      }
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-primary-900 to-navy-800 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Investor Portal</h1>
          <p className="text-primary-200 mt-2">Access exclusive investment documentation</p>
        </div>
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-navy-900">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="you@company.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 pr-10"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
              <Button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2">
                {loading ? "Signing in..." : (<>Sign In <ArrowRight className="h-4 w-4" /></>)}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Don't have access? <Link to="/register" className="text-primary-600 hover:underline font-medium">Request investor access</Link></p>
            </div>
          </CardContent>
        </Card>
        <p className="text-center text-primary-200 text-sm mt-6">Luvium Capital Pty Ltd &bull; Confidential</p>
      </div>
    </div>
  );
}
