"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import {
  SignUpSchema,
  SignUpInput,
  SignInInput,
  SignInSchema,
} from "@/lib/validation/auth";
import { fromZodError } from "zod-validation-error";

export async function signUpAction(data: SignUpInput) {
  // Server-side validation
  const parsed = SignUpSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      data: "",
      error: fromZodError(parsed.error).message,
    };
  }

  const { name, email, password } = parsed.data;

  try {
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: `${process.env.BETTER_AUTH_URL}/dashboard`,
      },
      asResponse: true,
    });

    if (!result.ok) {
      const errorData = await result.json();
      throw new Error(errorData?.error || "Sign-up failed");
    }

    return { success: true, message: "Sign-up was successful" };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      data: "",
      error: "Sign-up failed: " + e.message,
    };
  }
}

// Signin action for email/password authentication
export async function signInAction(data: SignInInput) {
  const parsed = SignInSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      data: "",
      error: fromZodError(parsed.error).message,
    };
  }
  const { email, password } = parsed.data;

  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: `${process.env.BETTER_AUTH_URL}/dashboard`,
      },
      asResponse: true,
    });

    if (!result.ok) {
      const errorData = await result.json();
      throw new Error(errorData?.error || "Sign-in failed");
    }

    return { success: true, data: result };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      data: "",
      error: "Sign-in failed: " + e.message,
    };
  }
}

// sign out action
export async function SignOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  return { success: true, redirect: "/" };
}
