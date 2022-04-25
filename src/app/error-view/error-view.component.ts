import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-view',
  templateUrl: './error-view.component.html',
  styleUrls: ['./error-view.component.scss']
})
export class ErrorViewComponent implements OnInit {

  public errorCode: number = -1;
  public errorMsg: string = "";
  public errorText: string = "";

  constructor(private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.errorCode = params['id'];
      this.errorText = params['txt'];
      if (this.errorCode == 500) {
        this.errorMsg = "Internal Server Error";
      } else if (this.errorCode == 403) {
        this.errorMsg = "Forbidden";
      } else if (this.errorCode == 404) {
        this.errorMsg = "Not Found";
      } else if  (this.errorCode == 400) {
        this.errorMsg = "Bad request";
      }
    });
    this.titleService.setTitle("Tex-Cards Error");
  }

}
