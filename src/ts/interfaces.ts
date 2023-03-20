export interface eachToast {
    title : string;
    description: string;
    key: number;
}
export interface statesRedux {
    userAuth : stateUserAuth
}
export interface stateUserAuth {
    user: null | string;
    token: null | string;
}
export interface HamburgerProps {
    isOpen : boolean;
    handleHamburger: () => void;
    items : any;
}
export interface toastProps {
    type : string;
    description: string;
    indexKey: number;
    destroyToast(indexKey : number):void;
}
export interface ProtectedRouteProps {
    path: string;
    key: number;
    component: React.FC;
}
export interface LoginInputTypes {
    email: string;
    password: string;
}
export interface ProfileInputTypes {
    passwordCurrent: string;
    passwordNew: string;
    passwordConfirm: string;
}
export interface RegisterInputTypes {
    fname: string;
    callNumber: string;
    email: string;
    password: string;
    address: string;
    bio: string;
}
export interface ActivateInputTypes {
    email: string;
    code: string;
}
export interface ForgetPassInputTypes {
    password: string;
    code: string;
}
export interface NewAdInputTypes {
    category: string;
    type: string;
    status : string;
    city: string;
    region: string;
    neighbor: string;
    room: string;
    year: string;
    floor: string;
    elevator: string;
    parking: string;
    lobby: string;
    sports_hall: string;
    guard: string;
    swimming_pool: string;
    balcony: string;
    roof_garden: string;
    remote_door: string;
    meterage: string;
    price: string;
    title: string;
    callNumber: string;
    address: string;
    bio: string;
    creator: string;
    warehouse: string;
}
export interface PredictInputTypes {
    type: string;
    city: string;
    region: string;
    room: string;
    year: string;
    floor: string;
    elevator: string;
    parking: string;
    meterage: string;
    warehouse: string;
}
export interface InformationUserTypes {
    full_name: string;
    phone_number: string;
    username: string;
    address: string;
    bio: string;
    level: number;
}
export interface filtersInterface {
    searchInput: string;
    category: string[];
    type: string[];
    region: string[];
    room: string[];
    priceRange: {
        from: number;
        to: number;
    };
}
export interface ads{
    id: number;
    owner: string;
    title: string;
    total_price: number;
    unit_price: number;
    province: string;
    address: string;
    location_x: Number;
    location_y: Number;
    main_image: string;
    image_1: string | null;
    image_2: string | null;
    image_3: string | null;
    type: string;
    category: string;
    status: string;
    seller: string;
    age: number;
    floor_area: number;
    num_of_beds: number;
    parking: boolean;
    lobby: boolean;
    warehouse: boolean;
    sports_hall: boolean;
    guard: boolean;
    elevator: boolean;
    swimming_pool: boolean;
    balcony: boolean;
    roof_garden: boolean;
    remote_door: boolean;
    description: string | null;
    region: number;
    neighbor: string | null;
    graph: any;
    phone_number: string;
    updated_at: string;
    created_at: string;
    is_active: boolean;
    source: string;
}