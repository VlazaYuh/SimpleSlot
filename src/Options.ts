import * as PIXI from 'pixi.js'
import { Checkbox } from './Checkbox'
import { textStyles } from './textStyles'
import { SoundManager } from './SoundManager'
import { eventEmitter } from '.'
import { Event } from './Event'
export class Options extends PIXI.Container {
    private container = this.addChild(new PIXI.Container())
    constructor() {
        super()
        this.init()
        this.visible = false
    }
    private init() {
        const menu = this.container.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/optionsMenu.png')))
        menu.anchor.set(0.5)
        menu.interactive = true
        const optionMusic = this.container.addChild(this.createOption('Music', value => SoundManager.muteMusic(!value), 0.5))
        optionMusic.position.set(25, -45)
        const optionSFX = this.container.addChild(this.createOption('Effects', value => SoundManager.muteSFX(!value), 0.5))
        optionSFX.position.set(25, -15)
        eventEmitter.on(Event.CloseDialogs, () => this.visible = false)
    }
    private createOption(text: string, callback: (value: boolean) => void, scale: number = 1) {
        const checkboxContainer = new PIXI.Container()
        const checkbox = checkboxContainer.addChild(new Checkbox(true))
        checkbox.scale.set(scale)
        const checkboxText = checkboxContainer.addChild(new PIXI.Text(text, textStyles.menuStyle))
        checkboxText.x = -25
        checkboxText.anchor.set(1, 0.5)
        checkbox.on('check', (value) => {
            callback(value)
        })
        return checkboxContainer
    }
}