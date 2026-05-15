import { useEffect, useState } from 'react';
import jobsData from './data/jobs.json';

import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import SortDropdown from './components/SortDropdown';
import JobList from './components/JobList';
import JobModal from './components/JobModal';
import LoadingSkeleton from './components/LoadingSkeleton';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';

function App() {

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    budget: ''
  });

  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {

    setLoading(true);

    setTimeout(() => {

      try {

        setJobs(jobsData);
        setFilteredJobs(jobsData);
        setLoading(false);

      } catch (err) {

        setError(true);
        setLoading(false);
      }

    }, 1500);

  }, []);

  useEffect(() => {

    let updatedJobs = [...jobs];

    updatedJobs = updatedJobs.filter(job => {

      return (
        job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        (filters.category === '' || job.category === filters.category) &&
        (filters.location === '' || job.location === filters.location) &&
        (filters.budget === '' || job.budget <= Number(filters.budget))
      );
    });

    if (sortOption === 'budget-high') {
      updatedJobs.sort((a, b) => b.budget - a.budget);
    }

    if (sortOption === 'budget-low') {
      updatedJobs.sort((a, b) => a.budget - b.budget);
    }

    if (sortOption === 'newest') {
      updatedJobs.sort(
        (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
      );
    }

    setFilteredJobs(updatedJobs);

  }, [filters, jobs, sortOption]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (

    <>

      <Header />

      <main className="container">

        <SearchFilters
          filters={filters}
          setFilters={setFilters}
        />

        <SortDropdown
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        <p>
          Showing {filteredJobs.length} of {jobs.length} jobs
        </p>

        {
          filteredJobs.length === 0 ? (
            <EmptyState message="No jobs match your filters" />
          ) : (
            <JobList
              jobs={filteredJobs}
              onSelectJob={setSelectedJob}
            />
          )
        }

        {
          selectedJob && (
            <JobModal
              selectedJob={selectedJob}
              onClose={() => setSelectedJob(null)}
            />
          )
        }

      </main>

    </>
  );
}

export default App;