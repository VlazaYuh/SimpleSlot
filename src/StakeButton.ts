import * as PIXI from 'pixi.js'
import { Button } from './Button'
export class StakeButton extends Button {
    constructor() {
        super()
        const sprite = this.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/arrow.png')))
        sprite.anchor.set(0.5)
        sprite.scale.set(0.5)
    }
}