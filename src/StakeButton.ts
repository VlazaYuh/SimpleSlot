import * as PIXI from 'pixi.js'
import { Button } from './Button'
export class StakeButton extends Button {
    constructor(x: number, y: number) {
        super()
        const texture = this.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/arrow.png')))
        texture.anchor.set(0.5)
        texture.scale.set(0.5)
        this.position.set(x, y)
    }
}