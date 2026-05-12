import type { Metadata } from "next";
import { ReferencesContent } from "@/components/ReferencesContent";

export const metadata: Metadata = {
  title: "References",
  description:
    "Every primary source the platform cites — Miller 1968, Card et al. 1991, Doherty & Thadani 1982, Nielsen 1993, Anstis 2001/2003/2004, Myers 1985, Harrison et al. 2007/2010, latency JND research, time-perception literature, recent AI-UX research — plus labelled industry primary sources (Fitch, Eizenberg, Mishunov, Wroblewski).",
};

export default function ReferencesPage() {
  return <ReferencesContent />;
}
