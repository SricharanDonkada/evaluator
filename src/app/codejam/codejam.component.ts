import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder} from '@angular/forms';
import { EvaluateService } from '../evaluate.service';
import { SaveService } from '../save.service';
import { FetchQuestionDataService } from '../fetch-question-data.service';
import { FetchQuestionIndexService } from '../fetch-question-index.service';
import { FetchCodejamQuestionsService } from '../services/fetch-codejam-questions.service';

@Component({
  selector: 'app-codejam',
  templateUrl: './codejam.component.html',
  styleUrls: ['./codejam.component.css']
})
export class CodejamComponent implements OnInit {

  constructor(private fb:FormBuilder, private evaluateService:EvaluateService, private saveService:SaveService,
              private fetchQuestionDataService:FetchQuestionDataService, private fetchQuestionIndex:FetchQuestionIndexService,
              private codejamQuestionsService:FetchCodejamQuestionsService) { }

  
  ngOnInit() {
    this.codejamQuestionsService.fetchData().subscribe(
      (res) => {
        this.questions = res.questionsObj;
        console.log(res);
      },
      (err) =>{
        console.log(err);
      }
    );
  }
  currentQuestion = -1;
  passedPrivateCases = 1;
  questions = [];
  url = 'http://localhost:2001';
  panelOpenState = false;
  codeForm = this.fb.group({code:['',[Validators.required]]});
  responseCounter = 0;
  evaluateProgressBar = false; 
  user = {id:0};
  selectQuestion(i){
    this.currentQuestion = i;
  }

  evaluate() {
    console.log("Evaluate called!");
    this.responseCounter = 0;
    if (this.codeForm.value.code.replace(/ /g, '') != '') {
      this.evaluateProgressBar = true;
      for (let i = 0; i < this.questions[this.currentQuestion].public.length; i++) {
        let data = { user: this.user.id, question: { id: this.questions[this.currentQuestion].id, cases: this.questions[this.currentQuestion].public[i] }, code: this.codeForm.value.code };
        this.evaluateService.evaluate(data, this.url)
          .subscribe(
            res => {
              console.log(res);
              this.evaluatePublicResult(i, res);
            },
            err => {
              console.error(err);
            }
          );
      }
      for (let i = 0; i < this.questions[this.currentQuestion].private.length; i++) {
        let data = { user: this.user.id, question: { id: this.questions[this.currentQuestion].id, cases: this.questions[this.currentQuestion].private[i] }, code: this.codeForm.value.code };
        this.evaluateService.evaluate(data, this.url)
          .subscribe(
            res => {
              console.log(res);
              this.evaluatePrivateResult(i, res);
            },
            err => {
              console.error(err);
            }
          );
      }
    }
  }

  evaluatePublicResult(index, res) {
    if (res.stderr) {
      this.questions[this.currentQuestion].public[index].userOutput = res.stderr;
      this.questions[this.currentQuestion].code = this.codeForm.value.code;
    }
    else {
      this.questions[this.currentQuestion].public[index].userOutput = res.stdout;
      this.questions[this.currentQuestion].code = this.codeForm.value.code;
    }
    this.responseCounter++;
    if (this.responseCounter >= this.questions[this.currentQuestion].public.length + this.questions[this.currentQuestion].private.length) {
      this.save();
      this.responseCounter = 0;
      this.evaluateProgressBar = false;
    }
  }

  evaluatePrivateResult(index, res) {
    if (res.stderr) {
      this.questions[this.currentQuestion].private[index].userOutput = res.stderr;
      this.questions[this.currentQuestion].code = this.codeForm.value.code;
    }
    else {
      this.questions[this.currentQuestion].private[index].userOutput = res.stdout;
      this.questions[this.currentQuestion].code = this.codeForm.value.code;
    }
    this.responseCounter++;
    this.passedPrivateCases = 0;
    for (let i = 0; i < this.questions[this.currentQuestion].private.length; i++) {
      if (this.questions[this.currentQuestion].private[i].output == this.questions[this.currentQuestion].private[i].userOutput) {
        this.passedPrivateCases++;
      }
    }
    if (this.responseCounter >= this.questions[this.currentQuestion].public.length + this.questions[this.currentQuestion].private.length) {
      this.save();
      this.responseCounter = 0;
      this.evaluateProgressBar = false;
    }
  }

  save() {
    
    let saveData = { user: this.user.id, data: this.questions[this.currentQuestion] }
    this.saveService.save(saveData, this.url)
      .subscribe(
        res => { console.log('saved!') }
      );
  }

}
