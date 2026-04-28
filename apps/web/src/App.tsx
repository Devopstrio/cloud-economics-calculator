import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Calculator, LayoutDashboard, FilePieChart, TrendingUp, Settings, HelpCircle, BarChart3 } from 'lucide-react';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
        {/* Navigation Sidebar */}
        <aside className="w-72 bg-slate-900/50 backdrop-blur-2xl border-r border-slate-800 flex flex-col p-8 fixed h-full">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-xl shadow-indigo-900/20 text-white">Σ</div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Economics</span>
          </div>
          
          <nav className="flex-1 space-y-2">
            <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Executive Summary" active />
            <NavItem to="/tco" icon={<Calculator size={20} />} label="TCO Calculator" />
            <NavItem to="/roi" icon={<BarChart3 size={20} />} label="ROI Modeling" />
            <NavItem to="/scenarios" icon={<TrendingUp size={20} />} label="Scenario Planner" />
            <NavItem to="/reports" icon={<FilePieChart size={20} />} label="Board Reports" />
          </nav>

          <div className="pt-6 border-t border-slate-800 space-y-1">
            <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
            <NavItem to="/help" icon={<HelpCircle size={20} />} label="Methodology" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-72">
          <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <span>Platform</span>
              <span>/</span>
              <span className="text-white">Executive Summary</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold">Chief Architect</p>
                <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-black">Admin</p>
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center font-bold text-slate-300 shadow-inner">CA</div>
            </div>
          </header>

          <div className="p-10 max-w-7xl">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};

const NavItem = ({ to, icon, label, active }: any) => (
  <Link 
    to={to} 
    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${active ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/10 shadow-lg shadow-indigo-950/50' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
  >
    <span className={`${active ? 'text-indigo-400' : 'group-hover:text-indigo-400 transition'}`}>{icon}</span>
    <span className="font-semibold text-sm">{label}</span>
  </Link>
);

export default App;
