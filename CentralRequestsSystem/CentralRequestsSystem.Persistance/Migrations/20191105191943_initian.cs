using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CentralRequestsSystem.Persistance.Migrations
{
    public partial class initian : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Requests",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserAdress = table.Column<string>(nullable: true),
                    IdentityProviderAdress = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    Payload = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Requests", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Requests");
        }
    }
}
