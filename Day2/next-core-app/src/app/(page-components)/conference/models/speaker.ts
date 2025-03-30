export interface Speaker {
    id: string;
    bio: string;
    sessions: Array<{ id: number, name: string }>,
    name: string;
    featured: boolean;
}