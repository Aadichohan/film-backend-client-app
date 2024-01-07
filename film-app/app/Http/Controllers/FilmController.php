<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Film;
use App\Models\User;
use App\Models\Rating;
use App\Http\Requests\FilmRequest;
use Laravel\Passport\Token;
use Laravel\Passport\TokenRepository;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Validator;

class FilmController extends Controller
{
    //

    public function index()
    {
        $movies = Film::limit(10)->get();
        return response()->json($movies);
    }
    public function getOneFilm(Request $request, $id)
    {

        $movieId = $request->id;
        $request->request->add(['id' => $id]); 
        $request->validate([
            'id' => 'required|integer'
        ]);
        
        \DB::enableQueryLog();
        $totalRatingCount = Rating::where('film_id', $movieId)
        ->where('rating', 5)
        ->count();

    // Retrieve top comments for the movie
    $topComments = Rating::where('film_id', $movieId)
        ->orderBy('created_at', 'desc')
        ->take(10)
        ->get();

        $movies = Film::find($request->id);
    // Combine the results into a single array
    $movieDetails = [
        'movie' => $movies,
        'totalRatingCount' => $totalRatingCount,
        'topComments' => $topComments,
    ];



// dd(\DB::getQueryLog());

        return response()->json($movieDetails);
    }

    // public function rate(Request $request, Film $movie)
    public function rate(Request $request)
    {
        // $accessToken = $request->header('Authorization'); // Assuming the token is in the Authorization header

        $request->validate([
            'film_id' => 'required|integer',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $rating = new Rating();
        $rating->film_id = $request->film_id;
        $rating->user_id = Auth::user()->id;
        $rating->rating = $request->rating; // Assuming $rating contains the actual rating value
        $rating->comment = $request->comment; // Assuming $comment contains the comment

        $rating->save();

        return response()->json([
            'message'=> 'Rating and comment submitted successfully',
            'success'=> true,
            'code'  => 201
       ], 201);
    }
}
