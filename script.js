// API Configuration
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const API_KEY = 'AIzaSyAy5aHYtrqgfBMQIlvEjhIKm9PnLunwFRU';

// DOM Elements
const questionInput = document.getElementById('questionInput');
const sendButton = document.getElementById('sendButton');
const responseSection = document.getElementById('responseSection');
const summaryText = document.getElementById('summaryText');
const detailedText = document.getElementById('detailedText');
const sidePanel = document.querySelector('.side-panel');
const togglePanelBtn = document.querySelector('.toggle-panel-btn');
const mainContent = document.querySelector('.main-content');
const favoritesList = document.querySelector('.favorites-list');
const menuBtn = document.querySelector('.menu-btn');
const favoritesViewBtn = document.querySelector('.favorites-view-btn');
const clearButton = document.getElementById('clearButton');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Hide response sections initially
    responseSection.style.display = 'none';
    summaryText.textContent = '';
    detailedText.innerHTML = '';

    // Rotating placeholder questions
    const placeholderQuestions = [
        'জুমার দিন কতটি সুন্নত আছে?',
        'What is the meaning of Taqwa?',
        'namaz porar niyom ki?',
        'কালেমা কয়টি?',
        'What breaks wudu?',
        'hajj kar upor farz hoy?',
        'সূরা ফাতিহার অর্থ কী?',
        'zikir korar upokarita ki?',
        'রোজার নিয়ত কখন করতে হয়?',
        'Laylatul Qadr ki?',
        'ঈমান কাকে বলে?',
        'How many rakats in Asr prayer?',
        'gosoler foroj koyta?',
        'ইফতারের সুন্নত কী?',
        'dua kora somoy ki uthano uchit?',
        'সূরা ইখলাস কখন পড়া উত্তম?',
        'What is the reward of Tahajjud?',
        'islam e interest haram keno?',
        'হজের ফরজ কয়টি?',
        'জান্নাতে কারা যাবে?'
    ];

    let currentQuestionIndex = 0;

    function updatePlaceholder() {
        const input = questionInput;
        input.classList.add('fade');
        
        setTimeout(() => {
            input.placeholder = placeholderQuestions[currentQuestionIndex];
            currentQuestionIndex = (currentQuestionIndex + 1) % placeholderQuestions.length;
            
            // Force a reflow
            void input.offsetWidth;
            
            input.classList.remove('fade');
        }, 300);
    }

    // Show first question immediately
    updatePlaceholder();

    // Update question every 3 seconds
    setInterval(updatePlaceholder, 3000);

    // Rotating quotes in footer
    const quotes = [
        '"জ্ঞান অর্জন করা প্রত্যেক মুসলিমের উপর ফরজ।" – হাদীস: ইবনে মাজাহ ২২৪',
        '"আল্লাহ যার মঙ্গল চান, তাকে দ্বীনের জ্ঞান দান করেন।" – সহীহ বুখারী ৭১',
        '"জ্ঞানহীন ব্যক্তির ইবাদতে কল্যাণ নেই।" – হাদীস: দারেমী, মুয়াত্তা মালিক',
        '"বলুন: যারা জানে আর যারা জানে না, তারা কি সমান হতে পারে?" – সূরা যুমার, ৯',
        '"যে আল্লাহর জন্য জ্ঞান অন্বেষণ করে, তার জন্য জান্নাতের পথ সহজ হয়।" – সহীহ মুসলিম ২৬৯৯',
        '"তোমরা জ্ঞান অন্বেষণ করো, তা যদি চীনে গিয়েও হয়।" – হাদীস: বায়হাকী, দুর্বল তবে অর্থে সহীহ',
        '"আল্লাহ সাক্ষ্য দেন, জ্ঞানীরা সত্যে অটল থাকে।" – সূরা আলে ইমরান, ১৮',
        '"জ্ঞান হলো আলো, অজ্ঞতা অন্ধকার।" – অর্থবোধক হাদীস/ইমাম শাফিঈ\'র বানী',
        '"যে জ্ঞান অর্জন করে, আল্লাহ তাকে উচ্চ মর্যাদা দান করেন।" – সূরা মুজাদালাহ, ১১',
        '"দ্বীন শিখো, কারণ ইবাদতের আগে জ্ঞান জরুরি।" – ইমাম বুখারী, \"বাবুল ইল্‌ম\"'
    ];

    const quoteElement = document.getElementById('rotatingQuote');
    let currentQuoteIndex = 0;

    function updateQuote() {
        quoteElement.classList.add('fade');
        setTimeout(() => {
            quoteElement.textContent = quotes[currentQuoteIndex];
            quoteElement.classList.remove('fade');
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        }, 300);
    }

    // Show first quote immediately
    updateQuote();

    // Update quote every 5 seconds
    setInterval(updateQuote, 5000);

    // Auto resize textarea
    questionInput.addEventListener('input', function() {
        this.style.height = '60px';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Menu button click event
    menuBtn.addEventListener('click', () => {
        console.log('Menu button clicked');
        sidePanel.classList.add('open');
        mainContent.classList.add('side-panel-open');
        menuBtn.style.display = 'none'; // Hide menu button
    });

    // Toggle panel button click event
    togglePanelBtn.addEventListener('click', () => {
        console.log('Toggle button clicked');
        sidePanel.classList.remove('open');
        mainContent.classList.remove('side-panel-open');
        // Wait for transition to complete before showing menu button
        setTimeout(() => {
            menuBtn.style.display = 'flex'; // Show menu button
        }, 300); // 300ms matches the CSS transition duration
    });

    // Favorites view button click event
    favoritesViewBtn.addEventListener('click', () => {
        console.log('Favorites button clicked');
        favoritesList.classList.toggle('show');
        favoritesViewBtn.classList.toggle('active');
        if (favoritesList.classList.contains('show')) {
            showFavorites();
        }
    });

    // Contact to Developer button click event
    const contactDevBtn = document.querySelector('.contact-dev-btn');
    const developerInfo = document.querySelector('.developer-info');
    
    contactDevBtn.addEventListener('click', () => {
        console.log('Contact button clicked');
        developerInfo.classList.toggle('show');
        contactDevBtn.classList.toggle('active');
    });

    // Question input event
    sendButton.addEventListener('click', handleQuestion);
    questionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleQuestion();
        }
    });

    // Clear button functionality
    questionInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            clearButton.classList.add('show');
        } else {
            clearButton.classList.remove('show');
        }
    });

    clearButton.addEventListener('click', function() {
        questionInput.value = '';
        clearButton.classList.remove('show');
        questionInput.focus();
    });
});

// Handle question submission
async function handleQuestion() {
    const question = questionInput.value.trim();
    
    if (!question) {
        showError('অনুগ্রহ করে একটি প্রশ্ন লিখুন।');
        return;
    }

    setLoading(true);
    try {
        const response = await sendToGemini(question);
        displayResponse(response);
    } catch (error) {
        showError('দুঃখিত, একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
        console.error('Error:', error);
    } finally {
        setLoading(false);
    }
}

// Send question to Gemini API
async function sendToGemini(question) {
    const prompt = `তুমি একজন ইসলামিক স্কলার। তোমার কাজ হলো শুধু ইসলামিক বিষয়বস্তু (যেমন কুরআন, হাদীস, ফিকহ, আকীদা, ইবাদত, রমজান ইত্যাদি) সম্পর্কিত প্রশ্নের উত্তর দেওয়া।

যদি কেউ ইসলামিক বিষয়ের বাইরে কিছু জিজ্ঞেস করে, তাহলে বলবে: 'এই অ্যাপে কেবল ইসলামিক বিষয়েই প্রশ্ন করা যায়।'

উত্তরের ফরম্যাট:
১. সংক্ষিপ্ত উত্তর (২–৩ লাইনে সারসংক্ষেপ)
২. বিস্তারিত ব্যাখ্যা – কুরআন, হাদীস ও ইসলামিক ব্যাখ্যা সহ সাজানো

প্রশ্ন: ${question}`;

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Display response
function displayResponse(response) {
    if (response.trim() === 'এই অ্যাপে কেবল ইসলামিক বিষয়েই প্রশ্ন করা যায়।') {
        const nonIslamicContainer = document.createElement('div');
        nonIslamicContainer.className = 'non-islamic-message';
        nonIslamicContainer.innerHTML = `
            <div class="message-content">
                <p>${response}</p>
            </div>
        `;
        
        responseSection.style.display = 'none';
        summaryText.textContent = '';
        detailedText.innerHTML = '';
        
        const existingMessage = document.querySelector('.non-islamic-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        document.querySelector('.input-section').after(nonIslamicContainer);
        return;
    }

    const existingMessage = document.querySelector('.non-islamic-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const parts = response.split('২. বিস্তারিত ব্যাখ্যা');
    
    if (parts.length === 2) {
        const summary = parts[0].replace('১. সংক্ষিপ্ত উত্তর', '').trim();
        const detailed = parts[1].trim();
        
        const summaryHeader = document.createElement('div');
        summaryHeader.className = 'section-header';
        summaryHeader.innerHTML = `
            <h3>সংক্ষিপ্ত উত্তর</h3>
            <div class="action-icons">
                <button class="icon-btn copy-btn" title="কপি করুন">
                    <span>📋</span>
                </button>
                <button class="icon-btn favorite-btn" title="ফেভারিট">
                    <span>⭐</span>
                </button>
            </div>
        `;
        
        const copyBtn = summaryHeader.querySelector('.copy-btn');
        const favoriteBtn = summaryHeader.querySelector('.favorite-btn');
        
        copyBtn.addEventListener('click', () => copyToClipboard(`${summary}\n\n${detailed}`));
        favoriteBtn.addEventListener('click', () => toggleFavorite(favoriteBtn, `${summary}\n\n${detailed}`));
        
        const summarySection = document.querySelector('.summary-section');
        summarySection.innerHTML = '';
        summarySection.appendChild(summaryHeader);
        
        const summaryContent = document.createElement('p');
        summaryContent.id = 'summaryText';
        summaryContent.textContent = summary;
        summarySection.appendChild(summaryContent);
        
        detailedText.innerHTML = formatDetailedResponse(detailed);
    } else {
        const summaryHeader = document.createElement('div');
        summaryHeader.className = 'section-header';
        summaryHeader.innerHTML = `
            <h3>সংক্ষিপ্ত উত্তর</h3>
            <div class="action-icons">
                <button class="icon-btn copy-btn" title="কপি করুন">
                    <span>📋</span>
                </button>
                <button class="icon-btn favorite-btn" title="ফেভারিট">
                    <span>⭐</span>
                </button>
            </div>
        `;
        
        const copyBtn = summaryHeader.querySelector('.copy-btn');
        const favoriteBtn = summaryHeader.querySelector('.favorite-btn');
        
        copyBtn.addEventListener('click', () => copyToClipboard(response));
        favoriteBtn.addEventListener('click', () => toggleFavorite(favoriteBtn, response));
        
        const summarySection = document.querySelector('.summary-section');
        summarySection.innerHTML = '';
        summarySection.appendChild(summaryHeader);
        
        const summaryContent = document.createElement('p');
        summaryContent.id = 'summaryText';
        summaryContent.textContent = response;
        summarySection.appendChild(summaryContent);
        
        detailedText.textContent = '';
    }
    
    responseSection.style.display = 'block';
}

// Format detailed response
function formatDetailedResponse(text) {
    return text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .map(line => `<p>${line}</p>`)
        .join('');
}

// Show error message
function showError(message) {
    const nonIslamicContainer = document.createElement('div');
    nonIslamicContainer.className = 'non-islamic-message';
    nonIslamicContainer.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    responseSection.style.display = 'none';
    summaryText.textContent = '';
    detailedText.innerHTML = '';
    
    const existingMessage = document.querySelector('.non-islamic-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    document.querySelector('.input-section').after(nonIslamicContainer);
}

// Set loading state
function setLoading(isLoading) {
    sendButton.classList.toggle('loading', isLoading);
    sendButton.disabled = isLoading;
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = event.target.closest('.copy-btn');
        const originalText = copyBtn.querySelector('span').textContent;
        copyBtn.querySelector('span').textContent = 'কপি করা হয়েছে!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.querySelector('span').textContent = originalText;
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Show favorites
function showFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <div class="favorites-empty">
                <p>কোন ফেভারিট উত্তর নেই</p>
            </div>
        `;
    } else {
        favorites.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        const favoritesHTML = favorites.map((fav, index) => {
            // Remove the first colon and everything before it
            const text = fav.text.replace(/^[^:]*:\s*/, '');
            return `
                <div class="favorite-item">
                    <div class="favorite-content">
                        <p>${text}</p>
                        <button class="view-more-btn">আরও দেখুন</button>
                    </div>
                    <div class="favorite-actions">
                        <button class="copy-btn" data-text="${fav.text}">
                            <span>কপি করুন</span>
                        </button>
                        <button class="remove-favorite-btn" data-index="${index}">
                            <span>মুছে ফেলুন</span>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        favoritesList.innerHTML = favoritesHTML;

        // Add event listeners for view more buttons
        favoritesList.querySelectorAll('.view-more-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const content = this.previousElementSibling;
                const isExpanded = content.classList.contains('expanded');
                
                if (isExpanded) {
                    content.classList.remove('expanded');
                    this.textContent = 'আরও দেখুন';
                } else {
                    content.classList.add('expanded');
                    this.textContent = 'কম দেখুন';
                }
            });
        });
    }
    
    favoritesList.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.getAttribute('data-text');
            copyToClipboard(text);
        });
    });
    
    favoritesList.querySelectorAll('.remove-favorite-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            removeFavorite(index);
        });
    });
}

// Remove favorite
function removeFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showFavorites();
}

// Toggle favorite
function toggleFavorite(button, text) {
    button.classList.toggle('favorited');
    const isFavorited = button.classList.contains('favorited');
    
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorited) {
        favorites.push({
            text: text,
            timestamp: new Date().toISOString()
        });
        button.title = 'ফেভারিট করা হয়েছে';
    } else {
        favorites = favorites.filter(fav => fav.text !== text);
        button.title = 'ফেভারিট';
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showFavorites();
} 