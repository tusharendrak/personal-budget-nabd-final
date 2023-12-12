import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppConstant } from 'src/app/app.constant';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  message="";

  constructor(private http: HttpClient,private authenticationService : AuthenticationService,private dialog: MatDialog){}
  expenses: any[] = [];
  

  ngOnInit(): void {
    this.authenticationService.checkSession().subscribe((data:any)=>{
      console.log(data);
      if(data){
        if(localStorage.getItem("user")){
          this.message = "Welcome " + localStorage.getItem("user") + ", to the Expense Tracker";
        }else{
          this.message="You are not logged in";
        }
      }
      else{
        this.message="You are not logged in";
      }
    });

  }
  showAnswer: { [key: string]: boolean } = {};
  faqs = [
    { id: 'faq1', question: 'How do I add a new expense?', answer: 'To add a new expense, click on the \'+\' button at the bottom right of the page. This will open a dialog where you can enter the details of your expense.' },
    { id: 'faq2', question: 'Can I set monthly budgets?', answer: 'Yes, you can set monthly budgets on the dashboard. Navigate to the \' Budget\' section, and you can create and manage your budgets there.' },
    // Add more FAQs as needed
  ];

  toggleAnswer(faqId: string): void {
    this.showAnswer[faqId] = !this.showAnswer[faqId];
  }

  openExpenseDialog(): void {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addExpense(result);
      }
    });
  }

  addExpense(newExpense: any): void {
    this.http.post<any>(`${AppConstant.API_URL}/expenses`, newExpense,{withCredentials:true}).subscribe(
      (data) => {
        console.log('Expense added successfully:', data);
        this.getExpenses(); // Refresh the expense list after adding a new expense
      },
      (error) => {
        console.error('Error adding expense:', error);
      }
    );
  }

  getExpenses(): void {
    this.http.get<any[]>(`${AppConstant.API_URL}/expenses`,{withCredentials:true}).subscribe(
      (data) => {
        // console.log(data)
        this.expenses = data;
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }
}



