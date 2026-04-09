'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/services/api';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<'candidate' | 'recruiter' | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          try {
            const response = await apiClient.get('/api/auth/me', {
              headers: { Authorization: `Bearer ${token}` }
            });
            setUserRole(response.data.role);
          } catch {
            localStorage.removeItem('access_token');
          }
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // If logged in, redirect to appropriate dashboard
  if (userRole === 'candidate') {
    router.push('/candidate/dashboard');
    return null;
  }
  if (userRole === 'recruiter') {
    router.push('/recruiter/dashboard');
    return null;
  }

  // Not logged in - show hero
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-indigo-600">🧠 AI Talent Finder</div>
            <div className="space-x-4">
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">
                Connexion
              </Link>
              <Link href="/auth/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Trouvez les meilleurs talents avec l'IA
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Que vous soyez candidat cherchant des opportunités<br/>
            ou recruteur cherchant les meilleurs profils
          </p>
        </div>

        {/* Two Paths */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 👤 Candidat Path */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-5xl mb-4">👤</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Parcours Candidat</h2>
            <p className="text-gray-600 mb-6">
              Mettez votre CV en avant et découvrez des opportunités qui vous correspondent.
            </p>
            <ul className="space-y-3 mb-8 text-gray-700">
              <li>✓ Télécharge ton CV</li>
              <li>✓ L'IA analyse automatiquement tes compétences</li>
              <li>✓ Sois visible auprès des recruteurs</li>
              <li>✓ Reçois des propositions adaptées</li>
            </ul>
            <Link 
              href="/auth/register?role=candidate"
              className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Commencer →
            </Link>
          </div>

          {/* 🧑‍💼 Recruteur Path */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-5xl mb-4">🧑‍💼</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Parcours Recruteur</h2>
            <p className="text-gray-600 mb-6">
              Trouvez les meilleurs candidats rapidement avec nos deux modes innovants.
            </p>
            <ul className="space-y-3 mb-8 text-gray-700">
              <li>✓ Mode Recherche: Trouvez dans la base</li>
              <li>✓ Mode Génération: L'IA crée le profil idéal</li>
              <li>✓ Matching automatique et précis</li>
              <li>✓ Shortlist et export faciles</li>
            </ul>
            <Link 
              href="/auth/register?role=recruiter"
              className="block w-full text-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold"
            >
              Commencer →
            </Link>
          </div>
        </div>

        {/* Feature Highlight */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">💥 Notre innovation unique</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-lg text-indigo-600 mb-2">🅰️ Mode Recherche</h4>
              <p className="text-gray-600">
                Déposez vos critères et trouvez instantanément les candidats correspondants dans notre base.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg text-indigo-600 mb-2">🅱️ Mode Génération</h4>
              <p className="text-gray-600">
                Décrivez votre besoin et notre IA génère le profil idéal pour matcher les candidats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
