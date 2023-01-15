import * as PIXI from 'pixi.js'
import { delay } from '.'
import { gsap } from 'gsap'
import { icons } from './icons'
export class Symbol extends PIXI.Sprite {
      async animate(WinOrLose:boolean) {
        if (WinOrLose === true) {
            let tween = /* await */ gsap.to(this, { rotation: 25, duration: 2, x: this.x })
            /* tween.reverse() */
        }
        if (WinOrLose === false) {
            this.tint =  0x818181
            await delay(2000)
            this.tint = 0xFFFFFF 
        }
    } 
    constructor(id = Math.floor(Math.random() * icons.length)) {
        super()
        this.texture = PIXI.Texture.from(icons[id])
        this.anchor.set(0.5)
    }
}