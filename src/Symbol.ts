import * as PIXI from 'pixi.js'
import { delay } from '.'
import { gsap } from 'gsap'
import { icons } from './icons'
export class Symbol extends PIXI.Sprite {
    private _id!: number
    constructor(id = Math.floor(Math.random() * icons.length)) {
        super()
        this.id = id
    }
    async animate(animationName: string) {
        if (animationName === 'win') {
            this.tint = 0xFFFFFF
            await gsap.fromTo(this, { rotation: -Math.PI * 6 }, { rotation: 0, duration: 2, x: this.x })
        }
        if (animationName === 'lose') {
            this.tint = 0x818181
            await delay(2000)
            this.tint = 0xFFFFFF
        }
    }
    set id(value: number) {
        if (value === this._id) {
            return
        }
        if (value < 0 || value >= icons.length) {
            throw 'wrong symbol id'
        }
        this._id = value
        this.texture = PIXI.Texture.from(icons[value])
        this.anchor.set(0.5)
    }
    get id() {
        return this._id
    }
}