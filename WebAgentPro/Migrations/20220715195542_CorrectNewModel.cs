using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAgentPro.Migrations
{
    public partial class CorrectNewModel : Migration
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
                    CreatorEmail = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    RoleID = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    City = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    State = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false),
                    Zip = table.Column<string>(type: "nvarchar(9)", maxLength: 9, nullable: false),
                    Ssn = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LessThan3YearsDriving = table.Column<bool>(type: "bit", nullable: false),
                    PreviousCarrier = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    MovingVioliationInLast5Years = table.Column<bool>(type: "bit", nullable: false),
                    ClaimInLast5Years = table.Column<bool>(type: "bit", nullable: false),
                    ForceMultiCarDiscount = table.Column<bool>(type: "bit", nullable: false),
                    DaytimeRunningLights = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AntilockBrakes = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    LowAnnualMileage = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PassiveRestraints = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AntitheftInstalled = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    HighDaysDrivenPerWeek = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    LowMilesDrivenToWork = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ReduceUse = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    GarageAddressDifferent = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    LowDrivingExperience = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PreviousCarrierLizard = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PreviousCarrierPervasive = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    RecentMovingViolations = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    RecentClaims = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MultiCar = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    YoungDriver = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SafeDrivingSchool = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TotalQuoteMultiplier = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    QuotePrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quotes", x => x.QuoteId);
                });

            migrationBuilder.CreateTable(
                name: "Drivers",
                columns: table => new
                {
                    DriverId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuoteId = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    SSN = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    DriverLicenseNumber = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    DriverLicenseState = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SafeDrivingSchool = table.Column<bool>(type: "bit", nullable: false),
                    QuoteMultiplier = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drivers", x => x.DriverId);
                    table.ForeignKey(
                        name: "FK_Drivers_Quotes_QuoteId",
                        column: x => x.QuoteId,
                        principalTable: "Quotes",
                        principalColumn: "QuoteId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    VehicleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Vin = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    Make = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    Model = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    CurrentValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PrimaryDriverId = table.Column<int>(type: "int", nullable: false),
                    DriverId = table.Column<int>(type: "int", nullable: true),
                    QuoteId = table.Column<int>(type: "int", nullable: false),
                    AnnualMileage = table.Column<int>(type: "int", nullable: false),
                    DaytimeRunningLights = table.Column<bool>(type: "bit", nullable: false),
                    AntilockBrakes = table.Column<bool>(type: "bit", nullable: false),
                    PassiveRestraints = table.Column<bool>(type: "bit", nullable: false),
                    AntiTheft = table.Column<bool>(type: "bit", nullable: false),
                    DaysDrivenPerWeek = table.Column<int>(type: "int", nullable: false),
                    MilesDrivenToWork = table.Column<int>(type: "int", nullable: false),
                    ReducedUsedDiscount = table.Column<bool>(type: "bit", nullable: false),
                    GarageAddressDifferentFromResidence = table.Column<bool>(type: "bit", nullable: false),
                    QuoteMultiplier = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.VehicleId);
                    table.ForeignKey(
                        name: "FK_Vehicles_Drivers_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Drivers",
                        principalColumn: "DriverId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Vehicles_Quotes_QuoteId",
                        column: x => x.QuoteId,
                        principalTable: "Quotes",
                        principalColumn: "QuoteId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_QuoteId",
                table: "Drivers",
                column: "QuoteId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_DriverId",
                table: "Vehicles",
                column: "DriverId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_QuoteId",
                table: "Vehicles",
                column: "QuoteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vehicles");

            migrationBuilder.DropTable(
                name: "Drivers");

            migrationBuilder.DropTable(
                name: "Quotes");
        }
    }
}
