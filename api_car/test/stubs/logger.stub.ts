import { ILogObject } from "tslog"

export const error = (...args: unknown[]): ILogObject => {
    return <ILogObject>{}
}