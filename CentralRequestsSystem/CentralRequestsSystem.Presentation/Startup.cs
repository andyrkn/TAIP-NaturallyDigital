using CentralRequestsSystem.Business.Request;
using CentralRequestsSystem.Core;
using CentralRequestsSystem.Persistance;
using CentralRequestsSystem.Persistance.RequestData;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CentralRequestsSystem.Presentation
{
    public class Startup
    {
        public Startup(IConfiguration configuration) 
            => Configuration = configuration;

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDbContext<CentralRequestsSystemContext>(options =>
                options.UseSqlServer(@"Server=BEAN\SQLEXPRESS;Database=CentralRequestsSystem;Integrated Security=True"));


            services.AddTransient<IRequestRepository, RequestsRepository>();
            services.AddTransient<IRequestService, RequestService>();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
