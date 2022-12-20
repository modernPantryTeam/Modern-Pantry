using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ModernPantryBackend.Migrations
{
    public partial class pantryInvites : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PantryInvites",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SenderId = table.Column<int>(type: "int", nullable: false),
                    RecieverId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PantryInvites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PantryInvites_AspNetUsers_RecieverId",
                        column: x => x.RecieverId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PantryInvites_AspNetUsers_SenderId",
                        column: x => x.SenderId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "3365acdc-aa8c-404d-8ca5-6dd0a925a686");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "5f01dce5-9751-499f-906d-44e08ebbdb32");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "3fef616d-fb48-46ea-9544-74d7c8f134ad");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "AddDate",
                value: new DateTime(2022, 12, 12, 16, 59, 2, 992, DateTimeKind.Local).AddTicks(3051));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "AddDate",
                value: new DateTime(2022, 12, 12, 16, 59, 2, 992, DateTimeKind.Local).AddTicks(3090));

            migrationBuilder.CreateIndex(
                name: "IX_PantryInvites_RecieverId",
                table: "PantryInvites",
                column: "RecieverId");

            migrationBuilder.CreateIndex(
                name: "IX_PantryInvites_SenderId",
                table: "PantryInvites",
                column: "SenderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PantryInvites");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "537187f1-d417-4876-8725-8824460317ef");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "af031251-e824-4619-b6bd-bf756c7a787d");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 3,
                column: "ConcurrencyStamp",
                value: "dd5be391-8e03-4b6c-b33b-613fe8eb5789");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "AddDate",
                value: new DateTime(2022, 11, 27, 14, 43, 55, 937, DateTimeKind.Local).AddTicks(2212));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "AddDate",
                value: new DateTime(2022, 11, 27, 14, 43, 55, 937, DateTimeKind.Local).AddTicks(2248));
        }
    }
}
