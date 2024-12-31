document.addEventListener("DOMContentLoaded", function () {
  // Add initial job data
  const jobListing = document.querySelector(".job-listing");
  const jobData = [
    {
      company: "Naukri",
      description:
        "Naukri, founded in 1997, is a leading job portal in India, attracting millions of visitors monthly. It offers diverse job opportunities, including work-from-home options, and is known for its user-friendly interface. Many users have successfully found jobs through the platform, making it a reliable choice for job seekers across various fields.",
    },
    {
      company: "LinkedIn",
      description:
        "LinkedIn, founded in 2003, is a top platform for professionals in India to network, showcase skills, and find job opportunities. It offers targeted job searches, direct communication with recruiters, and a professional profile to highlight your expertise. Millions use LinkedIn daily, making it a powerful tool for career growth.",
    },
    // Add other job data here
  ];

  // Function to create job card HTML
  function createJobCard(company, description) {
    return `
            <div class="job-card">
                <div class="image">
                    <img src="openimage.png" alt="Company Logo" />
                </div>
                <div class="vertical-line"></div>
                <div class="content">
                    <h2>${company}</h2>
                    <p>${description}</p>
                </div>
                <div class="vertical-line"></div>
                <div class="apply-button">
                    <button>Apply</button>
                </div>
            </div>
        `;
  }

  // Function to render job cards
  function renderJobCards(jobs) {
    jobListing.innerHTML = jobs
      .map((job) => createJobCard(job.company, job.description))
      .join("");
  }

  // Initialize with all jobs
  renderJobCards(jobData);

  // Search functionality
  const searchBtn = document.querySelector(".search-btn");
  const companyInput = document.getElementById("company-search");
  const locationInput = document.getElementById("location-search");
  const resultsInfo = document.getElementById("results-info");

  function handleSearch() {
    const companySearch = companyInput.value.toLowerCase().trim();
    const locationSearch = locationInput.value.toLowerCase().trim();

    // Filter jobs based on search criteria
    const filteredJobs = jobData.filter((job) => {
      const companyMatch = job.company.toLowerCase().includes(companySearch);
      const descriptionMatch = job.description
        .toLowerCase()
        .includes(locationSearch);

      if (companySearch && locationSearch) {
        return companyMatch && descriptionMatch;
      } else if (companySearch) {
        return companyMatch;
      } else if (locationSearch) {
        return descriptionMatch;
      }
      return true;
    });

    // Render filtered results
    renderJobCards(filteredJobs);

    // Update results info
    if (filteredJobs.length === 0) {
      resultsInfo.textContent = "No matching results found";
    } else {
      resultsInfo.textContent = `Showing ${filteredJobs.length} result${
        filteredJobs.length > 1 ? "s" : ""
      }`;
    }
  }

  // Event listeners
  searchBtn.addEventListener("click", handleSearch);

  // Search on Enter key
  companyInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  locationInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  // Reset results when search is cleared
  companyInput.addEventListener("input", function () {
    if (!this.value && !locationInput.value) {
      resultsInfo.textContent = "";
      renderJobCards(jobData);
    }
  });

  locationInput.addEventListener("input", function () {
    if (!this.value && !companyInput.value) {
      resultsInfo.textContent = "";
      renderJobCards(jobData);
    }
  });
});
