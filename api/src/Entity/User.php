<?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Table(name="user_account")
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ApiResource(
 *     normalizationContext={"groups"={"user_get"}}
 * )
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user_get", "project_get"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"user_get"})
     */
    private $email;

    private $plain_password;

    /**
     * @ORM\Column(type="json")
     * @Groups({"user_get"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProjectUser", mappedBy="agent", orphanRemoval=true)
     * @Groups({"user_get"})
     */
    private $projectUsers;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Project", mappedBy="publisher", orphanRemoval=true)
     * @Groups({"user_get"})
     */
    private $projects;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project_get", "user_get"})
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"project_get", "user_get"})
     */
    private $lastname;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Tag", inversedBy="users")
     * @Groups({"user_get"})
     */
    private $tags;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"user_get"})
     */
    private $isAdmin;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_get"})
     */
    private $status;

    public function __construct()
    {
        $this->projects = new ArrayCollection();
        $this->projectUsers = new ArrayCollection();
        $this->tags = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection|Project[]
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): self
    {
        if (!$this->projects->contains($project)) {
            $this->projects[] = $project;
            $project->setPublisher($this);
        }

        return $this;
    }

    public function removeProject(Project $project): self
    {
        if ($this->projects->contains($project)) {
            $this->projects->removeElement($project);
            // set the owning side to null (unless already changed)
            if ($project->getPublisher() === $this) {
                $project->setPublisher(null);
            }
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
            $projectUser->setAgent($this);
        }

        return $this;
    }

    public function removeProjectUser(ProjectUser $projectUser): self
    {
        if ($this->projectUsers->contains($projectUser)) {
            $this->projectUsers->removeElement($projectUser);
            // set the owning side to null (unless already changed)
            if ($projectUser->getAgent() === $this) {
                $projectUser->setAgent(null);
            }
        }

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plain_password;
    }

    public function setPlainPassword(string $plain_password): self
    {
        $this->plain_password = $plain_password;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

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

    public function getIsAdmin(): ?bool
    {
        return $this->isAdmin;
    }

    public function setIsAdmin(bool $isAdmin): self
    {
        $this->isAdmin = $isAdmin;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): self
    {
        $this->status = $status;

        return $this;
    }
    /**
     * @ORM\PrePersist
     */
    public function setDefaultStatus()
    {
        $this->status = 'free';
    }
}
