<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Film extends Model
{
            // "babenkoivan/scout-elasticsearch-driver": "^4.3",
        // "laravel/scout": "8.6.1",
    use HasFactory, Searchable;
    protected $table = 'films';

    protected $fillable = ['name', 'description', 'release_date', 'ticket_price', 'country', 'genre', 'photo'];

    public function toSearchableArray()
{
    return [
        'name' => $this->name,
        'description' => $this->description,
        'release_date' => $this->release_date,
        'ticket_price' => $this->ticket_price,
        'country' => $this->country,
        'genre' => $this->genre,
    ];
}

    // Define the relationship with Rating model
    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }
}
