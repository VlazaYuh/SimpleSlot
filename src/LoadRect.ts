import * as PIXI from 'pixi.js'
export class LoadRect extends PIXI.Graphics {
    private appheight: number
    private appwidth: number
    constructor(width: number, height: number) {
        super()
        this.appheight = height
        this.appwidth = width
    }
    drawRectProgress(progress:number) {
        this.beginFill(0xFFFFFF)
        this.drawRect(this.appwidth / 8, this.appheight / 2, (this.appwidth - this.appwidth / 8 * 2) / 100 * progress, 50)
        this.endFill()
    }
}