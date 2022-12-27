import * as PIXI from 'pixi.js'
import { icons } from './icons'
import { Ticker } from 'pixi.js'
import { app } from '.'
export class Reel extends PIXI.Container {
    private container = this.addChild(new PIXI.Container())
    private speed = 2
    private symbolSize = 50
    private running = false
    private yoffset:number
    private funct = (delta:number)=> {
        
        for (let i = this.container.children.length - 1; i >= 0; i--) {
            const symbol = this.container.children[i]

            if (this.container.children[0].y + delta * this.speed > this.yoffset) {
                this.container.children[0].destroy()
                this.createSymbols()
            }
            else {
                symbol.y += delta * this.speed
            }
        }

    }
    constructor(private readonly rows: number) {
        super()
        /* this.addChild(new PIXI.Graphics().beginFill(0xffffff).drawCircle(0,0,5))  */
        this.container.y = -this.symbolSize * (rows - 1) / 2
        this.createMask()
        this.createSymbols(rows + 1)
        this.yoffset =(this.container.children[0].y + this.symbolSize)
        /* const yOffset = (app.screen.height - this.container.children[0].y - this.symbolSize) */
    }
    start() {
        if (this.running) {
        }
        else {
            const ticker = PIXI.Ticker.shared

            ticker.add(this.funct)


            ticker.start()
            this.running = true
        }
    }

    stop() {
        PIXI.Ticker.shared.stop()
        this.running = false
        PIXI.Ticker.shared.remove(this.funct)
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