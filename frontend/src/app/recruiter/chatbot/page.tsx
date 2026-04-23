"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCallback } from "react";
import { Send, MessageCircle, Loader } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import { chatApi, type ChatHistoryEntry } from "@/services/chat";
import { criteriaApi } from "@/services/criteria";
import { matchingApi, type CriteriaMatchResult } from "@/services/matching";
import Layout from '@/components/Layout';

interface ChatEntry {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatEntry[]>([
    {
      id: "1",
      type: "assistant",
      content: "👋 Bienvenue! Je suis votre assistant recruteur IA. Comment puis-je vous aider aujourd'hui?\n\nJe peux vous aider à:\n• Expliquer les scores de matching\n• Comparer des candidats\n• Explorer la base de données\n• Ajuster vos critères",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [topCandidates, setTopCandidates] = useState<CriteriaMatchResult[]>([]);
  const [currentCriteria, setCurrentCriteria] = useState<{ id: number; title: string; required_skills: Array<{ name: string; weight: number }> } | null>(null);
  const [suggestedActions, setSuggestedActions] = useState<string[]>([]);

  useEffect(() => {
    // Scroll to bottom on new messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchTopCandidates = useCallback(async () => {
    try {
      const criteriaResponse = await criteriaApi.getCriteria();
      const latestCriteria = criteriaResponse.data[0];
      if (!latestCriteria) {
        setCurrentCriteria(null);
        setTopCandidates([]);
        return { currentCriteria: null, topCandidates: [] as CriteriaMatchResult[] };
      }

      setCurrentCriteria(latestCriteria);

      const rankingResponse = await matchingApi.getCriteriaMatchingResults(latestCriteria.id);
      const bestCandidates = rankingResponse.data.slice(0, 10);
      setTopCandidates(bestCandidates);
      return { currentCriteria: latestCriteria, topCandidates: bestCandidates };
    } catch (error) {
      console.error("Error fetching candidates:", error);
      return { currentCriteria, topCandidates };
    }
  }, [currentCriteria, topCandidates]);

  useEffect(() => {
    // Fetch top candidates on mount
    void fetchTopCandidates();
  }, [fetchTopCandidates]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatEntry = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const liveContext = await fetchTopCandidates();
      const effectiveCriteria = liveContext?.currentCriteria ?? currentCriteria;
      const effectiveCandidates = liveContext?.topCandidates ?? topCandidates;

      const history: ChatHistoryEntry[] = [...messages, userMessage].slice(-8).map(message => ({
        role: message.type,
        content: message.content,
        timestamp: message.timestamp.toISOString()
      }));

      const response = await chatApi.sendMessage({
        message: userMessage.content,
        context: {
          current_criteria: effectiveCriteria,
          current_criteria_id: effectiveCriteria?.id,
          top_candidates: effectiveCandidates,
          history,
        }
      });

      const assistantMessage: ChatEntry = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response.data.response,
        timestamp: new Date()
      };
      setSuggestedActions(response.data.actions || []);
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setSuggestedActions([]);
      const errorMessage: ChatEntry = {
        id: (Date.now() + 2).toString(),
        type: "assistant",
        content: "❌ Désolé, une erreur s'est produite. Veuillez réessayer.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-indigo-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Assistant Recruteur IA</h1>
            <p className="text-sm text-gray-600">Posez vos questions sur les candidats et les matchings</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-lg px-4 py-2 flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              <span className="text-gray-700">Réflexion en cours...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-6">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Posez une question sur les candidats..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <Send className="w-4 h-4" />
            Envoyer
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          💡 Conseil: Essayez &quot;Explique pourquoi Ahmed a un score de 95%&quot; ou &quot;Compare les 3 candidats&quot;
        </p>
        {suggestedActions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestedActions.map(action => (
              <button
                key={action}
                type="button"
                onClick={() => setInput(action)}
                className="text-sm px-3 py-2 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
              >
                {action}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
}

