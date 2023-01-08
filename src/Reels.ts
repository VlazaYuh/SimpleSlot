import * as PIXI from 'pixi.js'
import { Reel } from './Reel'
export class Reels extends PIXI.Container {
    private symbolSize = 50
    private rows = 5
    private reelsContainer = this.addChild(new PIXI.Container())
    constructor(numberOfReels: number) {
        super()
        this.reelsContainer.x=-this.symbolSize*(numberOfReels-1)/2
        for (let i = 0; i < numberOfReels; i++) {
            let reel = this.reelsContainer.addChild(new Reel(this.rows, this.symbolSize))
            reel.x = i*this.symbolSize
        }
    }
    start() {
        this.reelsContainer.children.forEach(element => { (element as Reel).start() })
    }
    stop(reelsPosition: number[][]) {
        this.reelsContainer.children.forEach(element => { (element as Reel).stop(reelsPosition.shift()) })
    }
}