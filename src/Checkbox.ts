import * as PIXI from 'pixi.js'
import { Button } from './Button'
export class Checkbox extends Button {
    private box: PIXI.Sprite
    private check: PIXI.Sprite
    get checkVisible() {
        return this.check.visible
    }
    constructor(active: boolean) {
        super()
        this.box = this.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/checkbox.png')))
        this.check = this.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/check.png')))
        this.check.anchor.set(0.5)
        this.box.anchor.set(0.5)
        this.check.visible = active
    }
    protected onPointerUp(): void {
        super.onPointerUp()
        this.check.visible = !this.check.visible
    }
}