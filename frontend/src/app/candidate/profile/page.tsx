'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CandidateProfile() {
  const [skills, setSkills] = useState([
    { name: 'Python', level: 'advanced' },
    { name: 'FastAPI', level: 'advanced' },
    { name: 'React', level: 'intermediate' },
    { name: 'SQL', level: 'intermediate' },
  ]);
  const [experiences, setExperiences] = useState([
    { title: 'Senior Developer', company: 'Tech Corp', duration: 3 },
    { title: 'Junior Developer', company: 'Startup Inc', duration: 2 },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/candidate/dashboard" className="text-gray-600 hover:text-gray-900">
            ← Retour
          </Link>
          <h1 className="text-2xl font-bold text-blue-600">🧑 Mon Profil</h1>
          <div></div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Ton Profil Structuré</h2>
          <p className="text-gray-600 mb-6">
            Voici comment les recruteurs verront ton profil
          </p>

          {/* Skills */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Compétences Détectées</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.name} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">{skill.name}</span>
                    <span className="text-sm bg-blue-600 text-white px-3 py-1 rounded-full">
                      {skill.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experiences */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">💼 Expériences</h3>
            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-bold text-gray-900">{exp.title}</h4>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.duration} ans</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visibility Badge */}
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-3xl mr-3">✓</span>
              <div>
                <p className="font-bold text-green-700">Ton profil est visible!</p>
                <p className="text-sm text-green-600">
                  Les recruteurs peuvent maintenant te découvrir
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded p-6">
          <h3 className="font-bold text-gray-900 mb-2">📊 Visibilité et Opportunités</h3>
          <p className="text-gray-700 text-sm">
            Plus tu complètes ton profil, plus tu seras visible auprès des recruteurs. 
            Les recruteurs utiliseront la recherche et l'IA pour te trouver et t'envoyer des propositions adaptées!
          </p>
        </div>
      </div>
    </div>
  );
}
