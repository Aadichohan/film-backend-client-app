<?php

// database/seeders/FilmsTableSeeder.php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class FilmsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 100; $i++) {
            \DB::table('films')->insert([
                'name' => $faker->name,
                'description' => $faker->text,
                'release_date' => $faker->date,
                'ticket_price' => $faker->randomFloat(2, 5, 15),
                'country' => $faker->country,
                'genre' => $faker->word,
                'photo' => $faker->imageUrl,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
