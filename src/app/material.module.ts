import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';

@NgModule({
  imports:[MatToolbarModule,MatButtonModule,MatInputModule,MatCardModule,MatSidenavModule,MatTooltipModule,MatListModule,MatTableModule,MatPaginatorModule,MatDialogModule,MatDividerModule,MatFormFieldModule,MatRadioModule,MatSlideToggleModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule],
  exports:[MatToolbarModule,MatButtonModule,MatInputModule,MatCardModule,MatSidenavModule,MatTooltipModule,MatListModule,MatTableModule,MatPaginatorModule,MatDialogModule,MatDividerModule,MatFormFieldModule,MatRadioModule,MatSlideToggleModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule],
  providers:[MatDatepickerModule]
})
export class MaterialModule{}


