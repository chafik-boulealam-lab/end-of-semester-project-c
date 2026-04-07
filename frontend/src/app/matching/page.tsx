"use client";

import { useState, useEffect } from "react";
import useApi from "@/hooks/useApi";
import MatchingForm from "@/components/MatchingForm";
import MatchingResults from "@/components/MatchingResults";

export default function MatchingPage() {
  const [matchingResults, setMatchingResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: results, loading, error, refetch } = useApi("/matching/results", "GET");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Talent Matching</h1>
        <p className="text-slate-400 mb-12">Find the best candidates for your job requirements</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="md:col-span-1">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-white mb-6">Calculate Matching</h2>
            <MatchingForm onSuccess={() => refetch()} />
          </div>
        </div>

        {/* Results Section */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold text-white mb-6">Matching Results</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
              <p className="mt-4 text-slate-400">Loading results...</p>
            </div>
          ) : error ? (
            <div className="bg-red-900 border border-red-700 rounded-lg p-4 text-red-100">
              Error loading results: {error}
            </div>
          ) : (
            <MatchingResults results={results || []} />
          )}
        </div>
      </div>
    </div>
  );
}
