using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ModernPantryBackend.Migrations
{
    public partial class pantryCreationDateAndProductDeleteFlag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Pantries",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "6acd8468-64d0-4a32-a0c7-434de543dc85");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "b42db042-cf09-424f-bf61-218621de36da");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "850d42ab-5337-401a-8416-5053f1095985");

            migrationBuilder.UpdateData(
                table: "Pantries",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2023, 1, 1, 16, 51, 38, 749, DateTimeKind.Local).AddTicks(2504));

            migrationBuilder.UpdateData(
                table: "Pantries",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2023, 1, 1, 16, 51, 38, 749, DateTimeKind.Local).AddTicks(2545));

            migrationBuilder.UpdateData(
                table: "Pantries",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2023, 1, 1, 16, 51, 38, 749, DateTimeKind.Local).AddTicks(2548));

            migrationBuilder.UpdateData(
                table: "Pantries",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2023, 1, 1, 16, 51, 38, 749, DateTimeKind.Local).AddTicks(2549));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "AddDate",
                value: new DateTime(2023, 1, 1, 16, 51, 38, 749, DateTimeKind.Local).AddTicks(2603));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "AddDate",
                value: new DateTime(2023, 1, 1, 16, 51, 38, 749, DateTimeKind.Local).AddTicks(2606));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Pantries");

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
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "AddDate",
                value: new DateTime(2022, 12, 31, 15, 46, 43, 729, DateTimeKind.Local).AddTicks(6997));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "AddDate",
                value: new DateTime(2022, 12, 31, 15, 46, 43, 729, DateTimeKind.Local).AddTicks(7036));
        }
    }
}
