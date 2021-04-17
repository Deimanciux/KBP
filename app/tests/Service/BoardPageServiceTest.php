<?php

namespace App\Tests\Service;

use App\Service\BoardPageService;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Finder\Exception\DirectoryNotFoundException;

class BoardPageServiceTest extends KernelTestCase
{
    private $projectDir;

    /**
     *
     */
    public function setUp(): void
    {
        self::bootKernel();

        $this->projectDir = self::$container->getParameter('kernel.project_dir');
    }

    public function testFindImages()
    {
        $boardPageService = new BoardPageService;
        $result = $boardPageService->findImages($this->projectDir . '/tests/assets/imagesPositive');

        $this->assertTrue(count($result) > 0);
    }

    public function testFindImagesInEmptyFolder()
    {
        $boardPageService = new BoardPageService;
        $result = $boardPageService->findImages($this->projectDir . '/tests/assets/imagesNegative');

        $this->assertTrue(count($result) === 0);
    }

    public function testFindImagesInNotExistingPath()
    {
        $this->expectException(DirectoryNotFoundException::class);

        $boardPageService = new BoardPageService;
        $boardPageService->findImages('/assets/imagesNegative');
    }
}
