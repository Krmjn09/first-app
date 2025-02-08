import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CoursesComponent } from '../courses/courses.component';
import { Strings } from '../enum/strings.enum';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule,CoursesComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  model: any = {};
  cover: string | null = null;
  coverFile: File | null = null;
  courses : any[]=[];
  ngOnInit(){
    this.getCourses();
  }

 getCourses(){
  const data = localStorage.getItem(Strings.STORAGE_KEY);
  if (data) {
    this.courses = JSON.parse(data);
  }
}


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.coverFile = file; // Store the file object

      const reader = new FileReader();
      reader.onload = () => {
        this.cover = reader.result as string; // Convert file to base64 for preview
      };
      reader.readAsDataURL(file);
    } else {
      this.cover = null; // Reset preview if no file is selected
      this.coverFile = null;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      console.log('Form is invalid');
      return;
    }
    this.saveCourse(form.value);
  }
  saveCourse(formValue: any)
  {
    console.log(formValue);
    const data  ={
      ...formValue,
      image: this.cover
    };

     this.courses = [...this.courses, data];
    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(this.courses));
   

  }
}
