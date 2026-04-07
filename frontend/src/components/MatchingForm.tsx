"use client";

import { useState, useEffect } from "react";

interface MatchingFormProps {
  onSuccess: () => void;
}

export default function MatchingForm({ onSuccess }: MatchingFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [candidates, setCandidates] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [selectedJob, setSelectedJob] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8000/candidates/").then((r) => r.json()),
      fetch("http://localhost:8000/jobs/").then((r) => r.json()),
    ])
      .then(([c, j]) => {
        setCandidates(Array.isArray(c) ? c : []);
        setJobs(Array.isArray(j) ? j : []);
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate || !selectedJob) {
      setError("Please select both candidate and job");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8000/matching/calculate/${selectedCandidate}/${selectedJob}`,
        { method: "POST" }
      );

      if (!response.ok) {
        throw new Error("Failed to calculate matching");
      }

      setSelectedCandidate("");
      setSelectedJob("");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Select Candidate
        </label>
        <select
          value={selectedCandidate}
          onChange={(e) => setSelectedCandidate(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-pink-500"
        >
          <option value="">Choose a candidate...</option>
          {candidates.map((c) => (
            <option key={c.id} value={c.id}>
              {c.first_name} {c.last_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Select Job
        </label>
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-pink-500"
        >
          <option value="">Choose a job...</option>
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>
              {j.title}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="text-red-400 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading || !selectedCandidate || !selectedJob}
        className="w-full px-4 py-2 bg-pink-600 text-white font-semibold rounded hover:bg-pink-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Calculating..." : "Calculate Match"}
      </button>
    </form>
  );
}
