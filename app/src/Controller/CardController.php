<?php

namespace App\Controller;

use App\Entity\Board;
use App\Entity\Card;
use App\Entity\Table;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/card")
 */
class CardController extends AbstractController
{
    /**
     * @Route("/{id}", name="get_cards", methods={"GET"})
     */
    public function getAllCardsByTable(Board $board)
    {
        $repository = $this->getDoctrine()->getRepository(Card::class);
        $cards = $repository->findCardsByPlace($board);

        return $this->json($cards);
    }

    /**
     * @Route("/{id}", name="edit_card", methods={"PATCH"})
     * @param Card $card
     * @param Request $request
     * @return JsonResponse
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
     * @Route("/{id}", name="add_card", methods={"POST"})
     * @param Table $table
     * @param Request $request
     * @return JsonResponse
     */
    public function addCard(Table $table, Request $request)
    {
        $repository = $this->getDoctrine()->getRepository(Card::class);
        $maxPlace = $repository->findMaxPlaceValueOfCard($table);

        $data = json_decode($request->getContent(), true);
        $card = new Card();
        $card->setText($data["text"]);
        $card->setPlace((int)$maxPlace +1);
        $card->setTable($table);

        $em = $this->getDoctrine()->getManager();
        $em->persist($card);
        $em->flush();

        return $this->json([
            'id' => $card->getId(),
            'text' => $card->getText(),
            'place' => $card->getPlace(),
            'list_id' => $card->getTable()->getId()
        ]);
    }

    /**
     * @Route("/{id}", name="delete_card", methods={"DELETE"})
     * @param Card $card
     * @return JsonResponse
     */
    public function deleteCard(Card $card)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($card);
        $em->flush();

        return $this->json(['success' => true], Response::HTTP_ACCEPTED);
    }

    /**
     * @Route("/{card}/table/{table}", name="edit_card_position", methods={"PATCH"})
     * @param Card $card
     * @param Table $table
     * @param Request $request
     * @return JsonResponse
     */
    public function editCardPosition(Card $card, Table $table, Request $request)
    {
        $card->setTable($table);
        $em = $this->getDoctrine()->getManager();
        $em->flush();

        return $this->json([
            'card_id' => $card->getId(),
            'table_id' => $table->getId(),
        ]);
    }
}
