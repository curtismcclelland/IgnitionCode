using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAgentPro.Migrations
{
    public partial class QuoteUpdatedK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "QuoteMultiplier",
                table: "Quotes",
                newName: "YoungDriver");

            migrationBuilder.AlterColumn<string>(
                name: "Zip",
                table: "Quotes",
                type: "nvarchar(9)",
                maxLength: 9,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Quotes",
                type: "nvarchar(2)",
                maxLength: 2,
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<string>(
                name: "State",
                table: "Quotes",
                type: "nvarchar(2)",
                maxLength: 2,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Ssn",
                table: "Quotes",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfBirth",
                table: "Quotes",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<decimal>(
                name: "AntilockBrakes",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "AntitheftInstalled",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "CreatorEmail",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "DaytimeRunningLights",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "GarageAddressDifferent",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "HighDaysDrivenPerWeek",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "LowAnnualMileage",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "LowDrivingExperience",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "LowMilesDrivenToWork",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "MultiCar",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PassiveRestraints",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PreviousCarrierLizard",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "PreviousCarrierPervasive",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "RecentClaims",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "RecentMovingViolations",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "ReduceUse",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "RoleID",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "SafeDrivingSchool",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalQuoteMultiplier",
                table: "Quotes",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AntilockBrakes",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "AntitheftInstalled",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "CreatorEmail",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "DaytimeRunningLights",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "GarageAddressDifferent",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "HighDaysDrivenPerWeek",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "LowAnnualMileage",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "LowDrivingExperience",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "LowMilesDrivenToWork",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "MultiCar",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "PassiveRestraints",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "PreviousCarrierLizard",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "PreviousCarrierPervasive",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "RecentClaims",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "RecentMovingViolations",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "ReduceUse",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "RoleID",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "SafeDrivingSchool",
                table: "Quotes");

            migrationBuilder.DropColumn(
                name: "TotalQuoteMultiplier",
                table: "Quotes");

            migrationBuilder.RenameColumn(
                name: "YoungDriver",
                table: "Quotes",
                newName: "QuoteMultiplier");

            migrationBuilder.AlterColumn<string>(
                name: "Zip",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(9)",
                oldMaxLength: 9);

            migrationBuilder.AlterColumn<bool>(
                name: "Status",
                table: "Quotes",
                type: "bit",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(2)",
                oldMaxLength: 2);

            migrationBuilder.AlterColumn<string>(
                name: "State",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(2)",
                oldMaxLength: 2);

            migrationBuilder.AlterColumn<string>(
                name: "Ssn",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10);

            migrationBuilder.AlterColumn<string>(
                name: "DateOfBirth",
                table: "Quotes",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }
    }
}
