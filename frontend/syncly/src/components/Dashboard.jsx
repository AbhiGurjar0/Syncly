
import { useState, useEffect, useRef } from "react";
 
const cn = (...classes) => classes.filter(Boolean).join(" ");
 
const Avatar = ({ initials, color, size = "md" }) => {
  const sizes = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-10 h-10 text-sm" };
  const colors = {
    purple: "bg-purple-500/20 text-purple-400 ring-purple-500/30",
    blue: "bg-blue-500/20 text-blue-400 ring-blue-500/30",
    green: "bg-emerald-500/20 text-emerald-400 ring-emerald-500/30",
    amber: "bg-amber-500/20 text-amber-400 ring-amber-500/30",
    pink: "bg-pink-500/20 text-pink-400 ring-pink-500/30",
    teal: "bg-teal-500/20 text-teal-400 ring-teal-500/30",
  };
  return (
    <div className={cn("rounded-full flex items-center justify-center font-semibold ring-1", sizes[size], colors[color] || colors.purple)}>
      {initials}
    </div>
  );
};
 
const Badge = ({ label, variant }) => {
  const variants = {
    HIGH: "bg-red-500/15 text-red-400 ring-red-500/20",
    MED: "bg-amber-500/15 text-amber-400 ring-amber-500/20",
    LOW: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20",
    DESIGN: "bg-purple-500/15 text-purple-400 ring-purple-500/20",
    DEV: "bg-blue-500/15 text-blue-400 ring-blue-500/20",
    MARKETING: "bg-pink-500/15 text-pink-400 ring-pink-500/20",
    ACTIVE: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20",
    REVIEW: "bg-blue-500/15 text-blue-400 ring-blue-500/20",
    PLANNING: "bg-amber-500/15 text-amber-400 ring-amber-500/20",
    "ON HOLD": "bg-zinc-500/15 text-zinc-400 ring-zinc-500/20",
  };
  return (
    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full ring-1 tracking-wide uppercase", variants[variant] || variants.LOW)}>
      {label}
    </span>
  );
};
 
const ProgressBar = ({ value, color = "purple" }) => {
  const colors = {
    purple: "bg-purple-500",
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    pink: "bg-pink-500",
    zinc: "bg-zinc-500",
  };
  return (
    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
      <div className={cn("h-full rounded-full transition-all", colors[color])} style={{ width: `${value}%` }} />
    </div>
  );
};
 
const MetricCard = ({ icon, label, value, delta, deltaUp, barColors }) => {
  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center text-lg">{icon}</div>
        <span className={cn("text-xs font-semibold px-2 py-1 rounded-full", deltaUp ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400")}>
          {deltaUp ? "↑" : "↓"} {delta}
        </span>
      </div>
      <div>
        <div className="text-4xl font-bold tracking-tight text-white/90">{value}</div>
        <div className="text-xs text-white/40 mt-0.5 font-medium">{label}</div>
      </div>
      <div className="flex gap-1 items-end h-6">
        {barColors.map((c, i) => (
          <div key={i} className={cn("flex-1 rounded-sm opacity-70", c)} style={{ height: `${40 + Math.random() * 60}%` }} />
        ))}
      </div>
    </div>
  );
};
 
const SprintCard = ({ task }) => (
  <div className="glass-card rounded-xl p-3.5 flex flex-col gap-2 group hover:bg-white/8 transition-colors cursor-pointer">
    <div className="flex items-center gap-2">
      <Badge label={task.category} variant={task.category} />
      {task.done && <span className="text-[10px] text-emerald-400 font-semibold ml-auto flex items-center gap-1">✓ Done</span>}
    </div>
    <p className="text-sm text-white/80 font-medium leading-snug">{task.title}</p>
    <div className="flex items-center justify-between mt-1">
      <Badge label={task.priority} variant={task.priority} />
      <span className="text-[11px] text-white/30 font-mono">{task.date}</span>
    </div>
  </div>
);
 
const sprintTasks = {
  todo: [
    { id: 1, category: "DESIGN", title: "Update onboarding illustration set", priority: "MED", date: "Apr 5" },
    { id: 2, category: "DEV", title: "Set up CI/CD pipeline for staging", priority: "HIGH", date: "Mar 30" },
  ],
  inProgress: [
    { id: 3, category: "MARKETING", title: "Write Q2 launch blog post", priority: "MED", date: "Apr 8" },
    { id: 4, category: "DEV", title: "Refactor auth token refresh logic", priority: "HIGH", date: "Mar 29" },
  ],
  done: [
    { id: 5, category: "DESIGN", title: "Finalize color token library", priority: "LOW", date: "Apr 2", done: true },
    { id: 6, category: "DEV", title: "API rate limiting middleware", priority: "HIGH", date: "Apr 1", done: true },
  ],
};
 
const projects = [
  { name: "Redesign – Design System v2", tasks: 32, members: 5, due: "Apr 10", status: "ACTIVE", progress: 72, color: "purple" },
  { name: "Backend API – v3 Migration", tasks: 18, members: 4, due: "Mar 28", status: "REVIEW", progress: 88, color: "blue" },
  { name: "Mobile App – iOS Release", tasks: 45, members: 8, due: "May 1", status: "ACTIVE", progress: 41, color: "amber" },
  { name: "Marketing Site – Q2 Refresh", tasks: 12, members: 3, due: "Apr 22", status: "PLANNING", progress: 15, color: "pink" },
  { name: "Data Pipeline – ETL Overhaul", tasks: 9, members: 2, due: "Jun 15", status: "ON HOLD", progress: 5, color: "zinc" },
];
 
const teamMembers = [
  { name: "Arjun Kumar", role: "Product Lead", tasks: 8, initials: "AK", color: "purple" },
  { name: "Sneha Rao", role: "Frontend Dev", tasks: 12, initials: "SR", color: "teal" },
  { name: "Jay Patel", role: "Backend Dev", tasks: 9, initials: "JP", color: "blue" },
  { name: "Meera Nair", role: "UX Designer", tasks: 6, initials: "MN", color: "pink" },
  { name: "Rohan Bose", role: "DevOps", tasks: 5, initials: "RB", color: "amber" },
];
 
const activity = [
  { user: "You", initials: "MR", color: "purple", action: "completed task", highlight: '"Finalize color tokens"', sub: "in Design System", time: "2 min ago" },
  { user: "Sneha R.", initials: "SR", color: "teal", action: "left a comment on", highlight: "API Migration Sprint", sub: "", time: "18 min ago" },
  { user: "Jay P.", initials: "JP", color: "blue", action: "moved", highlight: '"Auth flow redesign"', sub: "to In Review", time: "1 hr ago" },
  { user: "Meera N.", initials: "MN", color: "pink", action: "uploaded", highlight: "3 design files", sub: "to Marketing Site", time: "2 hr ago" },
  { user: "Rohan B.", initials: "RB", color: "amber", action: "created", highlight: "Sprint #12", sub: "for iOS Release", time: "Yesterday" },
];
 
function Sidebar({ dark, setDark, active, setActive }) {
  const nav = [
    { label: "Dashboard", icon: "⬡", id: "dashboard" },
    { label: "Projects", icon: "◫", id: "projects", badge: 12 },
    { label: "My Tasks", icon: "◻", id: "tasks", badge: 5 },
    { label: "Sprints", icon: "⟳", id: "sprints" },
  ];
  const reports = [
    { label: "Analytics", icon: "↗", id: "analytics" },
    { label: "Timeline", icon: "≡", id: "timeline" },
    { label: "Reports", icon: "◫", id: "reports" },
  ];
  const team = [
    { label: "Members", icon: "◉", id: "members" },
    { label: "Settings", icon: "⚙", id: "settings" },
  ];
 
  return (
    <aside className={cn("w-56 flex-shrink-0 flex flex-col h-full border-r border-white/6 py-5", dark ? "bg-[#0e0e12]" : "bg-[#fafaf9] border-black/8")}>
      <div className="px-5 mb-8 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/30">O</div>
        <span className={cn("text-base font-bold tracking-tight", dark ? "text-white" : "text-zinc-900")}>Orbit</span>
      </div>
 
      <div className="px-3 mb-1">
        <p className={cn("text-[10px] font-semibold uppercase tracking-widest px-2 mb-1.5", dark ? "text-white/25" : "text-black/30")}>Workspace</p>
        {nav.map(n => (
          <button key={n.id} onClick={() => setActive(n.id)} className={cn("w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium transition-all mb-0.5",
            active === n.id
              ? dark ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-50 text-indigo-600"
              : dark ? "text-white/50 hover:bg-white/5 hover:text-white/80" : "text-zinc-500 hover:bg-black/5 hover:text-zinc-800"
          )}>
            <span className="text-base leading-none">{n.icon}</span>
            <span className="flex-1 text-left">{n.label}</span>
            {n.badge && <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-bold", dark ? "bg-indigo-500/30 text-indigo-300" : "bg-indigo-100 text-indigo-600")}>{n.badge}</span>}
          </button>
        ))}
      </div>
 
      <div className="px-3 mt-3 mb-1">
        <p className={cn("text-[10px] font-semibold uppercase tracking-widest px-2 mb-1.5", dark ? "text-white/25" : "text-black/30")}>Reports</p>
        {reports.map(n => (
          <button key={n.id} onClick={() => setActive(n.id)} className={cn("w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium transition-all mb-0.5",
            active === n.id
              ? dark ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-50 text-indigo-600"
              : dark ? "text-white/50 hover:bg-white/5 hover:text-white/80" : "text-zinc-500 hover:bg-black/5 hover:text-zinc-800"
          )}>
            <span className="text-base leading-none">{n.icon}</span>
            {n.label}
          </button>
        ))}
      </div>
 
      <div className="px-3 mt-3 mb-1">
        <p className={cn("text-[10px] font-semibold uppercase tracking-widest px-2 mb-1.5", dark ? "text-white/25" : "text-black/30")}>Team</p>
        {team.map(n => (
          <button key={n.id} onClick={() => setActive(n.id)} className={cn("w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm font-medium transition-all mb-0.5",
            active === n.id
              ? dark ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-50 text-indigo-600"
              : dark ? "text-white/50 hover:bg-white/5 hover:text-white/80" : "text-zinc-500 hover:bg-black/5 hover:text-zinc-800"
          )}>
            <span className="text-base leading-none">{n.icon}</span>
            {n.label}
          </button>
        ))}
      </div>
 
      <div className="mt-auto px-3">
        <div className={cn("flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl", dark ? "bg-white/5" : "bg-black/5")}>
          <Avatar initials="MR" color="purple" size="sm" />
          <div className="flex-1 min-w-0">
            <p className={cn("text-xs font-semibold truncate", dark ? "text-white/80" : "text-zinc-800")}>Manoj Rajput</p>
            <p className={cn("text-[10px] truncate", dark ? "text-white/35" : "text-zinc-400")}>Product Lead</p>
          </div>
          <button onClick={() => setDark(!dark)} className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-colors", dark ? "bg-white/8 hover:bg-white/12 text-white/50" : "bg-black/8 hover:bg-black/12 text-zinc-500")}>
            {dark ? "☀" : "☾"}
          </button>
        </div>
      </div>
    </aside>
  );
}
 
function TimeTracker({ dark }) {
  const [seconds, setSeconds] = useState(5780);
  const [running, setRunning] = useState(true);
  const ref = useRef(null);
 
  useEffect(() => {
    if (running) ref.current = setInterval(() => setSeconds(s => s + 1), 1000);
    else clearInterval(ref.current);
    return () => clearInterval(ref.current);
  }, [running]);
 
  const fmt = s => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };
 
  return (
    <div className={cn("rounded-2xl p-5 flex flex-col items-center gap-4", dark ? "bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border border-indigo-500/20" : "bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200/60")}>
      <div className="flex items-center justify-between w-full">
        <span className={cn("text-sm font-semibold", dark ? "text-white/60" : "text-indigo-700")}>Time Tracker</span>
        <button className={cn("text-xs px-2 py-1 rounded-lg", dark ? "bg-white/8 text-white/40 hover:bg-white/12" : "bg-indigo-100 text-indigo-400 hover:bg-indigo-200")}>✎</button>
      </div>
      <div className={cn("text-4xl font-mono font-bold tracking-tight tabular-nums", dark ? "text-white" : "text-indigo-900")}>
        {fmt(seconds)}
      </div>
      <div className="flex gap-3">
        <button onClick={() => setRunning(!running)}
          className={cn("w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all shadow-lg", running ? "bg-indigo-500 shadow-indigo-500/40 hover:bg-indigo-600 text-white" : "bg-emerald-500 shadow-emerald-500/40 hover:bg-emerald-600 text-white")}>
          {running ? "⏸" : "▶"}
        </button>
        <button onClick={() => { setSeconds(0); setRunning(false); }}
          className="w-11 h-11 rounded-full flex items-center justify-center text-lg bg-red-500 shadow-lg shadow-red-500/40 hover:bg-red-600 text-white transition-all">
          ■
        </button>
      </div>
    </div>
  );
}
 
export default function OrbitDashboard() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("dashboard");
  const [projectTab, setProjectTab] = useState("All");
 
  const bg = dark ? "bg-[#0e0e12]" : "bg-[#f5f5f3]";
  const text = dark ? "text-white/80" : "text-zinc-800";
  const subtext = dark ? "text-white/40" : "text-zinc-400";
  const card = dark ? "bg-white/[0.04] border border-white/[0.06]" : "bg-white border border-black/[0.06]";
  const glassCard = dark ? "bg-white/[0.04] border border-white/[0.06]" : "bg-white/80 border border-black/[0.06]";
 
  const metricCards = [
    { icon: "◫", label: "Active Projects", value: "24", delta: "12%", deltaUp: true, barColors: ["bg-purple-500", "bg-purple-400", "bg-purple-600", "bg-indigo-500", "bg-purple-500", "bg-violet-500", "bg-purple-400", "bg-indigo-400"] },
    { icon: "✓", label: "Tasks Completed", value: "187", delta: "8%", deltaUp: true, barColors: ["bg-teal-500", "bg-emerald-500", "bg-teal-400", "bg-emerald-400", "bg-teal-500", "bg-emerald-500", "bg-teal-400", "bg-emerald-300"] },
    { icon: "⏱", label: "Overdue Tasks", value: "6", delta: "3%", deltaUp: false, barColors: ["bg-amber-500", "bg-orange-400", "bg-amber-400", "bg-orange-500", "bg-amber-500", "bg-amber-400", "bg-orange-400", "bg-red-400"] },
    { icon: "◉", label: "Team Members", value: "16", delta: "2", deltaUp: true, barColors: ["bg-pink-500", "bg-rose-400", "bg-pink-400", "bg-rose-500", "bg-pink-500", "bg-rose-400", "bg-pink-400", "bg-rose-300"] },
  ];
 
  return (
    <div className={cn("flex h-screen overflow-hidden font-sans", bg, text)} style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif" }}>
      <Sidebar dark={dark} setDark={setDark} active={active} setActive={setActive} />
 
      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Topbar */}
        <div className={cn("sticky top-0 z-10 flex items-center justify-between px-7 py-4 border-b backdrop-blur-md", dark ? "border-white/6 bg-[#0e0e12]/80" : "border-black/8 bg-[#f5f5f3]/80")}>
          <div>
            <h1 className={cn("text-xl font-bold tracking-tight", dark ? "text-white" : "text-zinc-900")}>Dashboard</h1>
            <p className={subtext + " text-sm"}>Good morning, Manoj 👋</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={cn("flex items-center gap-2 px-3 py-2 rounded-xl text-sm", dark ? "bg-white/6 text-white/40" : "bg-black/6 text-zinc-400")}>
              <span>⌕</span>
              <span>Search tasks, projects…</span>
              <kbd className={cn("text-[10px] px-1.5 py-0.5 rounded-md font-mono", dark ? "bg-white/10 text-white/30" : "bg-black/10 text-zinc-400")}>⌘K</kbd>
            </div>
            <Avatar initials="AK" color="blue" size="sm" />
            <span className={cn("text-xs font-semibold px-3 py-1.5 rounded-lg", dark ? "bg-white/8 text-white/60" : "bg-black/8 text-zinc-500")}>Q2 2026</span>
            <span className={cn("text-xs font-semibold px-3 py-1.5 rounded-lg", dark ? "bg-white/8 text-white/60" : "bg-black/8 text-zinc-500")}>My Team</span>
            <button className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-lg shadow-indigo-500/25">
              <span>+</span> New Task
            </button>
          </div>
        </div>
 
        <div className="px-7 py-6 space-y-6">
          {/* Metric Cards */}
          <div className="grid grid-cols-4 gap-4">
            {metricCards.map((m, i) => (
              <div key={i} className={cn("rounded-2xl p-5 flex flex-col gap-3 cursor-pointer hover:scale-[1.01] transition-transform", glassCard)}>
                <div className="flex items-start justify-between">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-lg", dark ? "bg-white/8" : "bg-black/5")}>{m.icon}</div>
                  <span className={cn("text-xs font-semibold px-2 py-1 rounded-full", m.deltaUp ? "bg-emerald-500/15 text-emerald-500" : "bg-red-500/15 text-red-400")}>
                    {m.deltaUp ? "↑" : "↓"} {m.delta}
                  </span>
                </div>
                <div>
                  <div className={cn("text-4xl font-bold tracking-tight", dark ? "text-white" : "text-zinc-900")}>{m.value}</div>
                  <div className={cn("text-xs mt-0.5 font-medium", subtext)}>{m.label}</div>
                </div>
                <div className="flex gap-1 items-end h-7">
                  {[55, 65, 45, 80, 60, 70, 50, 90].map((h, j) => (
                    <div key={j} className={cn("flex-1 rounded-sm opacity-60", m.barColors[j])} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
 
          {/* Sprint Board + Activity */}
          <div className="grid grid-cols-3 gap-4">
            <div className={cn("col-span-2 rounded-2xl p-5", glassCard)}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className={cn("font-bold text-base", dark ? "text-white" : "text-zinc-900")}>Sprint Board — Sprint #11</h2>
                  <span className="flex items-center gap-1.5 bg-emerald-500/15 text-emerald-500 text-xs font-semibold px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> In Progress
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {["All", "Design", "Dev"].map(t => (
                    <button key={t} className={cn("text-xs px-3 py-1 rounded-lg font-medium transition-colors", t === "All" ? (dark ? "bg-white/10 text-white/80" : "bg-black/10 text-zinc-700") : subtext + " hover:bg-white/5")}>{t}</button>
                  ))}
                  <button className="text-xs text-indigo-400 font-semibold hover:text-indigo-300">Full board →</button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {/* To Do */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-white/30 inline-block" />
                    <span className={cn("text-xs font-bold uppercase tracking-widest", subtext)}>To Do</span>
                    <span className={cn("text-xs px-1.5 rounded-full font-bold ml-auto", dark ? "bg-white/10 text-white/50" : "bg-black/10 text-zinc-500")}>3</span>
                  </div>
                  <div className="space-y-2">
                    {sprintTasks.todo.map(t => <SprintCard key={t.id} task={t} />)}
                  </div>
                </div>
                {/* In Progress */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                    <span className={cn("text-xs font-bold uppercase tracking-widest", subtext)}>In Progress</span>
                    <span className={cn("text-xs px-1.5 rounded-full font-bold ml-auto", dark ? "bg-white/10 text-white/50" : "bg-black/10 text-zinc-500")}>4</span>
                  </div>
                  <div className="space-y-2">
                    {sprintTasks.inProgress.map(t => <SprintCard key={t.id} task={t} />)}
                  </div>
                </div>
                {/* Done */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    <span className={cn("text-xs font-bold uppercase tracking-widest", subtext)}>Done</span>
                    <span className={cn("text-xs px-1.5 rounded-full font-bold ml-auto", dark ? "bg-white/10 text-white/50" : "bg-black/10 text-zinc-500")}>7</span>
                  </div>
                  <div className="space-y-2">
                    {sprintTasks.done.map(t => <SprintCard key={t.id} task={t} />)}
                  </div>
                </div>
              </div>
            </div>
 
            {/* Recent Activity */}
            <div className={cn("rounded-2xl p-5 flex flex-col gap-4", glassCard)}>
              <div className="flex items-center justify-between">
                <h2 className={cn("font-bold text-base", dark ? "text-white" : "text-zinc-900")}>Recent Activity</h2>
                <button className="text-xs text-indigo-400 font-semibold hover:text-indigo-300">See all →</button>
              </div>
              <div className="space-y-4 flex-1">
                {activity.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <Avatar initials={a.initials} color={a.color} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-xs leading-relaxed", dark ? "text-white/60" : "text-zinc-600")}>
                        <span className={cn("font-semibold", dark ? "text-white/80" : "text-zinc-800")}>{a.user}</span>{" "}
                        {a.action}{" "}
                        <span className="text-indigo-400 font-medium">{a.highlight}</span>
                        {a.sub && <span> {a.sub}</span>}
                      </p>
                      <p className={cn("text-[10px] mt-0.5", subtext)}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <TimeTracker dark={dark} />
            </div>
          </div>
 
          {/* Active Projects + Team Load */}
          <div className="grid grid-cols-3 gap-4">
            <div className={cn("col-span-2 rounded-2xl p-5", glassCard)}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={cn("font-bold text-base", dark ? "text-white" : "text-zinc-900")}>Active Projects</h2>
                <div className="flex items-center gap-2">
                  {["All", "Mine", "Shared"].map(t => (
                    <button key={t} onClick={() => setProjectTab(t)} className={cn("text-xs px-3 py-1 rounded-lg font-medium transition-colors", projectTab === t ? (dark ? "bg-white/10 text-white/80" : "bg-black/10 text-zinc-700") : subtext + " hover:bg-white/5")}>{t}</button>
                  ))}
                  <button className="text-xs text-indigo-400 font-semibold hover:text-indigo-300">View all →</button>
                </div>
              </div>
              <div className="space-y-2">
                {projects.map((p, i) => (
                  <div key={i} className={cn("flex items-center gap-4 p-3.5 rounded-xl cursor-pointer transition-colors", dark ? "hover:bg-white/5" : "hover:bg-black/3")}>
                    <div className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0", {
                      purple: "bg-purple-500", blue: "bg-blue-500", amber: "bg-amber-500", pink: "bg-pink-500", zinc: "bg-zinc-500"
                    }[p.color])} />
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-semibold truncate", dark ? "text-white/85" : "text-zinc-800")}>{p.name}</p>
                      <p className={cn("text-xs mt-0.5", subtext)}>📋 {p.tasks} tasks · 👥 {p.members} members · 📅 {p.due}</p>
                    </div>
                    <Badge label={p.status} variant={p.status} />
                    <div className="w-28">
                      <ProgressBar value={p.progress} color={p.color} />
                    </div>
                    <span className={cn("text-xs font-bold w-9 text-right", dark ? "text-white/50" : "text-zinc-500")}>{p.progress}%</span>
                  </div>
                ))}
              </div>
            </div>
 
            {/* Team Load */}
            <div className={cn("rounded-2xl p-5 flex flex-col gap-4", glassCard)}>
              <div className="flex items-center justify-between">
                <h2 className={cn("font-bold text-base", dark ? "text-white" : "text-zinc-900")}>Team Load</h2>
                <button className="text-xs text-indigo-400 font-semibold hover:text-indigo-300">All members →</button>
              </div>
              <div className="space-y-3 flex-1">
                {teamMembers.map((m, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar initials={m.initials} color={m.color} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-semibold", dark ? "text-white/80" : "text-zinc-800")}>{m.name}</p>
                      <p className={cn("text-xs", subtext)}>{m.role}</p>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-sm font-bold", dark ? "text-white/80" : "text-zinc-800")}>{m.tasks}</p>
                      <p className={cn("text-[10px]", subtext)}>tasks</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Mini workload bars */}
              <div className={cn("rounded-xl p-3.5", dark ? "bg-white/4" : "bg-black/3")}>
                <p className={cn("text-xs font-semibold mb-3", subtext)}>Workload distribution</p>
                <div className="space-y-2">
                  {teamMembers.map((m, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className={cn("text-[10px] w-5 font-bold text-right", subtext)}>{m.initials[0]}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all", { purple: "bg-purple-500", teal: "bg-teal-500", blue: "bg-blue-500", pink: "bg-pink-500", amber: "bg-amber-500" }[m.color])}
                          style={{ width: `${(m.tasks / 12) * 100}%` }} />
                      </div>
                      <span className={cn("text-[10px] w-4 font-bold", subtext)}>{m.tasks}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
 

