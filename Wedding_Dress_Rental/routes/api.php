<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeddingDressController;
use App\Http\Resources\Wedding_DressResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {  
    return $request->user();  
});  

Route::controller(AuthController::class)->group(function() { 
    Route::post('/register', 'register');
    Route::post('/login', 'login')->name('login');
    Route::post('/forgot-password' , 'passwordEmail');
    Route::post('reset-password', 'resetPassword')->name('password.reset');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
});




Route::middleware('auth:sanctum')->group(function(){

    Route::controller(WeddingDressController::class)->prefix('wedding_dresses')->group(function(){
        Route::get('' , 'index');
        Route::get('/{id}' , 'show');
        Route::post('store' , 'store');
    });

    Route::controller(ReservationController::class)->prefix('reservations')->group(function(){
        Route::get('' , 'index');
        Route::post('' , 'store');
    });

    Route::controller(UserController::class)->prefix('users')->group(function(){
        Route::get('show' , 'show');
        Route::post('update' , 'update');
    });
});