import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { Reels } from "./Reels"
import { getLinesDict } from "./linesDict"
import { getSpinResult } from "./spinResult"
import { delay, eventEmitter } from '.'
import { Emitter, EmitterConfigV3, upgradeConfig } from '@pixi/particle-emitter'
import { Event } from './Event'
import { data } from './Data'
export class Lines extends PIXI.Container {
    private timeLines: { [lineId: number]: gsap.core.Timeline } = {}
    private duration = 0.4
    private quickDuration = 0.1
    private drawOffset = 25
    constructor(private reels: Reels) {
        super()
        this.createTimeLines()
    }
    private createTimeLines() {
        const emitterConfig = upgradeConfig(PIXI.Loader.shared.resources["assets/particles.json"].data, PIXI.Texture.from("assets/star.png"))
        for (const lineId in getLinesDict()) {
            this.timeLines[+lineId] = this.getTimeLine(+lineId, emitterConfig)
        }
    }
    private getDistance(a: PIXI.Point, b: PIXI.Point) {
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2)
    }
    private getSymbolPosition(column: number, row: number) {
        return this.reels.getSymbol(column - 1, row).getGlobalPosition()
    }
    private getLineSegments(id: number) {
        let distance = this.drawOffset * 2
        const line = getLinesDict()[id]
        const segments: { duration: number; position: PIXI.Point; distance: number }[] = [this.getFirstSegment(line)]
        line.forEach((row: number, i: number) => {
            const column = i + 1
            const position = this.getSymbolPosition(column, row)
            const segmentDistance = this.getDistance(segments[i].position, position)
            distance += segmentDistance
            segments[i + 1] = { duration: 0, position, distance: segmentDistance }
        })
        const lastSegment = segments[segments.length - 1]
        const lastSegmentPosition = lastSegment.position.clone()
        lastSegmentPosition.x += this.drawOffset
        segments.push({ position: lastSegmentPosition, distance: this.getDistance(lastSegment.position, lastSegmentPosition), duration: 0 })
        segments.forEach((segment) => (segment.duration = (this.duration * segment.distance) / distance))
        return segments
    }
    private getTimeLine(lineId: number, emitterConfig: EmitterConfigV3) {
        const container = this.addChild(new PIXI.ParticleContainer(500))
        const emitter = new Emitter(container, emitterConfig)

        const segments = this.getLineSegments(lineId)
        const { x, y } = segments[0].position
        const fakeObject = { x, y }
        const timeLine = gsap.timeline({
            paused: true,
            onUpdate: () => {
                emitter.updateSpawnPos(fakeObject.x, fakeObject.y)
            },
            onStart: () => {
                emitter.autoUpdate = true
                emitter.playOnce(() => emitter.autoUpdate = false)
            },
            onComplete: () => {
                emitter.emit = false
                fakeObject.x = x
                fakeObject.y = y
                emitter.updateSpawnPos(x, y)
            },
        })
        for (const segment of segments) {
            const { position, duration } = segment
            if (duration === 0) {
                continue
            }
            const { x, y } = position
            timeLine.to(fakeObject, { x, y, duration })
        }
        return timeLine
    }
    async playLines(isQuick = false) {
        new Promise(resolve => { eventEmitter.on(Event.SkipAnimation, resolve) })
        const timeLines: gsap.core.Timeline[] = []
        const callback = () => {
            timeLines.forEach(timeline => timeline.duration(this.quickDuration))
        }
        eventEmitter.on(Event.SkipAnimation, callback)
        for (const { id } of getSpinResult().win.lines) {
            this.playLine(id, isQuick)
            timeLines.push(this.timeLines[id])
        }
        await Promise.all(timeLines)
        eventEmitter.off(Event.SkipAnimation, callback)
    }
    playLine(id: number, isQuick = false) {
        this.timeLines[id].duration(isQuick ? this.quickDuration : this.duration)
        this.timeLines[id].restart()
    }
    getFirstSegment(line: number[]) {
        const position = this.getSymbolPosition(1, line[0])
        position.x -= this.drawOffset
        return { duration: 0, position: position, distance: 0 }
    }
}
