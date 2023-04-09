import { Howl, Howler } from 'howler'
import { SFXDictionary, getSounds } from './Sounds'
export class SoundManager {
    private static backgroundMusic: Howl
    private static sfxArray: { [key in SFXDictionary]?: Howl } = {}
    static {
        this.backgroundMusic = new Howl({
            src: getSounds().BackgroundMusic.src,
            volume: getSounds().BackgroundMusic.volume,
            loop: getSounds().BackgroundMusic.looping
        })
        for (const key in getSounds().sfx) {
            this.sfxArray[key] = new Howl({
                src: getSounds().sfx[key].src,
                volume: getSounds().sfx[key].volume,
                loop: getSounds().sfx[key].looping
            })
        }
    }
    static playSFX(index: number) {
        this.sfxArray[index].play()
        return this.sfxArray[index]
    }
    static playMusic() {
        this.backgroundMusic.play()
    }
    static muteSFX(muted: boolean) {
        for (const key in getSounds().sfx) {
            this.sfxArray[key].mute(muted)
        }
    }
    static muteMusic(muted: boolean) {
        this.backgroundMusic.mute(muted)
    }
}