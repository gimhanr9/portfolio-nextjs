import type { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

// This root layout is needed for the root not-found.tsx
const RootLayout = ({ children }: Props) => {
  return children;
};

export default RootLayout;
