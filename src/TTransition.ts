import { State } from "./State"

export type TTransition = {
    from: State
    to: State | (() => State)
}
