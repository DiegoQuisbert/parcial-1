async function fetchMovies() {
    const response = await fetch("api/movies");
    const movies = await response.json();
    displayResults(movies);
}

async function fetchMovieById() {
    const id = document.getElementById("movieId").value.trim();

    if (!id) {
        displayResults({ error: "Por favor, introduce un ID de película." });
        return;
    }

    const response = await fetch(`api/movies/${id}`);

    if (!response.ok) {
        displayResults({ error: "No se encontró una película con ese ID." });
        return;
    }

    const movie = await response.json();
    displayResults([movie]);
}

async function fetchUsers() {
    const response = await fetch("api/users");
    const users = await response.json();
    displayResults(users);
}

async function fetchUserById() {
    const id = document.getElementById("userId").value.trim();

    if (!id) {
        displayResults({ error: "Por favor, introduce un ID de usuario." });
        return;
    }

    const response = await fetch(`api/users/${id}`);

    if (!response.ok) {
        displayResults({ error: "No se encontró un usuario con ese ID." });
        return;
    }

    const user = await response.json();
    displayResults([user]);
}


async function fetchDirectors() {
    const response = await fetch("api/directors");
    const directors = await response.json();
    displayResults(directors);
}

async function fetchReviewByUserId() {
    const userId = document.getElementById("userReviewId").value.trim();

    if (!userId) {
        displayResults({ error: "Por favor, introduce un ID de usuario." });
        return;
    }

    const response = await fetch(`api/reviews/${userId}`);

    if (!response.ok) {
        displayResults({ error: "No se encontró una reseña para ese ID de usuario." });
        return;
    }

    const review = await response.json();
    displayResults(review.data);
}


function displayResults(data) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}