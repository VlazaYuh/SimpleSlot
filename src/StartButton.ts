import * as PIXI from 'pixi.js'
import { Button } from './Button'
import { eventEmitter } from '.'
export class StartButton extends Button {
    constructor() {
        super()
        const sprite = this.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/startButton.png')))
        sprite.anchor.set(0.5)
    }
}