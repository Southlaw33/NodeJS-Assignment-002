class Movie{
    title: string;
    director: string;
    releaseYear: number;
    genre: string;
    rating: number[] = [];
    
    constructor (title: string, director: string, releaseYear: number, genre: string){
        this.title = title;
        this.director = director;
        this.releaseYear = releaseYear;
        this.genre = genre;
    }
}

class MovieDatabase{
    movies: Map<string, Movie> = new Map();
    
    addMovie(title: string, director: string, releaseYear: number, genre: string){
        const id = Math.floor(Math.random() * 1000);
        const movie = new Movie(title, director, releaseYear, genre);
        this.movies.set(id.toString(), movie);
        console.log("Movie added succesfully");
    }

    rateMovie(id: string, rating: number){
        const movie = this.movies.get(id);
        if(movie){
            movie.rating.push(rating); 
            this.movies.set(id, movie);
            console.log("Movie:${movie.title} has been rated ${rating}");
        }
    }

    getAverageRating(id: string): number | undefined{
        const movie = this.movies.get(id);
        if(movie && movie.rating.length == 0){
            return 0;
        }
        const sum = movie?.rating.reduce((total, rating) => total + rating, 0);
        return movie && movie.rating ? sum ? sum / movie.rating.length : 0 : undefined;

    }


    getMovie(id: string): Movie | null{
        return this.movies.get(id) || null;
    }


    removeMovie(id: string){
        this.movies.delete(id);
        console.log("Movie removed succesfully");
    }
    

    getTopRatedMovies(): Movie[] {
        return Array.from(this.movies.values()).sort();
    }


    getMoviesByGenre(genre: string): Movie[] {
        return Array.from(this.movies.values())
            .filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    }


    getMoviesByDirector(director: string): Movie[] {
        return Array.from(this.movies.values())
            .filter(movie => movie.director.toLowerCase() === director.toLowerCase());
    }


    searchMoviesBasedOnKeyword(keyword: string): Movie[] {
        return Array.from(this.movies.values())
            .filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()));
    }



    
}

export default MovieDatabase; 