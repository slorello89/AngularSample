﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OpentokAngular;

namespace OpentokAngular.Migrations
{
    [DbContext(typeof(OpentokContext))]
    partial class OpentokContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3");

            modelBuilder.Entity("OpentokAngular.Room", b =>
                {
                    b.Property<int>("RoomId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("RoomName")
                        .HasColumnType("TEXT");

                    b.Property<string>("SessionId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Token")
                        .HasColumnType("TEXT");

                    b.HasKey("RoomId");

                    b.ToTable("Rooms");
                });
#pragma warning restore 612, 618
        }
    }
}
