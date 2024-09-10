import { NgModule } from '@angular/core';
import { SampleDirective } from './sample/sample';
@NgModule({
	declarations: [SampleDirective],
	imports: [],
	exports: [SampleDirective]
})
export class DirectivesModule {}
