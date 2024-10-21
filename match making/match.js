        // On form submission, store user data and find a match
        document.getElementById('matchForm').addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Get form data
            const userData = {
                name: document.getElementById('name').value,
                age: parseInt(document.getElementById('age').value),
                color: document.getElementById('color').value,
                relationshipStatus: document.getElementById('relationshipStatus').value,
                preferences: document.getElementById('preferences').value
            };

            // Get stored users from local storage (if any)
            let storedUsers = JSON.parse(localStorage.getItem('users')) || [];

            // Save new user to local storage
            storedUsers.push(userData);
            localStorage.setItem('users', JSON.stringify(storedUsers));

            // Find a match for the new user
            const match = findBestMatch(userData, storedUsers);

            // Display match result
            if (match) {
                document.getElementById('matchResult').innerHTML = `<h2>We found a match for you!</h2>
                    <p><strong>Name:</strong> ${match.name}</p>
                    <p><strong>Age:</strong> ${match.age}</p>
                    <p><strong>Favorite Color:</strong> ${match.color}</p>
                    <p><strong>Relationship Status:</strong> ${match.relationshipStatus}</p>`;
            } else {
                document.getElementById('matchResult').innerHTML = '<h2>No match found yet!</h2>';
            }
        });

        // Basic match logic: finds the closest match based on color, age, and relationship status
        function findBestMatch(newUser, storedUsers) {
            let bestMatch = null;
            let highestScore = 0;

            storedUsers.forEach(user => {
                if (user.name !== newUser.name) {  // Don't match user with themselves
                    let score = 0;

                    // Compare favorite color
                    if (user.color === newUser.color) {
                        score += 1;
                    }

                    // Compare age (match within a range of 5 years)
                    if (Math.abs(user.age - newUser.age) <= 5) {
                        score += 1;
                    }

                    // Compare relationship status
                    if (user.relationshipStatus === newUser.relationshipStatus) {
                        score += 1;
                    }

                    // Update best match if this user has the highest score
                    if (score > highestScore) {
                        highestScore = score;
                        bestMatch = user;
                    }
                }
            });

            return bestMatch;
        }