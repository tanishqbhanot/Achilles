import { recentActivity } from "../../data/mockData";

export default function ActivityFeed() {
  return (
    <ul className="flex flex-col gap-4">
      {recentActivity.map((item) => (
        <li key={item.id} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
          <p className="text-sm text-primary">{item.title}</p>
          <p className="mt-1 text-sm text-secondary">{item.detail}</p>
          <p className="mt-1 text-xs text-secondary/80">{item.time}</p>
        </li>
      ))}
    </ul>
  );
}
