"use client";

interface MatchResult {
  id: number;
  candidate_id: number;
  job_criteria_id: number;
  score: number;
  matched_skills: number;
  total_required_skills: number;
}

interface MatchingResultsProps {
  results: MatchResult[];
}

export default function MatchingResults({ results }: MatchingResultsProps) {
  if (results.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
        <p className="text-slate-400 text-lg">
          No matching results yet. Calculate matches to see results.
        </p>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="grid gap-4">
      {results.map((result) => (
        <div
          key={result.id}
          className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-pink-500 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-slate-400 text-sm">
                Candidate #{result.candidate_id} → Job #{result.job_criteria_id}
              </p>
              <div className="mt-2">
                <p className="text-slate-300 text-sm mb-2">
                  Matched Skills: {result.matched_skills} / {result.total_required_skills}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className={`${getScoreColor(result.score)} text-white font-bold text-3xl rounded-lg px-4 py-2`}>
                {result.score}%
              </div>
            </div>
          </div>

          <div className="mt-4 w-full bg-slate-700 rounded-full h-2">
            <div
              className={`${getScoreColor(result.score)} h-2 rounded-full transition-all`}
              style={{ width: `${result.score}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
