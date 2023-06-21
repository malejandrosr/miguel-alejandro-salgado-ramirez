<?php

namespace App\Http\Controllers\ApiAdministrator;

use App\Enums\DiskDriver;
use App\Enums\WebAdministratorRoles;
use App\Helpers\Uploader;
use App\Http\Controllers\Controller;
use App\Models\Administrator;
use App\Responses\SuccessResponse;
use App\Rules\IsValidEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;

class AdministratorController extends Controller
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

        $administrators = Administrator::searchCriteria($search)->paginate($size);

        return response()->json($administrators);
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

        $administrator = new Administrator();

        if ($request->hasFile('avatar')) {
            $uploaded = Uploader::saveImage($request->file('avatar'), DiskDriver::UPLOADS);
            $administrator->avatar = $uploaded['url'];
        }

        $administrator->name = $validated->name;
        $administrator->lastname = $validated->lastname;
        $administrator->email = $validated->email;
        $administrator->password = $validated->password;
        $administrator->save();

        $administrator->assignRole($validated->role);

        return new SuccessResponse(__('Administrator created successfully.'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Administrator  $administrator
     * @return \App\Responses\SuccessResponse
     */
    public function show(Administrator $administrator)
    {
        return new SuccessResponse($administrator);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Responses\SuccessResponse
     */
    public function update(Request $request, Administrator $administrator)
    {
        $validated = $this->validateRequest($request, $administrator->uuid);

        if ($request->hasFile('avatar')) {
            $uploaded = Uploader::saveImage($request->file('avatar'), DiskDriver::UPLOADS, $administrator->avatar);
            $administrator->avatar = $uploaded['url'];
        }

        $administrator->name = $validated->name;
        $administrator->lastname = $validated->lastname;
        $administrator->email = $validated->email;
        if ($validated->password) {
            $administrator->password = $validated->password;
        }
        $administrator->save();

        $administrator->syncRoles($validated->role);

        return new SuccessResponse(__('Administrator updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     * @return \App\Responses\SuccessResponse
     */
    public function destroy(Administrator $administrator)
    {
        $administrator->delete();

        return new SuccessResponse(__('Administrator deleted successfully.'));
    }

    /**
     * Enable/Disable the specified resource from storage
     *
     * @param  \App\Models\Administrator  $administrator
     * @return SuccessResponse
     */
    public function disable(Administrator $administrator)
    {
        $administrator->disabled = !$administrator->disabled;
        $administrator->save();

        $message = $administrator->disabled ? 'disabled' : 'enabled';

        return new SuccessResponse(__("Administrator {$message} successfully."));
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

        $requiredPassword = $uuid === 'NULL' ? 'required' : 'sometimes';
        $uniqueEmail = "unique:administrators,email,{$uuid},id,disabled,deleted_at,NULL";

        $request->validate([
            'avatar' => ['sometimes', 'image', 'mimes:png,jpg', 'max:8096'],
            'name' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string','email', new IsValidEmail(), $uniqueEmail],
            'password' => [$requiredPassword, Password::min(10)->letters()->numbers()],
            'role' => ['required', new Enum(WebAdministratorRoles::class)],
        ]);

        $validated->name = $request->input('name');
        $validated->lastname = $request->input('lastname');
        $validated->email = $request->input('email');
        $validated->password = Hash::make($request->input('password')) ?? null;
        $validated->role = $request->input('role');

        return $validated;
    }
}
