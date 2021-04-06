<?php

namespace App\Controller;

use App\Entity\Board;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MainPageController extends AbstractController
{
    /**
     * @Route("/board/{id}", name="main_page")
     * @param Board $board
     * @return Response
     */
    public function showMainPage(Board $board)
    {
        return $this->render('main-page/main-page.html.twig', [
            'board' => $board
        ]);
    }
}