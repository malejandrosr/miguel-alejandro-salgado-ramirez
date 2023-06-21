<?php

namespace App\Http\Controllers\Api;

use App\Enums\DiskDriver;
use App\Enums\WebRoles;
use App\Helpers\Uploader;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Responses\SuccessResponse;
use App\Rules\IsValidEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
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

        $users = User::searchCriteria($search)->paginate($size);

        return response()->json($users);
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

        $user = new User();

        if ($request->hasFile('avatar')) {
            $uploaded = Uploader::saveImage($request->file('avatar'), DiskDriver::UPLOADS);
            $user->avatar = $uploaded['url'];
        }

        $user->name = $validated->name;
        $user->lastname = $validated->lastname;
        $user->phone = $validated->phone;
        $user->email = $validated->email;
        $user->password = $validated->password;
        $user->save();

        $user->assignRole($validated->role);

        return new SuccessResponse(__('User created successfully.'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \App\Responses\SuccessResponse
     */
    public function show(User $user)
    {
        return new SuccessResponse($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \App\Responses\SuccessResponse
     */
    public function update(Request $request, User $user)
    {
        $validated = $this->validateRequest($request, $user->uuid);

        if ($request->hasFile('avatar')) {
            $uploaded = Uploader::saveImage($request->file('avatar'), DiskDriver::UPLOADS);
            $user->avatar = $uploaded['url'];
        }

        $user->name = $validated->name;
        $user->lastname = $validated->lastname;
        $user->phone = $validated->phone;
        $user->email = $validated->email;
        $user->password = $validated->password;
        $user->save();

        $user->syncRoles($validated->role);

        return new SuccessResponse(__('User updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \App\Responses\SuccessResponse
     */
    public function destroy(User $user)
    {
        $user->delete();

        return new SuccessResponse(__('User deleted successfully.'));
    }

    /**
     * Enable/Disable the specified resource from storage
     *
     * @param  \App\Models\User  $user
     * @return \App\Responses\SuccessResponse
     */
    public function disable(User $user)
    {
        $user->disabled = !$user->disabled;
        $user->save();

        $message = $user->disabled ? 'disabled' : 'enabled';

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

        $requiredPassword = $uuid === 'NULL' ? 'required' : 'sometimes';
        $uniqueEmail = "unique:users,email,{$uuid},id,disabled,deleted_at,NULL";

        $request->validate([
            'avatar' => ['sometimes', 'image', 'mimes:png,jpg', 'max:8096'],
            'name' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:10'],
            'email' => ['required', 'string','email', new IsValidEmail(), $uniqueEmail],
            'password' => [$requiredPassword, 'string', Password::min(10)->letters()->numbers()],
            'role' => ['required', new Enum(WebRoles::class)],
        ]);

        $validated->name = $request->input('name');
        $validated->lastname = $request->input('lastname');
        $validated->phone = $request->input('phone');
        $validated->email = $request->input('email');
        $validated->password = Hash::make($request->input('password')) ?? null;
        $validated->role = $request->input('role');

        return $validated;
    }
}
