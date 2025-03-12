import MovieDatabase from "./movies";
import * as readline from "readline-sync";

const movieDb = new MovieDatabase();

function displayMovies(movies: any[]) {
    if (movies.length === 0) {
        console.log("No movies found.");
        return;
    }
    
    movies.forEach(movie => {
        const avgRating = movie.rating.length ? 
            (movie.rating.reduce((sum: number, r: number) => sum + r, 0) / movie.rating.length).toFixed(1) : 
            "No ratings";
        console.log(`ID: ${movie.id} | ${movie.title} (${movie.releaseYear}) | Director: ${movie.director} | Genre: ${movie.genre} | Rating: ${avgRating}`);
    });
}

function getMovieId(): string | null {
    console.log("\nAvailable movies:");
    displayMovies(movieDb.getAllMovies());
    
    if (movieDb.getAllMovies().length === 0) return null;
    
    const id = readline.question("\nEnter Movie ID: ");
    return movieDb.getMovie(id) ? id : null;
}

// Main Menu Loop
while (true) {
    console.log("\nMovie Management System");
    console.log("1. View all movies");
    console.log("2. View movie details");
    console.log("3. Add new movie");
    console.log("4. Delete movie");
    console.log("5. Rate movie");
    console.log("6. Get top rated movies");
    console.log("7. Find movies by genre");
    console.log("8. Find movies by director");
    console.log("9. Search movies by title");
    console.log("10. Exit");

    const choice = readline.questionInt("Enter your choice: ");

    switch (choice) {
        case 1: // View all movies
            console.log("\nAll Movies:");
            displayMovies(movieDb.getAllMovies());
            break;

        case 2: // View movie details
            const viewId = getMovieId();
            if (viewId) {
                const movie = movieDb.getMovie(viewId);
                const avgRating = movieDb.getAverageRating(viewId);
                console.log("\nMovie Details:");
                console.log(`Title: ${movie?.title}`);
                console.log(`Director: ${movie?.director}`);
                console.log(`Release Year: ${movie?.releaseYear}`);
                console.log(`Genre: ${movie?.genre}`);
                console.log(`Average Rating: ${avgRating?.toFixed(1) || "No ratings"}`);
                console.log(`Number of ratings: ${movie?.rating.length || 0}`);
            } else {
                console.log("Invalid ID or no movies available.");
            }
            break;

        case 3: // Add new movie
            const title = readline.question("Enter movie title: ");
            const director = readline.question("Enter director name: ");
            const releaseYear = readline.questionInt("Enter release year: ");
            const Genre = readline.question("Enter genre: ");
            
            const newId = movieDb.addMovie(title, director, releaseYear, Genre);
            console.log(`Movie added with ID: ${newId}`);
            break;

        case 4: // Delete movie
            const delId = getMovieId();
            if (delId) {
                movieDb.removeMovie(delId);
            } else {
                console.log("Invalid ID or no movies available.");
            }
            break;

        case 5: // Rate movie
            const rateId = getMovieId();
            if (rateId) {
                const rating = readline.questionInt("Enter rating (1-5): ");
                if (rating >= 1 && rating <= 5) {
                    movieDb.rateMovie(rateId, rating);
                } else {
                    console.log("Rating must be between 1 and 5.");
                }
            } else {
                console.log("Invalid ID or no movies available.");
            }
            break;

        case 6: // Get top rated movies
            console.log("\nTop Rated Movies:");
            displayMovies(movieDb.getTopRatedMovies());
            break;

        case 7: // Find movies by genre
            const genre = readline.question("Enter genre: ");
            console.log(`\nMovies in "${genre}" genre:`);
            displayMovies(movieDb.getMoviesByGenre(genre));
            break;

        case 8: // Find movies by director
            const d = readline.question("Enter director name: ");
            console.log(`\nMovies by "${d}":`);
            displayMovies(movieDb.getMoviesByDirector(d));
            break;

        case 9: // Search movies by title
            const keyword = readline.question("Enter search keyword: ");
            console.log(`\nMovies containing "${keyword}" in title:`);
            displayMovies(movieDb.searchMoviesBasedOnKeyword(keyword));
            break;

        case 10: // Exit
            console.log("Exiting Movie Database App...");
            process.exit(0);

        default:
            console.log("Invalid choice. Please try again.");
    }
    
    readline.question("\nPress Enter to continue...");
}
