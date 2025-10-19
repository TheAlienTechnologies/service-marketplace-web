import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  MessageCircle,
  Music2,
} from "lucide-react";

export function Footer() {
  const categories = [
    { label: "Graphics & Design", slug: "graphics-design" },
    { label: "Digital Marketing", slug: "digital-marketing" },
    { label: "Writing & Translation", slug: "writing-translation" },
    { label: "Video & Animation", slug: "video-animation" },
    { label: "Music & Audio", slug: "music-audio" },
    { label: "Programming & Tech", slug: "programming-tech" },
    { label: "AI Services", slug: "ai-services" },
    { label: "Consulting", slug: "consulting" },
    { label: "Data", slug: "data" },
    { label: "Business", slug: "business" },
    { label: "Personal Growth & Hobbies", slug: "personal-growth-hobbies" },
    { label: "Photography", slug: "photography" },
    { label: "Finance", slug: "finance" },
    { label: "End-to-End Projects", slug: "end-to-end-projects" },
    { label: "Service Catalog", slug: "service-catalog" },
  ];

  const companyLinks = [
    { label: "About AVADgh", href: "#" },
    { label: "Help & Support", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ];

  const sellerLinks = [
    { label: "Become an Agency", href: "#" },
    { label: "Seller Equity Program", href: "#" },
    { label: "Community Hub", href: "#" },
    { label: "Events", href: "#" },
    { label: "Forum", href: "#" },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Logo and Social Icons */}
          <div className="space-y-6 flex flex-col items-center text-center">
            {/* Logo */}
            <Link href="/" className="inline-block">
              <Image
                src="/assets/logo/logo.svg"
                alt="AVADgh Logo"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            {/* Copyright */}
            <p className="text-sm text-gray-400">© AVADghana Ltd. 2025</p>

            {/* Social Media Icons */}
            <div className="flex items-center justify-center gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <Music2 size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Pinterest"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base font-semibold mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-semibold mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Sellers */}
          <div>
            <h3 className="text-base font-semibold mb-4">For Sellers</h3>
            <ul className="space-y-2.5">
              {sellerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
