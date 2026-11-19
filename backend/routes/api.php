<?php

use CraftCms\Cms\Http\Controllers\Gql\ApiController;
use Illuminate\Support\Facades\Route;

// The GraphQL API the front end queries, at /api. Requests authenticate with a
// bearer token (or fall back to the public schema), so no session or CSRF token.
Route::any('/', ApiController::class)->middleware('craft');
