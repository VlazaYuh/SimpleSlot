import * as PIXI from 'pixi.js'
import { Checkbox } from './Checkbox'
import { styles } from './textStyles'
import { SoundManager } from './SoundManager'
export class Options extends PIXI.Container {
    private container = this.addChild(new PIXI.Container())
    private menu: PIXI.Sprite
    private background: PIXI.Graphics
    constructor(width: number, height: number) {
        super()
        this.init(width, height)
        this.visible = false
        this.subscriptions()
    }
    private init(width: number, height: number) {
        this.background = this.container.addChild(new PIXI.Graphics().beginFill(0).drawRect(-width / 2, -height / 2, width, height).endFill())
        this.background.alpha = 0.5
        this.background.interactive = true
        this.menu = this.container.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/optionsMenu.png')))
        this.menu.anchor.set(0.5)
        const optionMusic = this.container.addChild(this.createOption('Music', value => SoundManager.muteMusic(!value), 0.5))
        optionMusic.position.set(25, -45)
        const optionSFX = this.container.addChild(this.createOption('Effects', value => SoundManager.muteSFX(!value), 0.5))
        optionSFX.position.set(25, -15)
    }
    private subscriptions() {
        this.background.on('pointerup', () => {
            this.visible = false
        })
    }
    private createOption(text: string, callback: (value: boolean) => void, scale: number = 1) {
        const checkboxContainer = this.container.addChild(new PIXI.Container())
        const checkbox = checkboxContainer.addChild(new Checkbox(true))
        checkbox.scale.set(scale)
        const checkboxText = checkboxContainer.addChild(new PIXI.Text(text, styles.menuStyle))
        checkboxText.x = -25
        checkboxText.anchor.set(1, 0.5)
        checkbox.on('check', (value) => {
            callback(value)
        })
        return checkboxContainer
    }
}