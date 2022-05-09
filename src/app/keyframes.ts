import { keyframes, style } from '@angular/animations';

export const flip = [
    style({transform: 'rotateY(180deg)', offset: 1})
]

export const flipBack = [
    style({transform: 'none', offset: 1})
]

export const fadeOutLeftL = [
    style({transform: 'translate3d(-100%, 0, 0)', color: 'orange', opacity: '0', offset: 1})
]

export const fadeOutRightL = [
    style({transform: 'translate3d(100%, 0, 0)', color: 'green', opacity: '0', offset: 1})
]

export const fadeOutLeftFlippedL = [
    style({transform: 'translate3d(-100%, 0, 0)', color: 'orange', opacity: '0', offset: 1})
]

export const fadeOutRightFlippedL = [
    style({transform: 'translate3d(100%, 0, 0)', color: 'green', opacity: '0', offset: 1})
]

export const fadeOutLeft = [
    style({transform: 'translate3d(-100%, 0, 0)', opacity: '0', offset: 1})
]

export const fadeOutRight = [
    style({transform: 'translate3d(100%, 0, 0)', opacity: '0', offset: 1})
]

export const fadeOutLeftFlipped = [
    style({transform: 'translate3d(-100%, 0, 0)', opacity: '0', offset: 1})
]

export const fadeOutRightFlipped = [
    style({transform: 'translate3d(100%, 0, 0)', opacity: '0', offset: 1})
]