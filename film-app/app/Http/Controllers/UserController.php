<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;

use Illuminate\Support\Facades\Validator;
use App\Models\User;

class UserController extends Controller
{
    //

    public function createUser(UserRequest $request)
    {
        // dd('stop');
        $User = new User;
 
        $request->validated();

        $image_path = ($request->file('photo')) ? $request->file('photo')->store('image', 'public') : NULL;
        $User->email      = $request->email;
        $User->password   = bcrypt($request->password);
        $User->name = $request->name;
        // $User->last_name  = $request->last_name;
        $User->photo      = $image_path ;

        $User->save();

        return response()->json([
            'message'=> 'Successfully created user!',
            'success'=> true,
            'code'  => 201
       ], 201);
    }
}
