<?php

namespace App\Tests\Service;

use App\Service\BoardPageService;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Finder\Exception\DirectoryNotFoundException;

class BoardPageServiceTest extends TestCase
{
    public function testFindImages()
    {
        $boardPageService = new BoardPageService;
        $result = $boardPageService->findImages('/var/www/project/tests/assets/imagesPositive');

        $this->assertTrue(count($result) > 0);
    }

    public function testFindImagesInEmptyFolder()
    {
        $boardPageService = new BoardPageService;
        $result = $boardPageService->findImages('/var/www/project/tests/assets/imagesNegative');

        $this->assertTrue(count($result) === 0);
    }

    public function testFindImagesInNotExistingPath()
    {
        $this->expectException(DirectoryNotFoundException::class);

        $boardPageService = new BoardPageService;
        $boardPageService->findImages('/assets/imagesNegative');
    }
}
