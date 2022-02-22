using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace erp.Migrations
{
    public partial class Add_Pages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "pages");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "pages");

            migrationBuilder.AddColumn<int>(
                name: "Code",
                table: "pages",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Libelle",
                table: "pages",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LibelleAR",
                table: "pages",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LibelleFR",
                table: "pages",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Observation",
                table: "pages",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UID",
                table: "pages",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "pages");

            migrationBuilder.DropColumn(
                name: "Libelle",
                table: "pages");

            migrationBuilder.DropColumn(
                name: "LibelleAR",
                table: "pages");

            migrationBuilder.DropColumn(
                name: "LibelleFR",
                table: "pages");

            migrationBuilder.DropColumn(
                name: "Observation",
                table: "pages");

            migrationBuilder.DropColumn(
                name: "UID",
                table: "pages");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "pages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "pages",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: false,
                defaultValue: "");
        }
    }
}
