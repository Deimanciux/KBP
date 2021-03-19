<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210220114946 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE board CHANGE user_id user_id INT NOT NULL');
        $this->addSql('ALTER TABLE card CHANGE table_id table_id INT NOT NULL');
        $this->addSql('ALTER TABLE `table` CHANGE board_id board_id INT NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE board CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE card CHANGE table_id table_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE `table` CHANGE board_id board_id INT DEFAULT NULL');
    }
}
