<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Responses\SuccessResponse;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        /** @var int $size */
        $size = $request->input('size') ?? 25;
        /** @var string $search */
        $search = $request->input('search') ?? '';

        $products = Product::searchCriteria($search)->with(['productTranslations'])->paginate($size);

        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Responses\SuccessResponse
     */
    public function store(Request $request)
    {
        $validated = $this->validateRequest($request);

        $product = new Product();
        $product->sku = $validated->sku;
        $product->dollar_price = $validated->dollar_price;
        $product->peso_price = $validated->peso_price;
        $product->points = $validated->points;
        $product->save();

        $product->productTranslations()->create([
            'name' => $validated->name['es'],
            'short_description' => $validated->short_description['es'],
            'long_description' => $validated->long_description['es'],
            'url' => $validated->url['es'],
            'language' => $validated->language['es'],
        ]);

        $product->productTranslations()->create([
            'name' => $validated->name['en'],
            'short_description' => $validated->short_description['en'],
            'long_description' => $validated->long_description['en'],
            'url' => $validated->url['en'],
            'language' => $validated->language['en'],
        ]);

        return new SuccessResponse(__('Product created successfully.'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \App\Responses\SuccessResponse
     */
    public function show(Product $product)
    {
        return new SuccessResponse($product->load(['productTranslations']));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \App\Responses\SuccessResponse
     */
    public function update(Request $request, Product $product)
    {
        $validated = $this->validateRequest($request, $product->uuid);

        $product->sku = $validated->sku;
        $product->dollar_price = $validated->dollar_price;
        $product->peso_price = $validated->peso_price;
        $product->points = $validated->points;
        $product->save();

        $product->productTranslations()->where('language', 'es')->first()->update([
            'name' => $validated->name['es'],
            'short_description' => $validated->short_description['es'],
            'long_description' => $validated->long_description['es'],
            'url' => $validated->url['es'],
            'language' => $validated->language['es'],
        ]);
        $product->productTranslations()->where('language', 'en')->first()->update([
            'name' => $validated->name['en'],
            'short_description' => $validated->short_description['en'],
            'long_description' => $validated->long_description['en'],
            'url' => $validated->url['en'],
            'language' => $validated->language['en'],
        ]);

        return new SuccessResponse(__('Product updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \App\Responses\SuccessResponse
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return new SuccessResponse(__('Product deleted successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \App\Responses\SuccessResponse
     */
    public function disable(Product $product)
    {
        $product->active = !$product->active;
        $product->save();

        $message = $product->active ? 'enabled' : 'disabled';

        return new SuccessResponse(__("User {$message} successfully."));
    }

    /**
     * Handle request validation
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $uuid
     * @return object
     */
    protected function validateRequest(Request $request, string $uuid = 'NULL')
    {
        $validated = (object)[];

        $uniqueSku = "unique:products,sku,{$uuid},deleted_at";

        $request->validate([
            'sku' => ['required', $uniqueSku],
            'dollar_price' => ['required', 'numeric', 'gt:0'],
            'peso_price' => ['required', 'numeric', 'gt:0'],
            'points' => ['required', 'numeric'],
            'name.es' => ['required', 'regex:/^[a-zA-Z\s]+$/'],
            'name.en' => ['required', 'regex:/^[a-zA-Z\s]+$/'],
            'short_description.es' => ['required', 'max:120'],
            'short_description.en' => ['required', 'max:120'],
            'long_description.es' => ['sometimes'],
            'long_description.en' => ['sometimes'],
        ]);

        $validated->sku = $request->input('sku');
        $validated->dollar_price = $request->input('dollar_price');
        $validated->peso_price = $request->input('peso_price');
        $validated->points = $request->input('points');
        $validated->name = [
            'es' => $request->input('name.es'),
            'en' => $request->input('name.en'),
        ];
        $validated->short_description = [
            'es' => $request->input('short_description.es'),
            'en' => $request->input('short_description.en'),
        ];
        $validated->long_description = [
            'es' => $request->input('long_description.es') ?? null,
            'en' => $request->input('long_description.en') ?? null,
        ];
        $validated->url = [
            'es' => Str::slug($request->input('name.es') . ' es'),
            'en' => Str::slug($request->input('name.en') . ' en'),
        ];
        $validated->language = [
            'es' => 'es',
            'en' => 'en',
        ];

        return $validated;
    }
}
