import { Briefcase, Calendar, CheckCircle2, IndianRupee, MapPin, ShieldAlert } from 'lucide-react';
import StatusBadge from './StatusBadge';

function JobCard({
  job,
  company,
  eligibility,
  alreadyApplied,
  onApply,
  onViewDetails,
  readOnly = false,
}) {
  const logoColor = company?.color || '#7a1624';
  const shortCode = company?.shortCode || company?.name?.slice(0, 3).toUpperCase() || 'CO';

  return (
    <article className="job-card">
      <div className="job-card-top">
        <div className="company-identity">
          {company?.logoUrl ? (
            <img
              src={company.logoUrl}
              alt={company.name}
              className="company-logo-box"
              style={{ objectFit: 'cover', backgroundColor: '#f1f5f9' }}
            />
          ) : (
            <div className="company-logo-box" style={{ backgroundColor: logoColor }}>
              {shortCode}
            </div>
          )}
          <div>
            <h3 className="job-role-title">{job.title}</h3>
            <div className="job-company-name">{company?.name || 'Partner Company'}</div>
          </div>
        </div>

        {eligibility && (
          <StatusBadge status={eligibility.eligible ? 'Eligible' : 'Not Eligible'} />
        )}
      </div>

      <div className="job-meta-grid">
        <div className="job-meta-item">
          <MapPin size={14} color="#64748b" />
          <span>{job.location}</span>
        </div>
        <div className="job-meta-item">
          <Briefcase size={14} color="#64748b" />
          <span>{job.jobType}</span>
        </div>
        <div className="job-meta-item">
          <IndianRupee size={14} color="#16a34a" />
          <strong style={{ color: '#0f172a' }}>{job.packageLPA} LPA</strong>
        </div>
        <div className="job-meta-item">
          <Calendar size={14} color="#64748b" />
          <span>Due {job.deadline}</span>
        </div>
      </div>

      <div className="job-criteria-row">
        <span className="criteria-chip">Min CGPA: {job.minCGPA}</span>
        <span className="criteria-chip">Max Backlogs: {job.allowedBacklogs}</span>
        <span className="criteria-chip">
          Branches:{' '}
          {job.eligibleBranches.length > 2
            ? `${job.eligibleBranches.slice(0, 2).map((b) => b.split(' ')[0]).join(', ')} +${job.eligibleBranches.length - 2}`
            : job.eligibleBranches.join(', ')}
        </span>
      </div>

      {eligibility && !eligibility.eligible && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 7,
            fontSize: '0.78rem',
            color: '#b91c1c',
            backgroundColor: '#fef2f2',
            padding: '8px 10px',
            borderRadius: 8,
          }}
        >
          <ShieldAlert size={15} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>{eligibility.reasons[0]}</span>
        </div>
      )}

      <div className="job-card-footer">
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => onViewDetails?.(job, company)}>
          View Details
        </button>

        {!readOnly && (
          alreadyApplied ? (
            <button type="button" className="btn btn-outline btn-sm" disabled>
              <CheckCircle2 size={15} color="#16a34a" />
              Applied
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              disabled={!eligibility?.eligible}
              onClick={() => onApply?.(job, company)}
              title={!eligibility?.eligible ? eligibility?.reasons?.join(' • ') : 'Apply for this drive'}
            >
              Apply Now
            </button>
          )
        )}
      </div>
    </article>
  );
}

export default JobCard;
