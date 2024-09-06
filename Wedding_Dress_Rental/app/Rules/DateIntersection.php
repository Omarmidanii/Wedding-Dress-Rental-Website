<?php

namespace App\Rules;

use App\Models\Reservation;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class DateIntersection implements ValidationRule
{
    protected $startTime;
    protected $endTime;

    public function __construct($startTime, $endTime)
    {
        $this->startTime = $startTime;
        $this->endTime = $endTime;
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $intersection = Reservation::where(function ($query) {
            $query->whereBetween('start_time', [$this->startTime, $this->endTime])
                ->orWhereBetween('end_time', [$this->startTime, $this->endTime])
                ->orWhere(function ($query) {
                    $query->where('start_time', '<=', $this->startTime)
                        ->where('end_time', '>=', $this->endTime);
                });
        })->exists();
        if ($intersection === true) {
            $fail('The reservation times overlap with an existing reservation.');
        }
    }
}