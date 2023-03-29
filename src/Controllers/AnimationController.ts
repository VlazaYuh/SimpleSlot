import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { Reels } from "../Reels"
import { State } from "../State"
import { getLinesDict } from "../linesDict"
import { getSpinResult } from "../spinResult"
import { Controller } from "./Controller"
import { Lines } from '../Lines'
import { BigWinAnimation } from '../BigWinAnimation'

window.gsap = gsap
export class AnimationController extends Controller {
    private reels: Reels
    private linesAnim: Lines
    private bigWinAnim: BigWinAnimation
    constructor(reels: Reels, lineAnim: Lines, bigWinAnim: BigWinAnimation) {
        super()
        this.reels = reels
        this.linesAnim = lineAnim
        this.bigWinAnim = bigWinAnim
    }
    protected async stateChangeCallback(state: State): Promise<void> {
        if (state === State.Animation) {
            await this.linesAnim.playLines()
            const promiseArray: Promise<void>[] = []
            for (let column = 0; column < this.reels.columns; column++) {
                for (let row = 1; row <= this.reels.rows; row++) {
                    promiseArray.push(this.reels.getSymbol(column, row).animate(this.isWinSymbol(row, column) ? 'win' : 'lose'))
                }
            }
            const spinResultWinSum = getSpinResult().win.sum
            await Promise.all(promiseArray)
            if (spinResultWinSum >= 30) {
                await this.bigWinAnim.animate(spinResultWinSum >= 100 ? 'super' : spinResultWinSum >= 60 ? 'mega' : 'big', getSpinResult().win.sum)
            }
            await Promise.all(promiseArray)
        }
        this.stateCompleted()
    }
    private isWinSymbol(row: number, column: number) {
        return getSpinResult().win.lines.some(line => getLinesDict()[line.id][column] === row && line.reels.includes(column))
    }
}