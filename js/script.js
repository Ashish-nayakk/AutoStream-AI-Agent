let currentMode = 'text';

function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    const file1Upload = document.getElementById('file1Upload');
    const file2Upload = document.getElementById('file2Upload');

    if (mode === 'text') {
        text1.style.display = 'block';
        text2.style.display = 'block';
        file1Upload.classList.add('hidden');
        file2Upload.classList.add('hidden');
    } else {
        text1.style.display = 'none';
        text2.style.display = 'none';
        file1Upload.classList.remove('hidden');
        file2Upload.classList.remove('hidden');
    }
}

document.getElementById('threshold').addEventListener('input', function() {
    const value = (this.value * 100).toFixed(0);
    document.getElementById('thresholdValue').textContent = value + '%';
});

function analyzeText() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;
    const threshold = document.getElementById('threshold').value;

    // Show loading state
    const btn = document.querySelector('.analyze-btn');
    btn.innerHTML = '⏳ Analyzing...';
    btn.disabled = true;

    const formData = new FormData();
    formData.append('mode', currentMode);
    formData.append('threshold', threshold);

    if (currentMode === 'text') {
        formData.append('text1', text1);
        formData.append('text2', text2);
    } else {
        const file1 = document.getElementById('file1').files[0];
        const file2 = document.getElementById('file2').files[0];
        if (file1) formData.append('file1', file1);
        if (file2) formData.append('file2', file2);
    }

    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data, text1, text2);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error analyzing text. Please try again.');
    })
    .finally(() => {
        btn.innerHTML = '🔍 Analyze for Plagiarism';
        btn.disabled = false;
    });
}

function displayResults(data, text1, text2) {
    const results = document.getElementById('results');
    const scorePercent = document.getElementById('scorePercent');
    const scoreText = document.getElementById('scoreText');
    
    const percent = data.percent.toFixed(1);
    scorePercent.textContent = percent + '%';
    scoreText.textContent = `Similarity Score: ${percent}%`;

    // Update score circle color based on percentage
    const score = data.score;
    let color;
    if (score < 0.3) color = '#27ae60'; // Green
    else if (score < 0.6) color = '#f1c40f'; // Yellow
    else if (score < 0.8) color = '#f39c12'; // Orange
    else color = '#e74c3c'; // Red

    document.querySelector('.score-circle').style.background = 
        `conic-gradient(${color} 0% ${percent}%, #ecf0f1 ${percent}% 100%)`;

    // Highlight flagged words in both texts
    highlightFlaggedWords(text1, text2, data.score);
    
    results.classList.remove('hidden');
    results.scrollIntoView({ behavior: 'smooth' });
}

function highlightFlaggedWords(originalText, checkedText, similarityScore) {
    // Simple algorithm to detect potential issues
    const flaggedWords = detectFlaggedWords(originalText, checkedText);
    
    // Apply highlighting to original text
    let highlightedOriginal = originalText;
    flaggedWords.original.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        highlightedOriginal = highlightedOriginal.replace(regex, 
            `<span class="flagged-word">${word}</span>`);
    });
    
    // Apply highlighting to checked text
    let highlightedChecked = checkedText;
    flaggedWords.checked.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        let cssClass = 'flagged-word';
        if (similarityScore > 0.7) cssClass = 'plagiarized-word';
        else if (similarityScore > 0.4) cssClass = 'suspicious-word';
        
        highlightedChecked = highlightedChecked.replace(regex, 
            `<span class="${cssClass}">${word}</span>`);
    });

    document.getElementById('highlightedText1').innerHTML = highlightedOriginal;
    document.getElementById('highlightedText2').innerHTML = highlightedChecked;
}

function detectFlaggedWords(originalText, checkedText) {
    // Simple word-based comparison for demonstration
    // In a real application, you'd use more sophisticated NLP techniques
    
    const originalWords = originalText.toLowerCase().match(/\b\w+\b/g) || [];
    const checkedWords = checkedText.toLowerCase().match(/\b\w+\b/g) || [];
    
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
    
    const uniqueOriginal = [...new Set(originalWords.filter(word => 
        word.length > 3 && !commonWords.has(word)))];
    
    const uniqueChecked = [...new Set(checkedWords.filter(word => 
        word.length > 3 && !commonWords.has(word)))];
    
    // Find words that are in checked text but not in original (potential paraphrasing)
    const suspiciousWords = uniqueChecked.filter(word => 
        !uniqueOriginal.some(origWord => 
            origWord.includes(word) || word.includes(origWord)));
    
    // Find uncommon words that appear in both (potential direct copying)
    const commonUncommonWords = uniqueOriginal.filter(word => 
        uniqueChecked.includes(word));
    
    return {
        original: commonUncommonWords.slice(0, 5), // Limit to top 5 for demo
        checked: [...suspiciousWords, ...commonUncommonWords].slice(0, 8) // Limit to top 8
    };
}

// Initialize with text mode
setMode('text');