import "./globals.css";
import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import { siteConfig, socialLinks } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "AI Security Engineer",
    "Cybersecurity",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "NYU",
    "Portfolio",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@ethansam",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: "Associate, Innovation & Automation",
  description: siteConfig.description,
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "New York University",
      department: "Tandon School of Engineering",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "CUNY Lehman College",
    },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "NSA-CAE Defense",
      credentialCategory: "Certificate",
      recognizedBy: {
        "@type": "Organization",
        name: "National Centers of Academic Excellence in Cybersecurity (NCAE-C)",
      },
      url: "https://credentials.engineering.nyu.edu/c94a17cc-1767-4461-add1-6b1ee67244a8",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Exploring Adversarial Machine Learning",
      credentialCategory: "Certificate",
      recognizedBy: {
        "@type": "Organization",
        name: "NVIDIA Deep Learning Institute",
      },
      url: "https://learn.nvidia.com/certificates?id=aRX4vd7lRvyYXO4rbpfE0w",
    },
  ],
  sameAs: [socialLinks.github, socialLinks.linkedin],
  knowsAbout: [
    "Cybersecurity",
    "Artificial Intelligence",
    "Machine Learning",
    "React",
    "Next.js",
    "Python",
    "Network Security",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
