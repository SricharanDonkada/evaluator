import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluatorComponent } from './evaluator/evaluator.component';
import { CompilerComponent } from './compiler/compiler.component';
import { AdminComponent } from './admin/admin.component';
import { CodejamComponent } from './codejam/codejam.component';


const routes: Routes = [
  { path: '', redirectTo:'/evaluator',pathMatch:'full'},
  { path: 'evaluator',component:EvaluatorComponent },
  { path: 'code-compiler' ,component:CompilerComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'codejam', component: CodejamComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
