let currentStep = 1;
const totalSteps = 5;
const formData = {
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    notifications: true,
    location: ''
};

const stepContent = document.getElementById('step-content');
const backButton = document.getElementById('back-button');
const nextButton = document.getElementById('next-button');
const icons = document.querySelectorAll('.icon');
const stepPhoto = document.getElementById('step-photo');

const photos = [
    "signup1.jpg?height=200&width=400",
    "signup2.jpg?height=200&width=400",
    "signup3.jpg?height=200&width=400",
    "signup4.jpg?height=200&width=400",
    "signup5.jpg?height=200&width=400"
];

function updateIcons() {
    icons.forEach((icon, index) => {
        if (index + 1 <= currentStep) {
            icon.classList.add('active');
        } else {
            icon.classList.remove('active');
        }
    });

    icons.forEach((icon, index) => {
        if (index + 1 === currentStep) {
            icon.style.transform = 'scale(1.1)';
        } else {
            icon.style.transform = 'scale(1)';
        }
    });

    stepPhoto.src = photos[currentStep - 1];
}

function renderStep() {
    let content = '';
    switch (currentStep) {
        case 1:
            content = `
                <h2>Please provide a valid email</h2>
                <p>Email verification helps us keep your account secure.</p>
                <input type="email" class="input" name="email" placeholder="Enter your email" value="${formData.email}">
                <p class="small">Note: You will be asked to verify this email</p>
            `;
            break;
        case 2:
            content = `
                <h2>What's your name?</h2>
                <input type="text" class="input" name="firstName" placeholder="First name" value="${formData.firstName}">
                <input type="text" class="input" name="lastName" placeholder="Last name (optional)" value="${formData.lastName}">
                <p class="small">Last name is optional, and only shared with matches. <span class="link">Why?</span></p>
            `;
            break;
        case 3:
            content = `
                <h2>What's your date of birth?</h2>
                <input type="date" class="input" name="dateOfBirth" value="${formData.dateOfBirth}">
                <p class="small">We use this to calculate the age on your profile.</p>
            `;
            break;
        case 4:
            content = `
                <h2>Never miss a message from someone great</h2>
                <div class="checkbox-container">
                    <input type="checkbox" id="notifications" name="notifications" ${formData.notifications ? 'checked' : ''}>
                    <label for="notifications">Enable notifications</label>
                </div>
            `;
            break;
        case 5:
            content = `
                <h2>Where do you live?</h2>
                <p>Only neighbourhood name is shown.</p>
                <button class="button button-primary" onclick="setLocation()">Go to current location</button>
            `;
            break;
    }
    
    stepContent.innerHTML = content;
}

function updateButtons() {
    backButton.style.display = currentStep === 1 ? 'none' : 'block';
    nextButton.textContent = currentStep === totalSteps ? 'Finish' : 'Next';
}

function handleNext() {
    if (currentStep < totalSteps) {
        currentStep++;
        updateIcons();
        renderStep();
        updateButtons();
    } else {
        console.log('Form submitted:', formData);
        // Here you would typically send the form data to a server
    }
}

function handleBack() {
    if (currentStep > 1) {
        currentStep--;
        updateIcons();
        renderStep();
        updateButtons();
    }
}

function handleInput(event) {
    const { name, value, type, checked } = event.target;
    formData[name] = type === 'checkbox' ? checked : value;
}

function setLocation() {
    formData.location = 'Current Location';
    console.log('Location set:', formData.location);
    // Here you would typically use the Geolocation API to get the user's actual location
}

function initializeForm() {
    stepContent.addEventListener('input', handleInput);
    stepContent.addEventListener('change', handleInput);
    nextButton.addEventListener('click', handleNext);
    backButton.addEventListener('click', handleBack);

    updateIcons();
    renderStep();
    updateButtons();
}

// Initialize the form when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
    
    // Particle.js configuration
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#FFD700"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#FFD700",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
});