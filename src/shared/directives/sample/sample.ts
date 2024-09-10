import { Directive } from '@angular/core';

/**
 * Generated class for the SampleDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[sample]' // Attribute selector
})
export class SampleDirective {

  constructor() {
    console.log('Hello SampleDirective Directive');
  }

}
