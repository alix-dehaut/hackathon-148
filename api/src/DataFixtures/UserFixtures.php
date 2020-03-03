<?php

declare(strict_types=1);

namespace App\DataFixtures;


use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class UserFixtures extends Fixture
{
    public const ARBITRARY_NBR_USER= 10;
    public const PREFIX_USER_NAME = "User-";
    private $roles = ['ADMIN', 'USER'];


    public function load(ObjectManager $manager)
    {
        $faker = Factory::create();
        for ($i = 0; $i < self::ARBITRARY_NBR_USER; $i++) {
            $user = new User();
            $user->setEmail($faker->email);
            $user->setPassword('password');
            $user->setRoles($faker->randomElements($this->roles, $count=1));
//            $user->addProject($this->getReference(sprintf(
//                '%s%d',
//                ProjectFixtures::PREFIX_PROJECT_NAME,
//                $faker->numberBetween(0, ProjectFixtures::ARBITRARY_NBR_PROJECT - 1)
//            )));


            $this->addReference(self::PREFIX_USER_NAME.$i, $user);

            $manager->persist($user);
        }

        $manager->flush();
    }
}
