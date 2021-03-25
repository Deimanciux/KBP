<?php

namespace App\Repository;

use App\Entity\Board;
use App\Entity\Table;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Table|null find($id, $lockMode = null, $lockVersion = null)
 * @method Table|null findOneBy(array $criteria, array $orderBy = null)
 * @method Table[]    findAll()
 * @method Table[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TableRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Table::class);
    }

    /**
     * @param Board $board
     * @return mixed
     * @throws NoResultException
     * @throws NonUniqueResultException
     */
    public function findMaxPlaceValueOfTable(Board $board)
    {
        $queryBuilder = $this->createQueryBuilder('s');

        return $queryBuilder->select('max(s.place)')
            ->where('s.board = :id')
            ->setParameter('id', $board)
            ->getQuery()
            ->getSingleScalarResult()
        ;
    }

    /**
     * @param Board $board
     * @return array
     */
    public function findTablesByPlace(Board $board)
    {
        $queryBuilder = $this->createQueryBuilder('s');

        return $queryBuilder->select('s')
            ->where('s.board = :id')
            ->setParameter('id', $board)
            ->orderBy('s.place', 'ASC')
            ->getQuery()
            ->getArrayResult()
        ;
    }
}
