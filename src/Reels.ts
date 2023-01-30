import * as PIXI from 'pixi.js'
import { Reel } from './Reel'
import { delay } from '.'
import { Symbol } from './Symbol'
export class Reels extends PIXI.Container {
    private symbolSize = 50
    private _rows: number
    private _columns: number
    private reelsContainer = this.addChild(new PIXI.Container())
    constructor(numberOfRows: number, numberOfReels: number) {
        super()
        this._rows = numberOfRows
        this._columns = numberOfReels
        this.reelsContainer.x = -this.symbolSize * (this._columns - 1) / 2
        for (let i = 0; i < numberOfReels; i++) {
            let reel = this.reelsContainer.addChild(new Reel(this._rows, this.symbolSize))
            reel.x = i * this.symbolSize
        }
    }
    get rows() {
        return this._rows
    }
    get columns(){
        return this._columns
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
    getSymbol(position: number, line: number) {
        return (this.reelsContainer.children[position] as Reel).getSymbol(line)
    }
}