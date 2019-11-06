using System;

namespace CentralRequestsSystem.Core
{
    public abstract class Entity
    {

        public Guid Id { get;  private set; }

        protected Entity()
            => Id = Guid.NewGuid();
    }
}
