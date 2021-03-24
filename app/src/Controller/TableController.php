<?php

namespace App\Controller;

use App\Entity\Board;
use App\Entity\Table;
use Psr\Log\LoggerInterface;
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
        $tables = $repository->findBy(['board' => $board]);

        return $this->json([
            "data" => array_map(function (Table $item) {
                return [
                    "id" => $item->getId(),
                    "title" => $item->getTableTitle()
                ];
            }, $tables)
        ],
        200,
        ["Content-Type: application/json"]
        );
    }

    /**
     * @Route("/{id}", name="edit_table", methods={"PATCH"})
     * @param Table $table
     * @param Request $request
     * @param LoggerInterface $logger
     * @return JsonResponse
     */
    public function editTable(Table $table, Request $request, LoggerInterface $logger)
    {
        $data = json_decode($request->getContent(), true);

        $title = $data['title'];

        $table->setTableTitle(trim($title));

        $em = $this->getDoctrine()->getManager();
        $em->flush();

        return $this->json(['success' => true], Response::HTTP_ACCEPTED);
    }

    /**
     * @Route("/{id}", name="add_table", methods={"POST"})
     * @param Board $board
     * @param Request $request
     * @param LoggerInterface $logger
     * @return JsonResponse
     */
    public function addTable(Board $board, Request $request, LoggerInterface $logger)
    {
        $repository = $this->getDoctrine()->getRepository(Table::class);
        $maxPlace = $repository->findMaxPlaceValueOfTable($board);

        $data = json_decode($request->getContent(), true);
        $table = new Table();
        $table->setTableTitle($data['title']);
        $table->setBoard($board);
        $table ->setPlace((int)$maxPlace + 1);

        $em = $this->getDoctrine()->getManager();
        $em->persist($table);
        $em->flush();

        return $this->json([
                "id" => $table->getId(),
                "title" => $table->getTableTitle(),
                'place' => $table->getPlace()
            ],
            200,
            ["Content-Type: application/json"]
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
