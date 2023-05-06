import * as PIXI from 'pixi.js'
import { delay, eventEmitter } from '.'
import { gsap } from 'gsap'
import { icons } from './icons'
import { Event } from './Event'
export class Symbol extends PIXI.Sprite {
    private winAnimationDuration = 2
    private quickDuration = 0.5
    private _id!: number
    constructor(id = Math.floor(Math.random() * icons.length)) {
        super()
        this.id = id
    }
    async animate(animationName: string, isQuick = false) {
        const duration = isQuick ? this.quickDuration : this.winAnimationDuration
        if (animationName === 'win') {
            this.tint = 0xFFFFFF
            const animation = gsap.fromTo(
                this,
                { rotation: isQuick ? -Math.PI * 4 : -Math.PI * 8 },
                { rotation: 0, duration, ease: gsap.parseEase("M0,0,C0.218,-0.28,0.492,1,1,1") }
            )
            const callback = () => {
                animation.progress(1)
            }
            eventEmitter.on(Event.SkipAnimation, callback)
            await animation
            eventEmitter.off(Event.SkipAnimation, callback)
        }
        if (animationName === 'lose') {
            this.tint = 0x818181
            await Promise.race([delay(duration*1000),new Promise(resolve=>eventEmitter.on(Event.SkipAnimation,resolve))])
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