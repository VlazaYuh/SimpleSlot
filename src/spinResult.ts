import { delay } from "."
let index = 0
type TSpinResult = {
    table: number[][], balance: number, freeSpin: { isFreeSpin: boolean, freeSpins: number }, win?: {
        sum: number,
        lines: {
            id: number,
            reels: number[],
            sum: number,
        }[]
    }
}
const spinResultArray: TSpinResult[] = [
    {
        table: [
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4],
        ],
        balance: 100,
        freeSpin: { isFreeSpin: false, freeSpins: 0 },
        win: {
            sum: 50,
            lines: [
                { id: 7, reels: [0, 1, 2, 3, 4], sum: 10 },
                { id: 9, reels: [0, 1, 2, 3, 4], sum: 40 },
                { id: 2, reels: [0, 1, 2, 3, 4], sum: 40 }
            ]
        }
    },
    {
        table: [
            [4, 1, 3, 2, 3],
            [0, 4, 2, 0, 4],
            [4, 4, 4, 4, 4],
            [1, 0, 3, 4, 3],
            [3, 3, 2, 2, 4],
        ],
        balance: 150,
        freeSpin: { isFreeSpin: true, freeSpins: 4 },
        win: {
            sum: 50,
            lines: [
                { id: 7, reels: [0, 1, 2, 3, 4], sum: 10 },
                { id: 3, reels: [0, 1, 2, 3, 4], sum: 40 },
            ]
        }
    },
    {
        table: [
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4],
        ],
        balance: 200,
        freeSpin: { isFreeSpin: true, freeSpins: 3 },
        win: {
            sum: 50,
            lines: [
                { id: 7, reels: [0, 1, 2, 3, 4], sum: 10 },
                { id: 9, reels: [0, 1, 2, 3, 4], sum: 40 },
                { id: 2, reels: [0, 1, 2, 3, 4], sum: 40 }
            ]
        }
    },
    {
        table: [
            [4, 4, 4, 4, 4],
            [0, 1, 2, 3, 4],
            [3, 3, 3, 3, 3],
            [0, 1, 2, 3, 4],
            [0, 0, 0, 0, 0],
        ],
        balance: 250,
        freeSpin: { isFreeSpin: true, freeSpins: 2 },
        win: {
            sum: 50,
            lines: [
                { id: 1, reels: [0, 1, 2, 3, 4], sum: 10 },
                { id: 3, reels: [0, 1, 2, 3, 4], sum: 40 },
                { id: 5, reels: [0, 1, 2, 3, 4], sum: 40 }
            ]
        }
    },
    {
        table: [
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 3],
            [1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0],
        ],
        balance: 250,
        freeSpin: { isFreeSpin: true, freeSpins: 1 },
    },
    {
        table: [
            [4, 4, 4, 4, 4],
            [0, 1, 2, 3, 4],
            [3, 3, 3, 3, 3],
            [0, 1, 2, 3, 4],
            [0, 0, 0, 0, 0],
        ],
        balance: 300,
        freeSpin: { isFreeSpin: true, freeSpins: 5 },
        win: {
            sum: 50,
            lines: [
                { id: 1, reels: [0, 1, 2, 3, 4], sum: 10 },
                { id: 2, reels: [0, 1, 2, 3, 4], sum: 40 },
                { id: 3, reels: [0, 1, 2, 3, 4], sum: 40 }
            ]
        }
    },
    {
        table: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ],
        balance: 350,
        freeSpin: { isFreeSpin: false, freeSpins: 4 },
        win: {
            sum: 50,
            lines: [
                { id: 1, reels: [0, 1, 2, 3, 4], sum: 10 },
                { id: 2, reels: [0, 1, 2, 3, 4], sum: 10 },
                { id: 3, reels: [0, 1, 2, 3, 4], sum: 10 },
                { id: 4, reels: [0, 1, 2, 3, 4], sum: 10 },
                { id: 5, reels: [0, 1, 2, 3, 4], sum: 10 },
            ]
        }
    }
]
export function getSpinResult(): TSpinResult {
    return JSON.parse(JSON.stringify(spinResultArray[index]))
}
export async function sendRequest() {
    await delay(100)
    index++
    if (index === spinResultArray.length) {
        index = 0
    }
}