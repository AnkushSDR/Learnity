// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHbx7baYe36yp4TFMBrWayLZeCb8426q8",
    authDomain: "educational-hub-c9.firebaseapp.com",
    databaseURL: "https://educational-hub-c9-default-rtdb.firebaseio.com",
    projectId: "educational-hub-c9",
    storageBucket: "educational-hub-c9.firebasestorage.app",
    messagingSenderId: "119281481490",
    appId: "1:119281481490:web:42f9923836964a498025cb",
    measurementId: "G-6E2GNPDD3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

let ratingvalue = null; // Define ratingvalue outside

function submitReview() {
    const username = document.getElementById('user').value;

    console.log("Username: ", username); // Debugging
    console.log("Rating Value at submit: ", ratingvalue); // Debugging

    if (!username || !ratingvalue) {
        alert('Please enter your name and provide us with a rating.');
    } else {
        // Get the number of existing ratings
        get(ref(database, 'Ratings')).then((snapshot) => {
            if (snapshot.exists()) {
                const ratingsCount = snapshot.size; // Get the count of existing ratings
                const ratingNumber = `Log Number: ${ratingsCount + 1}`; // Create a unique title

                // Push new rating with the unique title
                push(ref(database, 'Ratings'), {
                    Name: username,
                    Number: ratingNumber,
                    Stars: ratingvalue
                }).then(() => {
                    alert('Rating submitted!');
                    window.location.reload();  // Refresh the page after ratings submission
                }).catch((error) => {
                    alert('Error submitting rating: ' + error.message);
                });
            } else {
                alert('No data available to count.');
            }
        }).catch((error) => {
            alert('Error retrieving data: ' + error.message);
        });
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        submitReview();
    }
});

document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        document.querySelectorAll('.star').forEach(s => s.classList.remove('checked'));

        this.classList.add('checked');
        let previousSibling = this.previousElementSibling;
        while (previousSibling) {
            previousSibling.classList.add('checked');
            previousSibling = previousSibling.previousElementSibling;
        }

        // Update the rating value on star click
        ratingvalue = this.getAttribute('data-value');

        // Log selected star value for debugging
        console.log('Selected star value:', ratingvalue);
    });
});
