import * as PIXI from 'pixi.js'
import { icons } from './icons'
import { gsap } from 'gsap'
import { CustomEase } from "gsap/CustomEase"
gsap.registerPlugin(CustomEase)
export class Reel extends PIXI.Container {
    private container = this.addChild(new PIXI.Container())
    private speed = 5
    private symbolSize: number
    private running = false
    private stopping: boolean
    private yOffset: number
    private containerOffset: number
    private queue: Array<number> = []
    private animation = async () => {
        await gsap.to(this.container, {
            y: -50, ease: CustomEase.create
                ("custom", "M0,0 C0,0 0.254,0.456 0.356,0.614 0.418,0.71 0.582,1.021 0.68,1.06 0.752,1.088 0.797,1.066 0.882,1.048 1.018,1.018 1,1 1,1 "), duration: 0.5
        })
        this.container.children.forEach((child) => child.y += this.symbolSize)
        this.container.y = this.containerOffset
        this.container.children[0].destroy()
        this.createSymbols() 

    }
    private moveContainer = (delta: number) => {
        while (this.container.y + delta * this.speed >= this.containerOffset + this.symbolSize) {
            this.container.y -= this.symbolSize
            this.container.children.forEach((child) => child.y += this.symbolSize /* + delta * this.speed */)
            this.container.children[0].destroy()
            this.createSymbols()
            if (this.stopping && this.queue.length === 1) {
                this.running = false
                this.stopping = false
                PIXI.Ticker.shared.remove(this.moveContainer)
                this.container.y = this.containerOffset
                this.animation()
                return
            }
        }
        this.container.y += delta * this.speed
    }
    constructor(private readonly rows: number, symbolsize: number) {
        super()
        /* this.addChild(new PIXI.Graphics().beginFill(0xffffff).drawCircle(0,0,5))  */
        this.symbolSize = symbolsize
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
    stop(queue?: Array<number>) {
        if (this.stopping) {
            return
        }
        if (queue) {
            if (queue.length === icons.length) {
                if (queue.every(elem => elem >= 0 && elem < icons.length)) {
                    this.queue = queue
                    this.queue.unshift(Math.floor(Math.random() * icons.length))
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
    private createSymbols(amount = 1,) {
        while (amount--) {
            const sprite = this.container.addChild(this.getSprite(this.queue.pop()))
            sprite.y = (amount - 1) * this.symbolSize
        }
    }
}