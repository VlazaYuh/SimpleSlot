import * as PIXI from 'pixi.js'
import { icons } from './icons'
import { Ticker } from 'pixi.js'
import { app } from '.'
export class Reel extends PIXI.Container {
    private container = this.addChild(new PIXI.Container())
    //
    private symbolSize = 50
    constructor(private readonly rows: number) {
        super()
        /* this.addChild(new PIXI.Graphics().beginFill(0xffffff).drawCircle(0,0,5))  */

        this.container.y = -this.symbolSize * (rows - 1) / 2
        this.createMask()
        this.createSymbols(rows + 1)
    }
    start(speed = 1) {
        const ticker = PIXI.Ticker.shared
        ticker.autoStart = false
        let yOffset = (app.screen.height - this.container.children[0].y - this.symbolSize /* * this.rows */)
        ticker.add(() => {
            for (let i = this.container.children.length - 1; i >= 0; i--) {
                const symbol = this.container.children[i]

                if (this.container.children[0].y + speed > app.screen.height - yOffset) {
                    this.container.children[0].destroy()
                    this.createSymbols()
                    /* ticker.stop() */
                }
                else {
                    symbol.y += speed
                }
            }

        })
        ticker.start()
    }
 
    stop() {
        PIXI.Ticker.shared.stop()
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
        for (let i = amount; i--;) {
            const sprite = this.container.addChild(this.getSprite())
            sprite.y = (i - 1) * this.symbolSize
        }
    }
}