function redirectToMatch() {
    // Redirect to match.html
    window.location.href = "../match making/match.html";
}
function redirectToVideo() {
    // Redirect to match.html
    window.location.href = "../video call/video.html";
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial loading animation
    const loadingScreen = document.getElementById('loading-screen');
    const loadingLogo = document.getElementById('loading-logo');
    const mainContent = document.getElementById('main-content');

    // Logo animation during loading
    gsap.to(loadingLogo, {
        y: -50,
        opacity: 0,
        delay: 1,
        duration: 1,
        onComplete: () => {
            // Transition the loading screen out of view
            gsap.to(loadingScreen, {
                y: '-100%',
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    // Hide the loading screen and display the main content
                    loadingScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    // Animate the content after the loading screen disappears
                    animateContent();
                }
            });
        }
    });

    function animateContent() {
        // Animate navigation bar
        gsap.from('nav', { y: -50, opacity: 0, duration: 1 });
        // Animate home section content
        gsap.from('#home .content', { y: 50, opacity: 0, duration: 1, delay: 0.5 });

        // Animate each section as it enters the viewport
        gsap.utils.toArray('section').forEach((section, i) => {
            gsap.from(section, {
                opacity: 0,
                y: 100,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Animate feature and testimonial elements with staggered effect
        gsap.from('.feature, .testimonial', {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.feature-grid, .testimonial-grid',
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        });
    }

   // Slideshow functionality using GSAP
const slides = document.querySelectorAll('.slide');
const slideText = document.getElementById('slideText');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentSlide = 0;

// Function to show a specific slide
function showSlide(n) {
    const nextSlide = (n + slides.length) % slides.length;
    const nextText = slides[nextSlide].alt;

    // Create a GSAP timeline for synchronized animations
    const tl = gsap.timeline();

    // Crossfade slides
    tl.to(slides[currentSlide], { opacity: 0, duration: 0.5 })
      .fromTo(slides[nextSlide], { opacity: 0 }, { opacity: 1, duration: 0.5 }, "<");

    // Crossfade text
    tl.to(slideText, { 
        opacity: 0, 
        duration: 0.25, 
        onComplete: () => {
            slideText.textContent = nextText;
            gsap.to(slideText, { opacity: 1, duration: 0.25 });
        }
    }, "<");

    // Update current slide index
    currentSlide = nextSlide;
}

// Button events for previous and next slide navigation
prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

// Auto-slide functionality every 5 seconds
const autoSlideInterval = 2000; // 5 seconds
autoSlideTimer = setInterval(() => showSlide(currentSlide + 1), autoSlideInterval);

// Reset auto-slide timer when manually changing slides
function resetAutoSlideTimer() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => showSlide(currentSlide + 1), autoSlideInterval);
}

prevButton.addEventListener('click', resetAutoSlideTimer);
nextButton.addEventListener('click', resetAutoSlideTimer);
    // Feature card hover animation
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', () => {
            gsap.to(feature, { scale: 1.05, duration: 0.3 }); // Scale up on hover
        });
        feature.addEventListener('mouseleave', () => {
            gsap.to(feature, { scale: 1, duration: 0.3 }); // Scale down on hover exit
        });
    });

    const sliderContainer = document.querySelector('.slider-container');
    const sliderItems = document.querySelectorAll('.slider-item');
    const totalItems = sliderItems.length;
    let currentIndex = 0;
    let direction = 1; // 1 for forward, -1 for backward

    function moveSlider() {
        currentIndex += direction;

        // Change direction if we've reached the end or beginning
        if (currentIndex >= totalItems - 2 || currentIndex <= 0) {
            direction *= -1;
        }

        sliderContainer.style.transform = `translateX(-${currentIndex * 33.333}%)`;
    }

    setInterval(moveSlider, 1000);


    const items = document.querySelectorAll('.item');
    const indicators = document.querySelectorAll('.indicator');
    const intervalDuration = 3000; // Duration of the slide interval in milliseconds
    let currentIndex4 = 0;
    
    function showItem4(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    
        // Restart indicator animations
        indicators.forEach(indicator => {
            indicator.style.animation = 'none'; // Reset animation
            indicator.offsetHeight; // Trigger reflow to restart animation
            indicator.style.animation = ''; // Reapply animation
        });
    
        currentIndex = index;
    }
    
    function nextItem4() {
        let nextIndex = (currentIndex4 + 1) % items.length;
        showItem4(nextIndex);
    }
    
    // Set up buttons (if you have them)
    navigationBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => showItem4(index));
    });
    
    // Automatically change items every 3 seconds
    setInterval4(nextItem4, intervalDuration);
});


//what are founders say


  
const reviews = document.querySelectorAll('.review');
    const indicatorLines = document.querySelectorAll('.indicator-line');
    const transitionInterval = 2000; // 2000 milliseconds (2 seconds)
    let currentReview = 0;

    function showReview(index) {
        reviews.forEach((review, i) => {
            review.classList.toggle('active', i === index);
        });

        // Restart indicator animations
        indicatorLines.forEach(line => {
            line.style.animation = 'none'; // Reset animation
            line.offsetHeight; // Trigger reflow to restart animation
            line.style.animation = ''; // Reapply animation
        });
    }

    function nextReview() {
        let nextReview = (currentReview + 1) % reviews.length;
        showReview(nextReview);
        currentReview = nextReview; // Update the current review
    }

    // Automatically change reviews every 2 seconds
    setInterval(nextReview, transitionInterval);

    // Set up indicator click events
    indicatorLines.forEach((line, index) => {
        line.addEventListener('click', () => {
            showReview(index);
            currentReview = index; // Update the current review
        });
    });
