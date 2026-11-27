import { useMemo, useState } from 'react';
import { CalendarClock, CheckCircle2, ExternalLink, Plus, Trash2 } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatusBadge from '../../components/StatusBadge';
import { useApp } from '../../context/AppContext';

function InterviewScheduling() {
  const {
    companies,
    jobs,
    students,
    applications,
    interviews,
    scheduleInterview,
    updateInterviewStatus,
    deleteInterview,
  } = useApp();

  const [companyId, setCompanyId] = useState(companies[0]?.id || '');
  const companyJobs = useMemo(
    () => jobs.filter((j) => j.companyId === companyId),
    [jobs, companyId]
  );
  const [jobId, setJobId] = useState(() => companyJobs[0]?.id || jobs[0]?.id || '');
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [date, setDate] = useState('2026-12-08');
  const [time, setTime] = useState('10:30');
  const [locationOrLink, setLocationOrLink] = useState('');
  const [instructions, setInstructions] = useState('');
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const handleCompanyChange = (nextCompanyId) => {
    setCompanyId(nextCompanyId);
    const matchingJobs = jobs.filter((j) => j.companyId === nextCompanyId);
    setJobId(matchingJobs[0]?.id || '');
    setSelectedStudentIds([]);
  };

  const toggleStudent = (stuId) => {
    setSelectedStudentIds((prev) =>
      prev.includes(stuId) ? prev.filter((id) => id !== stuId) : [...prev, stuId]
    );
  };

  // Show applicants for the selected job first so admin can quickly schedule shortlisted candidates
  const candidatePool = useMemo(() => {
    const jobApplicantIds = new Set(
      applications.filter((a) => a.jobId === jobId).map((a) => a.studentId)
    );
    return [...students].sort((a, b) => {
      const aApplied = jobApplicantIds.has(a.id) ? 1 : 0;
      const bApplied = jobApplicantIds.has(b.id) ? 1 : 0;
      return bApplied - aApplied;
    });
  }, [students, applications, jobId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback({ type: '', text: '' });

    if (!companyId || !jobId) {
      setFeedback({ type: 'error', text: 'Please select a company and job opening.' });
      return;
    }
    if (selectedStudentIds.length === 0) {
      setFeedback({ type: 'error', text: 'Select at least one student for the interview.' });
      return;
    }
    if (!date || !time || !locationOrLink.trim()) {
      setFeedback({
        type: 'error',
        text: 'Interview date, time, and location or meeting link are required.',
      });
      return;
    }

    scheduleInterview({
      companyId,
      jobId,
      studentIds: selectedStudentIds,
      date,
      time,
      locationOrLink,
      instructions: instructions || 'Please arrive or join 15 minutes early with your resume.',
    });

    setSelectedStudentIds([]);
    setLocationOrLink('');
    setInstructions('');
    setFeedback({
      type: 'success',
      text: 'Interview scheduled! Selected students have been notified and see this on their dashboard.',
    });
  };

  const upcomingList = interviews.filter((i) => i.status === 'Upcoming');
  const completedList = interviews.filter((i) => i.status === 'Completed');

  return (
    <DashboardLayout
      role="admin"
      title="Interview Scheduling"
      subtitle="Coordinate campus & virtual interview panels and notify shortlisted students"
    >
      <div className="page-header">
        <div>
          <h1>Interview Scheduling</h1>
          <p>Scheduled interviews appear automatically on each student's dashboard and notifications.</p>
        </div>
      </div>

      {feedback.text && (
        <div className={`alert ${feedback.type === 'error' ? 'alert-error' : 'alert-success'}`}>
          <span>{feedback.text}</span>
        </div>
      )}

      <div className="dashboard-grid-2">
        {/* Scheduling Form */}
        <section className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Schedule New Interview</h2>
          </div>
          <form className="panel-body" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Select Company</label>
                <select
                  className="form-control"
                  value={companyId}
                  onChange={(e) => handleCompanyChange(e.target.value)}
                >
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Select Job Opening</label>
                <select
                  className="form-control"
                  value={jobId}
                  onChange={(e) => setJobId(e.target.value)}
                >
                  {companyJobs.length === 0 ? (
                    <option value="">No jobs for this company</option>
                  ) : (
                    companyJobs.map((j) => (
                      <option key={j.id} value={j.id}>{j.title}</option>
                    ))
                  )}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Interview Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Interview Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Interview Location or Meeting Link</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Seminar Hall A or https://meet.careerbridge.edu/room-1"
                value={locationOrLink}
                onChange={(e) => setLocationOrLink(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Select Students ({selectedStudentIds.length} selected)
              </label>
              <div
                style={{
                  maxHeight: 190,
                  overflowY: 'auto',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 8,
                  padding: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {candidatePool.map((stu) => {
                  const app = applications.find(
                    (a) => a.jobId === jobId && a.studentId === stu.id
                  );
                  return (
                    <label
                      key={stu.id}
                      className="checkbox-label"
                      style={{ justifyContent: 'space-between', width: '100%' }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <input
                          type="checkbox"
                          checked={selectedStudentIds.includes(stu.id)}
                          onChange={() => toggleStudent(stu.id)}
                        />
                        <span>
                          <strong>{stu.fullName}</strong> ({stu.enrollmentNumber})
                        </span>
                      </span>
                      {app && <StatusBadge status={app.status} />}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Interview Instructions</label>
              <textarea
                rows={2}
                className="form-control"
                placeholder="Topics covered, dress code, required documents..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              <Plus size={16} />
              Schedule Interview
            </button>
          </form>
        </section>

        {/* Upcoming & Completed Interviews */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <section className="panel">
            <div className="panel-header">
              <h2 className="panel-title">Upcoming Interviews ({upcomingList.length})</h2>
            </div>
            <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {upcomingList.length === 0 ? (
                <div className="empty-state" style={{ padding: '20px 10px' }}>
                  <CalendarClock size={28} />
                  <p style={{ marginTop: 6 }}>No upcoming interviews.</p>
                </div>
              ) : (
                upcomingList.map((iv) => {
                  const comp = companies.find((c) => c.id === iv.companyId);
                  const job = jobs.find((j) => j.id === iv.jobId);
                  const names = iv.studentIds
                    .map((id) => students.find((s) => s.id === id)?.fullName)
                    .filter(Boolean);
                  return (
                    <div
                      key={iv.id}
                      style={{
                        border: '1px solid var(--border)',
                        borderRadius: 10,
                        padding: 14,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                        <strong style={{ color: '#4a0e17' }}>
                          {comp?.name} – {job?.title}
                        </strong>
                        <StatusBadge status={iv.status} />
                      </div>
                      <div style={{ fontSize: '0.83rem', color: '#475569' }}>
                        <strong>When:</strong> {iv.date} at {iv.time}
                      </div>
                      <div style={{ fontSize: '0.83rem', color: '#475569' }}>
                        <strong>Venue / Link:</strong>{' '}
                        {iv.locationOrLink?.startsWith('http') ? (
                          <a href={iv.locationOrLink} target="_blank" rel="noreferrer" style={{ color: '#7a1624' }}>
                            {iv.locationOrLink} <ExternalLink size={12} style={{ display: 'inline' }} />
                          </a>
                        ) : (
                          iv.locationOrLink
                        )}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#334155' }}>
                        <strong>Candidates:</strong> {names.join(', ') || 'None'}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        {iv.instructions}
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => updateInterviewStatus(iv.id, 'Completed')}
                        >
                          <CheckCircle2 size={14} color="#16a34a" />
                          Mark Completed
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger-outline btn-sm"
                          onClick={() => deleteInterview(iv.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <h2 className="panel-title">Completed Interviews ({completedList.length})</h2>
            </div>
            <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {completedList.length === 0 ? (
                <p style={{ fontSize: '0.86rem', color: '#64748b' }}>No completed interviews recorded.</p>
              ) : (
                completedList.map((iv) => {
                  const comp = companies.find((c) => c.id === iv.companyId);
                  const job = jobs.find((j) => j.id === iv.jobId);
                  return (
                    <div
                      key={iv.id}
                      style={{
                        padding: 12,
                        borderRadius: 9,
                        backgroundColor: 'var(--bg)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                          {comp?.name} – {job?.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          {iv.date} • {iv.studentIds.length} candidate(s)
                        </div>
                      </div>
                      <StatusBadge status={iv.status} />
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default InterviewScheduling;
