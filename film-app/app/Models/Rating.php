<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;
    protected $table = 'ratings';

    protected $fillable = ['film_id', 'user_id', 'rating', 'comment'];

    // Define the relationship with Movie model
    public function movie()
    {
        return $this->belongsTo(Movie::class, 'film_id');
    }
}
