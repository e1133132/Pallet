import { NgModule } from '@angular/core';
import { DashIfNullPipe } from './dash-if-null/dash-if-null';
@NgModule({
	declarations: [DashIfNullPipe],
	imports: [],
	exports: [DashIfNullPipe]
})
export class PipesModule {}
