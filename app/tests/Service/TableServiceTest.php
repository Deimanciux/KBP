<?php

namespace App\Tests\Service;

use App\Entity\Table;
use App\Service\TableService;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class TableServiceTest extends KernelTestCase
{
    /**
     * @var TableService
     */
    private $tableService;

    public function setUp(): void
    {
        self::bootKernel();
        $this->tableService = static::$container->get(TableService::class);
    }

    public function testValidateTableReturnsTrue()
    {
        $table = new Table();
        $table->setPlace('1');
        $table->setTitle('test');

        $this->assertTrue($this->tableService->validateTable($table));
    }

    public function testValidateTableEmptyReturnsFalse()
    {
        $table = new Table();
        $table->setPlace('1');
        $table->setTitle('');

        $this->assertFalse($this->tableService->validateTable($table));
    }

    public function testValidateTableToLargeReturnsFalse()
    {
        $table = new Table();
        $table->setPlace('1');
        $table->setTitle(str_repeat('text', 30));

        $this->assertFalse($this->tableService->validateTable($table));
    }

    public function testValidateTableReturnsError()
    {
        $this->expectException(\TypeError::class);
        $this->tableService->validateTable(null);
    }
}
