<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    use HasFactory , SoftDeletes;
    
    protected $fillable = [
        'user_id',
        'wedding_dress_id',
        'rental_duration',
        'end_time',
        'start_time'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function wedding_dress()
    {
        return $this->belongsTo(Wedding_Dress::class);
    }
}