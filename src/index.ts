import * as PIXI from 'pixi.js'
import { Reel } from './Reel'
const app = new PIXI.Application({ sharedTicker: true, sharedLoader: true, /* backgroundColor: 1099 */})
document.body.appendChild(app.view)
function init() {
    const reel = window.reel = app.stage.addChild(new Reel(5))
    reel.position.set(app.screen.width / 2, app.screen.height / 2)
}
PIXI.Loader.shared.add('assets/fruits.json')
PIXI.Loader.shared.load(init)
