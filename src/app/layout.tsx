import React from "react";
import type { Metadata } from "next";
import { constructMetadata } from "@core/utils/seo";
import "./globals.css";

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
