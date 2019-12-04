using Microsoft.EntityFrameworkCore.Migrations;

namespace CentralRequestsSystem.Persistance.Migrations
{
    public partial class addgranted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Granted",
                table: "Requests",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Granted",
                table: "Requests");
        }
    }
}
