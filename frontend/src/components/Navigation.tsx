"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/candidates", label: "Candidates" },
  { href: "/skills", label: "Skills" },
  { href: "/matching", label: "Matching" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full bg-slate-950 border-b border-slate-700 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="text-xl font-bold text-white hidden sm:inline">
              Talent Finder
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex space-x-4">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-blue-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {item.label.substring(0, 3)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
