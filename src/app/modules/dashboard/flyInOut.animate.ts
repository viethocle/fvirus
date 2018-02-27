import { animate, state, style, transition, trigger, keyframes} from '@angular/animations';
import { AnimationEntryMetadata } from '@angular/core';

export const FlyInOut: AnimationEntryMetadata  = 
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-80%)'}),
      animate(130)
    ]),
    transition('* => void', [
      animate(100, style({transform: 'translateX(100%)'}))
    ])
  ]);

export const FlyOut: AnimationEntryMetadata = 
  trigger('flyOut', [
    state('in', style({})),
    transition('* => void', [
      animate(300, keyframes([
        style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
        style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
        style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
      ]))
    ])
  ]);
