import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { TrendingUp, ShieldCheck, Zap, Briefcase } from 'lucide-react';

const tcoData = [
  { name: 'On-Premises', cost: 1250000, color: '#64748b' },
  { name: 'Azure (Lift & Shift)', cost: 980000, color: '#0ea5e9' },
  { name: 'Azure (Modernized)', cost: 650000, color: '#6366f1' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Strategic Value Radar</h1>
          <p className="text-slate-400 mt-3 text-xl max-w-2xl">Quantifying the financial and operational return of cloud transformation initiatives.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-slate-900 border border-slate-800 text-slate-300 px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg">Export Board Pack</button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl font-bold transition shadow-xl shadow-indigo-900/40">New Scenario</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard title="Projected 3Y Savings" value="$2.4M" change="+12%" icon={<Zap className="text-yellow-400" />} />
        <KpiCard title="Current Cloud ROI" value="142%" change="+8%" icon={<TrendingUp className="text-emerald-400" />} />
        <KpiCard title="Migration Payback" value="14 Mo" change="-2 Mo" icon={<Briefcase className="text-indigo-400" />} />
        <KpiCard title="Governance Score" value="A-" change="Stable" icon={<ShieldCheck className="text-sky-400" />} />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] backdrop-blur-xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
              TCO Comparison: On-Prem vs. Cloud
            </h2>
            <div className="text-xs font-black uppercase text-slate-500 tracking-widest bg-slate-800 px-3 py-1 rounded-full">USD / 3-Year Projection</div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tcoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={14} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={14} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Bar dataKey="cost" radius={[12, 12, 0, 0]} barSize={80}>
                  {tcoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] backdrop-blur-xl">
          <h2 className="text-2xl font-bold mb-10 text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            Optimization Roadmap
          </h2>
          <div className="space-y-6">
            <RoadmapItem title="RI / Savings Plan Coverage" status="82%" color="bg-indigo-600" />
            <RoadmapItem title="Storage Tier Lifecycle" status="45%" color="bg-sky-500" />
            <RoadmapItem title="Idle Instance Reclamation" status="91%" color="bg-emerald-500" />
            <RoadmapItem title="Right-sizing Policy Audit" status="22%" color="bg-rose-500" />
          </div>
          <div className="mt-12 p-6 bg-indigo-600/10 border border-indigo-500/20 rounded-3xl">
            <p className="text-indigo-400 text-sm font-bold mb-1 uppercase tracking-widest">Next-Best Action</p>
            <p className="text-slate-200 text-sm leading-relaxed">Upgrade 12.4% of D-Series instances to Spot instances in Dev for 60% immediate OpEx reduction.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({ title, value, change, icon }: any) => (
  <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] hover:border-indigo-500/30 transition-all group relative overflow-hidden shadow-2xl">
    <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity transform group-hover:scale-150 duration-700">
      {React.cloneElement(icon, { size: 140 })}
    </div>
    <div className="relative z-10">
      <div className="p-3 bg-slate-950/50 rounded-2xl w-fit mb-6 shadow-inner border border-slate-800/50">{icon}</div>
      <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-end gap-3">
        <p className="text-3xl font-black text-white">{value}</p>
        <span className={`text-[11px] font-black pb-1.5 ${change.startsWith('-') ? 'text-rose-400' : 'text-emerald-400'}`}>{change}</span>
      </div>
    </div>
  </div>
);

const RoadmapItem = ({ title, status, color }: any) => (
  <div>
    <div className="flex justify-between items-center mb-3">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</span>
      <span className="text-sm font-black text-white">{status}</span>
    </div>
    <div className="h-2 bg-slate-800 rounded-full overflow-hidden shadow-inner">
      <div className={`h-full ${color} rounded-full transition-all duration-1000 shadow-lg`} style={{ width: status }}></div>
    </div>
  </div>
);

export default Dashboard;
