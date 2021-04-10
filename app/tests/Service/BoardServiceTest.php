<?php

namespace App\Tests\Service;

use App\Entity\Board;
use App\Service\BoardService;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class BoardServiceTest extends KernelTestCase
{
    /**
     * @var BoardService
     */
    private $boardService;

    public function setUp(): void
    {
        self::bootKernel();
        $this->boardService = static::$container->get(BoardService::class);
    }

    public function testValidateBoardReturnTrue()
    {
        $board = new Board();
        $requestContent = '{"title":"test"}';

        $this->assertTrue($this->boardService->validateBoard($board, $requestContent));
    }

    public function testValidateBoardEmptyContentReturnFalse()
    {
        $board = new Board();
        $requestContent = '';

        $this->assertFalse($this->boardService->validateBoard($board, $requestContent));
    }

    public function testValidateBoardTextNotSetReturnFalse()
    {
        $board = new Board();
        $requestContent = '{"test":"test"}';

        $this->assertFalse($this->boardService->validateBoard($board, $requestContent));
    }

    public function testValidateBoardEmptyTextReturnFalse()
    {
        $board = new Board();
        $requestContent = '{"title":""}';

        $this->assertFalse($this->boardService->validateBoard($board, $requestContent));
    }

    public function testValidateBoardTitleToLargeReturnFalse()
    {
        $board = new Board();
        $requestContent = '{"text":"'. str_repeat('test123456', 4) . '"}';

        $this->assertFalse($this->boardService->validateBoard($board, $requestContent));
    }

    public function testValidateBoardReturnsError()
    {
        $this->expectException(\TypeError::class);

        $requestContent = '{"title":"test"}';
        $this->boardService->validateBoard(null, $requestContent);
    }
}
