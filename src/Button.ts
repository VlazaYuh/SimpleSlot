import * as PIXI from 'pixi.js'
import { SoundManager } from './SoundManager'
import { SFXDictionary } from './Sounds'

export abstract class Button extends PIXI.Container {
    protected filter = new PIXI.filters.ColorMatrixFilter()
    get disabled() {
        return this.disabled
    }
    set disabled(isOn: boolean) {
        this.interactive = !isOn
        this.onSetDisabled(isOn)
    }
    constructor() {
        super()
        this.filters = [this.filter]
        this.filter.brightness(1, false)
        this.buttonMode = true
        this.interactive = true
        this.on('pointerup', () => this.onPointerUp())
        this.on('pointerdown', () => this.onPointerDown())
        this.on('pointerover', () => this.onPointerOver())
        this.on('pointerout', () => this.onPointerOut())
        this.on('pointerupoutside', () => this.onPointerUpOutside())
    }
    protected onSetDisabled(isOn: boolean) {
        if (isOn) {
            this.filter.brightness(0.2, false)
        } else {
            this.filter.brightness(1, false)
        }
    }
    protected onPointerUp() {
        this.filter.brightness(1, false)
    }
    protected onPointerDown() {
        this.filter.brightness(0.5, false)
        SoundManager.playSFX(SFXDictionary.Click)
    }
    protected onPointerOver() {
        this.filter.brightness(2, false)
    }
    protected onPointerOut() {
        this.filter.brightness(1, false)
    }
    protected onPointerUpOutside() {
        this.filter.brightness(1, false)
    }
}

