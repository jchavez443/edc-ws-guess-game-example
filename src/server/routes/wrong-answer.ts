import { ServerOnEventHandler } from 'edc-ws'

export const eventType = 'old-event'

export const handler: ServerOnEventHandler = async (event, conn, reply, send, that) => {
    console.log(event.type)
}
