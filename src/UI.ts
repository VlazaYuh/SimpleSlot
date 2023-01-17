import * as PIXI from 'pixi.js'
import { stateMachine } from '.'
import { State } from './State'
export class UI extends PIXI.Container {
    private buttonStart: PIXI.Graphics
    init(width: number) {
        this.buttonStart = this.addChild(new PIXI.Graphics().beginFill(0x660000, 1).drawRect(width / 2 + 100 - 50, 50 * 5 * 2, 50, 20))
        this.buttonStart.buttonMode = true
        this.buttonStart.interactive = true
        this.buttonStart.on('pointertap', () => {
            this.emit('player_pressed_start')
        })
        stateMachine.onStateChange(async state => { this.buttonStart.interactive = state === State.Idle })
    }
}