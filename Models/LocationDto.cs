using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Map.Domain;
using NetTopologySuite.Geometries;

namespace Map.Models
{
    public class LocationDto
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LocationId { get; set; }
        public string Name { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public DateTimeOffset Date { get; set; }
        public byte LocationTypeId { get; set; }
        public string LocationTypeName { get; set; }

        public Guid LogoId { get; set; }


    }
}
