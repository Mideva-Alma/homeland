import JobCard from './JobCard';

function JobList({ jobs, onSelectJob }) {

  return (

    <section className="job-grid">

      {
        jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => onSelectJob(job)}
          />
        ))
      }

    </section>
  );
}

export default JobList;