<?php

namespace App\Controller;

use App\Entity\Board;
use App\Entity\Table;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/table")
 */
class TableController extends AbstractController
{
    /**
     * @Route("/{id}", name="get_tables", methods={"GET"})
     * @param Board $board
     * @return JsonResponse
     */
    public function getTablesByBoard(Board $board)
    {
        $repository = $this->getDoctrine()->getRepository(Table::class);
        $tables = $repository->findTablesByPlace($board);

        return $this->json($tables);
    }

    /**
     * @Route("/title/{id}", name="edit_table", methods={"PATCH"})
     * @param Table $table
     * @param Request $request
     * @return JsonResponse
     */
    public function editTable(Table $table, Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $title = $data['title'];

        $table->setTitle(trim($title));

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        return $this->json([
            'id' => $table->getId(),
            'title' => $table->getTitle()
            ]
        );
    }

    /**
     * @Route("/{id}", name="add_table", methods={"POST"})
     * @param Board $board
     * @param Request $request
     * @return JsonResponse
     */
    public function addTable(Board $board, Request $request)
    {
        $repository = $this->getDoctrine()->getRepository(Table::class);
        $maxPlace = $repository->findMaxPlaceValueOfTable($board);

        $data = json_decode($request->getContent(), true);
        $table = new Table();
        $table->setTitle($data['title']);
        $table->setBoard($board);
        $table ->setPlace((int)$maxPlace + 1);

        $em = $this->getDoctrine()->getManager();
        $em->persist($table);
        $em->flush();

        return $this->json([
                "id" => $table->getId(),
                "title" => $table->getTitle(),
                'place' => $table->getPlace()
            ]
        );
    }

    /**
     * @Route("/{id}", name="delete_table", methods={"DELETE"})
     * @param Table $table
     * @return JsonResponse
     */
    public function deleteTable(Table $table)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($table);
        $em->flush();

        return $this->json(['success' => true], Response::HTTP_ACCEPTED);
    }
}
