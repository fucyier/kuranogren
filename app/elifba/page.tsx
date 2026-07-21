import type { Metadata } from "next";
import ElifbaProgramClient from "./ElifbaProgramClient";

export const metadata: Metadata = {
  title: "30 Günlük Elifba Programı | Kur'an Öğren",
  description: "Harflerden Fâtiha okumaya uzanan 30 günlük sesli Elifba öğrenme programı.",
};

export default function ElifbaIndexPage() {
  return <ElifbaProgramClient />;
}
