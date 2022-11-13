using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ModernPantryBackend.Migrations
{
    public partial class productDates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AddDate",
                table: "Products",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpieryDate",
                table: "Products",
                type: "datetime2",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Dairy" },
                    { 2, "Alcochol" },
                    { 3, "Bread" },
                    { 4, "Fruid" },
                    { 5, "Vegetables" },
                    { 6, "Conserves" }
                });

            migrationBuilder.InsertData(
                table: "Pantries",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "My Pantry 1" },
                    { 2, "My Pantry 2" },
                    { 3, "Our Pantry" },
                    { 4, "Very Nice Storehouse" }
                });

            migrationBuilder.InsertData(
                table: "PantriesUsers",
                columns: new[] { "PantryId", "UserId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 1 },
                    { 3, 1 },
                    { 3, 2 },
                    { 4, 2 }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "AddDate", "Count", "ExpieryDate", "Name", "PantryId" },
                values: new object[,]
                {
                    { 1, new DateTime(2022, 11, 13, 14, 53, 56, 812, DateTimeKind.Local).AddTicks(4291), null, null, "Goat Milk", 1 },
                    { 2, new DateTime(2022, 11, 13, 14, 53, 56, 812, DateTimeKind.Local).AddTicks(4338), 6, null, "Mocny Full", 1 }
                });

            migrationBuilder.InsertData(
                table: "CategoriesProducts",
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 1, 1 });

            migrationBuilder.InsertData(
                table: "CategoriesProducts",
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[] { 2, 2 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "CategoriesProducts",
                keyColumns: new[] { "CategoryId", "ProductId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "CategoriesProducts",
                keyColumns: new[] { "CategoryId", "ProductId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "PantriesUsers",
                keyColumns: new[] { "PantryId", "UserId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "PantriesUsers",
                keyColumns: new[] { "PantryId", "UserId" },
                keyValues: new object[] { 2, 1 });

            migrationBuilder.DeleteData(
                table: "PantriesUsers",
                keyColumns: new[] { "PantryId", "UserId" },
                keyValues: new object[] { 3, 1 });

            migrationBuilder.DeleteData(
                table: "PantriesUsers",
                keyColumns: new[] { "PantryId", "UserId" },
                keyValues: new object[] { 3, 2 });

            migrationBuilder.DeleteData(
                table: "PantriesUsers",
                keyColumns: new[] { "PantryId", "UserId" },
                keyValues: new object[] { 4, 2 });

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Pantries",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Pantries",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Pantries",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Pantries",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DropColumn(
                name: "AddDate",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ExpieryDate",
                table: "Products");
        }
    }
}
