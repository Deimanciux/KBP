<?php

namespace App\Controller;

use App\Entity\Board;
use App\Form\BoardType;
use App\Service\BoardPageService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Security("is_granted('ROLE_USER')")
 */
class BoardsPageController extends AbstractController
{
    /**
     * @Route("/", name="index_page")
     * @param Request $request
     * @param BoardPageService $boardPageService
     * @return Response
     */
    public function index(Request $request, BoardPageService $boardPageService)
    {
        $user = $this->getUser();
        $repository = $this->getDoctrine()->getRepository(Board::class);

        $images = $boardPageService->findImages('/var/www/project/assets/images');

        $board = new Board();
        $form = $this->createForm(BoardType::class, $board, ['images' => $images]);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            $board = $form->getData();
            $board->setUser($user);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($board);
            $entityManager->flush();

            return $this->redirectToRoute('index_page');
        }

        if($form->isSubmitted() && !$form->isValid()) {
            echo 'suds';
        }

        return $this->render('boards-page/boards-page.html.twig', [
            'boards' => $repository->findBy(['user' => $user]),
            'form' => $form->createView(),
            'images' => $images
        ]);
    }

    /**
     * @Route("/board", name="add_board", methods={"POST"})
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function addBoard(Request $request) {
        $board = new Board();
        $form = $this->createForm(BoardType::class, $board);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            $board = $form->getData();
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($board);
            $entityManager->flush();

            return $this->redirectToRoute('index_page');
        }

        return $this->render('boards-page/_board-form-modal.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
