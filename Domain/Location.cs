using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using NetTopologySuite.Geometries;

namespace Map.Domain
{
    public class Location
    {

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LocationId { get; set; }
        public string Name{ get; set; }
        public Point GeoLocation { get; set; }


        public DateTimeOffset Date { get; set; }

        public byte LocationTypeId { get; set; }
        [ForeignKey("LocationTypeId")]
        public LocationType LocationType { get; set; }

        public Guid LogoId { get; set; }
        [ForeignKey("LogoId")]
        public File Logo { get; set; }


    }
}
