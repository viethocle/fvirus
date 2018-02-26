import { animate, state, style, transition, trigger} from '@angular/animations';
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