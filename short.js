document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.querySelector(".search-btn");
  const companyInput = document.getElementById("company-search");
  const locationInput = document.getElementById("location-search");
  const resultsInfo = document.getElementById("results-info");
  const jobCards = document.querySelectorAll(".job-card");

  // Function to show all cards initially
  function showAllCards() {
    jobCards.forEach((card) => {
      card.style.display = "flex";
    });
    resultsInfo.textContent = "";
  }

  // Initial state: show all cards
  showAllCards();

  function handleSearch() {
    const companySearch = companyInput.value.toLowerCase().trim();
    const locationSearch = locationInput.value.toLowerCase().trim();

    // If both search fields are empty, show all cards
    if (!companySearch && !locationSearch) {
      showAllCards();
      return;
    }

    let visibleCards = 0;

    jobCards.forEach((card) => {
      const companyName = card
        .querySelector(".content h2")
        .textContent.toLowerCase();
      const description = card
        .querySelector(".content p")
        .textContent.toLowerCase();

      let shouldShow = true;

      // Apply company filter if company search exists
      if (companySearch && !companyName.includes(companySearch)) {
        shouldShow = false;
      }

      // Apply location filter if location search exists
      if (locationSearch && !description.includes(locationSearch)) {
        shouldShow = false;
      }

      // Show or hide card based on search results
      card.style.display = shouldShow ? "flex" : "none";
      if (shouldShow) visibleCards++;
    });

    // Update results info
    if (visibleCards === 0) {
      resultsInfo.textContent = "No matching results found";
      showAllCards(); // Show all cards if no matches found
    } else {
      resultsInfo.textContent = `Showing ${visibleCards} result${
        visibleCards !== 1 ? "s" : ""
      }`;
    }
  }

  // Event listeners
  searchBtn.addEventListener("click", handleSearch);

  // Add real-time search as user types
  companyInput.addEventListener("input", handleSearch);
  locationInput.addEventListener("input", handleSearch);

  // Handle Enter key press
  companyInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") handleSearch();
  });

  locationInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") handleSearch();
  });
});
