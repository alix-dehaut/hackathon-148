<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\ProjectUserRepository")
 */
class ProjectUser
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\User", mappedBy="projectUser")
     */
    private $user_id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Project", mappedBy="projectUser")
     */
    private $project_id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $status;

    public function __construct()
    {
        $this->user_id = new ArrayCollection();
        $this->project_id = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|User[]
     */
    public function getUserId(): Collection
    {
        return $this->user_id;
    }

    public function addUserId(User $userId): self
    {
        if (!$this->user_id->contains($userId)) {
            $this->user_id[] = $userId;
            $userId->setProjectUser($this);
        }

        return $this;
    }

    public function removeUserId(User $userId): self
    {
        if ($this->user_id->contains($userId)) {
            $this->user_id->removeElement($userId);
            // set the owning side to null (unless already changed)
            if ($userId->getProjectUser() === $this) {
                $userId->setProjectUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Project[]
     */
    public function getProjectId(): Collection
    {
        return $this->project_id;
    }

    public function addProjectId(Project $projectId): self
    {
        if (!$this->project_id->contains($projectId)) {
            $this->project_id[] = $projectId;
            $projectId->setProjectUser($this);
        }

        return $this;
    }

    public function removeProjectId(Project $projectId): self
    {
        if ($this->project_id->contains($projectId)) {
            $this->project_id->removeElement($projectId);
            // set the owning side to null (unless already changed)
            if ($projectId->getProjectUser() === $this) {
                $projectId->setProjectUser(null);
            }
        }

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
}
