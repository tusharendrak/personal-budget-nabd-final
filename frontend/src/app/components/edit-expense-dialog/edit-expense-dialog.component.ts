import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppConstant } from 'src/app/app.constant';

@Component({
  selector: 'app-edit-expense-dialog',
  templateUrl: './edit-expense-dialog.component.html',
  styleUrls: ['./edit-expense-dialog.component.css']
})
export class EditExpenseDialogComponent {
  newExpense: any = {};
  budgets: any[] = [];
  updatedExpense: any;

  constructor(
    public dialogRef: MatDialogRef<EditExpenseDialogComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updatedExpense = { ...data.expense };
  }

  ngOnInit(): void {
    this.fetchBudgets();
    // throw new Error('Method not implemented.');
  }

  fetchBudgets(): void {
    this.http.get<any[]>(`${AppConstant.API_URL}/budgets`,{withCredentials:true}).subscribe(
      (data) => {
        this.budgets = data;
        console.log('Budgets:', this.budgets);
      },
      (error) => {
        console.error('Error fetching budgets:', error);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.fetchBudgets();
  }

  onCancel(): void {
    this.dialogRef.close(this.updatedExpense);
  }
}
