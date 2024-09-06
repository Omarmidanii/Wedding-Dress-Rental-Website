<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'name' => 'string|nullable',
            'email' => 'email|unique:users|nullable',
            'photo' => 'image|mimes:jpeg,png,jpg,gif,svg|max:4096|dimensions:min_width=100,min_height=100,max_width=1000,max_height=1000|nullable',
        ];
    }
    public function messages()
    {
        return [
            'photo.image' => 'The file must be an image.',
            'photo.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif, svg.',
            'photo.max' => 'The image may not be greater than 4MB.',
            'photo.dimensions' => 'The image dimensions must be between 100x100 and 1000x1000 pixels.',
        ];
    }
}