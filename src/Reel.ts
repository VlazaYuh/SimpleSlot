import * as PIXI from 'pixi.js'
import { icons } from './icons'
import { Ticker } from 'pixi.js'
import { app } from '.'
export class Reel extends PIXI.Container {
    private container = this.addChild(new PIXI.Container())
    private speed = 0.5
    private symbolSize = 50
    private running = false
    private stopping: boolean
    private yOffset: number
    private i: number
    private funct = (delta: number) => {

        if (this.container.y + delta * this.speed > this.i + this.symbolSize) {
            /* this.i += this.symbolSize */
            this.container.y -= this.symbolSize
            this.container.children.forEach((child) => child.y += this.symbolSize)
            this.container.children[0].destroy()
            this.createSymbols()
            if (this.stopping && Math.floor(this.container.children[0].y) === this.yOffset - this.symbolSize) {
                this.running = false
                this.stopping = false
                PIXI.Ticker.shared.remove(this.funct)
            }

        }
        else {
/*             if (this.stopping && (this.container.y) >= this.yOffset - this.symbolSize) {
                this.running = false
                this.stopping = false
                PIXI.Ticker.shared.remove(this.funct)
            } */
            this.container.y += delta * this.speed

        }


    }
    constructor(private readonly rows: number) {
        super()
        /* this.addChild(new PIXI.Graphics().beginFill(0xffffff).drawCircle(0,0,5))  */
        this.container.y = -this.symbolSize * (rows - 1) / 2
        this.i = this.container.y
        this.createMask()
        this.createSymbols(rows + 1)
        this.yOffset = (this.symbolSize * rows)
        /* const yOffset = (app.screen.height - this.container.children[0].y - this.symbolSize) */
    }
    start() {
        if (this.running) {
            return
        }
        PIXI.Ticker.shared.add(this.funct)
        this.running = true
        this.stopping = false
    }

    async stop(child: object) {
        /* if (this.container.children[0].y == this.yoffset - this.symbolSize) { */
        /*  PIXI.Ticker.shared.stop() */
        this.stopping = true
        /* this.running = false
        PIXI.Ticker.shared.remove(this.funct) */

    }
    private getSprite(id = Math.floor(Math.random() * icons.length)) {
        const sprite = PIXI.Sprite.from(icons[id])
        sprite.anchor.set(0.5)
        return sprite
    }
    private createMask(offset = 15) {
        const mask = new PIXI.Graphics()
        mask.beginFill(0, 0)
        mask.drawRect(-this.symbolSize / 2, -this.symbolSize * this.rows / 2, this.symbolSize, this.symbolSize * this.rows)
        this.container.mask = mask
        this.addChild(mask)

    }
    private createSymbols(amount = 1) {
        while (amount--) {
            const sprite = this.container.addChild(this.getSprite())
            sprite.y = (amount - 1) * this.symbolSize
        }
    }
}