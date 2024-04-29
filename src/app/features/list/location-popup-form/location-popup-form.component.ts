import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-location-popup-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, TranslocoModule],
  templateUrl: './location-popup-form.component.html',
  styleUrl: './location-popup-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationPopupFormComponent implements OnInit {
  isNewLocation!: boolean;
  form!: FormGroup;

  private readonly data = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<LocationPopupFormComponent>);

  ngOnInit(): void {
    this.isNewLocation = !this.data.id;
    this.setupForm();
  }

  apply(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.value);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  private setupForm(): void {
    this.form = this.fb.group({
      id: [this.data.id],
      name: [this.data.name, Validators.required],
      address: [this.data.address, Validators.required],
      lat: [this.data.lat, Validators.required],
      lng: [this.data.lng, Validators.required],
      creationDate: [this.data.creationDate],
    });
  }
}
