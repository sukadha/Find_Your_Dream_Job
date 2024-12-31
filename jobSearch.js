document.querySelector(".submit-button").addEventListener("click", function () {
  const searchName = document
    .querySelector(".search-box input:nth-child(1)")
    .value.toLowerCase();
  const searchLocation = document
    .querySelector(".search-box input:nth-child(2)")
    .value.toLowerCase();
  const jobCards = document.querySelectorAll(".job-card");

  jobCards.forEach((jobCard) => {
    const companyName = jobCard
      .querySelector(".content h2")
      .textContent.toLowerCase();
    const jobDescription = jobCard
      .querySelector(".content p")
      .textContent.toLowerCase();

    // Show the job card only if it matches the search criteria
    if (
      companyName.includes(searchName) ||
      jobDescription.includes(searchLocation)
    ) {
      jobCard.style.display = "flex";
    } else {
      jobCard.style.display = "none";
    }
  });
});
