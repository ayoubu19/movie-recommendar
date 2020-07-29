import { MoviesRecommenderService } from "./services/movies-recommender.service";
import { Component, OnInit } from "@angular/core";
import Speech from "speak-tts";
import TranSpeech from "transpeech";
import { Events } from "transpeech";
import { Movie } from "./models/movie";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "movies-recommender";
  speech = new Speech();
  rec = new TranSpeech();
  text: string =
    "hello master ayob . i am your servant . if nobody recommend a movie to you in instagram . shame on them . i will recommend you tons of movies ";
  movies: Movie[];

  constructor(private movieRecommender: MoviesRecommenderService) {}
  ngOnInit(): void {
    if (this.rec.ready) {
      this.startSpeechRec();
      this.detectSpeech();
    }
  }

  startSpeechRec() {
    this.rec.requestPermission().then(() => {
      console.log(this.rec.permissionStatus); // 'granted'

      this.rec.recognitionLang = "en";

      this.rec.startRecognition();
      console.log(this.rec.isRecognitionActive);
      this.speak(this.text);
    });
  }

  detectSpeech() {
    this.rec.on(Events.FullyRecognized, (result: Event) => {
      console.log(result["result"]);
      if (result["result"].toLowerCase().includes("thank")) {
        this.speak("welcom  babe .   i can give you a kiss too ");
      }

      if (result["result"].toLowerCase().includes("no kisses")) {
        this.speak("i am just joking . but i still love you babe ");
      }

      if (
        result["result"].toLowerCase().includes("movie to watch") ||
        result["result"].toLowerCase().includes("recommend me a film")
      ) {
        this.speak(
          "tell me a movie  you like .  in this format . the movie or film  i like is ,  Harry potter for example "
        );
      }

      if (
        result["result"].includes("the movie I like is ") ||
        result["result"].includes("the film I like is ")
      ) {
        this.searchForMovies(result["result"].split("is")[1]);
      }
    });
  }

  speak(text: string) {
    this.rec.setActiveVoice(4);
    this.rec.speak(text);
  }

  translate(resultspeech, language) {
    this.rec.translate(resultspeech, language).then((result) => {
      if (result) {
        this.text = result;
        this.speak(result);
      }
    });
  }

  searchForMovies(movie: string) {
    this.speak(`wait a second pleas`);
    this.movieRecommender.getMovieDetails(movie).subscribe((data) => {
      this.movieRecommender
        .getSimilarMovies(data["results"][0].id)
        .subscribe((data) => {
          this.movies = data["results"].slice(1, 6);
          console.log(this.movies);
          this.speak(`here is some movies you might like `);
          this.movies.forEach((movie) => {
            console.log(movie.title);
            this.speak(`${movie.title}`);
          });
          this.speak(`dont forget to use egybest. poor boy . lol hahahahaha`);
          console.log("poor boy . lol hahahahaha <3");
        });
    });
  }
}
