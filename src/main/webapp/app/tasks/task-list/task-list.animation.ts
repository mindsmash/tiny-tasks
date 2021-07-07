import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

export const listItemAnimation = trigger('list-item', [
  transition(':enter', [
   style({
      height: 0,
      opacity: 0,
      transform: 'scale(0. 85)',
      marginBottom: 0,
      padding: 0
    }),
    animate(50, style({
      height: '*',
      marginBottom: '*',
      padding: '*'
    })),
    animate(100)
  ]),
  transition(':leave', [
    animate(50, style({
      transform: 'scale(1.05)'
    })),
    animate(50, style({
      transform: 'scale(1)',
      opacity: 0.75
    })),
    animate('120ms ease-out', style({
      transform: 'scale(0.5)',
      opacity: 0
    })),
    animate('150ms ease-out', style({
      height: 0,
      marginBottom: 0,
      padding: 0
    }))
  ])
]);

/**
 * Triggers animation only if multiple elements were added or removed
 * Is used with list number, so input params in fact are numbers
 *
 *  @param from number on last animation trigger
 * @param to current number of elements
 */
function multipleListItemsChanged(from: string, to: string): boolean {
  return Math.abs(Number(from) - Number(to)) >= 2;
}

export const listAnimation = trigger('list', [
  transition(multipleListItemsChanged, [
    query(':enter', [
      style({
        height: 0,
        opacity: 0
      }),
      stagger(100, [
        animate('0.2s ease')
      ])
    ], {
      optional: true
    }),
    query(':leave', [
      stagger(-100, [
        animate('0.2s ease', style({
          opacity: 0,
          transform: 'scale(0.5)'
        })),
      ])
    ], {
      optional: true
    })
  ])
]);
