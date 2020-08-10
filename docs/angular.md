# Angular

This document describes how to setup [Angular](https://angular.io) with videojs-wavesurfer.

For more information, check the video.js [documentation](https://github.com/videojs/video.js/blob/master/docs/guides/angular.md)
for Angular.

## Installation

Install the [Angular CLI](https://cli.angular.io) globally:

```console
npm install -g @angular/cli
```

Create a new application, e.g. `videojs-wavesurfer-angular`:

```console
ng new videojs-wavesurfer-angular
```

Install `videojs-wavesurfer` and `@types/video.js`:

```console
cd videojs-wavesurfer-angular
npm install --save videojs-wavesurfer @types/video.js
```

## Application

Create a new Angular component:

```console
ng generate component videojs-wavesurfer
```

Replace the content of `src/app/videojs-wavesurfer/videojs-wavesurfer.component.css` with:

```css
/* change player background color */
#audio_clip1 {
    background-color: #42f489;
}
```

Replace the content of `src/app/videojs-wavesurfer/videojs-wavesurfer.component.html` with:

```html
<audio id="audio_{{idx}}" class="video-js vjs-default-skin"></audio>
```

Replace the content of `src/app/videojs-wavesurfer/videojs-wavesurfer.component.ts` with:

```ts
import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef
} from '@angular/core';

import videojs from 'video.js';
import * as WaveSurfer from 'wavesurfer.js';

/*
// Required imports when using videojs-wavesurfer 'live' mode with the microphone plugin
import * as adapter from 'webrtc-adapter/out/adapter_no_global.js';
import * as MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
WaveSurfer.microphone = MicrophonePlugin;
*/

// Register videojs-wavesurfer plugin
import * as Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';

@Component({
  selector: 'app-videojs-wavesurfer',
  templateUrl: './videojs-wavesurfer.component.html',
  styleUrls: ['./videojs-wavesurfer.component.css']
})
export class VideojsWavesurferComponent implements OnInit, OnDestroy {

  // reference to the element itself: used to access events and methods
  private _elementRef: ElementRef

  // index to create unique ID for component
  idx = 'clip1';

  private config: any;
  private player: any; 
  private plugin: any;

  // constructor initializes our declared vars
  constructor(elementRef: ElementRef) {
    this.player = false;

    // save reference to plugin (so it initializes)
    this.plugin = Wavesurfer;

    // video.js configuration
    this.config = {
      controls: true,
      bigPlayButton: false,
      autoplay: false,
      fluid: false,
      loop: false,
      width: 600,
      height: 300,
      plugins: {
        // configure videojs-wavesurfer plugin
        wavesurfer: {
            backend: 'MediaElement',
            displayMilliseconds: true,
            debug: true,
            waveColor: '#4A4A22',
            progressColor: 'black',
            cursorColor: 'black',
            hideScrollbar: true
        }
      }
    };
  }

  ngOnInit() {}

  // use ngAfterViewInit to make sure we initialize the videojs element
  // after the component template itself has been rendered
  ngAfterViewInit() {
    // ID with which to access the template's audio element
    let el = 'audio_' + this.idx;

    // setup the player via the unique element ID
    this.player = videojs(document.getElementById(el), this.config, () => {
      console.log('player ready! id:', el);

      // print version information at startup
      const msg = 'Using video.js ' + videojs.VERSION +
        ' with videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
        ' and wavesurfer.js ' + WaveSurfer.VERSION;
      videojs.log(msg);

      // load file
      this.player.src({src: 'assets/hal.wav', type: 'audio/wav'});
    });

    this.player.on('waveReady', event => {
      console.log('waveform is ready!');
    });

    this.player.on('playbackFinish', event => {
      console.log('playback finished.');
    });

    // error handling
    this.player.on('error', (element, error) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });
  }

  // use ngOnDestroy to detach event handlers and remove the player
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
      this.player = false;
    }
  }

}
```

Replace content of `src/app/app.component.html` with:

```html
<app-videojs-wavesurfer></app-videojs-wavesurfer>
```

Add the following to `src/styles.css`:

```css
@import '~video.js/dist/video-js.css';
@import '~videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
```

## Media

Download the [example audio file](https://github.com/collab-project/videojs-wavesurfer/raw/master/examples/media/hal.wav)
and place it in the `src/assets` directory.

## Run

Start the development server:

```console
ng serve
```

And open http://localhost:4200 in a browser.
