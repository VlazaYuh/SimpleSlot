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
        for (const reel of this.reelsContainer.children) {
            (reel as Reel).stop(reelsPosition.shift())
            await delay(200)
        }
        await delay(200*(this.rows+1))
        this.checkForWin()
    }
    checkForWin() {
        let symbolsArray:string[]=[]
        this.reelsContainer.children.forEach(reel => { symbolsArray.push((reel as Reel).checkForWin()) })
        /* console.log(symbolsArray) */
        if(symbolsArray.every(symbol=>symbol===symbolsArray[0])){
            this.reelsContainer.children.forEach(element=>(element as Reel).winOrLose(true))
        }else{
            this.reelsContainer.children.forEach(element=>(element as Reel).winOrLose(false))
        }
        
    }
}