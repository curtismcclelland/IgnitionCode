using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAgentPro.Migrations
{
    public partial class Discounts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Discounts",
                columns: table => new
                {
                    State = table.Column<string>(maxLength: 2, nullable: false),
                    DaytimeRunningLights = table.Column<decimal>(nullable: false),
                    AntilockBrakes = table.Column<decimal>(nullable: false),
                    LowAnnualMileage = table.Column<decimal>(nullable: false),
                    PassiveRestraints = table.Column<decimal>(nullable: false),
                    AntitheftInstalled = table.Column<decimal>(nullable: false),
                    HighDaysDrivenPerWeek = table.Column<decimal>(nullable: false),
                    LowMilesDrivenToWork = table.Column<decimal>(nullable: false),
                    ReduceUse = table.Column<decimal>(nullable: false),
                    GarageAddressDifferent = table.Column<decimal>(nullable: false),
                    LowDrivingExperience = table.Column<decimal>(nullable: false),
                    PreviousCarrierLizard = table.Column<decimal>(nullable: false),
                    PreviousCarrierPervasive = table.Column<decimal>(nullable: false),
                    RecentMovingViolations = table.Column<decimal>(nullable: false),
                    RecentClaims = table.Column<decimal>(nullable: false),
                    MultiCar = table.Column<decimal>(nullable: false),
                    YoungDriver = table.Column<decimal>(nullable: false),
                    SafeDrivingSchool = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discounts", x => x.State);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Discounts");
        }
    }
}
