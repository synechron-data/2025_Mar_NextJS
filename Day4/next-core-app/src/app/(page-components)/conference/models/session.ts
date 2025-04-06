export interface Session {
    id: number
    title: string
    description: string
    startsAt: string
    endsAt: string
    speakers: Array<{
        id: string;
        name: string;
    }>;
    room: string
    day: string
    format: string
    track: string
    level: string
    favorite: boolean
}
