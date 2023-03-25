import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { delay } from '.'
import { styles } from './textStyles'
import { getSpinResult } from './spinResult'

export class BigWinAnimation extends PIXI.Container {
    text: PIXI.Text
    stakeText: PIXI.Text
    duration = 2
    constructor() {
        super()
        this.text = this.addChild(new PIXI.Text('WinTemp'))
        this.text.style = styles.winStyle
        this.text.anchor.set(0.5)
        this.stakeText = this.addChild(new PIXI.Text(`${getSpinResult().win.sum}`))
        this.stakeText.style = styles.winStakeStyle
        this.stakeText.anchor.set(0.5)
        this.visible = false
    }
    async animate() {
        if (getSpinResult().win.sum >= 30) {
            this.checkWhichWin()
            this.visible = true
            gsap.from(this.text, { x: 0, y: -30, duration: this.duration })
            gsap.from(this.text.scale, { x: 0, y: 0, duration: this.duration })
            gsap.fromTo(this.stakeText, { x: 0, y: 40, duration: this.duration }, { x: 0, y: 70, duration: this.duration })
            gsap.fromTo(this.stakeText.scale, { x: 0, y: 0, duration: this.duration }, { x: 1, y: 1, duration: this.duration })
            await delay(this.duration * 1000)
            this.visible = false
        }
    }
    checkWhichWin() {
        const sum = getSpinResult().win.sum
        this.stakeText.text = `${sum}`
        if (sum >= 30) {
            this.text.text = 'Big Win'
            if (sum >= 50) {
                this.text.text = 'Mega Win'
                if (sum >= 100) {
                    this.text.text = 'Super Win'
                }
            }
        }
    }
}