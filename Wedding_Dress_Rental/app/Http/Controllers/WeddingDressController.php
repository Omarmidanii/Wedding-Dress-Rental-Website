<?php

namespace App\Http\Controllers;

use App\Http\Requests\WeddingDressRequest;
use App\Http\Resources\Wedding_DressResource;
use App\Models\Wedding_Dress;
use App\Traits\Response;
use Illuminate\Http\Request;
use App\Traits\FileUpload;

class WeddingDressController extends Controller
{
    use Response, FileUpload;
    public function index()
    {
        try {
            $weddingDresses = Wedding_Dress::paginate(10);
            return self::showAll($weddingDresses, Wedding_DressResource::class, 'Wedding_Dress indexed successfully', 200);
        } catch (\Exception $e) {
            return self::response(null, 'An error occurred: ' . $e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $weddingDress = Wedding_Dress::find($id);
            if ($weddingDress != null)
                return self::showOne($weddingDress, Wedding_DressResource::class, 'Wedding Dress fetched successfully', 200);
            return self::response(null, 'Wedding Dress not found', 404);
        } catch (\Exception $e) {
            return self::response(null, 'An error occurred: ' . $e->getMessage(), 500);
        }
    }


    public function store(WeddingDressRequest $request)
    {
        try {
            $data = $request->validated();
            if ($request->hasFile('photo')) {
                $file = $request->file('photo');
                $name = 'wedding_dresses_image/' . $file->hashName();
                $imagePath = $this->createFile($request->file('photo'), Wedding_Dress::getDisk(), $name);
                $data['photo'] = $imagePath;
            }
            $weddingDress =  Wedding_Dress::create($data);
            return self::showOne($weddingDress, Wedding_DressResource::class, 'Wedding Dress created successfully', 200);
        } catch (\Exception $e) {
            return self::response(null, 'An error occurred: ' . $e->getMessage(), 500);
        }
    }
}