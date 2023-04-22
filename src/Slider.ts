import * as PIXI from 'pixi.js'
export class Slider extends PIXI.Container {
    private slider: PIXI.Graphics
    private handle: PIXI.Graphics
    private sliderWidth: number
    private maxValue: number
    private sliderTarget: number
    constructor(sliderWidth: number, sliderTarget: number, maxValue: number) {
        super()
        this.sliderTarget = sliderTarget
        this.maxValue = maxValue
        this.sliderWidth = sliderWidth
        this.init(sliderWidth, sliderTarget, maxValue)
        this.subscribtions()
    }
    private init(sliderWidth: number, sliderTarget: number, maxValue: number) {
        this.slider = this.addChild(new PIXI.Graphics())
            .beginFill(0x272d37)
            .drawRect(0, 0, sliderWidth, 4)
        this.slider.interactive = true
        this.handle = this.addChild(new PIXI.Graphics())
            .beginFill(0xffffff)
            .drawCircle(0, 0, 8)
        this.handle.y = this.slider.height / 2
        this.handle.x = sliderTarget / maxValue * sliderWidth
        this.handle.interactive = true
        this.handle.cursor = 'pointer'
    }
    private subscribtions() {
        this.handle
            .on('pointerdown', () => {
                this.slider.interactive = true
                this.slider.addListener('pointermove', this.onDrag)
            })
            .on('pointerup', () => {
                this.slider.interactive = false
                this.slider.removeListener('pointermove', this.onDrag)
            })
            .on('pointerupoutside', () => {
                this.slider.interactive = false
                this.slider.removeListener('pointermove', this.onDrag)
            })
    }
    private onDrag = (e: PIXI.InteractionEvent) => {
        this.emit('slidermovement', this.sliderTarget)
        this.handle.x = Math.max(0, Math.min(
            this.slider.toLocal(e.data.global).x,
            this.slider.width
        ))
        const t = this.handle.x / this.sliderWidth
        this.sliderTarget = this.maxValue * t
    }
}