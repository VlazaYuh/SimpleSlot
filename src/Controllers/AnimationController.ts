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
    private particleContainer:PIXI.ParticleContainer 
    private linesAnim:Lines
    constructor(reels: Reels,lineAnim:Lines) {
        super()
        this.reels = reels
        this.linesAnim=lineAnim
        this.particleContainer=new PIXI.ParticleContainer(this.reels.rows*500)
        app.stage.addChild(this.particleContainer)
        for (let i = 0; i < reels.rows; i++) {
            this.emmiters.push(new Emitter(this.particleContainer, upgradeConfig(PIXI.Loader.shared.resources['assets/particles.json'].data, PIXI.Texture.from('assets/Snow50px.png'))))
        }
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
    private async playLines1(line: number[]) {
        const promiseArray: Promise<void>[] = []
        for (let i1 = 0; i1 < line.length; i1++) {
            this.emmiters[i1].autoUpdate = true
            this.emmiters[i1].updateSpawnPos(this.reels.getSymbol(0, getLinesDict()[line[i1]][0]).toGlobal(app.stage).x,
                this.reels.getSymbol(0, getLinesDict()[line[i1]][0]).toGlobal(app.stage).y)
            for (let i = 0; i < getLinesDict()[line[i1]].length; i++) {
                this.reels.getSymbol(i, getLinesDict()[line[i1]][i]).toGlobal(app.stage) //имплементировать движение
            }
        }
        await Promise.all(promiseArray)
        await delay(500)
        this.emmiters.forEach(emmiter=>{
            emmiter.autoUpdate=false
            emmiter.cleanup()
        })
    }
}