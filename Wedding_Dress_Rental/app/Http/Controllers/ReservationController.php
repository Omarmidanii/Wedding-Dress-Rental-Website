<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use App\Models\User;
use App\Rules\DateIntersection;
use  App\Traits\Response;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    use Response;
    public function index()
    {

        try {
            $reservations = Auth::user()->reservations;
            return self::showCollection($reservations , ReservationResource::class, 'Reservations indexed successfully', 200);
        } catch (\Exception $e) {
            return self::response(null, 'An error occurred: ' . $e->getMessage(), 500);
        }
    }

    public function store(StoreReservationRequest $request)
    {
        try {
            $data = $request->validated();
            $start_time = Carbon::parse($data['start_time']);
            $end_time = Carbon::parse($data['end_time']);
            $duration = $start_time->diffInMinutes($end_time);
            $reservation = Reservation::create([
                'user_id' => Auth::user()->id,
                'wedding_dress_id' => $data['wedding_dress_id'],
                'start_time' => $data['start_time'],
                'end_time' => $data['end_time'],
                'rental_duration' => $duration,
            ]);
            return self::showOne($reservation , ReservationResource::class, 'Reservation created successfully', 200);
        } catch (\Exception $e) {
            return self::response(null, 'An error occurred: ' . $e->getMessage(), 500);
        }
    }
}