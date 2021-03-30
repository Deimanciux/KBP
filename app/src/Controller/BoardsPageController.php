<?php

namespace App\Controller;

use App\Entity\Board;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Security("is_granted('ROLE_USER')")
 */
class BoardsPageController extends AbstractController
{
    /**
     * @Route("/", name="index_page")
     * @throws
     */
    public function index()
    {
        $user = $this->getUser();
        $repository = $this->getDoctrine()->getRepository(Board::class);
        $boards = $repository->findBy(['user' => $user]);
        return $this->render('boards-page/boards-page.html.twig', [
            'boards' => $boards
        ]);
    }
}
