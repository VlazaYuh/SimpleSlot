import * as PIXI from 'pixi.js'
import { Reel } from './Reel'
import { delay } from '.'
import { SoundManager } from './SoundManager'
import { Sounds } from './Sounds'
import { Howl } from 'howler'
export class Reels extends PIXI.Container {
    private symbolSize = 50
    private _rows: number
    private _columns: number
    private reelsContainer = this.addChild(new PIXI.Container())
    private reelsSpinSound: Howl
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
    get columns() {
        return this._columns
    }
    start() {
        this.reelsContainer.children.forEach(element => { (element as Reel).start() })
        this.reelsSpinSound = SoundManager.playSound(Sounds.ReelsSpin, true, 0.5)
    }
    async stop(reelsPosition: number[][]) {
        let promiseArray: Array<Promise<void>> = []
        for (const reel of this.reelsContainer.children) {
            promiseArray.push((reel as Reel).stop(reelsPosition.shift()))
            await delay(200)
        }
        await Promise.all(promiseArray)
        this.reelsSpinSound.stop()
        SoundManager.playSound(Sounds.ReelsAllEnd, false, 1) 
        /* this.checkForWin() */
    }
    getSymbol(column: number, row: number) {
        return (this.reelsContainer.children[column] as Reel).getSymbol(row)
    }
}