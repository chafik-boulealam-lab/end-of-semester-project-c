"use client";

import { useState, useEffect } from "react";
import useApi from "@/hooks/useApi";
import CandidateForm from "@/components/CandidateForm";
import CandidateList from "@/components/CandidateList";

export default function CandidatesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: candidates, loading, error, refetch } = useApi("/candidates", "GET");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Candidates</h1>
          <p className="text-slate-400">Manage and view all candidates</p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isFormOpen ? "Cancel" : "+ Add Candidate"}
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-8">
          <CandidateForm onSuccess={() => { setIsFormOpen(false); refetch(); }} />
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-slate-400">Loading candidates...</p>
        </div>
      ) : error ? (
        <div className="bg-red-900 border border-red-700 rounded-lg p-4 text-red-100">
          Error loading candidates: {error}
        </div>
      ) : (
        <CandidateList candidates={candidates || []} onUpdate={refetch} />
      )}
    </div>
  );
}
