import { FormControl } from '@angular/forms';
 
export class TextValidator {
 
  static checkUsername(control: FormControl): any {
 
    return new Promise(resolve => {
 
      //Fake a slow response from server
 
      setTimeout(() => {
        if(control.value.toLowerCase() === "greg"){
 
          resolve({
            "text taken": true
          });
 
        } else {
          resolve(null);
        }
      }, 2000);
 
    });
  }
 
}