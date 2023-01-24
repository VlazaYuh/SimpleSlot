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
export const app = new PIXI.Application({ sharedTicker: true, sharedLoader: true, /* backgroundColor: 1099 */ })
document.body.appendChild(app.view)
export const stateMachine = new StateMachine()
stateMachine.setConfig({
    transitions: [
        { from: State.Init, to: State.Idle },
        { from: State.Idle, to: State.Spinning },
        { from: State.Spinning, to: State.Animation },
        { from: State.Animation, to: State.Idle }],
    initialState: State.Init
})
export const ui = app.stage.addChild(new UI())
new UserController()
function init() {
    const reels = window.reels = app.stage.addChild(new Reels(5))
    ui.init(app.screen.width)
    const reelController = new ReelController(reels)
    const animationController = new AnimationController(reels) 
    reels.position.set(app.screen.width / 2, app.screen.height / 2)
    stateMachine.start()
}
PIXI.Loader.shared.add('assets/fruits.json')
PIXI.Loader.shared.load(init)
stateMachine.onStateChange(state => {
    return new Promise(resolve => {
        resolve()
        return
    })
})
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
