import * as PIXI from 'pixi.js'
import { icons } from './icons'
export class Reel extends PIXI.Container {
    private container = this.addChild(new PIXI.Container())
    //
    private symbolHeight = 50
    constructor(private readonly rows: number) {
        super()
        this.container.pivot.y = this.symbolHeight * (rows - 1) / 2 /* this.container */
        for (let i = rows; i--;) {
            const sprite = this.container.addChild(this.getSprite())
            sprite.y = i * this.symbolHeight
            this.createMask()
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
        mask.lineStyle(0)
        mask.pivot.x = this.container.pivot.x + offset
        mask.pivot.y = this.container.pivot.y + offset + this.symbolHeight
        mask.position.set(this.container.x, this.container.y)
        mask.beginFill(0x660000, 0.5)
        /*       mask.drawRect(mask.x, mask.y, this.container.width, this.symbolHeight * (this.rows + 1.5)) */
        mask.drawRect(mask.x, mask.y, this.container.width, this.symbolHeight)
        mask.drawRect(mask.x, this.symbolHeight * (this.rows + 0.6), this.container.width, this.symbolHeight)
        mask.endFill()
       /*  this.mask = mask */
        this.addChild(mask)

    }
}