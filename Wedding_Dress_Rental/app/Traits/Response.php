<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait Response
{
    public static function response($data, $message, $code = 200 , $meta = null): JsonResponse
    {
        $response = ['message' => $message, 'status' => $code];
        if ($meta) {
            $response = array_merge(['meta' => $meta], $response);
        }
        $response = array_merge(['data' => $data], $response);
        return response()->json($response, $code);
    }

    protected function showOne($instance, $resource, $message = 'success', $code = 200): JsonResponse
    {
        return $this->response(new $resource($instance),$message);
    }
    
    protected function showAll($data, $resource, $message = 'success', $code = 200): JsonResponse
    {
        $paginationMeta = $this->getPaginationMeta($data);
        $response = $resource::collection($data);
        return $this->response($response , $message, $code,$paginationMeta );
    }

    protected function showCollection($data, $resource, $message = 'success', $code = 200): JsonResponse
    {
        $response = $resource::collection($data);

        return $this->response($response , $message, $code);
    }


    protected function getPaginationMeta($paginator): array
    {
        return [
            'total' => $paginator->total(),
            'per_page' => $paginator->perPage(),
            'count' => $paginator->count(),
            'current_page' => $paginator->currentPage(),
            'last_page' => $paginator->lastPage(),
            'path' => $paginator->path(),
            'from' => $paginator->firstItem(),
            'to' => $paginator->lastItem(),
            'links' => [
                'first' => $paginator->url(1),
                'last' => $paginator->url($paginator->lastPage()),
                'prev' => $paginator->previousPageUrl(),
                'next' => $paginator->nextPageUrl(),
            ]
        ];
    }
    
}