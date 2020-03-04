<?php

declare(strict_types=1);

namespace App\DataFixtures;


use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
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
            $user->setFirstname($faker->firstName);
            $user->setLastname($faker->lastName);
            $user->setEmail($faker->email);
            $user->setPlainPassword('password');
            $user->setRoles($faker->randomElements($this->roles, $count=1));

            $this->addReference(self::PREFIX_USER_NAME.$i, $user);

            $manager->persist($user);
        }

        $manager->flush();
    }

}
