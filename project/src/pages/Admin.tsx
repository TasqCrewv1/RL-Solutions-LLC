import { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Filter,
  Download,
  Loader2,
  LogOut,
  Lock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Inbox,
  MessageSquare,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useSEO } from '../lib/useSEO';
import { getPageMeta } from '../lib/seo';
import { calculators } from '../lib/estimators';
import { fmt } from '../lib/pricing';

interface EstimateSubmission {
  id: string;
  calculator_type: string;
  project_title: string;
  selections: Record<string, unknown>;
  pricing_breakdown: { low: number; high: number; components: { label: string; amount: number }[]; disclaimer: string } | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  property_location: string | null;
  timeline: string | null;
  budget_range: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: 'bg-orange-100 text-orange-700',
  contacted: 'bg-blue-100 text-blue-700',
  scheduled: 'bg-purple-100 text-purple-700',
  closed: 'bg-slate-100 text-slate-600',
};

const statusOptions = ['new', 'contacted', 'scheduled', 'closed'];

export default function Admin() {
  const meta = getPageMeta('admin');
  useSEO(meta, 'admin');

  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [tab, setTab] = useState<'estimates' | 'messages'>('estimates');
  const [estimates, setEstimates] = useState<EstimateSubmission[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setAuthed(true);
    } catch {
      setLoginError('Invalid credentials. Please try again.');
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setAuthed(false);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (tab === 'estimates') {
        const { data, error } = await supabase
          .from('estimate_submissions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);
        if (!error && data) setEstimates(data as EstimateSubmission[]);
      } else {
        const { data, error } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);
        if (!error && data) setMessages(data as ContactMessage[]);
      }
    } catch {
      // ignore — RLS may block if not authed
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setAuthed(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (authed) loadData();
  }, [authed, loadData]);

  const updateStatus = async (id: string, status: string, table: string) => {
    const { error } = await supabase.from(table).update({ status }).eq('id', id);
    if (!error) {
      if (table === 'estimate_submissions') {
        setEstimates((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
      } else {
        setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
      }
    }
  };

  const exportCSV = () => {
    if (tab === 'estimates') {
      const headers = ['Date', 'Name', 'Email', 'Phone', 'Project Type', 'Est. Low', 'Est. High', 'Location', 'Status'];
      const rows = filteredEstimates.map((e) => [
        new Date(e.created_at).toLocaleDateString(),
        e.customer_name,
        e.customer_email,
        e.customer_phone || '',
        e.project_title || e.calculator_type,
        e.pricing_breakdown ? fmt(e.pricing_breakdown.low) : '',
        e.pricing_breakdown ? fmt(e.pricing_breakdown.high) : '',
        e.property_location || '',
        e.status,
      ]);
      const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
      downloadCSV(csv, 'estimates');
    } else {
      const headers = ['Date', 'Name', 'Email', 'Phone', 'Subject', 'Status'];
      const rows = filteredMessages.map((m) => [
        new Date(m.created_at).toLocaleDateString(),
        m.name, m.email, m.phone || '', m.subject || '', m.status,
      ]);
      const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
      downloadCSV(csv, 'messages');
    }
  };

  const downloadCSV = (csv: string, name: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rlsolutions-${name}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredEstimates = estimates.filter((e) => {
    const matchesSearch = !search ||
      e.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      e.customer_email.toLowerCase().includes(search.toLowerCase()) ||
      (e.property_location || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredMessages = messages.filter((m) => {
    const matchesSearch = !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });


  if (!authed) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-slate-50 pt-20">
        <div className="w-full max-w-md p-8">
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-900/5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-orange-500">
              <Lock size={28} />
            </div>
            <h1 className="mt-6 font-display text-2xl font-600 text-slate-900">Admin Login</h1>
            <p className="mt-2 text-sm text-slate-500">Sign in to manage leads and messages.</p>
            <form onSubmit={login} className="mt-6 space-y-4">
              <div>
                <label htmlFor="admin-email" className="mb-1.5 block text-sm font-600 text-slate-700">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border-2 border-slate-100 px-4 py-3 text-base text-slate-900 transition-colors focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="admin-password" className="mb-1.5 block text-sm font-600 text-slate-700">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border-2 border-slate-100 px-4 py-3 text-base text-slate-900 transition-colors focus:border-orange-500 focus:outline-none"
                />
              </div>
              {loginError && (
                <p className="text-sm font-500 text-red-600">{loginError}</p>
              )}
              <button
                type="submit"
                disabled={loggingIn}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-base font-600 text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
              >
                {loggingIn ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="container-wide py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-600 text-slate-900">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">Manage estimates and contact messages.</p>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-600 text-slate-600 transition-colors hover:bg-slate-200"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <div className="mt-8 flex gap-1 rounded-xl bg-white p-1 shadow-sm ring-1 ring-slate-900/5">
          <button
            onClick={() => { setTab('estimates'); setStatusFilter('all'); setSelectedId(null); }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-600 transition-colors ${
              tab === 'estimates' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <TrendingUp size={16} /> Estimates ({estimates.length})
          </button>
          <button
            onClick={() => { setTab('messages'); setStatusFilter('all'); setSelectedId(null); }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-600 transition-colors ${
              tab === 'messages' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MessageSquare size={16} /> Messages ({messages.length})
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, location..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 transition-colors focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 transition-colors focus:border-orange-500 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-600 text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-50"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin text-slate-400" />
          </div>
        ) : tab === 'estimates' ? (
          <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
            {filteredEstimates.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Inbox size={32} />
                <p className="mt-3 text-sm">No estimates found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-100 bg-slate-50/50">
                    <tr className="text-xs font-600 uppercase tracking-wider text-slate-400">
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Project</th>
                      <th className="px-4 py-3">Est. Range</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredEstimates.map((e) => {
                      const calc = calculators.find((c) => c.id === e.calculator_type);
                      return (
                        <>
                          <tr
                            key={e.id}
                            onClick={() => setSelectedId(selectedId === e.id ? null : e.id)}
                            className="cursor-pointer transition-colors hover:bg-slate-50"
                          >
                            <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                              {new Date(e.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <p className="font-600 text-slate-900">{e.customer_name}</p>
                              <p className="text-xs text-slate-400">{e.customer_email}</p>
                            </td>
                            <td className="px-4 py-3">
                              <p className="font-500 text-slate-700">{e.project_title || calc?.name || e.calculator_type}</p>
                              {e.property_location && <p className="text-xs text-slate-400">{e.property_location}</p>}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap font-600 text-slate-700">
                              {e.pricing_breakdown && e.pricing_breakdown.low > 0
                                ? `${fmt(e.pricing_breakdown.low)} – ${fmt(e.pricing_breakdown.high)}`
                                : '—'}
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={e.status}
                                onClick={(ev) => ev.stopPropagation()}
                                onChange={(ev) => updateStatus(e.id, ev.target.value, 'estimate_submissions')}
                                className={`rounded-full px-3 py-1 text-xs font-600 ${statusColors[e.status] || 'bg-slate-100 text-slate-600'}`}
                              >
                                {statusOptions.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </td>
                          </tr>
                          {selectedId === e.id && (
                            <tr key={e.id + '-detail'} className="bg-slate-50/50">
                              <td colSpan={5} className="px-4 py-6">
                                <div className="grid gap-6 sm:grid-cols-2">
                                  <div>
                                    <h4 className="text-xs font-600 uppercase tracking-wider text-slate-400">Contact Info</h4>
                                    <div className="mt-3 space-y-2 text-sm">
                                      <p className="flex items-center gap-2 text-slate-700"><Mail size={14} className="text-slate-400" /> {e.customer_email}</p>
                                      <p className="flex items-center gap-2 text-slate-700"><Phone size={14} className="text-slate-400" /> {e.customer_phone || 'N/A'}</p>
                                      {e.property_location && <p className="flex items-center gap-2 text-slate-700"><MapPin size={14} className="text-slate-400" /> {e.property_location}</p>}
                                      <p className="flex items-center gap-2 text-slate-700"><Calendar size={14} className="text-slate-400" /> Timeline: {e.timeline || 'N/A'}</p>
                                      <p className="flex items-center gap-2 text-slate-700"><TrendingUp size={14} className="text-slate-400" /> Budget: {e.budget_range || 'N/A'}</p>
                                    </div>
                                    {e.notes && (
                                      <div className="mt-4">
                                        <h4 className="text-xs font-600 uppercase tracking-wider text-slate-400">Notes</h4>
                                        <p className="mt-2 text-sm text-slate-700">{e.notes}</p>
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-600 uppercase tracking-wider text-slate-400">Project Details</h4>
                                    <div className="mt-3 space-y-2 text-sm">
                                      {Object.entries(e.selections).map(([key, val]) => (
                                        <div key={key} className="flex justify-between gap-4">
                                          <span className="text-slate-500">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}</span>
                                          <span className="text-right font-500 text-slate-700">{String(val)}</span>
                                        </div>
                                      ))}
                                    </div>
                                    {e.pricing_breakdown && e.pricing_breakdown.components.length > 0 && (
                                      <div className="mt-4">
                                        <h4 className="text-xs font-600 uppercase tracking-wider text-slate-400">Cost Breakdown</h4>
                                        <ul className="mt-2 space-y-1 text-sm">
                                          {e.pricing_breakdown.components.map((c) => (
                                            <li key={c.label} className="flex justify-between">
                                              <span className="text-slate-500">{c.label}</span>
                                              <span className="font-600 text-slate-700">{fmt(c.amount)}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
            {filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Inbox size={32} />
                <p className="mt-3 text-sm">No messages found.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {filteredMessages.map((m) => (
                  <div key={m.id} className="p-5 transition-colors hover:bg-slate-50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <p className="font-600 text-slate-900">{m.name}</p>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-600 ${statusColors[m.status] || 'bg-slate-100 text-slate-600'}`}>
                            {m.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{m.email}{m.phone && ` · ${m.phone}`}</p>
                        {m.subject && <p className="mt-2 text-sm font-600 text-slate-700">{m.subject}</p>}
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.message}</p>
                        <p className="mt-2 text-xs text-slate-400">{new Date(m.created_at).toLocaleString()}</p>
                      </div>
                      <select
                        value={m.status}
                        onChange={(ev) => updateStatus(m.id, ev.target.value, 'contact_messages')}
                        className="flex-none rounded-full px-3 py-1 text-xs font-600 text-slate-600 ring-1 ring-slate-200"
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
