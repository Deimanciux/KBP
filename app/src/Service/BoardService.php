<?php

namespace App\Service;

use App\Entity\Board;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class BoardService
{
    /**
     * @var ValidatorInterface
     */
    private $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    public function validateBoard(Board $board, string $requestContent)
    {
        if (!$requestContent) {
            return false;
        }

        $data = json_decode($requestContent, true);

        if (!isset($data['title'])) {
            return false;
        }

        $board->setTitle(trim($data["title"]));
        $errors = $this->validator->validate($board);

        if (count($errors) > 0) {
            return false;
        }

        return true;
    }
}