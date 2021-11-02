import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Custom Components
import { TechnologyOverviewComponent } from './components/technology-overview/technology-overview.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurriculaOverviewComponent } from './components/curricula-overview/curricula-overview.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TechnologyDialogComponent } from './components/technology-dialog/technology-dialog.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { TechnologyTopicDialogComponent } from './components/technology-topic-dialog/technology-topic-dialog.component';

// Material & 3rd party Components
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CdkTableModule } from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { CurriculumCreateComponent } from './components/curriculum-create/curriculum-create.component';
import { DialogCreateComponent } from './components/dialog-create/dialog-create.component';
import { MatSelectModule } from '@angular/material/select';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    CurriculaOverviewComponent,
    NavbarComponent,
    LoginComponent,
    TechnologyOverviewComponent,
    TechnologyDialogComponent,
    HomepageComponent,
    CurriculumCreateComponent,
    DialogCreateComponent,
    PieChartComponent,
    TechnologyTopicDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbDropdownModule,
    NgbModule,
    NgxMatColorPickerModule,
    FontAwesomeModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDialogModule,
    CdkTableModule,
    DragDropModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatGridListModule,
    MatChipsModule,
    MatTableModule,
    MatTooltipModule,
    CdkTableModule,
    MatSelectModule,
    ChartsModule,
    MatBadgeModule,
    MatSortModule,
    MatExpansionModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'decreasing',
      preventDuplicates: true
    }),
  ],
  providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }],
  bootstrap: [AppComponent]
})
export class AppModule { }
