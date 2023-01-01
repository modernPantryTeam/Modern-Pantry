using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ModernPantryBackend.Migrations
{
    public partial class productRework : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Count",
                table: "Products");

            migrationBuilder.AddColumn<float>(
                name: "Amount",
                table: "Products",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "Unit",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "437fbd8f-d132-40af-ab4c-9f5aa367c2d9");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "30029fcc-b991-40c8-b992-8f7717ca66ad");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "d8c3a9d7-85df-49f5-bf61-f7b50ca1366a");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "Name",
                value: "Fruit");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "AddDate",
                value: new DateTime(2022, 12, 31, 15, 46, 43, 729, DateTimeKind.Local).AddTicks(6997));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AddDate", "Amount" },
                values: new object[] { new DateTime(2022, 12, 31, 15, 46, 43, 729, DateTimeKind.Local).AddTicks(7036), 6f });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Unit",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "7f510fc9-4ae4-42ed-9af3-b3f3f5883324");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "d823dd67-663e-4936-8a1c-d7bb5769870c");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "def8a242-69db-42a8-9f62-097c1cc99b19");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "Name",
                value: "Fruid");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "AddDate",
                value: new DateTime(2022, 12, 24, 14, 47, 37, 710, DateTimeKind.Local).AddTicks(5252));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AddDate", "Count" },
                values: new object[] { new DateTime(2022, 12, 24, 14, 47, 37, 710, DateTimeKind.Local).AddTicks(5292), 6 });
        }
    }
}
