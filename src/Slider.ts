import * as PIXI from 'pixi.js'
export class Slider extends PIXI.Container {
    private slider: PIXI.Graphics
    private handle: PIXI.Graphics
    private sliderWidth: number
    constructor(sliderWidth: number) {
        super()
        this.sliderWidth = sliderWidth
        this.initElements()
        this.subscribtions()
    }
    private initElements() {
        this.slider = this.addChild(new PIXI.Graphics())
            .beginFill(0x272d37)
            .drawRect(0, -2, this.sliderWidth, 4)
        this.slider.interactive = true
        this.slider.buttonMode = true
        this.handle = this.slider.addChild(new PIXI.Graphics())
            .beginFill(0xffffff)
            .drawCircle(0, 0, 8)
    }
    private subscribtions() {
        this.slider
            .on('pointerdown', (e) => {
                this.slider.addListener('pointermove', this.onDrag)
                this.onDrag(e)
            })
            .on('pointerup', () => {
                this.slider.removeListener('pointermove', this.onDrag)
            })
            .on('pointerupoutside', () => {
                this.slider.removeListener('pointermove', this.onDrag)
            })
    }
    private onDrag = (e: PIXI.InteractionEvent) => {
        const newX = this.slider.toLocal(e.data.global).x
        if (this.handle.x !== newX) {

            this.handle.x = Math.max(0, Math.min(
                this.slider.toLocal(e.data.global).x,
                this.sliderWidth
            ))
            const t = this.handle.x / this.sliderWidth
            this.emit('slidermovement', t)
        }
    }

}