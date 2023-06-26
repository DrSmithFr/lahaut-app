import {animate, animateChild, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";

export const activityInList = {
  parent: trigger('list', [
    transition(':enter', [
      query('@activityIn', [
        stagger(90, animateChild()),
      ]),
    ])
  ]),
  children: trigger('activityIn', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => in', [
      animate(600, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ]),
  ])
};
