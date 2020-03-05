<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"project_get"}},
 *     denormalizationContext={"groups"={"project_write"}}
 * )
 * @ORM\Entity(repositoryClass="App\Repository\ProjectRepository")
 */
class Project
{
    const STATUS = ['PENDING','ONGOING','DONE'];
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"project_get","user_get"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project_get", "project_write","user_get"})
     */
    private $name;

    /**
     * @ORM\Column(type="string")
     * @Groups({"project_get", "project_write"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project_get", "project_write","user_get"})
     */
    private $status;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Tag", inversedBy="projects")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"project_get"})
     */
    private $tags;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="projects")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"project_get"})
     */
    private $publisher;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProjectUser", mappedBy="project")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"project_get"})
     */
    private $projectUsers;

    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->projectUsers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getPublisher(): ?User
    {
        return $this->publisher;
    }

    public function setPublisher(?User $publisher): self
    {
        $this->publisher = $publisher;

        return $this;
    }

    /**
     * @return Collection|Tag[]
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): self
    {
        if (!$this->tags->contains($tag)) {
            $this->tags[] = $tag;
        }

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        if ($this->tags->contains($tag)) {
            $this->tags->removeElement($tag);
        }

        return $this;
    }

    /**
     * @return Collection|ProjectUser[]
     */
    public function getProjectUsers(): Collection
    {
        return $this->projectUsers;
    }

    public function addProjectUser(ProjectUser $projectUser): self
    {
        if (!$this->projectUsers->contains($projectUser)) {
            $this->projectUsers[] = $projectUser;
            $projectUser->setProject($this);
        }

        return $this;
    }

    public function removeProjectUser(ProjectUser $projectUser): self
    {
        if ($this->projectUsers->contains($projectUser)) {
            $this->projectUsers->removeElement($projectUser);
            // set the owning side to null (unless already changed)
            if ($projectUser->getProject() === $this) {
                $projectUser->setProject(null);
            }
        }

        return $this;
    }
}
