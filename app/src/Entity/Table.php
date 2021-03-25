<?php

namespace App\Entity;

use App\Repository\TableRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=TableRepository::class)
 * @ORM\Table(name="`table`")
 */
class Table
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     * @Assert\NotBlank()
     * @Assert\Length(min=1, max=100)
     */
    private $title;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Board", inversedBy="tables")
     * @ORM\JoinColumn(nullable=false)
     */
    private $board;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Card", mappedBy="table")
     */
    private $cards;

    /**
     * @ORM\Column(type="integer", length=2)
     * @Assert\NotBlank()
     * @Assert\Length(min=1, max=30)
     */
    private $place;

    public function __construct()
    {
        $this->cards = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return Board
     */
    public function getBoard(): Board
    {
        return $this->board;
    }

    /**
     * @return Collection
     */
    public function getCards(): Collection
    {
        return $this->cards;
    }

    /**
     * @param Board $board
     */
    public function setBoard(Board $board): void
    {
        $this->board = $board;
    }

    /**
     * @param ArrayCollection $cards
     */
    public function setCards(ArrayCollection $cards): void
    {
        $this->cards = $cards;
    }

    public function getPlace(): ?string
    {
        return $this->place;
    }

    public function setPlace($place): self
    {
        $this->place = $place;

        return $this;
    }
}
