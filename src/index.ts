import * as PIXI from 'pixi.js'
import { Reel } from './Reel'
import { Reels } from './Reels'
export const app = new PIXI.Application({ sharedTicker: true, sharedLoader: true, /* backgroundColor: 1099 */ })
document.body.appendChild(app.view)
function init() {
    const reels = window.reels = app.stage.addChild(new Reels(5))
    reels.position.set(app.screen.width / 2, app.screen.height / 2)
    const button = new PIXI.Graphics()
    button.beginFill(0x660000, 1)
    button.drawRect(app.screen.width / 2 + 100 - 50, 50 * 5 * 2, 50, 20)
    button.interactive = true
    button.cursor = 'pointer'
    button.addListener('pointerdown', () => {
        reels.start()
    })
    app.stage.addChild(button)
    const button2 = new PIXI.Graphics()
    button2.beginFill(0x660000, 1)
    button2.drawRect(app.screen.width / 2 - 100, 50 * 5 * 2, 50, 20)
    button2.interactive = true
    button2.cursor = 'pointer'
    button2.addListener('pointerdown', () => {
        reels.stop([[0, 1, 2, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4], [0, 1, 2, 3, 4]])
    })
    app.stage.addChild(button2)
}
PIXI.Loader.shared.add('assets/fruits.json')
PIXI.Loader.shared.load(init)
export function delay(timeMS: number) {
    return new Promise<void>(resolve => {
        PIXI.Ticker.shared.add(() => {
            timeMS -= PIXI.Ticker.shared.deltaMS
            if (timeMS <= 0) {
                resolve()
            }
        })
    })
}
