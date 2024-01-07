<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            // 'email'      => 'required|string|email|unique:users',
            'email'      => 'required|string|email',
            'password'   => 'required|string|min:8',
            'name' => 'required|string|min:3|max:25',
            // 'first_name' => 'required|string|min:3|max:25',
            // 'last_name'  => 'required|string|min:3|max:25',
            'photo'      => 'image|mimes:jpg,png,jpeg'
        ];
    }

    public function messages()
    {
    return [
        'email.required'       => ['message' => 'Email is Required'],
        'password.required'    => ['message' => 'Password is Required'],
        'first_name.required'  => ['message' => 'FirstName is Required'],
        'last_name.required'   => ['message' => 'LastName is Required'],
    ];
   }
}
