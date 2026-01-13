'use client'
import { SearchInput } from '@/components/ui/SearchInput';
import { ArrowRight, Globe, Pill, ShieldCheck, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState } from 'react'
import { FeatureCard } from '@/components/ui/FeaturedCard';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      router.push(`/products?q=${encodeURIComponent(value)}`);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchTerm)}`);
    }
  };

 return (
    <div className="min-h-screen bg-white font-sans text-slate-900">

      <main className="pt-32 pb-20 px-6">
        <section className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-blue-950 leading-tight"
          >
            Accessing medicines <br />
            <span className="text-gradient-primary">globally, simplified.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            A dedicated platform for healthcare professionals to source unlicensed,
            shortage, or specialty medicines securely and efficiently.
          </motion.p>

          <form onSubmit={handleSearchSubmit}>
            <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onSearch={handleSearch} />
          </form>
        </section>

        <section className="max-w-7xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Pill className="w-6 h-6 text-blue-600" />}
            title="Product Directory"
            desc="Browse our extensive list of specialty medicines and documentation."
          />
          <FeatureCard
            icon={<Globe className="w-6 h-6 text-blue-600" />}
            title="Global Logistics"
            desc="Temperature-controlled supply chain delivering to over 100 countries."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6 text-blue-600" />}
            title="Compliance"
            desc="Fully regulated and verified processes ensuring patient safety first."
          />
        </section>
      </main>

      <section className="bg-slate-50 py-20 px-6 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">New to Clinigen Direct?</h2>
            <p className="text-gray-600">Create an account to start ordering and tracking medicines online.</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-8 py-4 rounded-xl font-bold hover:shadow-md transition-all">
            <UserPlus className="w-5 h-5" />
            Register Account
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
