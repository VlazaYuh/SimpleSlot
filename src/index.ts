import * as PIXI from 'pixi.js'
import { Reels } from './Reels'
import { StateMachine } from './StateMachine'
import { State } from './State'
import { UserController } from './Controllers/UserController'
import { UI } from './UI'
import { ReelController } from './Controllers/ReelController'
import { AnimationController } from './Controllers/AnimationController'
import { LoadingController } from './Controllers/LoadingController'
import { LoadRect } from './LoadRect'
import { Lines } from './lines'
import { SoundManager } from './SoundManager'
import { BigWinAnimation } from './BigWinAnimation'
import { Event } from './Event'
import { getSpinResult } from './spinResult'
import { data } from './Data'
window.PIXI = PIXI
export const app = new PIXI.Application({ sharedTicker: true, sharedLoader: true, width: 800, height: 600 /* backgroundColor: 1099 */ })
globalThis.__PIXI_APP__ = app
document.body.appendChild(app.view)
export const eventEmitter = new PIXI.utils.EventEmitter()
export const stateMachine = new StateMachine()
export const userController = new UserController()
const checkAutoPlay = () => userController.autoPlay ? State.Spinning : State.Idle
const checkFreeSpins = () => {
    if (getSpinResult().freeSpin.freeSpins === 0) {
        return checkAutoPlay()
    }
    return State.Spinning
}
stateMachine.setConfig({
    transitions: [
        { from: State.Loading, to: State.Init },
        { from: State.Init, to: getSpinResult().freeSpin.freeSpins ? State.Spinning : State.Idle },
        { from: State.Idle, to: State.Spinning },
        { from: State.Spinning, to: () => getSpinResult().win ? State.Animation : checkFreeSpins() },
        { from: State.Animation, to: checkFreeSpins }],
    initialState: State.Loading
})
export const ui = new UI()
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
    const reels = window.reels = app.stage.addChild(new Reels(5, 5, getSpinResult().table))
    reels.position.set(app.screen.width / 2, app.screen.height / 2)
    const reelController = new ReelController(reels)
    const bigWinAnimation = window.bigWinAnimation = app.stage.addChild(new BigWinAnimation())
    bigWinAnimation.position.set(app.screen.width / 2, app.screen.height / 2)
    const linesAnim = window.linesAnim = app.stage.addChild(new Lines(reels))
    const animationController = window.animationControloler = new AnimationController(reels, linesAnim, bigWinAnimation)
    app.stage.addChild(ui)
    ui.init(app.screen.width, app.screen.height)
    SoundManager.playMusic()
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
