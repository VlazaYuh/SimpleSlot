import * as PIXI from 'pixi.js'
import { Button } from './Button'
import { textStyles } from './textStyles'
export class AutoPlayButton extends Button {
    constructor(name: string) {
        super()
        const sprite = this.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/autoPlayButton.png')))
        sprite.anchor.set(0.5)
        sprite.scale.set(0.5)
        const text = this.addChild(new PIXI.Text(name, textStyles.menuStyle))
        text.anchor.set(0.5)
    }
}