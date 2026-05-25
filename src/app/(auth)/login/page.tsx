"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@/lib/auth/auth-client";
import { SignInSchema, SignInInput } from "@/lib/validation/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInInput) => {
    startTransition(async () => {
      const result = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard",
      });

      if (result.error) {
        form.setError("email", {
          type: "manual",
          message: result.error.message,
        });
        return;
      }

      router.push("/dashboard");
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 border border-gray-100">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Sign in to continue to MicroCloud
        </p>

        {/* FORM */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...form.register("email")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...form.register("password")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
            {form.formState.errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* FOOTER LINKS */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Create one
          </a>
        </div>
      </div>
    </main>
  );
}
