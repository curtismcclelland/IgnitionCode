using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAgentPro.Migrations
{
    public partial class FixedPrimaryDriverpropertyinVehiclemodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_Vehicles_VehicleVehiceId",
                table: "Drivers");

            migrationBuilder.DropIndex(
                name: "IX_Drivers_VehicleVehiceId",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "VehicleVehiceId",
                table: "Drivers");

            migrationBuilder.AddColumn<int>(
                name: "PrimaryDriverDriverId",
                table: "Vehicles",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_PrimaryDriverDriverId",
                table: "Vehicles",
                column: "PrimaryDriverDriverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Drivers_PrimaryDriverDriverId",
                table: "Vehicles",
                column: "PrimaryDriverDriverId",
                principalTable: "Drivers",
                principalColumn: "DriverId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Drivers_PrimaryDriverDriverId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_PrimaryDriverDriverId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "PrimaryDriverDriverId",
                table: "Vehicles");

            migrationBuilder.AddColumn<int>(
                name: "VehicleVehiceId",
                table: "Drivers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_VehicleVehiceId",
                table: "Drivers",
                column: "VehicleVehiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Drivers_Vehicles_VehicleVehiceId",
                table: "Drivers",
                column: "VehicleVehiceId",
                principalTable: "Vehicles",
                principalColumn: "VehiceId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
