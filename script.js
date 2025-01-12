// Log user interactions
const votes = { A: 0, B: 0, tie: 0 };
const logs = [];

document.getElementById('vote-a').addEventListener('click', () => {
    votes.A++;
    saveFeedback('A');
    updateSummary();
});

document.getElementById('vote-b').addEventListener('click', () => {
    votes.B++;
    saveFeedback('B');
    updateSummary();
});

document.getElementById('vote-tie').addEventListener('click', () => {
    votes.tie++;
    saveFeedback('tie');
    updateSummary();
});

function saveFeedback(version) {
    const highlightA = document.getElementById('highlight-a').value;
    const highlightB = document.getElementById('highlight-b').value;

    logs.push({
        timestamp: new Date().toISOString(),
        vote: version,
        highlights: {
            A: highlightA,
            B: highlightB
        }
    });

    console.log('Feedback saved:', logs[logs.length - 1]);
}

function updateSummary() {
    const summary = document.getElementById('summary-feedback');
    summary.textContent = `Current Votes - A: ${votes.A}, B: ${votes.B}, Tie: ${votes.tie}`;
}

// Export logs (optional)
function exportLogs() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "feedback_logs.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// Add export button (optional)
const exportButton = document.createElement('button');
exportButton.textContent = "Export Logs";
exportButton.addEventListener('click', exportLogs);
document.querySelector('footer').appendChild(exportButton);
