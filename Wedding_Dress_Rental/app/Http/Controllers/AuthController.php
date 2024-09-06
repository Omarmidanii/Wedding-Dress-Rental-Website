<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Mail\ForgotPasswordMail;
use App\Mail\PasswordResetMail;
use App\Models\User;
use  App\Traits\Response;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    public function register(UserRequest $request)
    {
        $response = [
            'status' => 200,
            'data' => [],
            'message' => ''
        ];
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $user['token'] =  $user->createToken('token')->plainTextToken;
        $response['data'] = $user;
        $response['message'] = 'User registerd successfully';
        return Response::response($response['data'], $response['message'], $response['status']);
    }


    public function login(UserRequest $request)
    {
        $response = [
            'status' => 200,
            'data' => [],
            'message' => ''
        ];
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $user['token'] = $token;
            $response['data'] = $user;
            $response['message'] = 'user logged in successfully';
        } else {
            $response['message'] = 'The provided credentials are incorrect';
            $response['status'] = 404;
        }
        return Response::response($response['data'], $response['message'], $response['status']);
    }


    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();
        return Response::response([], "User logged out Successfully", 200);
    }


    public function passwordEmail(Request $request)
    {
        try {

            $data =  $request->validate(['email' => 'required|email']);;
            $token = $this->createToken($data['email']);
            Mail::to($data['email'])->send(new ForgotPasswordMail($token, $data['email']));
            return  Response::response(null, "Reset Email is send successfully, please check your inbox", 200);
        } catch (\Exception $e) {
            return Response::response(null, 'An error occurred: ' . $e->getMessage(), 500);
        }
    }

    public function createToken($email)
    {
        $oldToken = DB::table('password_reset_tokens')->where('email', $email)->first();

        if ($oldToken) {
            return $oldToken->token;
        }

        $token = Str::random(40);
        $this->saveToken($token, $email);
        return $token;
    }


    public function saveToken($token, $email)
    {
        DB::table('password_reset_tokens')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }


    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);
        // find email
        $userData = User::whereEmail($request->email)->first();
        // update password
        $userData->update([
            'password' => bcrypt($request->password)
        ]);
        DB::table('password_reset_tokens')->where([
            'email' => $request->email,
            'token' => $request->resetToken
        ])->delete();
        return  Response::response(null, "Password has been updated", 200);
    }
}