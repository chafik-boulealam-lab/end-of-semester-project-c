"use client";

interface Skill {
  id: number;
  name: string;
  category: string;
  description: string;
}

interface SkillListProps {
  skills: Skill[];
  onUpdate: () => void;
}

const categoryColors: Record<string, string> = {
  tech: "bg-blue-500",
  soft: "bg-purple-500",
  language: "bg-green-500",
};

export default function SkillList({ skills, onUpdate }: SkillListProps) {
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;

    try {
      const response = await fetch(`http://localhost:8000/skills/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onUpdate();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (skills.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
        <p className="text-slate-400 text-lg">No skills yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-purple-500 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
            <span
              className={`px-2 py-1 text-xs text-white rounded ${
                categoryColors[skill.category] || "bg-slate-600"
              }`}
            >
              {skill.category}
            </span>
          </div>

          {skill.description && (
            <p className="text-slate-400 text-sm mb-4">{skill.description}</p>
          )}

          <button
            onClick={() => handleDelete(skill.id)}
            className="w-full px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
