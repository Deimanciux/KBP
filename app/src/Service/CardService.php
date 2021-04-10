<?php

namespace App\Service;

use App\Entity\Card;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CardService
{
    /**
     * @var ValidatorInterface
     */
    private $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    public function validateCard(Card $card, string $requestContent)
    {
        if (!$requestContent) {
            return false;
        }

        $data = json_decode($requestContent, true);

        if (!isset($data['text'])) {
            return false;
        }

        $card->setText(trim($data["text"]));
        $card->setPlace(1);
        $errors = $this->validator->validate($card);

        if (count($errors) > 0) {
            return false;
        }

        return true;
    }
}
