import * as PIXI from 'pixi.js'
import { icons } from './icons'
export class Reel extends PIXI.Container {
    private container = this.addChild(new PIXI.Container())
    //
    private symbolSize = 50
    constructor(private readonly rows: number) {
        super()
  /*       this.addChild(new PIXI.Graphics().beginFill(0xffffff).drawCircle(0,0,5)) */
        this.container.y = -this.symbolSize * (rows - 1) / 2
        this.createMask()
        for (let i = rows+1; i--;) {
            const sprite = this.container.addChild(this.getSprite())
            sprite.y = (i-1) * this.symbolSize
        }
    }
    start() {

    }
    stop() {

    }
    private getSprite(id = Math.floor(Math.random() * icons.length)) {
        const sprite = PIXI.Sprite.from(icons[id])
        sprite.anchor.set(0.5)
        return sprite
    }
    private createMask(offset = 15) {
        const mask = new PIXI.Graphics()
        mask.beginFill(0,0)
        mask.drawRect(-this.symbolSize / 2, -this.symbolSize * this.rows / 2, this.symbolSize, this.symbolSize * this.rows)
        this.container.mask = mask
        this.addChild(mask)

    }
}