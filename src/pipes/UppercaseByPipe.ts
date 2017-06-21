import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'upper'
})
export class UppercaseByPipe implements PipeTransform {

    transform(value:any,args:any){
      value = value + ''; // make sure it's a string
      return value.toUpperCase();
    }

}
