# angular2-simple-slider

## Installation

To install slider, run:

```bash
$ npm install angular2-simple-slider --save
```

## Consuming your library

You can import your library in any Angular application by running:

```bash
$ npm install angular2-simple-slider
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
//import slidert component
import { SliderComponent } from 'angular2-simple-slider';

@NgModule({
  declarations: [
    AppComponent,
    //declare slider
    SliderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Once slider is imported, you can use it in your Angular application:

```xml
<!-- You can now use slider component in app.component.html -->
<h1>
  {{title}}
</h1>
<slider (change)="onChange($event)"></slider>
```

## License

MIT © [bezzubov egor](mailto:bezzubov.egor@gmail.com)
