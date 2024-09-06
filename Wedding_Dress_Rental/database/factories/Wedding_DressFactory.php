<?php

namespace Database\Factories;

use App\Enums\size;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class Wedding_DressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->sentence,
            'size' => $this->faker->randomElement([size::sm->value, size::md->value, size::lg->value]),
            'rental_price' => $this->faker->numberBetween(100, 500),
            'photo' => 'path/to/wedding_dress' . $this->faker->numberBetween(1, 10) . '.jpg',
        ];
    }
}