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
                    PantryId = table.Column<int>(type: "int", nullable: false),
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
                    table.ForeignKey(
                        name: "FK_PantryInvites_Pantries_PantryId",
                        column: x => x.PantryId,
                        principalTable: "Pantries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "AddDate",
                value: new DateTime(2022, 12, 24, 14, 47, 37, 710, DateTimeKind.Local).AddTicks(5252));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "AddDate",
                value: new DateTime(2022, 12, 24, 14, 47, 37, 710, DateTimeKind.Local).AddTicks(5292));

            migrationBuilder.CreateIndex(
                name: "IX_PantryInvites_PantryId",
                table: "PantryInvites",
                column: "PantryId");

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
