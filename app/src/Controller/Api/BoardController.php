<?php

namespace App\Controller\Api;

use App\Entity\Board;
use App\Service\BoardService;
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
    public function edit(Board $board, Request $request, BoardService $boardService)
    {
        $data = json_decode($request->getContent(), true);

        if(!$boardService->validateBoard($board, $request->getContent())) {
            return $this->json(['error' => 'There was an error with sent data'], Response::HTTP_BAD_REQUEST);
        }

        if(!$data['title']) {
            return $this->json(['error_message' => 'Requests lacks some data'], Response::HTTP_FORBIDDEN);
        }

        $title = $data['title'];
        $board->setTitle(trim($title));

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        return $this->json(['success' => true], Response::HTTP_ACCEPTED);
    }
}
