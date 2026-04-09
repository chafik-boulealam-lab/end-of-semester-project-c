'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/services/api';

export default function CandidateDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          router.push('/auth/login');
          return;
        }
        
        const response = await apiClient.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">👤 Candidat Dashboard</h1>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bienvenue, {user?.full_name}! 👋
          </h2>
          <p className="text-gray-600">
            Mets en avant ton profil et tes compétences pour attirer les recruteurs
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Upload CV */}
          <Link href="/candidate/upload">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <div className="text-5xl mb-4">📄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Télécharger CV</h3>
              <p className="text-gray-600 mb-4">
                Télécharge ou met à jour ton CV pour que les recruteurs te découvrent
              </p>
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                Étape 1
              </span>
            </div>
          </Link>

          {/* Profile */}
          <Link href="/candidate/profile">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <div className="text-5xl mb-4">🧑</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mon Profil</h3>
              <p className="text-gray-600 mb-4">
                Complète ton profil avec tes informations, compétences et expériences
              </p>
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Étape 2
              </span>
            </div>
          </Link>

          {/* Opportunities */}
          <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer opacity-50">
            <div className="text-5xl mb-4">💼</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Opportunités</h3>
            <p className="text-gray-600 mb-4">
              Découvre les opportunités d'embauche qui te correspondent
            </p>
            <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
              Bientôt
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-gray-600">CV uploadé</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-gray-600">Compétences détectées</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-gray-600">Profils consultés</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
            <div className="text-2xl font-bold text-orange-600">0</div>
            <div className="text-gray-600">Propositions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
