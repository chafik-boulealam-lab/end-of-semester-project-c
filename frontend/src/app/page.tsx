"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [backendStatus, setBackendStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch("http://localhost:8000/health");
        setBackendStatus(res.ok);
      } catch {
        setBackendStatus(false);
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            AI-Powered <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Talent Finder</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Discover the perfect candidates using advanced AI matching algorithms. Streamline your recruitment process and find top talent in minutes.
          </p>

          {/* Backend Status */}
          <div className="mb-12 flex justify-center">
            <div className="flex items-center space-x-3 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <div
                className={`w-3 h-3 rounded-full ${
                  backendStatus ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className="text-sm font-medium">
                {backendStatus ? "Backend Connected ✓" : "Backend Offline ✗"}
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              href="/candidates"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
            >
              Manage Candidates
            </Link>
            <Link
              href="/matching"
              className="px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-all border border-slate-600"
            >
              Matching Results
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 my-20">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 hover:border-blue-500 transition-colors">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-3">Smart Matching</h3>
            <p className="text-slate-400">
              AI-powered algorithms match candidates with job criteria based on skills and experience.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 hover:border-purple-500 transition-colors">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-3">Manage Candidates</h3>
            <p className="text-slate-400">
              Organize and track candidate profiles with skills, experience, and match scores.
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 hover:border-pink-500 transition-colors">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-3">Fast & Reliable</h3>
            <p className="text-slate-400">
              Get instant results with our optimized backend powered by FastAPI and PostgreSQL.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-20 grid md:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-400">0</div>
            <div className="text-slate-400 text-sm">Candidates</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-400">0</div>
            <div className="text-slate-400 text-sm">Active Jobs</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-pink-400">0</div>
            <div className="text-slate-400 text-sm">Matches</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-400">100%</div>
            <div className="text-slate-400 text-sm">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
}
