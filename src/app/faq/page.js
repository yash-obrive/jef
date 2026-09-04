import Navigation from "@/components/Navigation";
import FaqClient from "./FaqClient";

export const metadata = {
  title: "FAQ | JEF Group of Companies",
  description: "Frequently Asked Questions about our electrical engineering, earthing, lightning protection, and safety audits services.",
};

import { faqData } from "./faqData";

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <>
      {/* SEO Schema for FAQs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="relative w-full h-[40vh] min-h-[300px] flex flex-col items-center justify-center overflow-hidden bg-[#FF0000] pt-24 md:pt-32">
        {/* Placeholder for the red question mark banner image if needed */}
        {/* <img
          src="/FAQ/banner-bg.jpg"
          alt="FAQ Banner"
          className="absolute inset-0 w-full h-full object-cover z-0"
        /> */}
        
        {/* Simple red gradient as fallback if image isn't available */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 z-0" />
        
        <h1 className="relative text-white text-5xl md:text-6xl font-bold tracking-wider uppercase z-10 drop-shadow-lg">
          FAQ
        </h1>
      </section>
      
      <Navigation currentPage="FAQ" />

      <FaqClient />
    </>
  );
}
