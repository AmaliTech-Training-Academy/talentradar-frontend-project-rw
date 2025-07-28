import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      jsxRuntime: "automatic",
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage",
      include: ["app/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
      exclude: [
        "lib/constants/**/*",
        "lib/data/**/*",
        "lib/mock/**/*",
        "lib/types/**/*",
        "app/api/**/*",
        "app/dashboard/layout.tsx",
        "app/(auth)/login/**/*",
        "app/(auth)/register/**/*",
        "app/(auth)/layout.tsx",
        "components/ui/**/*.{ts,tsx}",
        "lib/dummyData.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
