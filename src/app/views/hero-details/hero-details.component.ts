import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuperHeroe } from '../common/super-heroes.interface';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
})
export class HeroDetailsComponent implements OnInit {
  heroForm: FormGroup;
  heroId: number;
  title: string;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<HeroDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public superHero: SuperHeroe
  ) {}

  ngOnInit(): void {
    if (!this.superHero) {
      this.title = 'New Hero';
      this.buildForm();
      return;
    }
    this.title = `Editing ${this.superHero.superhero}`;
    this.buildForm(this.superHero);
  }

  buildForm(hero?: SuperHeroe) {
    this.heroForm = this.formBuilder.group({
      superhero: [hero?.superhero, Validators.required],
      publisher: [hero?.publisher],
      alter_ego: [hero?.alter_ego, Validators.required],
      first_appearance: [hero?.first_appearance],
      id: [hero?.id],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  validInput(input: string) {
    return (
      this.heroForm.controls[`${input}`].invalid &&
      (this.heroForm.controls[`${input}`].dirty ||
        this.heroForm.controls[`${input}`].touched)
    );
  }
}
