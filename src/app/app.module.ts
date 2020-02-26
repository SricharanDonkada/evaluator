import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EvaluatorComponent } from './evaluator/evaluator.component';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';





import { CompilerComponent } from './compiler/compiler.component';
import { AdminComponent } from './admin/admin.component';
import { CodejamComponent } from './codejam/codejam.component';




@NgModule({
  declarations: [
    AppComponent,
    EvaluatorComponent,
    CompilerComponent,
    AdminComponent,
    CodejamComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    CodemirrorModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
