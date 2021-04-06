<?php

namespace App\Controller\Api;

use App\Entity\Board;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/board")
 */
class BoardController extends AbstractController
{
    /**
     * @Route("/get/{id}", name="board_by_id", methods={"GET"})
     * @param Board $board
     * @return JsonResponse
     */
    public function boardById(Board $board)
    {
        return $this->json([
                'id' => $board->getId(),
                'title' => $board->getTitle()
            ]
        );
    }

    /**
     * @Route("/{id}", name="edit_title", methods={"PATCH"})
     * @param Board $board
     * @param Request $request
     * @return JsonResponse
     */
    public function edit(Board $board, Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $title = $data['title'];
        $board->setTitle(trim($title));

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        return $this->json(['success' => true], Response::HTTP_ACCEPTED);
    }
}