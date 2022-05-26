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
      this.errorMsg = ErrorViewComponent.getErrorTitle(this.errorCode);
    });
    this.titleService.setTitle("Tex-Cards Error");
  }

  public static getErrorTitle(status: number): string {
    if (status == 500) {
      return "Internal Server Error";
    } else if (status == 403) {
      return "Forbidden";
    } else if (status == 404) {
      return "Not Found";
    } else if  (status == 400) {
      return "Bad request";
    }
    return "Error";
  }

}
