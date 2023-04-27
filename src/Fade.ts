import * as PIXI from 'pixi.js'
import { eventEmitter } from '.'
import { Event } from './Event'
export class Fade extends PIXI.Container {
    private background: PIXI.Graphics
    constructor(width: number, height: number) {
        super()
        this.visible = false
        this.background = this.addChild(new PIXI.Graphics().beginFill(0, 0.5).drawRect(0, 0, width, height))
        this.background.interactive = true
        this.background.addListener('pointertap', () => {
            this.visible = false
            eventEmitter.emit(Event.CloseDialogs)
        })
        eventEmitter.on(Event.OpenFade, () => this.visible = true)
        eventEmitter.on(Event.CloseFade, () => this.visible = false)
    }
}