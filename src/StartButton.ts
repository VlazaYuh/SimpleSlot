import * as PIXI from 'pixi.js'
import { Button } from './Button'
import { eventEmitter } from '.'
export class StartButton extends Button {
    constructor(x: number, y: number) {
        super()
        const texture = this.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/startButton.png')))
        texture.anchor.set(0.5)
        this.position.set(x, y)
    }
    protected onPointerUp(): void {
        super.onPointerUp()
        eventEmitter.emit('player_pressed_start')
    }
}