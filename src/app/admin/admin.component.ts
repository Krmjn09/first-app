import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  model: any = {};
  cover: string | null = null;
  coverFile: File | null = null;
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
  }
}
