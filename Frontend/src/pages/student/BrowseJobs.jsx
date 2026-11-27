import { useMemo, useState } from 'react';
import { Briefcase, CheckCircle2, Search, ShieldCheck, X } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import JobCard from '../../components/JobCard';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { checkJobEligibility, DEPARTMENTS } from '../../services/storage';

function BrowseJobs() {
  const { user } = useAuth();
  const { jobs, companies, students, applications, applyToJob } = useApp();
  const student = students.find((s) => s.id === user?.id) || students[0];

  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('All');
  const [packageFilter, setPackageFilter] = useState('All');
  const [eligibilityFilter, setEligibilityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('latest');

  const [confirmJob, setConfirmJob] = useState(null);
  const [detailJob, setDetailJob] = useState(null);
  const [toast, setToast] = useState('');

  const openJobs = useMemo(() => jobs.filter((j) => j.status === 'Open'), [jobs]);

  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return openJobs
      .map((job) => {
        const company = companies.find((c) => c.id === job.companyId);
        const eligibility = checkJobEligibility(student, job);
        const alreadyApplied = applications.some(
          (a) => a.studentId === student?.id && a.jobId === job.id
        );
        return { job, company, eligibility, alreadyApplied };
      })
      .filter(({ job, company, eligibility }) => {
        if (q) {
          const matchCompany = (company?.name || '').toLowerCase().includes(q);
          const matchTitle = job.title.toLowerCase().includes(q);
          const matchLoc = job.location.toLowerCase().includes(q);
          if (!matchCompany && !matchTitle && !matchLoc) return false;
        }
        if (
          branchFilter !== 'All' &&
          !job.eligibleBranches.includes(branchFilter)
        ) {
          return false;
        }
        if (packageFilter === 'under6' && job.packageLPA >= 6) return false;
        if (packageFilter === '6to9' && (job.packageLPA < 6 || job.packageLPA > 9)) return false;
        if (packageFilter === 'above9' && job.packageLPA <= 9) return false;

        if (eligibilityFilter === 'eligible' && !eligibility.eligible) return false;
        if (eligibilityFilter === 'not_eligible' && eligibility.eligible) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'package_desc') return b.job.packageLPA - a.job.packageLPA;
        if (sortBy === 'deadline_asc') return a.job.deadline.localeCompare(b.job.deadline);
        return b.job.postedDate.localeCompare(a.job.postedDate);
      });
  }, [
    openJobs,
    companies,
    student,
    applications,
    search,
    branchFilter,
    packageFilter,
    eligibilityFilter,
    sortBy,
  ]);

  const handleConfirmApply = () => {
    if (!confirmJob) return;
    const res = applyToJob(student.id, confirmJob.job.id);
    if (res.success) {
      setToast(
        `Application submitted for ${confirmJob.job.title} at ${confirmJob.company?.name}!`
      );
    } else {
      setToast(res.message);
    }
    setConfirmJob(null);
  };

  return (
    <DashboardLayout
      role="student"
      title="Browse Jobs"
      subtitle={`Automatic eligibility active for CGPA ${student?.cgpa} • ${student?.department} • ${student?.backlogs} backlog(s)`}
    >
      <div className="page-header">
        <div>
          <h1>Available Placement Drives</h1>
          <p>
            Showing {filteredJobs.length} of {openJobs.length} active job openings across hiring partners.
          </p>
        </div>
        <div className="badge badge-blue" style={{ padding: '7px 14px', fontSize: '0.84rem' }}>
          <ShieldCheck size={16} />
          Your CGPA: {student?.cgpa} | Backlogs: {student?.backlogs}
        </div>
      </div>

      {toast && (
        <div className="alert alert-success" style={{ justifyContent: 'space-between' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <CheckCircle2 size={18} />
            {toast}
          </span>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setToast('')}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Search & Filters */}
      <div className="filter-bar">
        <div className="search-input-wrap">
          <Search size={17} />
          <input
            type="text"
            className="form-control"
            placeholder="Search by company name, job role, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="form-control filter-select"
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          aria-label="Filter by department"
        >
          <option value="All">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          className="form-control filter-select"
          value={packageFilter}
          onChange={(e) => setPackageFilter(e.target.value)}
          aria-label="Filter by package"
        >
          <option value="All">All Packages</option>
          <option value="under6">Below 6 LPA</option>
          <option value="6to9">6 – 9 LPA</option>
          <option value="above9">Above 9 LPA</option>
        </select>

        <select
          className="form-control filter-select"
          value={eligibilityFilter}
          onChange={(e) => setEligibilityFilter(e.target.value)}
          aria-label="Filter by eligibility"
        >
          <option value="All">All Eligibility</option>
          <option value="eligible">Eligible Only</option>
          <option value="not_eligible">Not Eligible</option>
        </select>

        <select
          className="form-control filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort jobs"
        >
          <option value="latest">Sort: Latest Jobs</option>
          <option value="package_desc">Sort: Highest CTC</option>
          <option value="deadline_asc">Sort: Earliest Deadline</option>
        </select>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="panel">
          <div className="empty-state">
            <Briefcase size={34} />
            <h3>No matching job drives found</h3>
            <p>Try clearing one or more search filters to view additional opportunities.</p>
          </div>
        </div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map(({ job, company, eligibility, alreadyApplied }) => (
            <JobCard
              key={job.id}
              job={job}
              company={company}
              eligibility={eligibility}
              alreadyApplied={alreadyApplied}
              onApply={(j, c) => setConfirmJob({ job: j, company: c })}
              onViewDetails={(j, c) => setDetailJob({ job: j, company: c, eligibility, alreadyApplied })}
            />
          ))}
        </div>
      )}

      {/* Confirm Apply Modal */}
      {confirmJob && (
        <div className="modal-backdrop" onClick={() => setConfirmJob(null)}>
          <div className="modal-card" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Job Application</h3>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setConfirmJob(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontSize: '0.92rem', color: '#334155' }}>
                Are you sure you want to submit your application for{' '}
                <strong>{confirmJob.job.title}</strong> at{' '}
                <strong>{confirmJob.company?.name}</strong>?
              </p>
              <div
                style={{
                  backgroundColor: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: 14,
                  fontSize: '0.84rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <div><strong>Package (CTC):</strong> {confirmJob.job.packageLPA} LPA</div>
                <div><strong>Applicant:</strong> {student.fullName} ({student.enrollmentNumber})</div>
                <div><strong>Resume Attached:</strong> {student.resume?.fileName || 'Profile summary (No PDF uploaded)'}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setConfirmJob(null)}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={handleConfirmApply}>
                Confirm & Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Details Modal */}
      {detailJob && (
        <div className="modal-backdrop" onClick={() => setDetailJob(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{detailJob.job.title}</h3>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setDetailJob(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#4a0e17' }}>
                    {detailJob.company?.name}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#64748b' }}>
                    {detailJob.company?.industry} • {detailJob.job.location}
                  </div>
                </div>
                <StatusBadge
                  status={detailJob.eligibility.eligible ? 'Eligible' : 'Not Eligible'}
                />
              </div>

              <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
                {detailJob.job.description}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 10,
                  padding: 14,
                  borderRadius: 10,
                  backgroundColor: 'var(--bg)',
                  fontSize: '0.85rem',
                }}
              >
                <div><strong>CTC Package:</strong> {detailJob.job.packageLPA} LPA</div>
                <div><strong>Job Type:</strong> {detailJob.job.jobType}</div>
                <div><strong>Min CGPA:</strong> {detailJob.job.minCGPA}</div>
                <div><strong>Max Backlogs:</strong> {detailJob.job.allowedBacklogs}</div>
                <div><strong>Deadline:</strong> {detailJob.job.deadline}</div>
                <div><strong>Posted:</strong> {detailJob.job.postedDate}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, marginBottom: 6 }}>
                  Eligible Departments
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {detailJob.job.eligibleBranches.map((b) => (
                    <span key={b} className="badge badge-blue">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setDetailJob(null)}>
                Close
              </button>
              {!detailJob.alreadyApplied && detailJob.eligibility.eligible && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    const target = detailJob;
                    setDetailJob(null);
                    setConfirmJob({ job: target.job, company: target.company });
                  }}
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default BrowseJobs;
