import * as PIXI from 'pixi.js'
import { Reel } from './Reel'
import { delay } from '.'
import { Symbol } from './Symbol'
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
        this.reelsContainer.children.forEach(element => { (element as Reel).start() })
    }
    async stop(reelsPosition: number[][]) {
        let promiseArray: Array<Promise<void>> = []
        for (const reel of this.reelsContainer.children) {
            promiseArray.push((reel as Reel).stop(reelsPosition.shift()))
            await delay(200)
        }
        await Promise.all(promiseArray)
        this.checkForWin()
    }
    checkForWin() {
        let symbolsArray: string[] = []
        this.reelsContainer.children.forEach(reel => { symbolsArray.push((reel as Reel).checkForWin()) })
        if (symbolsArray.every(symbol => symbol === symbolsArray[0])) {
            this.reelsContainer.children.forEach(element => (element as Reel).symbolAnimate(true))
        } else {
            this.reelsContainer.children.forEach(element => (element as Reel).symbolAnimate(false))
        }

    }
}