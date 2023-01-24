import * as PIXI from 'pixi.js'
import { Reel } from './Reel'
import { delay } from '.'
import { Symbol } from './Symbol'
export class Reels extends PIXI.Container {
    private symbolSize = 50
    private _rows = 5
    private reelsContainer = this.addChild(new PIXI.Container())
    constructor(numberOfReels: number) {
        super()
        this.reelsContainer.x = -this.symbolSize * (numberOfReels - 1) / 2
        for (let i = 0; i < numberOfReels; i++) {
            let reel = this.reelsContainer.addChild(new Reel(this._rows, this.symbolSize))
            reel.x = i * this.symbolSize
        }
    }
    get rows(){
        return this._rows
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
        /* this.checkForWin() */
    }
    allSymbolsTint() {
        this.reelsContainer.children.forEach(element => (element as Reel).symbolAnimate(false))
    }
    getSymbol(row: number, position: number) {
        return (this.reelsContainer.children[row] as Reel).getSymbol1(position)
    }
}