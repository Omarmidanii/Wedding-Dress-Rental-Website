<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Wedding_Dress extends Model
{
    use HasFactory , SoftDeletes;
    protected $fillable = [
        'name',
        'description',
        'size',
        'rental_price',
        'photo'
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public static function getDisk()
    {
        return Storage::disk('wedding_dresses');
    }
    public function imageUrl(string $fieldName)
    {
        if(str_starts_with($this->$fieldName,'http')) {
            return $this->$fieldName;
        }else{
            return $this->$fieldName ? self::getDisk()->url($this->$fieldName) : null;
        }
    }
    
}