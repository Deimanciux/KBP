<?php

namespace App\Controller;

use App\Entity\Card;
use App\Entity\Table;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/card")
 * @Security("is_granted('ROLE_USER')", message="Access denied")
 */
class CardController extends AbstractController
{
    /**
     * @Route("/{id}", name="get_cards", methods={"GET"})
     */
    public function getAllCardsByTable(Table $table)
    {
        $repository = $this->getDoctrine()->getRepository(Card::class);
        $cards = $repository->findBy(['table' => $table]);

        return $this->json(
            [
                "data" => array_map(function(Card $item) {
                return [
                    "id" => $item->getId(),
                    "text" => $item->getText()
                ];
                }, $cards)
            ]
        );
    }

    /**
     * @Route("/edit/{id}", name="edit_card", methods={"PUT"})
     */
    public function editCard(Card $card, Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $card->setText($data["text"]);
        $em = $this->getDoctrine()->getManager();
        $em->flush();

        return $this->json(['success' => true], Response::HTTP_ACCEPTED);
    }

    /**
     * @Route("/delete/{id}", name="delete_card", methods={"DELETE"})
     */
    public function deleteCard(Card $card)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($card);
        $em->flush();

        return $this->json(['success' => true], Response::HTTP_ACCEPTED);
    }

    /**
     * @Route("/add/{id}", name="add_card", methods={"POST"})
     */
    public function addCard(Table $table, Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $card = new Card();
        $card->setText($data["text"]);
        $card->setTable($table);

        $em = $this->getDoctrine()->getManager();
        $em->persist($card);
        $em->flush();

        return $this->json(["success" => true], Response::HTTP_ACCEPTED);
    }
}