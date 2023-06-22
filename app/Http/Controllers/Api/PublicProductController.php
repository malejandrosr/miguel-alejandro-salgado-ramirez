<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductTranslation;
use App\Responses\SuccessResponse;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class PublicProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        /** @var int $size */
        $size = $request->input('size') ?? 25;
        /** @var string $search */
        $search = $request->input('search') ?? '';
        /** @var string $language */
        $language = $request->input('language') ?? 'es';
        /** @var string $orderByField */
        $orderByField = $request->input('order_by_field') ?? 'name';
        /** @var string $orderByFieldDirection */
        $orderByFieldDirection = $request->input('order_by_field_direction') ?? 'asc';

        $products = ProductTranslation::searchCriteria($search)
            ->whereHas('product', fn (Builder $query) => $query->where('deleted_at', null)->where('active', true))
            ->where('language', $language)
            ->join('products', 'products.id', '=', 'product_translations.product_id')
            ->orderBy($orderByField, $orderByFieldDirection)
            ->paginate($size);

        return response()->json($products);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $url
     * @return \App\Responses\SuccessResponse
     */
    public function show(string $url)
    {
        $productTranslation = ProductTranslation::where('url', $url)->firstOrFail();

        return new SuccessResponse($productTranslation->load(['product']));
    }
}
