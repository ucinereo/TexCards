import { Injectable } from '@angular/core';
import {EventEmitter} from "events";

@Injectable({
  providedIn: 'root'
})
export class ErrorService extends EventEmitter{



  constructor() {
    super();
  }

}
