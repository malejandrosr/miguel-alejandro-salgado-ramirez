<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\GenericException;
use App\Http\Controllers\Controller;
use App\Responses\SuccessResponse;
use Http;
use Illuminate\Http\Request;

class BanxicoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \App\Responses\SuccessResponse
     */
    public function index()
    {
        $response = Http::get('https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos?token=bc11040602b0e554b09c5058618a12b1f19dd523d3516cf8d8caf4cfb2692f17&mediaType=json');

        if (!$response->successful()) {
            throw new GenericException(__('Cannot get the banxico data'));
        }

        $data = $response->json();

        return new SuccessResponse(end($data['bmx']['series'][0]['datos']));
    }
}
