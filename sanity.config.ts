"use client";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { dataset, projectId } from "./sanity/env";

export default defineConfig({
  name: "default", title: "marktn PR", projectId, dataset, basePath: "/studio",
  plugins: [structureTool(), presentationTool({ previewUrl: { origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", previewMode: { enable: "/api/draft-mode/enable" } } }), visionTool()],
  schema: { types: schemaTypes },
});
