<?php

namespace App\Service;

use App\Entity\Table;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TableService
{
    /**
     * @var ValidatorInterface
     */
    private $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    public function validateTable(Table $table)
    {
        $errors = $this->validator->validate($table);

        if (count($errors) > 0) {
            return false;
        }

        return true;
    }
}
