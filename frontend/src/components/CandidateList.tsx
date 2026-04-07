"use client";

interface Candidate {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface CandidateListProps {
  candidates: Candidate[];
  onUpdate: () => void;
}

export default function CandidateList({ candidates, onUpdate }: CandidateListProps) {
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;

    try {
      const response = await fetch(`http://localhost:8000/candidates/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onUpdate();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (candidates.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
        <p className="text-slate-400 text-lg">No candidates yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-white">
                {candidate.first_name} {candidate.last_name}
              </h3>
              <p className="text-slate-400">{candidate.email}</p>
              <p className="text-slate-500 text-sm">{candidate.phone}</p>
            </div>

            <button
              onClick={() => handleDelete(candidate.id)}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
