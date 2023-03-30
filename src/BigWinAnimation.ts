import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { delay } from '.'
import { styles } from './textStyles'

export class BigWinAnimation extends PIXI.Container {
    private timeline: gsap.core.Timeline
    private text: PIXI.Text
    private stakeText: PIXI.Text
    private duration = 2
    private fadeDuration = 0.5
    constructor() {
        super()
        this.text = this.addChild(new PIXI.Text('WinTemp'))
        this.text.style = styles.winStyle
        this.text.anchor.set(0.5)
        this.stakeText = this.addChild(new PIXI.Text(`StakeTemp`))
        this.stakeText.style = styles.winStakeStyle
        this.stakeText.anchor.set(0.5)
        this.visible = false
    }
    async animate(win: 'big' | 'super' | 'mega', sum: number) {
        this.text.text = win === 'big' ? 'Big Win' : win === 'mega' ? 'Mega Win' : 'Super Win'
        this.text.alpha = 1
        this.stakeText.alpha = 1
        this.stakeText.text = `${sum}`
        this.visible = true
        this.createTimeline()
        this.timeline.repeat()
        await delay((this.duration + this.fadeDuration) * 1000)
    }
    private createTimeline() {
        this.timeline = gsap.timeline()
        this.timeline.from(this.text, { x: 0, y: -30, duration: this.duration }, 0)
        this.timeline.from(this.text.scale, { x: 0, y: 0, duration: this.duration }, 0)
        this.timeline.fromTo(this.stakeText, { x: 0, y: 40, duration: this.duration }, { x: 0, y: 70, duration: this.duration }, 0)
        this.timeline.fromTo(this.stakeText.scale, { x: 0, y: 0, duration: this.duration }, { x: 1, y: 1, duration: this.duration }, 0)
        this.timeline.to(this.text, { alpha: 0, duration: this.fadeDuration })
        this.timeline.to(this.stakeText, { alpha: 0, duration: this.fadeDuration }, 2)
    }
}