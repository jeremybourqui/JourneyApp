export type Place = {
    title: string;
    description: string;
    tripId: string;
    location: {
        type: string;
        coordinates: [ Number ];
    }
    pictureUrl: string;
    _id: string;
    createdAt: Date;
    modifiedAt: Date;
    __v: number;
  };