"use client";

import { useState } from "react";

interface SkillFormProps {
  onSuccess: () => void;
}

export default function SkillForm({ onSuccess }: SkillFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "tech",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/skills/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create skill");
      }

      setFormData({ name: "", category: "tech", description: "" });
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 border border-slate-700 rounded-lg p-6"
    >
      <input
        type="text"
        name="name"
        placeholder="Skill Name (e.g., Python, React)"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 mb-4"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-purple-500 mb-4"
      >
        <option value="tech">Technical</option>
        <option value="soft">Soft Skills</option>
        <option value="language">Language</option>
      </select>

      <textarea
        name="description"
        placeholder="Description (optional)"
        value={formData.description}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 mb-4 h-20"
      />

      {error && <div className="text-red-400 text-sm mb-4">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Skill"}
      </button>
    </form>
  );
}
