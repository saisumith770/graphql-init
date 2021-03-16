import { enumerate } from '../../graph.types'

export const Platforms = new enumerate({
    name: "platform",
    values: {
        YOUTUBE: { value: 0 },
        TWITCH: { value: 1 },
        SPOTIFY: { value: 2 }
    }
})