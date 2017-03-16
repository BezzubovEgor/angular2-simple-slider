import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './src/slider/slider.component';

export * from './src/slider/slider.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SliderComponent
  ],
  exports: [
    SliderComponent
  ]
})
export class SliderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SliderModule
      // ,providers: [SampleService]
    };
  }
}
