<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit59058e8f9c97e12f7316df60fd37ba3a
{
    public static $files = array (
        'e4bb54eb3377f6e3d65b4ba1202f0981' => __DIR__ . '/../..' . '/app/functions.php',
    );

    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'AIO_WooDiscount\\' => 16,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'AIO_WooDiscount\\' => 
        array (
            0 => __DIR__ . '/../..' . '/app',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit59058e8f9c97e12f7316df60fd37ba3a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit59058e8f9c97e12f7316df60fd37ba3a::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit59058e8f9c97e12f7316df60fd37ba3a::$classMap;

        }, null, ClassLoader::class);
    }
}
