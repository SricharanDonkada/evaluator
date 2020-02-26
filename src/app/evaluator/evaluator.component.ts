import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { EvaluateService } from '../evaluate.service';
import { SaveService } from '../save.service';
import { FetchQuestionDataService } from '../fetch-question-data.service';
import { FetchQuestionIndexService } from '../fetch-question-index.service';


@Component({
  selector: 'app-evaluator',
  templateUrl: './evaluator.component.html',
  styleUrls: ['./evaluator.component.css']
})
export class EvaluatorComponent implements OnInit {

  constructor(private fb: FormBuilder, private evaluateService: EvaluateService, private saveService: SaveService, private fetchQuestionDataService: FetchQuestionDataService,private fetchQuestionIndex:FetchQuestionIndexService) {
  }

  ngOnInit() {
    this.fetchQuestionIndexMethod();
  }

  url = 'http://localhost:2001';
  panelOpenState = false;

  codeForm = null;
  progressSpinner = true; 

  code() {
    return this.codeForm.get('code');
  }

  user = { username: "charan", id: 0 };

  isContentFetched = true;
  landingPage = true;

  currentQuestionData: any;
  currentQuestionId = 4;
  codeValue = '';
  responseCounter = 0;
  questionIndex:any = null;
  evaluateProgressBar = false;

  privateCases = -1;

  evaluate() {
    this.responseCounter = 0;
    if (this.codeForm.value.code.replace(/ /g, '') != '') {
      this.evaluateProgressBar = true;
      for (let i = 0; i < this.currentQuestionData.public.length; i++) {
        let data = { user: this.user.id, question: { id: this.currentQuestionData.id, cases: this.currentQuestionData.public[i] }, code: this.codeForm.value.code };
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
      for (let i = 0; i < this.currentQuestionData.private.length; i++) {
        let data = { user: this.user.id, question: { id: this.currentQuestionData.id, cases: this.currentQuestionData.private[i] }, code: this.codeForm.value.code };
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
      this.currentQuestionData.public[index].userOutput = res.stderr;
      this.currentQuestionData.code = this.codeForm.value.code;
    }
    else {
      this.currentQuestionData.public[index].userOutput = res.stdout;
      this.currentQuestionData.code = this.codeForm.value.code;
    }
    this.responseCounter++;
    if (this.responseCounter >= this.currentQuestionData.public.length + this.currentQuestionData.private.length) {
      this.save();
      this.responseCounter = 0;
      this.evaluateProgressBar = false;
    }
  }

  evaluatePrivateResult(index, res) {
    if (res.stderr) {
      this.currentQuestionData.private[index].userOutput = res.stderr;
      this.currentQuestionData.code = this.codeForm.value.code;
    }
    else {
      this.currentQuestionData.private[index].userOutput = res.stdout;
      this.currentQuestionData.code = this.codeForm.value.code;
    }
    this.responseCounter++;
    this.privateCases = 0;
    for (let i = 0; i < this.currentQuestionData.private.length; i++) {
      if (this.currentQuestionData.private[i].output == this.currentQuestionData.private[i].userOutput) {
        this.privateCases++;
      }
    }
    if (this.responseCounter >= this.currentQuestionData.public.length + this.currentQuestionData.private.length) {
      this.save();
      this.responseCounter = 0;
      this.evaluateProgressBar = false;
    }
  }

  save() {
    
    let saveData = { user: this.user.id, data: this.currentQuestionData }
    this.saveService.save(saveData, this.url)
      .subscribe(
        res => { console.log('saved!') }
      );
  }

  fetchQuestionData(id) {
    this.isContentFetched = false;
    this.currentQuestionId = id;
    this.evaluateProgressBar = false;
    this.landingPage = false;
    console.log("question id = "+id);
    let obj = { user: this.user, questionId: this.currentQuestionId }
    this.fetchQuestionDataService.fetchQuestionData(obj, this.url)
      .subscribe(
        res => {
          this.isContentFetched = true;
          this.currentQuestionData = res;
          this.codeForm = this.fb.group({
            code: [res.code, [Validators.required]]
          });
          if (res.private[0].userOutput != '') {
            this.privateCases = 0;
            for (let i = 0; i < this.currentQuestionData.private.length; i++) {
              if (this.currentQuestionData.private[i].output == this.currentQuestionData.private[i].userOutput) {
                this.privateCases++;
              }
            }
          }
        },
        err => {
          console.error(err);
        }
      );
  }

  fetchQuestionIndexMethod(){
    this.fetchQuestionIndex.fetchQuestionIndex(this.url)
    .subscribe(
      res=>{
        this.questionIndex = res;
        this.progressSpinner = false;
        console.log('Question index fetched!');
      },
      err =>{
        console.error(err);
      }
    );
  }


}
