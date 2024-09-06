<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\FileUpload;
use App\Traits\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    use Response;
    use FileUpload;
    public function show()
    {
        try{
            $user = User::find(Auth::user()->id);
            return self::showOne($user , UserResource::class , "User fetched successfully" , 200);
        } catch (\Exception $e) {
            return self::response(null, 'An error occurred: ' . $e->getMessage(), 500);
        }
    }

    public function update(UserUpdateRequest $request)
    {
        try{
        $dataUser=$request->validated();
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $name ='users_image/' . $file->hashName() ;
            $imagePath = $this->createFile($request->file('photo'), User::getDisk(), $name);
            $dataUser['photo'] = $imagePath;
        }
        $user = Auth::user();
        $user->update($dataUser);
        return self::showOne($user , UserResource::class , "User updated successfully" , 200);
    } catch (\Exception $e) {
        return self::response(null, 'An error occurred: ' . $e->getMessage(), 500);
    }
    }
}