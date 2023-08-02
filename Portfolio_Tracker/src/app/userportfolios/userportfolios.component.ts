import { portfolio } from '../Models/portfolio';
import { PortfolioService } from '../service/portfolio.service';
import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-userportfolios',
  templateUrl: './userportfolios.component.html',
  styleUrls: ['./userportfolios.component.css'],
})
export class UserportfoliosComponent implements OnInit {
  portfolios: Array<portfolio> = [];
  portfolioForm!: FormGroup;
  constructor(
    private portfolioservice: PortfolioService,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.portfolioForm = this.formBuilder.group({
      portfolioName: ['', Validators.required],
      portfolioDescription: [''],
    });

    this.getPortfolios();
  }

  getPortfolios() {
    this.portfolioservice.getPortfolio(this.auth.username).subscribe((res) => {
      this.portfolios = res;
    });
  }

  deletePortfolio(id: number) {
    this.portfolioservice.deletePortfolio(id).subscribe((res) => {
      console.log('deleted');
      this.getPortfolios();
    });
  }

  addPortfolio(portfolio: any) {
    this.portfolioservice.addPortfolio(portfolio).subscribe((res) => {
      console.log('created');
      this.getPortfolios();
    });
  }

  onSubmit() {
    if (this.portfolioForm.valid) {
      const portfolio = {
        userName: this.auth.username,
        portfolioName: this.portfolioForm.value.portfolioName,
        description: this.portfolioForm.value.portfolioDescription,
      };

      console.log(portfolio); // You can use the portfolio object as needed, for example, sending it to a service or performing other operations.
      this.addPortfolio(portfolio);
    }
  }
}
