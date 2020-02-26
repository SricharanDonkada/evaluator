import { Component, OnInit } from '@angular/core';
import { FetchQuestionIndexService } from '../fetch-question-index.service';
import { FetchQuestionDataForEditService } from '../fetch-question-data-for-edit.service';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { SaveEditedQuestionService } from '../save-edited-question.service';
import { SaveNewQuestionService } from '../save-new-question.service';
import { AddNewLevelService } from '../add-new-level.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private fetchQuestionIndex: FetchQuestionIndexService, private fetchQuestionDataForEdit: FetchQuestionDataForEditService, private fb: FormBuilder, 
    private saveEditedQuestionServive: SaveEditedQuestionService,private saveNewQuestionService:SaveNewQuestionService,
    private addNewLevelService: AddNewLevelService) { }

  ngOnInit() {
    this.fetchQuestionIndexMethod();
  }

  url = 'http://localhost:2001';

  containerMode = "landing-page";
  currentQuestionData = null;
  editQuestionFormModel = null;
  progressSpinner = true;
  editQuestionSpinner = false;
  isNewQuestion = false;
  newQuestionLevel = null;

  addNewLevelFormModel = this.fb.group({
    title:[''],
    description:[''],
    questions:[[]],
    lastId:['']
  });

  questionIndex: any = null;
  fetchQuestionIndexMethod() {
    this.fetchQuestionIndex.fetchQuestionIndex(this.url)
      .subscribe(
        res => {
          this.questionIndex = res;
          this.progressSpinner = false;
        },
        err => {
          console.error(err);
        }
      );
  }

  addQuestion(index) {
    console.log("Question being added in level of index ");
    this.isNewQuestion = true;
    this.containerMode = 'edit-question'
    this.newQuestionLevel = index;
    this.currentQuestionData = { id: undefined, question: '', public: [{ input: '', output: '', userOutput: '' }], private: [{ input: '', output: '', userOutput: '' }], code: '' };
    this.editQuestion();
  }

  addNewLevel() {
    this.containerMode = 'new-level';
  }

  editQuestion() {
    this.containerMode = 'edit-question';
    this.editQuestionFormModel = this.fb.group({
      question: [this.currentQuestionData.question],
      public: this.fb.array([]),
      private: this.fb.array([])
    });

    for (let i = 0; i < this.currentQuestionData.public.length; i++) {
      this.publicForEdit.push(this.fb.group({
        input: [this.currentQuestionData.public[i].input],
        output: [this.currentQuestionData.public[i].output],
        userOutput: ['']
      }));
    }
    for (let i = 0; i < this.currentQuestionData.private.length; i++) {
      this.privateForEdit.push(this.fb.group({
        input: [this.currentQuestionData.private[i].input],
        output: [this.currentQuestionData.private[i].output],
        userOutput: ['']
      }));
    }
    console.log('Form obj:' + this.editQuestionFormModel);
  }

  get questionForEdit() {
    return this.editQuestionFormModel.get('question');
  }

  get publicForEdit() {
    return <FormArray>this.editQuestionFormModel.get('public');
  }

  get privateForEdit() {
    return <FormArray>this.editQuestionFormModel.get('private');
  }

  fetchQuestionData(id) {
    console.log("question id = " + id);
    this.containerMode = "edit-question";
    this.editQuestionSpinner = true;
    this.fetchQuestionDataForEdit.fetchData({ id: id }, this.url)
      .subscribe(
        res => {
          this.currentQuestionData = res;
          console.log(res);
          this.editQuestion();
          this.editQuestionSpinner = false;
        },
        err => {
          console.error(err);
        }
      );
  }

  addPublicTestCase() {
    this.publicForEdit.push(this.fb.group({
      input: [''],
      output: ['']
    }));
  }

  addPrivateTestCase() {
    this.privateForEdit.push(this.fb.group({
      input: [''],
      output: ['']
    }));
  }

  deletePublicTestCase(index) {
    this.publicForEdit.removeAt(index);
  }

  deletePrivateTestCase(index) {
    this.privateForEdit.removeAt(index);
  }

  saveEditedQuestion() {
    let saveObj = {
      id: this.currentQuestionData.id,
      question: this.editQuestionFormModel.value.question,
      public: this.editQuestionFormModel.value.public,
      private: this.editQuestionFormModel.value.private,
      code: ""
    }
    if (!this.isNewQuestion) {
      this.saveEditedQuestionServive.saveEditedQuestion(saveObj, this.url)
        .subscribe(
          res => {
            console.log("saved!");
          },
          err => {
            console.error(err);
          }
        );
    }
    else {
      let questionObj = { level:this.newQuestionLevel, question:saveObj };
      this.isNewQuestion = false;
      this.saveNewQuestionService.save(questionObj,this.url)
      .subscribe(
        res =>{
          console.log(res);
          this.fetchQuestionIndexMethod();
        },
        err=>{
          console.error(err);
        }
      );
    }
  }

  submitNewLevelFormData(){
    let data = this.addNewLevelFormModel.value;
    let index = this.questionIndex.length;
    this.addNewLevelService.add(data,this.url)
    .subscribe(
      res=>{
        console.log(res);
        this.fetchQuestionIndexMethod();
        this.addQuestion(index);
      },
      err=>{
        console.error(err);
      }
    );
  }

}
