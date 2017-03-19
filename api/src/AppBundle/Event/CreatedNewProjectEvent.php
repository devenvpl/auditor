<?php

namespace AppBundle\Event;

class CreatedNewProjectEvent implements EventInterface
{
    private $id;
    private $added;
    private $name;

    public function __construct(int $id, \DateTime $added, string $name)
    {
        $this->id = $id;
        $this->added = $added;
        $this->name = $name;
    }

    public function id() : int
    {
        return $this->id;
    }

    public function added() : \DateTime
    {
        return $this->added;
    }

    public function name() : string
    {
        return $this->name;
    }
}