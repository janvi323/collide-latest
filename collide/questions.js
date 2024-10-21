const questions = [
    { question: "What is your name?", inputType: "text" },
    { question: "What do you identify as?",
        options: ["Male", "Female", "Non-Binary", "Prefer Not to Say"]

    },
    { question: "Who would you like to date?",
        options: ["Men", "Women", "No Preference"]

    },
    { question: "What are you looking for?",
        options: ["Life partner", "Long-term Relationship", "Short-term relationship", "Not sure"]

    },
    {
        question: "On a typical Friday night I am...",
        options: ["Out with friends", "Netflix and chill", "At a concert", "Working late"]
    },
    {
        question: "My ideal first date would be...",
        options: ["At a Coffee shop", "A Fancy dinner", "An Outdoor adventure", "A visit to the Art gallery"]
    },
    {
        question: "I value most in a partner...",
        options: ["Sense of humor", "Ambition", "Kindness", "Intelligence"]
    },
    {
        question: "My favorite way to relax is...",
        options: ["Reading a book", "Yoga/Meditation", "Video games", "Cooking"]
    },
    {
        question: "In 5 years, I see myself...",
        options: ["Traveling the world", "Settled down", "Focused on career", "Starting a business"]
    },
    {
        question: "What is your favorite way to spend a Sunday?",
        options: ["Reading a good book", "Going for a hike", "Watching movies all day", "Cooking a big meal"]
    },
    {
        question: "Which outdoor activity do you enjoy the most?",
        options: ["Hiking or nature walks", "Playing sports", "Gardening", "Camping"]
    },
    {
        question: "What kind of movies do you prefer to watch?",
        options: ["Action and adventure", "Romantic comedies", "Documentaries", "Horror and thrillers"]
    },
    {
        question: "How do you usually unwind after a long day?",
        options: ["Watching TV or movies", "Listening to music or podcasts", "Meditating or doing yoga", "Cooking a meal"]
    },
    {
        question: "What type of cuisine do you enjoy cooking or eating the most?",
        options: ["Italian (e.g., pasta, pizza)", "Asian (e.g., sushi, stir-fry)", "Mexican (e.g., tacos, burritos)", "American (e.g., burgers, steaks)"]
    },
   
];

let currentIndex = 0;
let answers = new Array(questions.length).fill('');

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressEl = document.getElementById('progress');
const floatingHeartsEl = document.getElementById('floating-hearts');

function updateQuestion() {
    questionEl.textContent = questions[currentIndex].question;
    optionsEl.innerHTML = '';
    questions[currentIndex].options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.innerHTML = `
            <input type="radio" id="option-${index}" name="answer" value="${option}" ${answers[currentIndex] === option ? 'checked' : ''}>
            <label for="option-${index}">${option}</label>
        `;
        optionsEl.appendChild(optionDiv);
    });
    updateButtons();
    updateProgress();
}

function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    if (currentIndex === questions.length - 1) {
        nextBtn.textContent = 'Find Matches';
        nextBtn.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>';
    } else {
        nextBtn.textContent = 'Next';
        nextBtn.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>';
    }
}

function updateProgress() {
    progressEl.innerHTML = questions.map((_, index) => `
        <div class="dot ${index === currentIndex ? 'active' : ''}"></div>
    `).join('');
}

function handleAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        answers[currentIndex] = selectedOption.value;
    }
}

prevBtn.addEventListener('click', () => {
    handleAnswer();
    currentIndex = Math.max(0, currentIndex - 1);
    updateQuestion();
});

nextBtn.addEventListener('click', () => {
    handleAnswer();
    if (currentIndex === questions.length - 1) {
        console.log('Submitted answers:', answers);
        // Here you would typically send the answers to your backend
    } else {
        currentIndex = Math.min(questions.length - 1, currentIndex + 1);
        updateQuestion();
    }
});

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = '100%';
    heart.style.fontSize = `${16 + Math.random() * 24}px`;
    heart.style.animationDuration = `${15 + Math.random() * 10}s`;
    
    // Use darker heart emojis or apply darker colors
    heart.style.color = '#262c36e0';  // Darker shade of grey
    heart.innerHTML =  Math.random() > 0.5 ? '💛' : '🤍';  // Always display black hearts
    
    floatingHeartsEl.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 25000);}


setInterval(createFloatingHeart, 700);


updateQuestion();


document.addEventListener('DOMContentLoaded', () => {
    // Function to hide the sliding page and show the main content
    function hideSlidingPage() {
        document.querySelector('.sliding-page').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.sliding-page').style.display = 'none';
            document.querySelector('.container').style.display = 'flex';
        }, 3000); // Match the animation duration (3s) plus any additional time if needed
    }

    // Automatically hide the sliding page after a delay
    setTimeout(hideSlidingPage, 3000); // Adjust the delay as needed
});
function updateQuestion() {
    questionEl.textContent = questions[currentIndex].question;
    optionsEl.innerHTML = '';

    if (questions[currentIndex].inputType === "text") {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'option';
        inputDiv.innerHTML = `
            <input type="text" id="text-input" name="answer" value="${answers[currentIndex] || ''}" placeholder="enter your name" />
        `;
        optionsEl.appendChild(inputDiv);
    } else {
        questions[currentIndex].options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.innerHTML = `
                <input type="radio" id="option-${index}" name="answer" value="${option}" ${answers[currentIndex] === option ? 'checked' : ''}>
                <label for="option-${index}">${option}</label>
            `;
            optionsEl.appendChild(optionDiv);
        });
    }

    updateButtons();
    updateProgress();
}

function handleAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    const textInput = document.getElementById('text-input');
    
    if (selectedOption) {
        answers[currentIndex] = selectedOption.value;
    } else if (textInput) {
        answers[currentIndex] = textInput.value;
    }
}
