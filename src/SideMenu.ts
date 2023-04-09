import * as PIXI from 'pixi.js'
import { OptionsButton } from './OptionsButton'
import { SideMenuButton } from './SideMenuButton'
import { gsap } from 'gsap'
import { delay, eventEmitter } from '.'
import { Checkbox } from './Checkbox'
import { styles } from './textStyles'
import { SoundManager } from './SoundManager'
import { Options } from './Options'
import { Event } from './Event'
export class SideMenu extends PIXI.Container {
    private menuContainer = this.addChild(new PIXI.Container())
    private optionsButton: OptionsButton
    private closeSideMenuButton: SideMenuButton
    private openSideMenuButton: SideMenuButton
    private duration = 0.3
    private timeline: gsap.core.Timeline
    constructor() {
        super()
        this.addButtons()
        this.createTimeline()
        this.subscribe()
    }
    private createTimeline() {
        this.timeline = gsap.timeline()
        this.timeline.from(this.menuContainer, { x: 95, duration: this.duration }).pause()
    }
    private animate() {
        this.timeline.restart()
    }
    private unanimate() {
        this.timeline.reverse()
    }
    private addButtons() {
        const sprite = this.menuContainer.addChild(new PIXI.Sprite(PIXI.Texture.from('assets/sideMenu.png')))
        sprite.anchor.set(0.5)
        sprite.scale.set(0.33)
        this.closeSideMenuButton = this.menuContainer.addChild(new SideMenuButton())
        this.optionsButton = this.menuContainer.addChild(new OptionsButton())
        this.openSideMenuButton = this.addChild(new SideMenuButton())
        this.openSideMenuButton.angle = 180
        this.openSideMenuButton.position.set(20, -80)
        this.optionsButton.position.set(20, -45)
        this.closeSideMenuButton.position.set(-22, -80)
    }
    private subscribe() {
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
            eventEmitter.emit(Event.OptionsClicked)
        })
    }
}
