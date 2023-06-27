import {AnimationMetadata, AnimationTransitionMetadata, transition} from "@angular/animations";
import {
  fadeIn,
  fromBottomEasing,
  fromTopEasing,
  moveFromLeft,
  moveFromRight,
  rotateRoomToBottom,
  rotateRoomToLeft,
  rotateRoomToRight,
  rotateRoomToTop
} from "./animations/router-transitions";

export const routeAnimations: AnimationTransitionMetadata[] = [
  // Customer registration
  multiTransition(
    ['searchPage'],
    ['login', 'registerCustomer'],
    rotateRoomToLeft
  ),
  multiTransition(
    ['login', 'registerCustomer', 'registerMonitor'],
    ['searchPage'],
    rotateRoomToRight
  ),

  ...tunnelTransition(['login', 'registerCustomer'], moveFromRight, moveFromLeft),

  // Monitor registration
  transition('registerCustomer => registerMonitor', fromBottomEasing),
  transition('registerMonitor => registerCustomer', fromTopEasing),

  // Monitor dashboard
  ...tunnelTransition(['dashboard', 'planning'], rotateRoomToBottom, rotateRoomToTop),

  // Entering/Exiting the booking process
  multiTransition(
    ['searchPage', 'login', 'registerCustomer', 'registerMonitor'],
    ['cart', 'booking'],
    rotateRoomToTop
  ),
  multiTransition(
    ['payment', 'booking', 'quickConnect', 'cart'],
    ['searchPage', 'login', 'registerCustomer', 'registerMonitor'],
    rotateRoomToBottom
  ),

  // Moving between booking steps
  ...tunnelTransition(['cart', 'quickConnect', 'booking', 'payment'], moveFromRight, moveFromLeft),

  // Entering/Exiting chat
  multiTransition(
    ['dashboard', 'planning', 'account'],
    ['chat'],
    rotateRoomToRight
  ),
  transition('chat => *', rotateRoomToLeft),

  // Entering/Exiting account
  multiTransition(
    ['dashboard', 'planning', 'chat'],
    ['account'],
    rotateRoomToLeft
  ),
  transition('account => *', rotateRoomToRight),

  transition('* <=> *', fadeIn),
]

function multiTransition(from: string[], to: string[], animation: AnimationMetadata): AnimationTransitionMetadata {
  const transitions = []

  for (const f of from) {
    for (const t of to) {
      transitions.push(`${f} => ${t}`)
    }
  }

  const stateChangeExpr = transitions.join(', ')
  return transition(stateChangeExpr, animation)
}

function tunnelTransition(stats: string[], next: AnimationMetadata, previous: AnimationMetadata): AnimationTransitionMetadata[] {
  return [
    sequenceTransition(stats.slice(), next),
    sequenceTransition(stats.slice().reverse(), previous)
  ]
}

function sequenceTransition(stats: string[], animation: AnimationMetadata): AnimationTransitionMetadata {
  const transitions = []
  let start = stats.shift()

  for (const s of stats) {
    transitions.push(`${start} => ${s}`)
    start = s
  }

  const stateChangeExpr = transitions.join(', ')
  return transition(stateChangeExpr, animation)
}

