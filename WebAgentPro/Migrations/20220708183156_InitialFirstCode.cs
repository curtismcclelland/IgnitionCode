using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAgentPro.Migrations
{
    public partial class InitialFirstCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Quotes",
                columns: table => new
                {
                    QuoteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuoteDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Zip = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ssn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LessThan3YearsDriving = table.Column<bool>(type: "bit", nullable: false),
                    PreviousCarrier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MovingVioliationInLast5Years = table.Column<bool>(type: "bit", nullable: false),
                    ClaimInLast5Years = table.Column<bool>(type: "bit", nullable: false),
                    ForceMultiCarDiscount = table.Column<bool>(type: "bit", nullable: false),
                    QuoteMultiplier = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    QuotePrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quotes", x => x.QuoteId);
                });

            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    VehiceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Vin = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Make = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Model = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    CurrentValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AnnualMileage = table.Column<int>(type: "int", nullable: false),
                    DaytimeRunningLights = table.Column<bool>(type: "bit", nullable: false),
                    AntilockBrakes = table.Column<bool>(type: "bit", nullable: false),
                    PassiveRestraints = table.Column<bool>(type: "bit", nullable: false),
                    AntiTheft = table.Column<bool>(type: "bit", nullable: false),
                    DaysDrivenPerWeek = table.Column<int>(type: "int", nullable: false),
                    MilesDrivenToWork = table.Column<int>(type: "int", nullable: false),
                    ReducedUsedDiscount = table.Column<bool>(type: "bit", nullable: false),
                    GarageAddressDifferentFromResidence = table.Column<bool>(type: "bit", nullable: false),
                    QuoteMultiplier = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    QuoteId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.VehiceId);
                    table.ForeignKey(
                        name: "FK_Vehicles_Quotes_QuoteId",
                        column: x => x.QuoteId,
                        principalTable: "Quotes",
                        principalColumn: "QuoteId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Drivers",
                columns: table => new
                {
                    DriverId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SSN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DriverLicenseNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DriverLicenseState = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SafeDrivingSchool = table.Column<bool>(type: "bit", nullable: false),
                    QuoteMultiplier = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    QuoteId = table.Column<int>(type: "int", nullable: true),
                    VehicleVehiceId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drivers", x => x.DriverId);
                    table.ForeignKey(
                        name: "FK_Drivers_Quotes_QuoteId",
                        column: x => x.QuoteId,
                        principalTable: "Quotes",
                        principalColumn: "QuoteId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Drivers_Vehicles_VehicleVehiceId",
                        column: x => x.VehicleVehiceId,
                        principalTable: "Vehicles",
                        principalColumn: "VehiceId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_QuoteId",
                table: "Drivers",
                column: "QuoteId");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_VehicleVehiceId",
                table: "Drivers",
                column: "VehicleVehiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_QuoteId",
                table: "Vehicles",
                column: "QuoteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Drivers");

            migrationBuilder.DropTable(
                name: "Vehicles");

            migrationBuilder.DropTable(
                name: "Quotes");
        }
    }
}
