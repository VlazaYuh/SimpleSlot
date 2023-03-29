import * as PIXI from 'pixi.js'
import { Howl, Howler } from 'howler'
export class SoundManager {
    static playSound(index: string, looping = false, volume = 1) {
        let howl = new Howl({
            src: index,
            volume: volume,
            loop: looping
        })
        howl.play()
        return howl
    }
}