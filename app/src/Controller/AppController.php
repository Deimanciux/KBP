<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Security("is_granted('ROLE_USER')")
 */
class AppController extends AbstractController
{
    /**
     * @Route("/", name="index_page")
     * @throws
     */
    public function index()
    {
        return $this->render('app/app.html.twig', []);
    }
}
