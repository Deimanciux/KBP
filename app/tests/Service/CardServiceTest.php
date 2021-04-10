<?php

namespace App\Tests\Service;

use App\Entity\Card;
use App\Service\CardService;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class CardServiceTest extends KernelTestCase
{
    /**
     * @var CardService
     */
    private $cardService;

    public function setUp(): void
    {
        self::bootKernel();
        $this->cardService = static::$container->get(CardService::class);
    }

    public function testValidateCardReturnTrue()
    {
        $card = new Card();
        $requestContent = '{"text":"test"}';

        $this->assertTrue($this->cardService->validateCard($card, $requestContent));
    }

    public function testValidateCardEmptyContentReturnFalse()
    {
        $card = new Card();
        $requestContent = '';

        $this->assertFalse($this->cardService->validateCard($card, $requestContent));
    }

    public function testValidateCardTextNotSetReturnFalse()
    {
        $card = new Card();
        $requestContent = '{"test":"test"}';

        $this->assertFalse($this->cardService->validateCard($card, $requestContent));
    }

    public function testValidateCardEmptyTextReturnFalse()
    {
        $card = new Card();
        $requestContent = '{"text":""}';

        $this->assertFalse($this->cardService->validateCard($card, $requestContent));
    }

    public function testValidateCardToLargeTextReturnFalse()
    {
        $card = new Card();
        $requestContent = '{"text":"'. str_repeat('test123456', 31) . '"}';

        $this->assertFalse($this->cardService->validateCard($card, $requestContent));
    }

    public function testValidateCardReturnsError()
    {
        $this->expectException(\TypeError::class);

        $requestContent = '{"text":"test"}';
        $this->cardService->validateCard(null, $requestContent);
    }
}
