using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.IO;
using System.Reflection;
using System.Text;
using WebAgentPro.Data;
using WebAgentPro.Models;

namespace WebAgentPro
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IHostingEnvironment env)
        {
            #region CONFIGURATION     Load configuration from appsettings.json files
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
            #endregion
        }


        public void ConfigureServices(IServiceCollection services)
        {
            #region CONFIGURATION           Allow injection of IConfiguration into controllers
            services.AddSingleton<IConfiguration>(Configuration);
            #endregion

            #region AUTOMAPPER              Map between DTOs and Entities
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            #endregion

            #region CORS                    Allow access from other domains
            services.AddCors();
            #endregion

            #region Controllers     Configure to ignore loops in object models and to validate new API rules
            services.AddControllers().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
//            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            #endregion

            #region JWT AUTHENTICATION      Turn on and configure JWT Beara Token Authentication
            ConfigureJwtAuthentication(services);
            #endregion

            #region SWAGGER                 Provide a Swagger endpoint for your API
            services.AddSwaggerGen(c =>
              {
                  c.SwaggerDoc("v1", new OpenApiInfo { Title = "Web Agent Pro", Version = "v1" });

                  var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                  var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                  c.IncludeXmlComments(xmlPath);
              });
            #endregion

            #region DATABASE               Register and seed your database
            var connectionString = Configuration.GetConnectionString("WebAgentPro");
            services.AddDbContext<WapDbContext>(config => config.UseSqlServer(connectionString));

            services.AddTransient<WapDbSeeder>();
            #endregion

            #region IDENTITY                Configure ASP.NET Identity to use your DbContext and ApplicationUser
            services.AddIdentity<WapUser, IdentityRole>()
                      .AddEntityFrameworkStores<WapDbContext>();
            #endregion

            #region SPA STATIC FILES        Configure location of Angular runtime files
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "dist/web-agent-pro-client";
            });
            #endregion
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            #region CORS
            app.UseCors(x => x
                            .WithOrigins(new string[] { "http://localhost:8888", "http://localhost:4200" })
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials());
            #endregion

            app.UseAuthentication();       
            
            app.UseRouting();

           app.UseHttpsRedirection();

           app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                this.CreateRoutes(endpoints);
                endpoints.MapControllers(); 
            });

            #region SWAGGER
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Web Agent Pro");
            });
            #endregion

            #region SPA
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    //Use this to have VS start an instance of the Angular CLI.                     
                    //spa.UseAngularCliServer(npmScript: "start");

                    //Use this to avoid having VS start an instance of the Angular CLI every time you hit F5. You will need to run your own instance with the ng serve command.
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
            #endregion

        }

        void CreateRoutes(IEndpointRouteBuilder enpoints) // <--
        {
            enpoints.MapControllerRoute( // <--
              "Events",
              string.Concat("{moniker}/{controller=Root}/{action=Index}/{id?}")
              );

            enpoints.MapControllerRoute( // <--
               "Default",
              "{controller=Root}/{action=Index}/{id?}"
            );

        }

        private void ConfigureJwtAuthentication(IServiceCollection services)
        {
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<string>("Tokens:Key")));

            services.AddAuthentication(builder =>
            {
                builder.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                builder.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };

                options.Validate();
            });
        }
    }
}
