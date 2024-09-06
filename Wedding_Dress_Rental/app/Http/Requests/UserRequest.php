<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(Request $request): array
    {
        if($request->route()->getName() == "login"){
            return [
                'password'=> ['required','string','min:8'],
                'email' => ['required','email']
            ];
        }
        return [
            'name' => ['required','string'],
            'password'=> ['required','string','min:8'],
            'email' => ['required','email','unique:users']
        ];
    }
}