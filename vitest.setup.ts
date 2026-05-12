// vitest.setup.ts
import "@testing-library/jest-dom";
import { expect } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";

if (typeof window !== "undefined") {
  expect.extend(matchers);
}
