// Simulated match results (replace this with real data)
const matches = []; // This should be populated with actual match data

const matchResultsEl = document.getElementById('matchResults');

function displayMatches() {
    if (matches.length === 0) {
        matchResultsEl.innerHTML = "<p>No matches found.</p>";
    } else {
        matches.forEach(match => {
            const matchDiv = document.createElement('div');
            matchDiv.className = 'match';
            matchDiv.textContent = match; // Replace with match details
            matchResultsEl.appendChild(matchDiv);
        });
    }
}

document.addEventListener('DOMContentLoaded', displayMatches);