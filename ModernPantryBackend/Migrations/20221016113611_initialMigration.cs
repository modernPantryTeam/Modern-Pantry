using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ModernPantryBackend.Migrations
{
    public partial class initialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SecondTestModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SecondTestModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TestModels",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SecondTestModelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestModels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TestModels_SecondTestModels_SecondTestModelId",
                        column: x => x.SecondTestModelId,
                        principalTable: "SecondTestModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.InsertData(
                table: "SecondTestModels",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "N1" });

            migrationBuilder.InsertData(
                table: "SecondTestModels",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "N2" });

            migrationBuilder.InsertData(
                table: "TestModels",
                columns: new[] { "Id", "Name", "SecondTestModelId" },
                values: new object[] { 1, "T1", 1 });

            migrationBuilder.InsertData(
                table: "TestModels",
                columns: new[] { "Id", "Name", "SecondTestModelId" },
                values: new object[] { 2, "T2", 2 });

            migrationBuilder.CreateIndex(
                name: "IX_TestModels_SecondTestModelId",
                table: "TestModels",
                column: "SecondTestModelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TestModels");

            migrationBuilder.DropTable(
                name: "SecondTestModels");
        }
    }
}
