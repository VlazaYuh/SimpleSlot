import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { Reels } from "./Reels"
import { getLinesDict } from "./linesDict"
import { getSpinResult } from "./spinResult"
import { app } from '.'
import { Emitter, upgradeConfig } from '@pixi/particle-emitter'
import { emitterXY } from './emitterXY'
export class Lines extends PIXI.Container {
    private particleContainer: PIXI.ParticleContainer
    private emmiters: Array<Emitter> = []
    private reels: Reels
    constructor(reels: Reels) {
        super()
        this.reels = reels
        this.particleContainer = this.addChild(new PIXI.ParticleContainer(this.reels.rows * 500))
        for (let i = 0; i < reels.rows; i++) {
            this.emmiters.push(new Emitter(this.particleContainer, upgradeConfig(PIXI.Loader.shared.resources['assets/particles.json'].data, PIXI.Texture.from('assets/Snow50px.png'))))
        }
    }
    async playLines() {
        let pifagor: Array<number[]> = []
        let coordinates: Array<PIXI.IPointData[]> = []
        let pifagorSum: number[] = []
        let ratios: Array<number[]> = []
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
        console.log(pifagor)
        console.log(pifagorSum)
        console.log(ratios)
        console.log(coordinates)
        for (let i = 0; i < getSpinResult().win.lines.length; i++) {
            let timeline = gsap.timeline({
                onStart: () => { emitterXY.x = this.emmiters[i].spawnPos.x, emitterXY.y = this.emmiters[i].spawnPos.y, this.emmiters[i].autoUpdate = true },
                onUpdate: () => { this.emmiters[i].updateSpawnPos(emitterXY.x, emitterXY.y) },
                onComplete: () => { this.emmiters[i].autoUpdate = false, this.emmiters[i].cleanup() }
            })
            for (let i1 = 0; i1 < this.reels.rows - 1; i1++) {
                timeline.to(emitterXY, { x: coordinates[i][i1].x, y: coordinates[i][i1].y, duration: 0.5 * (this.reels.rows - 1) * ratios[i][i1] })
            }
        }
    }
}
