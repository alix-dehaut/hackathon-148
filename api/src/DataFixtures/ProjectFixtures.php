<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Project;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class ProjectFixtures extends Fixture implements DependentFixtureInterface
{
    public const ARBITRARY_NBR_PROJECT= 10;
    public const PREFIX_PROJECT_NAME = "Project-";
    private $status = ['PENDING','ONGOING','DONE'];

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create();
        for ($i = 0; $i < self::ARBITRARY_NBR_PROJECT; $i++) {
            $project = new Project();
            $project->setName($faker->sentence(3));
            $project->setDescription($faker->paragraph(10));
            $project->setStatus($faker->randomElement(Project::STATUS));
            $project->setPublisher($this->getReference(sprintf(
                '%s%d',
                UserFixtures::PREFIX_USER_NAME,
                $faker->numberBetween(0, UserFixtures::ARBITRARY_NBR_USER - 1)
            )));

            $this->addReference(self::PREFIX_PROJECT_NAME.$i, $project);

            $manager->persist($project);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class,
//            TagFixtures::class
        ];
    }
}
