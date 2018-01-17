import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'sliceDecimal'})
export class SlizeDecimalPipe implements PipeTransform {

    transform(value:any) {
        if (value) {
            return value/10;
        }
        return value;
    }

}