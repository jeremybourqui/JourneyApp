export type PlaceRequest = {
    title: string,
    description: string,
    location: {
        type: string,
        coordinates: [number, number],
    },
    pictureUrl: string
}