namespace CentralRequestsSystem.BaseTests
{
    public abstract class CentralRequestsSystemBaseTest<T> where T : class
    {
        protected T sut;

        public CentralRequestsSystemBaseTest() 
            => InitSut();

        public abstract void InitSut();
    }
}
