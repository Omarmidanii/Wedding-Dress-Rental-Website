<?php

namespace Database\Seeders;

use App\Models\Wedding_Dress;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Wedding_DressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        foreach (range(1,14) as $index) 
        {
            Wedding_Dress::create([
                'name' => 'Elegant Lace Gown',
                'description' => 'A beautiful lace gown perfect for a classic wedding.',
                'size' => 'small',
                'rental_price' => 200 + $index,
                'photo' =>  env('APP_URL').'/storage/wedding_dresses/wedding_dresses_image/wedding_dress' . $index . '.jpg',
            ]);
        }
    }
}