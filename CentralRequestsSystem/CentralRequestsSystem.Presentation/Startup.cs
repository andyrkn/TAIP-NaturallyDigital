using CentralRequestsSystem.Business.RequestBusiness;
using CentralRequestsSystem.Core;
using CentralRequestsSystem.Persistance;
using CentralRequestsSystem.Persistance.RequestData;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.IO;
using System;

namespace CentralRequestsSystem.Presentation
{
    public class Startup
    {
        public Startup(IConfiguration configuration) 
            => Configuration = configuration;

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                 {
                     policy.AllowAnyOrigin();
                     policy.AllowAnyHeader();
                     policy.AllowAnyMethod();
                 });
            });

            services.AddMvc();

            services.AddSwaggerGen(config =>
            {
                config.SwaggerDoc("v1", new OpenApiInfo { Title = "Central Request System API", Version = "1.0" });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                config.IncludeXmlComments(xmlPath);
            });

            services.AddControllers();
            services.AddDbContext<CentralRequestsSystemContext>(options =>
                options.UseSqlServer(@"Server=BEAN\SQLEXPRESS;Database=CentralRequestsSystem;Integrated Security=True"));


            services.AddTransient<IRequestReadRepository, ReadRequestsRepository>();
            services.AddTransient<IRequestWriteRepository, WriteRequestsRepository>();

            services.AddTransient<IRequestService, RequestService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();

            app.UseCors("AllowAll");
            app.UseSwagger();
            app.UseSwaggerUI(config =>
                config.SwaggerEndpoint("/swagger/v1/swagger.json", "Central Request System"));

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
