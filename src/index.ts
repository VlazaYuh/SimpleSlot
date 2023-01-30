import * as PIXI from 'pixi.js'
import { Reel } from './Reel'
import { Reels } from './Reels'
import { StateMachine } from './StateMachine'
import { State } from './State'
import { UserController } from './Controllers/UserController'
import { UI } from './UI'
import { ReelController } from './Controllers/ReelController'
import { TTransition } from './TTransition'
import { AnimationController } from './Controllers/AnimationController'
import { LoadingController } from './Controllers/LoadingController'
import { LoadRect } from './LoadRect'
export const app = new PIXI.Application({ sharedTicker: true, sharedLoader: true, /* backgroundColor: 1099 */ })
document.body.appendChild(app.view)
export const stateMachine = new StateMachine()
stateMachine.setConfig({
    transitions: [
        { from: State.Loading, to: State.Init },
        { from: State.Init, to: State.Idle },
        { from: State.Idle, to: State.Spinning },
        { from: State.Spinning, to: State.Animation },
        { from: State.Animation, to: State.Idle }],
    initialState: State.Loading
})
export const ui = app.stage.addChild(new UI())
new UserController()
const loadingController = window.loadingController = new LoadingController()
export const loadingGraphics = window.loadingGraphics = app.stage.addChild(new LoadRect(app.screen.width, app.screen.height))
stateMachine.onStateChange(state => {
    return new Promise(resolve => {
        if (state === State.Init) {
            init()
        }
        resolve()
    })
})
stateMachine.start()
export function init() {
    const reels = window.reels = app.stage.addChild(new Reels(5))
    ui.init(app.screen.width)
    const reelController = new ReelController(reels)
    const animationController = new AnimationController(reels)
    reels.position.set(app.screen.width / 2, app.screen.height / 2)
}
export function delay(timeMS: number) {
    return new Promise<void>(resolve => {
        PIXI.Ticker.shared.add(() => {
            timeMS -= PIXI.Ticker.shared.deltaMS
            if (timeMS <= 0) {
                resolve()
            }
        })
    })
}
