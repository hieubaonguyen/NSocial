using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddSeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "values",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Value1" });

            migrationBuilder.InsertData(
                table: "values",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "Value2" });

            migrationBuilder.InsertData(
                table: "values",
                columns: new[] { "Id", "Name" },
                values: new object[] { 3, "Value3" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "values",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "values",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "values",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
