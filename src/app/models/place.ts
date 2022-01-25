export type Place = {
    title: string,
    description: string,
    location: {
        type: string,
        coordinates: [number],
    },
    pictureUrl: string,
    _id: string,
    createdAt: string,
    modifiedAt: string,
    __v: number
}