export function getSounds() {
    return {
        BackgroundMusic: { src: 'assets/BackgroundMusic.mp3', looping: true, volume: 0.1 },
        sfx: [
            { src: 'assets/Click.mp3', looping: false, volume: 0.5 },
            { src: 'assets/ReelsSpin.mp3', looping: true, volume: 0.5 },
            { src: 'assets/ReelsSpinEnd.mp3', looping: false, volume: 1 },
            { src: 'assets/ReelsAllEnd.mp3', looping: false, volume: 1 },
            { src: 'assets/BigWin.mp3', looping: false, volume: 0.5 }
        ]
    }
}
export enum SFXDictionary {
    click = 0,
    reelsSpin = 1,
    reelsSpinEnd = 2,
    reelsAllEnd = 3,
    bigWin = 4
}
