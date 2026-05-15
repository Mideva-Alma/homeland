
// JobCard displays a single job's summary info and handles click to open modal.
function JobCard({ job, onClick }) {


    return (
      // Article for semantic grouping of job info
      <article className="job-card" onClick={onClick}>
        {/* Title is prominent for quick scanning */}
        <h3>{job.title}</h3>
        {/* Employer name shown for credibility */}
        <p>{job.employer}</p>
        {/* Budget is highlighted for applicant decision-making */}
        <p>KES {job.budget}</p>
        {/* Location uses <address> for semantic meaning */}
        <address>{job.location}</address>
        {/* Skills tags help applicants quickly assess fit */}
        <div>
          {
            job.skills.map(skill => (
              <span key={skill}>{skill}</span>
            ))
          }
        </div>
        {/* Posted date uses <time> for accessibility */}
        <time>{job.postedDate}</time>
        {/* Proposal count shows job popularity */}
        <p>{job.proposalCount} proposals</p>
        <button>Apply</button>
      </article>
    );
}
  
  export default JobCard;