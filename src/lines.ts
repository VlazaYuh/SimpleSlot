import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { Reels } from "./Reels"
import { getLinesDict } from "./linesDict"
import { getSpinResult } from "./spinResult"
import { app } from '.'
import { Emitter, upgradeConfig } from '@pixi/particle-emitter'
export class Lines extends PIXI.Container {
    private particleContainer: PIXI.ParticleContainer
    private emmiters: Array<Emitter> = []
    private reels: Reels
    private emitterXY = {
        x: 0,
        y: 0
    }
    constructor(reels: Reels) {
        super()
        this.reels = reels
        this.particleContainer = this.addChild(new PIXI.ParticleContainer(this.reels.rows * 500))
        for (let i = 0; i < getLinesDict().length; i++) {
            this.emmiters.push(new Emitter(this.particleContainer, upgradeConfig(PIXI.Loader.shared.resources['assets/particles.json'].data, PIXI.Texture.from('assets/Snow50px.png'))))
        }
    }
    async playLines() {
        let pifagor: Array<number[]> = []
        let coordinates: Array<PIXI.IPointData[]> = []
        let pifagorSum: number[] = []
        let ratios: Array<number[]> = []
        this.calculations(pifagor,coordinates)
        this.ratiosCalculations(pifagor,pifagorSum,ratios)
        this.animation(coordinates,ratios)
    }
    animation(coordinates: Array<PIXI.IPointData[]>,ratios: Array<number[]>){
        for (let i = 0; i < getSpinResult().win.lines.length; i++) {
            let timeline = gsap.timeline({
                onStart: () => { this.emitterXY.x = this.emmiters[i].spawnPos.x, this.emitterXY.y = this.emmiters[i].spawnPos.y, this.emmiters[i].autoUpdate = true },
                onUpdate: () => { this.emmiters[i].updateSpawnPos(this.emitterXY.x, this.emitterXY.y) },
                onComplete: () => { this.emmiters[i].autoUpdate = false, this.emmiters[i].cleanup() }
            })
            for (let i1 = 0; i1 < this.reels.rows - 1; i1++) {
                timeline.to(this.emitterXY, { x: coordinates[i][i1].x, y: coordinates[i][i1].y, duration: 0.5 * (this.reels.rows - 1) * ratios[i][i1] })
            }
        }
    }
    ratiosCalculations(pifagor: Array<number[]>,pifagorSum: number[],ratios: Array<number[]>){
        for (let i = 0; i < pifagor.length; i++) {
            pifagorSum.push(...[pifagor[i].reduce((a, b) => a + b, 0)])
            let tempArray: number[] = []
            for (let i2 = 0; i2 < this.reels.rows - 1; i2++) {
                tempArray.push(pifagor[i][i2] / pifagorSum[i])
                if (tempArray.length === this.reels.rows - 1) {
                    ratios.push(...[tempArray])
                }
            }
        }
    }
    calculations(pifagor: Array<number[]>,coordinates: Array<PIXI.IPointData[]>){
        for (let i1 = 0; i1 < getSpinResult().win.lines.length; i1++) {
            this.emmiters[i1].updateSpawnPos(this.reels.getSymbol(0, getLinesDict()[getSpinResult().win.lines[i1].id][0]).toGlobal(app.stage).x,
                this.reels.getSymbol(0, getLinesDict()[getSpinResult().win.lines[i1].id][0]).toGlobal(app.stage).y)
            let distance: number[] = []
            let tempArray: PIXI.IPointData[] = []
            for (let i = 1; i < getLinesDict()[getSpinResult().win.lines[i1].id].length; i++) {
                tempArray.push(this.reels.getSymbol(i, getLinesDict()[getSpinResult().win.lines[i1].id][i]).toGlobal(app.stage))
                distance.push(Math.sqrt(Math.pow(this.reels.getSymbol(i, getLinesDict()[getSpinResult().win.lines[i1].id][i]).toGlobal(app.stage).x - this.reels.getSymbol(i - 1, getLinesDict()[getSpinResult().win.lines[i1].id][i - 1]).toGlobal(app.stage).x, 2) + Math.pow(this.reels.getSymbol(i, getLinesDict()[getSpinResult().win.lines[i1].id][i]).toGlobal(app.stage).y - this.reels.getSymbol(i - 1, getLinesDict()[getSpinResult().win.lines[i1].id][i - 1]).toGlobal(app.stage).y, 2)))
                if (distance.length === this.reels.rows - 1) {
                    pifagor.push([...distance])
                    coordinates.push([...tempArray])
                    for (let i2 = 0; i < distance.length; i++) {
                        distance.shift()
                        tempArray.shift()
                    }
                }
            }
        }
    }
}
