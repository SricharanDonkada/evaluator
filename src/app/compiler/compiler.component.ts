import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { EvaluateService } from '../evaluate.service';

@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.css']
})
export class CompilerComponent implements OnInit {

  constructor(private fb: FormBuilder, private evaluateService: EvaluateService) { }

  ngOnInit() {
  }

  url = 'http://localhost:2001';

  consoleData = 'Console';
  error = false;
  progressBar = false;

  codeForm = this.fb.group({
    code: ['', [Validators.required]]
  });

  code() {
    return this.codeForm.get('code');
  }

  compile() {
    if (this.codeForm.value.code.replace(/ /g, '') != '') {
      console.log("code sent to server!");
      this.progressBar = true;
      this.evaluateService.evaluate(this.codeForm.value, this.url).subscribe(
        data => {
          console.log(data);
          this.updateConsole(data);
          this.progressBar = false;
        },
        err => {
          console.error(err);
          this.progressBar = false;
        }
      );
    }
  }

  testCode() {
    console.log('code sent to server!');
  }

  updateConsole(data) {
    console.log('update console called! --', data.result.stderr == '');
    if (data.result.stderr == '') {
      this.consoleData = data.result.stdout.replace(/\n/g, '<br>').replace(/\t/, '&nbsp; &nbsp; &nbsp;');
      this.error = false;
    }
    else {
      let temp = data.result.stderr.substring(data.result.stderr.indexOf(/.c:*:*:/, 0));
      this.consoleData = temp.substring(temp.indexOf(':', 5) + 2).replace(/\n/g, '<br>').replace(/ /, '&nbsp;');
      this.error = true;
    }
  }


}
