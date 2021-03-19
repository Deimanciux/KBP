<?php

namespace App\Controller;

use App\Entity\Board;
use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Log\DebugLoggerInterface;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/board")
 */
class BoardController extends AbstractController
{
    /**
     * @Route("/", name="get_boards", methods={"GET"})
     */
    public function getBoards()
    {
        $repository = $this->getDoctrine()->getRepository(Board::class);
        $boards = $repository->findAll();

        return $this->json (
          [
              'data' => array_map(function(Board $item) {
                  return [
                      'id' => $item->getId(),
                      'title' => $item->getBoardTitle()
                  ];
              }, $boards)
          ]
        );
    }

    /**
     * @Route("/{id}", name="board_by_id", methods={"GET"})
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
     * @Route("/{id}", name="edit_title", methods={"PUT"})
     * @param Board $board
     * @param Request $request
     * @return JsonResponse
     */
    public function edit(Board $board, Request $request, LoggerInterface $logerInterface)
    {
//        $title = $request->request->get('title');

        $data = json_decode($request->getContent(), true);
        $title = $data['title'];
        $logerInterface->critical($title);
        $board->setBoardTitle(trim($title));

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        return $this->json(['success' => true], Response::HTTP_ACCEPTED);
    }
}
