<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\ProjectRepository")
 */
class Project
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $status;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\User", mappedBy="project")
     */
    private $creator_id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ProjectUser", inversedBy="project_id")
     * @ORM\JoinColumn(nullable=false)
     */
    private $projectUser;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Tag", inversedBy="projects")
     */
    private $tags;

    public function __construct()
    {
        $this->creator_id = new ArrayCollection();
        $this->tags = new ArrayCollection();
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

    /**
     * @return Collection|User[]
     */
    public function getCreatorId(): Collection
    {
        return $this->creator_id;
    }

    public function addCreatorId(User $creatorId): self
    {
        if (!$this->creator_id->contains($creatorId)) {
            $this->creator_id[] = $creatorId;
            $creatorId->setProject($this);
        }

        return $this;
    }

    public function removeCreatorId(User $creatorId): self
    {
        if ($this->creator_id->contains($creatorId)) {
            $this->creator_id->removeElement($creatorId);
            // set the owning side to null (unless already changed)
            if ($creatorId->getProject() === $this) {
                $creatorId->setProject(null);
            }
        }

        return $this;
    }

    public function getProjectUser(): ?ProjectUser
    {
        return $this->projectUser;
    }

    public function setProjectUser(?ProjectUser $projectUser): self
    {
        $this->projectUser = $projectUser;

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
}
