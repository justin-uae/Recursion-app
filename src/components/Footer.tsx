import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Excursions", href: "/excursions" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-auto">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-400">excursions</span>
              <span className="text-2xl font-bold text-pink-400 ml-2">dubai</span>
            </div>

            {/* Contact Info - Responsive Stack */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm text-center sm:text-left">Dubai Marina, UAE</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+97141234567" className="text-sm hover:text-blue-400 transition-colors">
                  +971 4 123 4567
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@excursionsdubai.com" className="text-sm hover:text-blue-400 transition-colors break-all sm:break-normal">
                  info@excursionsdubai.com
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm hover:text-blue-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <p className="text-center text-sm text-gray-400">
            © 2025 Excursions Dubai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}