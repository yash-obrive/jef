import AboutUsContent from "./AboutUsContent";

export const metadata = {
  title: "JEF Group of Companies | Electrical Engineering, Earthing & Lightning Protection Experts",
  description: "JEF Group: 30+ years, 30+ countries, 10K+ customers, 9 patents. Global HQ in Bengaluru with offices in UAE, KSA & USA. See our story and technology.",
  keywords: "JEF Group electrical engineering company, about JEF Techno, JEF Techno company history, electrical engineering company Bengaluru, JEF Techno patents, JEF Group of companies",
  alternates: {
    canonical: "https://www.jeftechno.com/about-us",
  },
  openGraph: {
    title: "JEF Group of Companies | Electrical Engineering, Earthing & Lightning Protection Experts",
    description: "JEF Group: 30+ years, 30+ countries, 10K+ customers, 9 patents. Global HQ in Bengaluru with offices in UAE, KSA & USA. See our story and technology.",
    url: "https://www.jeftechno.com/about-us",
    type: "website",
    siteName: "Jef Techno",
    images: [{ url: "/AboutUs/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JEF Group of Companies | Electrical Engineering, Earthing & Lightning Protection Experts",
    description: "JEF Group: 30+ years, 30+ countries, 10K+ customers, 9 patents. Global HQ in Bengaluru with offices in UAE, KSA & USA. See our story and technology.",
    images: ["/AboutUs/og-image.jpg"],
  },
};

export default function AboutUsPage() {
    return <AboutUsContent />;
}