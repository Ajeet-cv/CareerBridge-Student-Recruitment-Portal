import { CheckCircle2, Clock, Send, Sparkles, XCircle } from 'lucide-react';

const STATUS_MAP = {
  Applied: { cls: 'badge-blue', icon: Send },
  Shortlisted: { cls: 'badge-amber', icon: Sparkles },
  'Interview Scheduled': { cls: 'badge-purple', icon: Clock },
  Selected: { cls: 'badge-green', icon: CheckCircle2 },
  Rejected: { cls: 'badge-red', icon: XCircle },
  Eligible: { cls: 'badge-green', icon: CheckCircle2 },
  'Not Eligible': { cls: 'badge-red', icon: XCircle },
  Open: { cls: 'badge-green', icon: CheckCircle2 },
  Closed: { cls: 'badge-slate', icon: XCircle },
  Upcoming: { cls: 'badge-blue', icon: Clock },
  Completed: { cls: 'badge-green', icon: CheckCircle2 },
};

function StatusBadge({ status }) {
  const cfg = STATUS_MAP[status] || { cls: 'badge-slate', icon: null };
  const Icon = cfg.icon;
  return (
    <span className={`badge ${cfg.cls}`}>
      {Icon && <Icon size={13} />}
      <span>{status}</span>
    </span>
  );
}

export default StatusBadge;
