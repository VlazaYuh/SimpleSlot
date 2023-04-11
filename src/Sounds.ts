export function getSounds() {
    return {
        BackgroundMusic: { src: 'assets/BackgroundMusic.mp3', looping: true, volume: 0.1 },
        sfx: {
            [SFXDictionary.Click]: { src: 'assets/Click.mp3', looping: false, volume: 0.5 },
            [SFXDictionary.ReelsSpin]: { src: 'assets/ReelsSpin.mp3', looping: true, volume: 0.5 },
            [SFXDictionary.ReelsSpinEnd]: { src: 'assets/ReelsSpinEnd.mp3', looping: false, volume: 1 },
            [SFXDictionary.ReelsAllEnd]: { src: 'assets/ReelsAllEnd.mp3', looping: false, volume: 1 },
            [SFXDictionary.BigWin]: { src: 'assets/BigWin.mp3', looping: false, volume: 0.5 }
        }
    }
}
export enum SFXDictionary {
    Click,
    ReelsSpin,
    ReelsSpinEnd,
    ReelsAllEnd,
    BigWin
}
