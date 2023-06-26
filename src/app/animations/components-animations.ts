import {animate, animateChild, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";

export const flyInList = {
  parent: trigger('list', [
    transition(':enter', [
      query('@flyIn', [
        stagger(100, animateChild()),
      ]),
    ])
  ]),
  children: trigger('flyIn', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => in', [
      animate(1000, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ]),
  ])
};
