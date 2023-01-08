import * as PIXI from 'pixi.js'
import { icons } from './icons'
export class Reel extends PIXI.Container {
    private container = this.addChild(new PIXI.Container())
    private speed = 3
    private symbolSize = 50
    private running = false
    private stopping: boolean
    private yOffset: number
    private containerOffset: number
    private queue: Array<number> = []
    private moveContainer = (delta: number) => {
        if (this.container.y + delta * this.speed >= this.containerOffset + this.symbolSize) {
            let symbol: number
            this.container.y -= this.symbolSize - delta * this.speed
            this.container.children.forEach((child) => child.y += this.symbolSize /* + delta * this.speed */)
            this.container.children[0].destroy()
            if (this.queue) {
                symbol = this.queue.pop()
                this.createSymbols(1, symbol)
            }
            else {
                this.createSymbols()
            }
            if (this.stopping && this.container.children[0].y >= this.yOffset - this.symbolSize && symbol == undefined && this.queue.length === 0) {
                this.running = false
                this.stopping = false
                PIXI.Ticker.shared.remove(this.moveContainer)
            }
        }
        else {
            this.container.y += delta * this.speed
        }
    }
    constructor(private readonly rows: number) {
        super()
        /* this.addChild(new PIXI.Graphics().beginFill(0xffffff).drawCircle(0,0,5))  */
        this.container.y = -this.symbolSize * (rows - 1) / 2
        this.containerOffset = this.container.y
        this.createMask()
        this.createSymbols(rows + 1)
        this.yOffset = (this.symbolSize * rows)
    }
    start() {
        if (this.running) {
            return
        }
        PIXI.Ticker.shared.add(this.moveContainer)
        this.running = true
        this.stopping = false
    }
    async stop(id?: Array<number>) {
        if (id) {
            if (id.length === icons.length) {
                if (id.every(elem => elem >= 0 && elem < icons.length)) {
                    this.queue = id
                }
                else {
                    throw 'Non valid array'
                }
            }
        }
        this.stopping = true
    }
    private getSprite(id = Math.floor(Math.random() * icons.length)) {
        const sprite = PIXI.Sprite.from(icons[id])
        sprite.anchor.set(0.5)
        return sprite
    }
    private createMask() {
        const mask = new PIXI.Graphics()
        mask.beginFill(0, 0)
        mask.drawRect(-this.symbolSize / 2, -this.symbolSize * this.rows / 2, this.symbolSize, this.symbolSize * this.rows)
        this.container.mask = mask
        this.addChild(mask)
    }
    private createSymbols(amount = 1, id?: number) {
        while (amount--) {
            const sprite = this.container.addChild(this.getSprite(id))
            sprite.y = (amount - 1) * this.symbolSize
        }
    }
}