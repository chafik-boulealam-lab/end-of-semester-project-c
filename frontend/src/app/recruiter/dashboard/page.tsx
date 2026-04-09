'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RecruiterDashboard() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<'search' | 'generate' | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">🧑‍💼 Recruteur Dashboard</h1>
          <button 
            onClick={() => {
              localStorage.removeItem('access_token');
              router.push('/');
            }}
            className="text-red-600 hover:text-red-700"
          >
            Déconnexion
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trouvez les meilleurs candidats</h2>
          <p className="text-gray-600">
            Choisissez votre mode de recherche pour commencer
          </p>
        </div>

        {/* Mode Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Mode 1: Search */}
          <div 
            onClick={() => setSelectedMode(selectedMode === 'search' ? null : 'search')}
            className={`relative p-8 rounded-xl border-2 transition cursor-pointer ${
              selectedMode === 'search'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="absolute top-4 right-4 text-2xl">
              {selectedMode === 'search' ? '✓' : ''}
            </div>
            <div className="text-5xl mb-4">🅰️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Mode Recherche</h3>
            <p className="text-gray-600 mb-6">
              Déposez vos critères et trouvez les candidats correspondants dans notre base
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p>✓ Décrire le poste et les compétences requises</p>
              <p>✓ Matching automatique sur les candidats</p>
              <p>✓ Résultats classés par score</p>
              <p>✓ Idéal pour: Recherche traditionnelle rapide</p>
            </div>
          </div>

          {/* Mode 2: Generate */}
          <div 
            onClick={() => setSelectedMode(selectedMode === 'generate' ? null : 'generate')}
            className={`relative p-8 rounded-xl border-2 transition cursor-pointer ${
              selectedMode === 'generate'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="absolute top-4 right-4 text-2xl">
              {selectedMode === 'generate' ? '✓' : ''}
            </div>
            <div className="text-5xl mb-4">🅱️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Mode Génération</h3>
            <p className="text-gray-600 mb-6">
              Décrivez votre besoin et notre IA génère le profil idéal
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p>✓ Description texte du besoin</p>
              <p>✓ L'IA génère le profil idéal</p>
              <p>✓ Matching sur le profil généré</p>
              <p>✓ Idéal pour: Postes innovants/complexes</p>
            </div>
          </div>
        </div>

        {/* Mode Selected: Search */}
        {selectedMode === 'search' && (
          <SearchMode />
        )}

        {/* Mode Selected: Generate */}
        {selectedMode === 'generate' && (
          <GenerateMode />
        )}

        {/* Quick Stats */}
        {!selectedMode && (
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-gray-600">Recherches</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-gray-600">Candidats vus</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-gray-600">En shortlist</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
              <div className="text-2xl font-bold text-orange-600">0</div>
              <div className="text-gray-600">Exported</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchMode() {
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!jobTitle || !description) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      // TODO: Call API to search candidates
      // For now, mock results
      const mockResults = [
        { candidate_id: 1, full_name: 'John Doe', email: 'john@example.com', match_score: 92 },
        { candidate_id: 2, full_name: 'Jane Smith', email: 'jane@example.com', match_score: 87 },
        { candidate_id: 3, full_name: 'Bob Johnson', email: 'bob@example.com', match_score: 78 },
      ];
      setResults(mockResults);
    } catch (error) {
      alert('Erreur lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">🅰️ Mode Recherche</h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Titre du Poste *</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Ex: Senior Python Developer"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Compétences Requises</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Ex: Python, FastAPI, SQL"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-2">Description du Poste *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Décrivez le rôle, les responsabilités et les qualités recherchées..."
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        onClick={handleSearch}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Recherche...' : 'Lancer la Recherche'}
      </button>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-8">
          <h4 className="text-xl font-bold text-gray-900 mb-4">Résultats ({results.length})</h4>
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.candidate_id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-gray-900">{result.full_name}</h5>
                    <p className="text-gray-600">{result.email}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{result.match_score}%</div>
                    <p className="text-sm text-gray-600">Match Score</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GenerateMode() {
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [idealProfile, setIdealProfile] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);

  const handleGenerate = async () => {
    if (!jobTitle || !description) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      // TODO: Call API to generate profile and match
      const mockProfile = {
        ideal_skills: [
          { name: 'Python', weight: 100, level: 'advanced' },
          { name: 'FastAPI', weight: 90, level: 'advanced' },
          { name: 'SQL', weight: 80, level: 'intermediate' },
        ],
        ideal_experience_years: 5,
        ideal_education: 'Bachelor in CS',
      };
      
      const mockResults = [
        { candidate_id: 1, full_name: 'Alice Brown', email: 'alice@example.com', match_score: 88 },
        { candidate_id: 2, full_name: 'Charlie Davis', email: 'charlie@example.com', match_score: 82 },
      ];
      
      setIdealProfile(mockProfile);
      setResults(mockResults);
    } catch (error) {
      alert('Erreur lors de la génération');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">🅱️ Mode Génération IA</h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Titre du Poste *</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Ex: Startup CTO"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-2">Décrivez vos besoins *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Décrivez en détail le poste, la vision, les défis et l'impact souhaité..."
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? 'L\'IA génère...' : 'Générer le Profil Idéal'}
      </button>

      {idealProfile && (
        <div className="mt-8">
          <h4 className="text-xl font-bold text-gray-900 mb-4">Profil Idéal Généré</h4>
          <div className="p-4 bg-purple-50 rounded-lg mb-6">
            <h5 className="font-bold text-gray-900 mb-3">Compétences Idéales:</h5>
            <div className="space-y-2">
              {idealProfile.ideal_skills?.map((skill: any) => (
                <div key={skill.name} className="flex justify-between">
                  <span>{skill.name}</span>
                  <span className="text-sm text-purple-600 font-semibold">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-4">Candidats Matchés ({results.length})</h4>
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.candidate_id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-gray-900">{result.full_name}</h5>
                    <p className="text-gray-600">{result.email}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">{result.match_score}%</div>
                    <p className="text-sm text-gray-600">Match Score</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
