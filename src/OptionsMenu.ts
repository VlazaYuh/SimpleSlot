import * as PIXI from 'pixi.js'
import { OptionsButton } from './OptionsButton'
import { SideMenuButton } from './SideMenuButton'
import { gsap } from 'gsap'
import { delay } from '.'
import { Checkbox } from './Checkbox'
import { styles } from './textStyles'
import { SoundManager } from './SoundManager'
export class OptionsMenu extends PIXI.Container {
    private container = this.addChild(new PIXI.Container())
    private checkboxBackgroundMusic: Checkbox
    private checkboxSFXMusic: Checkbox
    private checkboxBackgroundMusicText: PIXI.Text
    private checkboxSFXText: PIXI.Text
    private menu: PIXI.Sprite
    private background:PIXI.Graphics
    constructor(width: number, height: number) {
        super()
        this.init(width, height)
        this.visible = false
        this.subscriptions()
    }
    private init(width: number, height: number) {
        this.background = this.container.addChild(new PIXI.Graphics().beginFill(0x0000).drawRect(-width / 2, -height / 2, width, height).endFill())
        this.background.alpha = 0.5
        this.background.interactive=true
        this.menu = this.container.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/optionsMenu.png')))
        this.menu.anchor.set(0.5)
        this.checkboxSFXText = this.container.addChild(new PIXI.Text('Effects', styles.menuStyle))
        this.checkboxBackgroundMusicText = this.container.addChild(new PIXI.Text('Music', styles.menuStyle))
        this.checkboxBackgroundMusicText.position.set(-23, -48)
        this.checkboxSFXText.position.set(-25, -20)
        this.checkboxBackgroundMusic = this.container.addChild(new Checkbox(true))
        this.checkboxSFXMusic = this.container.addChild(new Checkbox(true))
        this.checkboxSFXMusic.scale.set(0.5)
        this.checkboxBackgroundMusic.scale.set(0.5)
        this.checkboxBackgroundMusic.position.set(25, -45)
        this.checkboxSFXMusic.position.set(25, -15)
    }
    private subscriptions() {
        this.checkboxBackgroundMusic.on('pointerup', () => {
            SoundManager.muteMusic(!this.checkboxBackgroundMusic.checkVisible)
        })
        this.checkboxSFXMusic.on('pointerup', () => {
            SoundManager.muteSFX(!this.checkboxSFXMusic.checkVisible)
        })
        this.background.on('pointerup', () => {
            this.visible=false
        })
    }
}