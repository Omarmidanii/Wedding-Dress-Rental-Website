import { create } from "zustand";
import weddingDresses from "../entities/Wedding_Dress";

const WeddingDressDefault = {
    id : 0,
    name : "",
    description : "",
    rental_price : 0,
    size : "",
    photo : ""
};

interface WeddingDressStore {
    WeddingDress : weddingDresses;
    setID : (id : number) => void;
    setName: (name : string) => void;
    setDescription: (description : string) => void;
    setRentalPrice : (rental_price : number) => void;
    setSize: (size : string) => void;
    setPhoto: (photo : string) => void;
    setWeddingDress: (WeddingDress : weddingDresses) => void; 
};


const useWeddingDressStore = create<WeddingDressStore>((set) => ({
WeddingDress : WeddingDressDefault,
setID : (id) => set((store) => ({WeddingDress : {...store.WeddingDress , id}})),
setName : (name) => set((store) => ({WeddingDress : {...store.WeddingDress , name}})),
setDescription : (description) => set((store) => ({WeddingDress : {...store.WeddingDress , description}})),
setRentalPrice: (rental_price) => set((store) => ({WeddingDress : {...store.WeddingDress ,rental_price}})),
setSize: (size) => set((store) => ({WeddingDress : {...store.WeddingDress , size}})),
setPhoto : (photo) => set((store) => ({WeddingDress : {...store.WeddingDress , photo}})),
setWeddingDress : (WeddingDress) => set(() => ({WeddingDress : WeddingDress}))
}));

export default useWeddingDressStore;