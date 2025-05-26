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
    questionInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            
            // Check if it's a mobile device
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
                // For mobile devices, just add a new line
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.substring(0, start) + '\n' + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 1;
            } else {
                // For physical keyboard, trigger search
                handleQuestion();
            }
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
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 111.26 122.88" style="enable-background:new 0 0 111.26 122.88" xml:space="preserve" width="24" height="24">
                        <g>
                            <path d="M21.78,62.8c-1.61,0-2.91-1.43-2.91-3.19c0-1.76,1.3-3.19,2.91-3.19h24.91c1.61,0,2.91,1.43,2.91,3.19 c0,1.76-1.3,3.19-2.91,3.19H21.78L21.78,62.8z M93.37,19.34h10.43c2.05,0,3.92,0.84,5.27,2.19c1.35,1.35,2.19,3.22,2.19,5.27v88.62 c0,2.06-0.84,3.92-2.19,5.27c-1.35,1.35-3.22,2.19-5.27,2.19H25.35c-2.05,0-3.92-0.84-5.27-2.19c-1.35-1.35-2.19-3.21-2.19-5.27 v-11.88H7.46c-2.05,0-3.92-0.84-5.27-2.19C0.84,100,0,98.13,0,96.08V7.46C0,5.4,0.84,3.54,2.19,2.19C3.54,0.84,5.4,0,7.46,0h78.45 c2.05,0,3.92,0.84,5.27,2.19c1.35,1.35,2.19,3.22,2.19,5.27V19.34L93.37,19.34z M24.28,103.54v11.88c0,0.29,0.12,0.56,0.32,0.75 c0.2,0.2,0.46,0.32,0.75,0.32h78.45c0.29,0,0.56-0.12,0.75-0.32c0.2-0.2,0.32-0.46,0.32-0.75V26.8c0-0.29-0.12-0.56-0.32-0.75 c-0.2-0.2-0.46-0.32-0.75-0.32H93.37v70.34c0,2.05-0.84,3.92-2.19,5.27c-1.35,1.35-3.22,2.19-5.27,2.19H24.28L24.28,103.54z M85.91,6.39H7.46c-0.29,0-0.56,0.12-0.75,0.32c-0.2,0.2-0.32,0.46-0.32,0.75v88.62c0,0.29,0.12,0.56,0.32,0.75 c0.2,0.2,0.46,0.32,0.75,0.32h78.45c0.29,0,0.56-0.12,0.75-0.32c0.2-0.2,0.32-0.46,0.32-0.75V7.46c0-0.29-0.12-0.56-0.32-0.75 C86.47,6.51,86.2,6.39,85.91,6.39L85.91,6.39z M21.78,28.64c-1.61,0-2.91-1.43-2.91-3.19c0-1.76,1.3-3.19,2.91-3.19h49.81 c1.61,0,2.91,1.43,2.91,3.19c0,1.76-1.3,3.19-2.91,3.19H21.78L21.78,28.64z M21.78,45.72c-1.61,0-2.91-1.43-2.91-3.19 c0-1.76,1.3-3.19,2.91-3.19h49.81c1.61,0,2.91,1.43,2.91,3.19c0,1.76-1.3,3.19-2.91,3.19H21.78L21.78,45.72z"/>
                        </g>
                    </svg>
                </button>
                <button class="icon-btn favorite-btn" title="ফেভারিট">
                    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 363 511.49" width="24" height="24">
                        <path d="M46.73 0H303.5c16.34 0 31.21 6.71 41.99 17.48C356.29 28.29 363 43.17 363 59.5v443.53c0 4.67-3.79 8.46-8.46 8.46-2.05 0-3.95-.74-5.41-1.97L181.42 378.99 13.64 509.67c-3.66 2.86-8.97 2.21-11.82-1.45a8.413 8.413 0 01-1.78-5.19L0 46.73c0-12.82 5.25-24.5 13.72-32.98C22.25 5.24 33.92 0 46.73 0zM181.5 62.03c31.14 0 59.37 12.65 79.82 33.09 20.44 20.42 33.09 48.65 33.09 79.82 0 31.17-12.65 59.41-33.08 79.84-20.43 20.43-48.66 33.07-79.83 33.07-31.18 0-59.41-12.64-79.84-33.07-20.42-20.46-33.07-48.7-33.07-79.84 0-31.13 12.64-59.36 33.07-79.8 20.48-20.47 48.7-33.11 79.84-33.11zm-12.23 67.13c0-6.76 5.48-12.24 12.23-12.24s12.23 5.48 12.23 12.24v33.55h33.55c6.75 0 12.23 5.48 12.23 12.23 0 6.76-5.48 12.23-12.23 12.23h-33.55v33.55c0 6.75-5.48 12.23-12.23 12.23s-12.23-5.48-12.23-12.23v-33.55h-33.55c-6.75 0-12.23-5.47-12.23-12.23 0-6.75 5.48-12.23 12.23-12.23h33.55v-33.55z"/>
                    </svg>
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
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 111.26 122.88" style="enable-background:new 0 0 111.26 122.88" xml:space="preserve" width="24" height="24">
                        <g>
                            <path d="M21.78,62.8c-1.61,0-2.91-1.43-2.91-3.19c0-1.76,1.3-3.19,2.91-3.19h24.91c1.61,0,2.91,1.43,2.91,3.19 c0,1.76-1.3,3.19-2.91,3.19H21.78L21.78,62.8z M93.37,19.34h10.43c2.05,0,3.92,0.84,5.27,2.19c1.35,1.35,2.19,3.22,2.19,5.27v88.62 c0,2.06-0.84,3.92-2.19,5.27c-1.35,1.35-3.22,2.19-5.27,2.19H25.35c-2.05,0-3.92-0.84-5.27-2.19c-1.35-1.35-2.19-3.21-2.19-5.27 v-11.88H7.46c-2.05,0-3.92-0.84-5.27-2.19C0.84,100,0,98.13,0,96.08V7.46C0,5.4,0.84,3.54,2.19,2.19C3.54,0.84,5.4,0,7.46,0h78.45 c2.05,0,3.92,0.84,5.27,2.19c1.35,1.35,2.19,3.22,2.19,5.27V19.34L93.37,19.34z M24.28,103.54v11.88c0,0.29,0.12,0.56,0.32,0.75 c0.2,0.2,0.46,0.32,0.75,0.32h78.45c0.29,0,0.56-0.12,0.75-0.32c0.2-0.2,0.32-0.46,0.32-0.75V26.8c0-0.29-0.12-0.56-0.32-0.75 c-0.2-0.2-0.46-0.32-0.75-0.32H93.37v70.34c0,2.05-0.84,3.92-2.19,5.27c-1.35,1.35-3.22,2.19-5.27,2.19H24.28L24.28,103.54z M85.91,6.39H7.46c-0.29,0-0.56,0.12-0.75,0.32c-0.2,0.2-0.32,0.46-0.32,0.75v88.62c0,0.29,0.12,0.56,0.32,0.75 c0.2,0.2,0.46,0.32,0.75,0.32h78.45c0.29,0,0.56-0.12,0.75-0.32c0.2-0.2,0.32-0.46,0.32-0.75V7.46c0-0.29-0.12-0.56-0.32-0.75 C86.47,6.51,86.2,6.39,85.91,6.39L85.91,6.39z M21.78,28.64c-1.61,0-2.91-1.43-2.91-3.19c0-1.76,1.3-3.19,2.91-3.19h49.81 c1.61,0,2.91,1.43,2.91,3.19c0,1.76-1.3,3.19-2.91,3.19H21.78L21.78,28.64z M21.78,45.72c-1.61,0-2.91-1.43-2.91-3.19 c0-1.76,1.3-3.19,2.91-3.19h49.81c1.61,0,2.91,1.43,2.91,3.19c0,1.76-1.3,3.19-2.91,3.19H21.78L21.78,45.72z"/>
                        </g>
                    </svg>
                </button>
                <button class="icon-btn favorite-btn" title="ফেভারিট">
                    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 363 511.49" width="24" height="24">
                        <path d="M46.73 0H303.5c16.34 0 31.21 6.71 41.99 17.48C356.29 28.29 363 43.17 363 59.5v443.53c0 4.67-3.79 8.46-8.46 8.46-2.05 0-3.95-.74-5.41-1.97L181.42 378.99 13.64 509.67c-3.66 2.86-8.97 2.21-11.82-1.45a8.413 8.413 0 01-1.78-5.19L0 46.73c0-12.82 5.25-24.5 13.72-32.98C22.25 5.24 33.92 0 46.73 0zM181.5 62.03c31.14 0 59.37 12.65 79.82 33.09 20.44 20.42 33.09 48.65 33.09 79.82 0 31.17-12.65 59.41-33.08 79.84-20.43 20.43-48.66 33.07-79.83 33.07-31.18 0-59.41-12.64-79.84-33.07-20.42-20.46-33.07-48.7-33.07-79.84 0-31.13 12.64-59.36 33.07-79.8 20.48-20.47 48.7-33.11 79.84-33.11zm-12.23 67.13c0-6.76 5.48-12.24 12.23-12.24s12.23 5.48 12.23 12.24v33.55h33.55c6.75 0 12.23 5.48 12.23 12.23 0 6.76-5.48 12.23-12.23 12.23h-33.55v33.55c0 6.75-5.48 12.23-12.23 12.23s-12.23-5.48-12.23-12.23v-33.55h-33.55c-6.75 0-12.23-5.47-12.23-12.23 0-6.75 5.48-12.23 12.23-12.23h33.55v-33.55z"/>
                    </svg>
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
    const copyBtn = event.target.closest('.copy-btn');
    const copiedIcon = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.66 122.88"><title>indexing-pages</title><path d="M81.81,70.82a22.72,22.72,0,0,1,19,35.15l9.83,10.71-6.78,6.2L94.4,112.45A22.72,22.72,0,1,1,81.81,70.82ZM72.38,96.06a2.59,2.59,0,0,1-.32-.42,2.34,2.34,0,0,1-.25-.47,3,3,0,0,1,4.34-3.75,2,2,0,0,1,.47.35h0c.83.79,1.09,1,2,1.77l.79.71,7.37-7.85c2.73-2.8,7.08,1.31,4.36,4.18l-9,9.53-.4.42a3,3,0,0,1-4.21.19l0,0c-.2-.19-.41-.39-.63-.58L75.4,98.79c-1.2-1-1.89-1.61-3-2.73ZM19.78,65.28a2.8,2.8,0,0,1-2.64-2.89,2.74,2.74,0,0,1,2.64-2.89H42.42a2.8,2.8,0,0,1,2.65,2.89,2.76,2.76,0,0,1-2.65,2.89Zm65.1-47.7h9.5a6.66,6.66,0,0,1,4.78,2,6.73,6.73,0,0,1,2,4.78v37c-.21,2.12-5.41,2.15-5.85,0v-37a.94.94,0,0,0-1-1H84.85v38c-.51,1.93-4.84,2.21-5.82,0V6.78a1,1,0,0,0-.27-.69,1,1,0,0,0-.69-.27H6.74a1,1,0,0,0-.68.27.93.93,0,0,0-.28.69V87.36a.94.94,0,0,0,1,1H49.27c2.93.3,3,5.37,0,5.82H22.05v10.8a1,1,0,0,0,.28.69,1,1,0,0,0,.69.27H49.27c2.13.24,2.81,5.07,0,5.82H23.05a6.66,6.66,0,0,1-4.78-2,6.73,6.73,0,0,1-2-4.78V94.14H6.78a6.66,6.66,0,0,1-4.78-2,6.73,6.73,0,0,1-2-4.78V6.78A6.66,6.66,0,0,1,2,2,6.71,6.71,0,0,1,6.78,0H78.1a6.7,6.7,0,0,1,4.79,2,6.74,6.74,0,0,1,2,4.78v10.8ZM19.75,28.78a2.8,2.8,0,0,1-2.65-2.89A2.75,2.75,0,0,1,19.75,23H65a2.8,2.8,0,0,1,2.65,2.89A2.76,2.76,0,0,1,65,28.78Zm0,18.25a2.8,2.8,0,0,1-2.65-2.89,2.75,2.75,0,0,1,2.65-2.89H65a2.8,2.8,0,0,1,2.65,2.89A2.76,2.76,0,0,1,65,47ZM93.89,81.46a17.06,17.06,0,1,0,5,12.07,17,17,0,0,0-5-12.07Z"/></svg>`;

    navigator.clipboard.writeText(text).then(() => {
        copyBtn.innerHTML = copiedIcon;
        copyBtn.classList.add('copied');
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
        
        const favoritesHTML = favorites.map((fav) => {
            // Remove the first colon and everything before it
            const text = fav.text.replace(/^[^:]*:\s*/, '');
            return `
                <div class="favorite-item">
                    <div class="favorite-content">
                        <p>${text}</p>
                        <button class="view-more-btn">আরও দেখুন</button>
                    </div>
                    <div class="favorite-actions">
                        <button class="copy-btn" data-text="${fav.text}">কপি করুন</button>
                        <button class="remove-favorite-btn" data-timestamp="${fav.timestamp}">
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
            navigator.clipboard.writeText(text).then(() => {
                btn.textContent = 'কপি করা হয়েছে';
                setTimeout(() => {
                    btn.textContent = 'কপি করুন';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
    
    favoritesList.querySelectorAll('.remove-favorite-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const timestamp = btn.getAttribute('data-timestamp');
            removeFavorite(timestamp);
        });
    });
}

// Remove favorite
function removeFavorite(timestamp) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter(fav => fav.timestamp !== timestamp);
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
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 363 511.49" width="24" height="24">
                <path d="M46.73 0h256.78c16.33 0 31.2 6.71 41.98 17.48C356.29 28.29 363 43.17 363 59.5v443.54c0 4.66-3.79 8.45-8.45 8.45a8.41 8.41 0 01-5.42-1.96L181.42 378.99 13.64 509.68c-3.66 2.85-8.97 2.21-11.82-1.46a8.365 8.365 0 01-1.78-5.18L0 46.73c0-12.82 5.25-24.5 13.72-32.98C22.25 5.24 33.92 0 46.73 0zm80.74 190.23c-4.72-4.8-4.65-12.52.14-17.24 4.8-4.71 12.52-4.65 17.24.15l20.1 20.5 52.57-63.33c4.28-5.16 11.96-5.86 17.12-1.58 5.17 4.29 5.87 11.97 1.58 17.13l-61.98 74.62c-4.8 4.72-12.52 4.65-17.24-.14l-29.53-30.11zM181.5 62.04c31.14 0 59.37 12.65 79.82 33.09 20.44 20.42 33.09 48.65 33.09 79.82 0 31.17-12.65 59.41-33.08 79.84-20.43 20.43-48.66 33.07-79.83 33.07-31.18 0-59.41-12.64-79.84-33.07-20.43-20.46-33.08-48.7-33.08-79.84 0-31.13 12.64-59.35 33.08-79.8 20.47-20.47 48.69-33.1 79.83-33.1z"/>
            </svg>
        `;
    } else {
        favorites = favorites.filter(fav => fav.text !== text);
        button.title = 'ফেভারিট';
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 363 511.49" width="24" height="24">
                <path d="M46.73 0H303.5c16.34 0 31.21 6.71 41.99 17.48C356.29 28.29 363 43.17 363 59.5v443.53c0 4.67-3.79 8.46-8.46 8.46-2.05 0-3.95-.74-5.41-1.97L181.42 378.99 13.64 509.67c-3.66 2.86-8.97 2.21-11.82-1.45a8.413 8.413 0 01-1.78-5.19L0 46.73c0-12.82 5.25-24.5 13.72-32.98C22.25 5.24 33.92 0 46.73 0zM181.5 62.03c31.14 0 59.37 12.65 79.82 33.09 20.44 20.42 33.09 48.65 33.09 79.82 0 31.17-12.65 59.41-33.08 79.84-20.43 20.43-48.66 33.07-79.83 33.07-31.18 0-59.41-12.64-79.84-33.07-20.42-20.46-33.07-48.7-33.07-79.84 0-31.13 12.64-59.36 33.07-79.8 20.48-20.47 48.7-33.11 79.84-33.11zm-12.23 67.13c0-6.76 5.48-12.24 12.23-12.24s12.23 5.48 12.23 12.24v33.55h33.55c6.75 0 12.23 5.48 12.23 12.23 0 6.76-5.48 12.23-12.23 12.23h-33.55v33.55c0 6.75-5.48 12.23-12.23 12.23s-12.23-5.48-12.23-12.23v-33.55h-33.55c-6.75 0-12.23-5.47-12.23-12.23 0-6.75 5.48-12.23 12.23-12.23h33.55v-33.55z"/>
            </svg>
        `;
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showFavorites();
} 