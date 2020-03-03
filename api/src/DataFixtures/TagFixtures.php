<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Tag;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class TagFixtures extends Fixture implements DependentFixtureInterface
{
    public const ARBITRARY_NBR_TAG = 10;
    public const PREFIX_TAG_NAME = "Tag-";
    private $tags = ['php','Javascript','Symfony', 'Laravel', 'Wordpress', 'React', 'Angular', 'Designer', 'Marketer', 'Developer'];

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create();
        for ($i = 0; $i < count($this->tags); $i++) {
            $tag = new Tag();
            $label = $faker->randomElement($this->tags);
            $tag->setLabel($label);
            unset($this->tags[array_search($label, $this->tags)]);
            $tag->addProject($this->getReference(sprintf(
                    '%s%d',
                    ProjectFixtures::PREFIX_PROJECT_NAME,
                    $faker->numberBetween(0, ProjectFixtures::ARBITRARY_NBR_PROJECT - 1)
                )));

            $this->addReference(self::PREFIX_TAG_NAME.$i, $tag);

            $manager->persist($tag);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            ProjectFixtures::class,
        ];
    }

}
