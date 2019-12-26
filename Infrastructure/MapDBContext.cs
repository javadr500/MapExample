using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Map.Domain;
using Microsoft.EntityFrameworkCore;

namespace Map.Infrastructure
{
    public class MapDBContext : DbContext
    {
        public MapDBContext(DbContextOptions<MapDBContext> options)
            : base(options)
        {

        }


        public DbSet<LocationType> LocationTypes { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<File> Files { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Location>(entity =>
            {
                entity.HasOne(ut => ut.LocationType)
                    .WithMany(u => u.Locations)
                    .HasForeignKey(ut => ut.LocationTypeId);

                entity.HasOne(ut => ut.Logo)
                    .WithMany(u => u.Locations)
                    .HasForeignKey(ut => ut.LogoId);
            });

         


        }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            base.OnConfiguring(builder);


        }
    }
}