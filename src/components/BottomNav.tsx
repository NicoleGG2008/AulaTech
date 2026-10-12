export type Tab = "home" | "lessons" | "practice" | "downloads";
export default function BottomNav({ active, onNavigate }: { active: Tab; onNavigate: (tab: Tab) => void }) {
  const items: { id: Tab; icon: string; label: string }[] = [{ id: "home", icon: "⌂", label: "Inicio" }, { id: "lessons", icon: "▤", label: "Lecciones" }, { id: "practice", icon: "⌘", label: "Práctica" }, { id: "downloads", icon: "↓", label: "Offline" }];
  return <nav className="bottom-nav" aria-label="Navegación principal">{items.map((item) => <button key={item.id} className={`nav-item ${active === item.id ? "active" : ""}`} aria-current={active === item.id ? "page" : undefined} onClick={() => onNavigate(item.id)}><span aria-hidden="true">{item.icon}</span><span>{item.label}</span></button>)}</nav>;
}
