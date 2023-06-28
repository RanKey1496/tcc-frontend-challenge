import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TCCClient } from '../tcc.client';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public clientForm!: FormGroup;
  public new = this.data.new || false;
  public selectedType = this.data.identificationType;
  public selectedGender = this.data.gender;

  constructor(public dialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tccClient: TCCClient) {}

  ngOnInit(): void {
    this.clientForm = new FormGroup({
      identificationType: new FormControl('', Validators.required),
      identification: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    })
    if (this.data && !this.data.new) {
      this.clientForm.setValue({
        identificationType: this.data.identificationType,
        identification: this.data.identification,
        name: this.data.name,
        gender: this.data.gender
      })
      this.clientForm.controls['identificationType'].disable();
      this.clientForm.controls['identification'].disable();
    }
  }

  update() {
    this.tccClient.updateClient(
      this.selectedType,
      this.clientForm.get('identification')!.value,
      this.clientForm.get('name')!.value,
      this.selectedGender
    ).subscribe(res => {
      this.closeDialog();
    })
  }

  save() {
    this.tccClient.saveClient(
      this.selectedType,
      this.clientForm.get('identification')!.value,
      this.clientForm.get('name')!.value,
      this.selectedGender
    ).subscribe(res => {
      this.closeDialog();
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
