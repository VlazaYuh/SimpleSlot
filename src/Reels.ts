import * as PIXI from 'pixi.js'
import { Reel } from './Reel'
import { delay, eventEmitter } from '.'
import { SoundManager } from './SoundManager'
import { SFXDictionary } from './Sounds'
import { Howl } from 'howler'
import { Event } from './Event'
export class Reels extends PIXI.Container {
    private symbolSize = 50
    private _rows: number
    private _columns: number
    private reelsContainer = this.addChild(new PIXI.Container())
    private reelsSpinSound: Howl
    constructor(numberOfRows: number, numberOfReels: number, reelsPosition?: number[][]) {
        super()
        this._rows = numberOfRows
        this._columns = numberOfReels
        this.reelsContainer.x = -this.symbolSize * (this._columns - 1) / 2
        for (let i = 0; i < numberOfReels; i++) {
            let tempArray: number[] = []
            if (reelsPosition) {
                for (let i = 0; i < reelsPosition.length; i++) {
                    tempArray.push(reelsPosition[i].shift())
                }
            }
            let reel = this.reelsContainer.addChild(new Reel(this._rows, this.symbolSize, tempArray))
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
        this.reelsSpinSound = SoundManager.playSFX(SFXDictionary.ReelsSpin)
    }
    async stop(reelsPosition: number[][], isQuick = false) {
        const quickPromise = isQuick ? Promise.resolve : new Promise(resolve => {
            eventEmitter.on(Event.SkipAnimation, resolve)

        })
        let promiseArray: Array<Promise<void>> = []
        for (const reel of this.reelsContainer.children) {
            promiseArray.push((reel as Reel).stop(reelsPosition.shift()))
            await Promise.race([delay(200), quickPromise])
        }
        await Promise.all(promiseArray)
        this.reelsSpinSound.stop()
        SoundManager.playSFX(SFXDictionary.ReelsAllEnd)
    }
    getSymbol(column: number, row: number) {
        return (this.reelsContainer.children[column] as Reel).getSymbol(row)
    }
}