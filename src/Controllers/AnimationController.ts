import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { Reels } from "../Reels"
import { State } from "../State"
import { getLinesDict } from "../linesDict"
import { getSpinResult } from "../spinResult"
import { Controller } from "./Controller"
import { app, delay } from '..'
import { Emitter, upgradeConfig } from '@pixi/particle-emitter'
import { Lines } from '../Lines'
window.gsap = gsap
export class AnimationController extends Controller {
    private emmiters: Array<Emitter> = []
    private reels: Reels
    private particleContainer: PIXI.ParticleContainer
    private linesAnim: Lines
    constructor(reels: Reels, lineAnim: Lines) {
        super()
        this.reels = reels
        this.linesAnim = lineAnim
    }
    protected async stateChangeCallback(state: State): Promise<void> {
        if (state === State.Animation) {
            const promiseArray: Promise<void>[] = []
            for (let column = 0; column < this.reels.columns; column++) {
                for (let row = 1; row <= this.reels.rows; row++) {
                    promiseArray.push(this.reels.getSymbol(column, row).animate(this.isWinSymbol(row, column) ? 'win' : 'lose'))
                }
            }
            this.linesAnim.playLines()
            await Promise.all(promiseArray)
        }
        this.stateCompleted()
    }
    private isWinSymbol(row: number, column: number) {
        return getSpinResult().win.lines.some(line => getLinesDict()[line.id][column] === row && line.reels.includes(column))
    }
}