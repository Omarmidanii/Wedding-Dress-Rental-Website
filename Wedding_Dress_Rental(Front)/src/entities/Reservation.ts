export default interface Reservation
{
id : number;
user_id : number;
wedding_dress_id : number;
start_time : string;
end_time : string;
rental_duration : number;
rental_price : number;
};

export interface ReservationRequest
{
wedding_dress_id : number;
start_time : string;
end_time : string;
};