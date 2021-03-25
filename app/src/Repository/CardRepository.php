<?php

namespace App\Repository;

use App\Entity\Board;
use App\Entity\Card;
use App\Entity\Table;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Card|null find($id, $lockMode = null, $lockVersion = null)
 * @method Card|null findOneBy(array $criteria, array $orderBy = null)
 * @method Card[]    findAll()
 * @method Card[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CardRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Card::class);
    }

    /**
     * @param Table $table
     * @return mixed
     * @throws NoResultException
     * @throws NonUniqueResultException
     */
    public function findMaxPlaceValueOfCard(Table $table)
    {
        $queryBuilder = $this->createQueryBuilder('s');

        return $queryBuilder->select('max(s.place)')
            ->where('s.table = :id')
            ->setParameter('id', $table)
            ->getQuery()
            ->getSingleScalarResult()
        ;
    }

    /**
     * @param Table $table
     * @return array
     */
    public function findCardsByPlace(Board $board)
    {
        $queryBuilder = $this->createQueryBuilder('c');

        return $queryBuilder->select('c.id, c.text, c.place, t.id as list_id')
            ->innerJoin('c.table', 't')
            ->innerJoin('t.board', 'b')
            ->where('b.id = :id')
            ->setParameter('id', $board)
            ->getQuery()
            ->getArrayResult()
        ;
    }
}
