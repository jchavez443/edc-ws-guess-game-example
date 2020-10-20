import { ErrorEvent, IEvent } from 'edc-ws'

export default class UnknownEventErrorEvent extends ErrorEvent {
    constructor(failed: IEvent<any, any>) {
        super(failed, {
            cn: 'event-unknow',
            code: 4040,
            message: `Unknown event type ${failed.type}`
        })
    }
}
