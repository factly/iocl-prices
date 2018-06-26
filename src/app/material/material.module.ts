import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule,MatCardModule,MatCheckboxModule,MatDatepickerModule,MatFormFieldModule, MatFormField, MatInputModule} from '@angular/material'
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatCheckboxModule
  ],
  declarations: [],
  exports : [
    MatToolbarModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
