import * as PIXI from 'pixi.js'
import { Button } from './Button'
export class OptionsButton extends Button {
    constructor() {
        super()
        const sprite = this.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/options.png')))
        sprite.anchor.set(0.5)
        sprite.scale.set(0.33)
    }
}