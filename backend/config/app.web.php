<?php

use craft\filters\Cors;
use craft\helpers\App;

return [
    'as corsFilter' => [
        'class' => Cors::class,
        'cors' => [
            'Origin' => [
                App::env('PRIMARY_SITE_URL')
            ],
            'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
            'Access-Control-Request-Headers' => ['*'],
            'Access-Control-Allow-Credentials' => true,
            'Access-Control-Max-Age' => 86400,
            'Access-Control-Expose-Headers' => [],
        ]
    ]
];
