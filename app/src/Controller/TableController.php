<?php

namespace App\Controller;

use App\Entity\Board;
use App\Entity\Table;
use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/table")
 * @Security("is_granted('ROLE_USER')", message="Access denied")
 */
class TableController extends AbstractController
{
    /**
     * @Route("/{id}", name="get_tables", methods={"GET"})
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
        ]);
    }

    /**
     * @Route("/edit/{id}", name="edit_table", methods={"PUT"})
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
     * @Route("/add/{id}", name="add_table", methods={"POST"})
     */
    public function addTable(Board $board, Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $table = new Table();
        $table->setTableTitle($data['title']);
        $table->setBoard($board);

        $em = $this->getDoctrine()->getManager();
        $em->persist($table);
        $em->flush();

        return $this->json(['success' => true], Response::HTTP_ACCEPTED);
    }

    /**
     * @Route("/delete/{id}", name="delete_table", methods={"DELETE"})
     */
    public function deleteTable(Table $table)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($table);
        $em->flush();

        return $this->json(['success' => true], Response::HTTP_ACCEPTED);
    }
}