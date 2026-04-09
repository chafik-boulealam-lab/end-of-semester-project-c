'use client';

import React from 'react';
import Link from 'next/link';

export default function RecruiterShortlist() {
  const [shortlist, setShortlist] = React.useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', score: 92, added: 'Il y a 2 jours' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', score: 87, added: 'Il y a 1 jour' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/recruiter/dashboard" className="text-gray-600 hover:text-gray-900">
            ← Retour
          </Link>
          <h1 className="text-2xl font-bold text-purple-600">⭐ Shortlist</h1>
          <div></div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Tes Candidats en Shortlist</h2>
          <p className="text-gray-600 mb-6">Total: {shortlist.length} candidats sélectionnés</p>

          {shortlist.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-gray-600">Aucun candidat en shortlist pour le moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {shortlist.map((candidate) => (
                <div key={candidate.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">{candidate.name}</h4>
                      <p className="text-gray-600">{candidate.email}</p>
                      <p className="text-sm text-gray-500">Ajouté: {candidate.added}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{candidate.score}%</div>
                      <button className="text-red-600 hover:text-red-700 text-sm mt-2">Retirer</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Export Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
              📥 Exporter en CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
