import { Howl, Howler } from 'howler'
import { getSounds } from './Sounds'
export class SoundManager {
    private static backgroundMusic: Howl
    private static sfxArray: Howl[] = []
    static {
        this.backgroundMusic = new Howl({
            src: getSounds().BackgroundMusic.src,
            volume: getSounds().BackgroundMusic.volume,
            loop: getSounds().BackgroundMusic.looping
        })
        for (let i = 0; i < getSounds().sfx.length; i++) {
            this.sfxArray.push(new Howl({
                src: getSounds().sfx[i].src,
                volume: getSounds().sfx[i].volume,
                loop: getSounds().sfx[i].looping
            }))
        }
    }
    static playSFXSound(index: number) {
        this.sfxArray[index].play()
        return this.sfxArray[index]
    }
    static playBackgroundMusic() {
        this.backgroundMusic.play()
    }
    static muteSFX(muted: boolean) {
        this.sfxArray.forEach((howl) => howl.mute(muted))
    }
    static muteBackgroundMusic(muted: boolean) {
        this.backgroundMusic.mute(muted)
    }
}