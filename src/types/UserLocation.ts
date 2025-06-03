export interface UserLocation {
    id: string,
    nombre: string,
    address: string,
    city: string,
    state: string,
    country: string,
    postalCode: string,
}

export interface GetUserLocation {
    id: string,
    location: {
        address: string,
        city: string,
        ​​​country: string,
        ​​​createdAt: string,
        ​​​lastUpdated: Date,
        ​​postalCode: string,
        ​state: string
    },
    name: string,
    phoneNumber: string,
    workplace: string
}