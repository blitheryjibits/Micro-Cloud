"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpInput } from "@/lib/validation/auth";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
  });

  async function onSubmit(data: SignUpInput) {
    // remove any toast after 5 seconds
    setTimeout(() => toast.dismiss(), 5000);
    try {
      await authClient.signUp.email(data, {
        onRequest: () => {
          toast.loading("Creating your account...");
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success("Account created successfully!");
          router.push("/dashboard");
        },
        onError: (error) => {
          toast.dismiss();
          toast.error("Error signing up: " + error);
        },
      });
    } catch (error) {
      toast.error("An unexpected error occurred: " + error);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register("name")}
              className="mt-1 w-full px-4 py-2 border rounded-md"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              className="mt-1 w-full px-4 py-2 border rounded-md"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 w-full px-4 py-2 border rounded-md"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* {serverError && <p className="text-red-600 text-sm">{serverError}</p>} */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </main>
  );
}
