import * as PIXI from 'pixi.js'
import { Reel } from './Reel'
import { delay } from '.'
export class Reels extends PIXI.Container {
    private symbolSize = 50
    private rows = 5
    private reelsContainer = this.addChild(new PIXI.Container())
    constructor(numberOfReels: number) {
        super()
        this.reelsContainer.x = -this.symbolSize * (numberOfReels - 1) / 2
        for (let i = 0; i < numberOfReels; i++) {
            let reel = this.reelsContainer.addChild(new Reel(this.rows, this.symbolSize))
            reel.x = i * this.symbolSize
        }
    }
    start() {
/*         if (this.reelsContainer.children.every(element=>{(element as Reel).running===false})) {
        
        } */
        this.reelsContainer.children.forEach(element => { (element as Reel).start() })
    }
    async stop(reelsPosition: number[][]) {
        for (const reel of this.reelsContainer.children) {
            (reel as Reel).stop(reelsPosition.shift())
            await delay(200)
        }
    }
}