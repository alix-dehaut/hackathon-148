<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\ProjectUser;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class ProjectUserFixtures extends Fixture implements DependentFixtureInterface
{
    public const ARBITRARY_NBR_USER= 10;
    public const PREFIX_USER_NAME = "ProjectUser-";

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create();
        for ($i = 0; $i < self::ARBITRARY_NBR_USER; $i++) {
            $projectUser = new ProjectUser();
            $projectUser->setAgent($this->getReference(sprintf(
                '%s%d',
                UserFixtures::PREFIX_USER_NAME,
                $faker->numberBetween(0, UserFixtures::ARBITRARY_NBR_USER - 1)
            )));
            $projectUser->setProject($this->getReference(sprintf(
                '%s%d',
                ProjectFixtures::PREFIX_PROJECT_NAME,
                $faker->numberBetween(0, ProjectFixtures::ARBITRARY_NBR_PROJECT - 1)
            )));
            $projectUser->setStatus($faker->randomElement(ProjectUser::STATUS));

            $this->addReference(self::PREFIX_USER_NAME.$i, $projectUser);

            $manager->persist($projectUser);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            ProjectFixtures::class,
            UserFixtures::class
        ];
    }

}
