<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'wedding_dress_id'=> $this->wedding_dress_id,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'rental_duration' => $this->rental_duration,
            'rental_price' => $this->wedding_dress->rental_price,
        ];
    }
}