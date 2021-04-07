<?php

namespace App\Service;

use http\Message;
use Symfony\Component\Finder\Exception\DirectoryNotFoundException;
use Symfony\Component\Finder\Finder;

class BoardPageService
{
    public function findImages(string $path)
    {
        $images = [];
        $finder = new Finder();

        $finder->files()->in($path);

        if(!$finder->hasResults()) {
            return [];
        }

        foreach($finder as $file) {
            array_push($images, $file->getFilename());
        }

        return $images;
    }
}
