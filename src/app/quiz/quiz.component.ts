import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { QuizDatasetService } from '../services/quiz-dataset.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  questions = [] as any;
  count = 0;
  current_Questions = 0;
  correct = 0;
  incorrect = 0;
  score = 0;
  maxscore = 0;
  answer = false;
  difficulty = '';
  max = 0;

  constructor(private dataset: QuizDatasetService) {}
  ngOnInit(): void {
    this.start();
    console.log(this.difficulty);
    this.Checkdifficult(this.difficulty);
  }

  Checkdifficult(difficulty: String) {
    if (difficulty == 'easy') {
      console.log(difficulty);
      this.scraped_questions(difficulty);
    } else if (difficulty == 'medium') {
      console.log(difficulty);
      this.scraped_questions(difficulty);
    } else if (difficulty == 'hard') {
      console.log(difficulty);
      this.scraped_questions(difficulty);
    }
    //this.start();
  }

  verify_answer(correct: String, youranswer: String) {
    if (this.count < this.questions.length) {
      this.count = this.count + 1;
      console.log('here');
    } else {
      this.count = 0;
    }
    if (youranswer == correct) {
      this.correct += 1;
      this.answer = true;
      if (this.answer) {
        this.score = (this.correct / this.count) * 100;
        this.maxscore =
          ((this.correct + (this.questions.length - this.count)) /
            this.questions.length) *
          100;
      } else {
        this.score = (this.correct / this.count) * 100;
      }
    } else {
      this.incorrect += 1;
      this.answer = false;
      this.score = (this.correct / this.count) * 100;
      this.maxscore =
        ((this.correct + (this.questions.length - this.count)) /
          this.questions.length) *
        100;
    }
    console.log(this.difficulty);
    console.log('count: ', this.count);
    console.log('correctcount: ', this.correct);
    console.log('incorrectcount: ', this.incorrect);
    console.log('Score: ', this.score);
  }
  start() {
    this.score = 0;
    this.count = 0;
    this.correct = 0;
    this.maxscore = 0;
    this.incorrect = 0;
    this.questions = [];
    let quiz = this.dataset.getQuiz();
    console.log(quiz);
    this.current_Questions += 1;
    quiz.forEach((element) => {
      if (element.incorrect_answers.length < 4) {
        if (element.incorrect_answers.length != 2) {
          element.incorrect_answers.push(element.correct_answer);
          element.incorrect_answers.sort(() => 0.5 - Math.random());
        }
      }
    });
    this.questions = quiz;
    this.max = this.questions.length;
    console.log(this.count);
    console.log(this.questions.length);
    console.log(this.current_Questions);
  }
  scraped_questions(check: String) {
    console.log('ABBU', check);
    this.score = 0;
    this.count = 0;
    this.correct = 0;
    this.maxscore = 0;
    this.incorrect = 0;
    this.questions = [];
    let easy_questions = [] as any;
    let quiz = this.dataset.getQuiz();
    console.log(quiz);
    this.current_Questions += 1;
    quiz.forEach((element) => {
      if (element.difficulty == check) {
        easy_questions.push(element);
        //element.incorrect_answers.push(element.correct_answer);
        //element.incorrect_answers.sort(() => 0.5 - Math.random());
      }
    });
    this.questions = easy_questions;
    this.max = this.questions.length;
    console.log(this.count);
    console.log(this.questions.length);
    console.log(this.current_Questions);
  }
}
