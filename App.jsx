import React from 'react';
import { BarChart3, Database, Zap, Shield, ExternalLink, Linkedin, Github, Mail } from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-inter">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Turning Complex Data Into Clear Insights
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Data Engineering • Analytics • Business Intelligence
          </p>
          <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors">
            View My Work
          </button>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white text-slate-900 p-8 rounded-xl hover:shadow-xl transition-shadow">
            <Database className="w-12 h-12 text-cyan-500 mb-4" />
            <div className="text-4xl font-bold mb-2">200M+</div>
            <div className="text-slate-600">rows processed daily</div>
          </div>
          <div className="bg-white text-slate-900 p-8 rounded-xl hover:shadow-xl transition-shadow">
            <Zap className="w-12 h-12 text-cyan-500 mb-4" />
            <div className="text-4xl font-bold mb-2">5x</div>
            <div className="text-slate-600">faster pipelines</div>
          </div>
          <div className="bg-white text-slate-900 p-8 rounded-xl hover:shadow-xl transition-shadow">
            <Shield className="w-12 h-12 text-cyan-500 mb-4" />
            <div className="text-4xl font-bold mb-2">99.9%</div>
            <div className="text-slate-600">uptime</div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-cyan-400" />
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Analytics Dashboard</h3>
              <p className="text-slate-300 mb-4">Built scalable data pipeline processing millions of events with sub-second latency.</p>
              <div className="text-cyan-400 font-bold">2.3s avg response time</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <Database className="w-8 h-8 text-cyan-400" />
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Warehouse Optimization</h3>
              <p className="text-slate-300 mb-4">Redesigned ETL processes reducing costs and improving query performance.</p>
              <div className="text-cyan-400 font-bold">60% cost reduction</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <Zap className="w-8 h-8 text-cyan-400" />
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ML Pipeline Automation</h3>
              <p className="text-slate-300 mb-4">Automated model training and deployment pipeline with continuous monitoring.</p>
              <div className="text-cyan-400 font-bold">95% accuracy maintained</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-slate-700">
        <div className="max-w-6xl mx-auto flex justify-center space-x-6">
          <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
