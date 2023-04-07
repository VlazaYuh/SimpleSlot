import * as PIXI from 'pixi.js'

import { OptionsButton } from './OptionsButton'
import { SideMenuButton } from './SideMenuButton'
import { gsap } from 'gsap'
import { delay } from '.'
import { Checkbox } from './Checkbox'
import { styles } from './textStyles'
import { SoundManager } from './SoundManager'
export class SideMenu extends PIXI.Container {
    private menuContainer = this.addChild(new PIXI.Container())
    private optionsButton: OptionsButton
    private closeSideMenuButton: SideMenuButton
    private openSideMenuButton: SideMenuButton
    private duration = 0.3
    private timeline: gsap.core.Timeline
    private checkboxBackgroundMusic: Checkbox
    private checkboxSFXMusic: Checkbox
    private backToMenu: SideMenuButton
    private checkboxBackgroundMusicText: PIXI.Text
    private checkboxSFXText: PIXI.Text
    private optionsText: PIXI.Text
    constructor() {
        super()
        this.buttonPlacement()
        this.createTimeline()
        this.closeSideMenuButton.on('pointerup', async () => {
            this.unanimate()
            await delay(this.duration * 1000)
            this.openSideMenuButton.visible = true
        })
        this.openSideMenuButton.on('pointerup', () => {
            this.animate()
            this.openSideMenuButton.visible = false
        })
        this.optionsButton.on('pointerup', () => {
            this.closeSideMenuButton.visible = false
            this.optionsButton.visible = false
            this.checkboxSFXMusic.visible = true
            this.checkboxBackgroundMusic.visible = true
            this.checkboxSFXText.visible = true
            this.checkboxBackgroundMusicText.visible = true
            this.optionsText.visible = false
        })
        this.backToMenu.on('pointerup', () => {
            this.closeSideMenuButton.visible = true
            this.optionsButton.visible = true
            this.checkboxSFXMusic.visible = false
            this.checkboxBackgroundMusic.visible = false
            this.checkboxSFXText.visible = false
            this.checkboxBackgroundMusicText.visible = false
            this.optionsText.visible = true
        })
        this.checkboxBackgroundMusic.on('pointerup', () => {
            SoundManager.muteBackgroundMusic(!this.checkboxBackgroundMusic.checkVisible)
        })
        this.checkboxSFXMusic.on('pointerup', () => {
            SoundManager.muteSFX(!this.checkboxSFXMusic.checkVisible)
        })
    }
    private createTimeline() {
        this.timeline = gsap.timeline()
        this.timeline.from(this.menuContainer, { x: this.x + 95, duration: this.duration }).pause()
    }
    private animate() {
        this.timeline.restart()
    }
    private unanimate() {
        this.timeline.reverse()
    }
    private buttonPlacement() {
        const sprite = this.menuContainer.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/sideMenu.png')))
        sprite.anchor.set(0.5)
        sprite.scale.set(0.33)
        this.checkboxSFXText = this.menuContainer.addChild(new PIXI.Text('SFX', styles.menuStyle))
        this.checkboxBackgroundMusicText = this.menuContainer.addChild(new PIXI.Text('Background\n   Music', styles.menuStyle))
        this.optionsText = this.menuContainer.addChild(new PIXI.Text('Options', styles.menuStyle))
        this.optionsText.position.set(-35, -50)
        this.checkboxBackgroundMusicText.position.set(-40, -55)
        this.checkboxSFXText.position.set(-25, -20)
        this.checkboxBackgroundMusic = this.menuContainer.addChild(new Checkbox(true))
        this.checkboxSFXMusic = this.menuContainer.addChild(new Checkbox(true))
        this.checkboxSFXMusic.scale.set(0.5)
        this.checkboxBackgroundMusic.scale.set(0.5)
        this.checkboxBackgroundMusic.position.set(25, -45)
        this.checkboxSFXMusic.position.set(25, -15)
        this.checkboxSFXMusic.visible = false
        this.checkboxBackgroundMusic.visible = false
        this.checkboxSFXText.visible = false
        this.checkboxBackgroundMusicText.visible = false
        this.backToMenu = this.menuContainer.addChild(new SideMenuButton())
        this.closeSideMenuButton = this.menuContainer.addChild(new SideMenuButton())
        this.optionsButton = this.menuContainer.addChild(new OptionsButton())
        this.openSideMenuButton = this.addChild(new SideMenuButton())
        this.openSideMenuButton.angle = 180
        this.openSideMenuButton.position.set(20, -80)
        this.optionsButton.position.set(20, -45)
        this.closeSideMenuButton.position.set(-22, -80)
        this.backToMenu.position.set(-22, -80)
    }
}
//x=925
