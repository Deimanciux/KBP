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
//    /**
//     * @Route("/", name="get_boards", methods={"GET"})
//     */
//    public function getBoards()
//    {
//        $repository = $this->getDoctrine()->getRepository(Board::class);
//        $boards = $repository->findAll();
//
//        return $this->json (
//          [
//              'data' => array_map(function(Board $item) {
//                  return [
//                      'id' => $item->getId(),
//                      'title' => $item->getBoardTitle()
//                  ];
//              }, $boards)
//          ]
//        );
//    }

    /**
     * @Route("/get/{id}", name="board_by_id", methods={"GET"})
     * @param Board $board
     * @return JsonResponse
     */
    public function boardById(Board $board)
    {
        return $this->json([
                'id' => $board->getId(),
                'title' => $board->getBoardTitle()
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
        $board->setBoardTitle(trim($title));

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        return $this->json(['success' => true], Response::HTTP_ACCEPTED);
    }
}
