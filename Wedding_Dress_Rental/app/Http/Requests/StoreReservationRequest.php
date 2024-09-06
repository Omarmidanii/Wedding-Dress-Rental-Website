<?php

namespace App\Http\Requests;

use App\Rules\DateIntersection;
use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'start_time' => 'required|date_format:Y-m-d H:i:s',
            'end_time' => ['required' ,'date_format:Y-m-d H:i:s' , 'after:start_time',new DateIntersection($this->start_time,$this->end_time)],
            'wedding_dress_id' => 'required|exists:wedding__dresses,id'
        ];
    }
}