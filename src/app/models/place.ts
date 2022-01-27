export type Place = {
    title: string;
    description: string;
    tripId: string;
    location: {
        type: string;
        coordinates: [ number, number ];
    }
    pictureUrl: string;
    _id: string;
    createdAt: string;
    modifiedAt: string;
    __v: number;
  };
