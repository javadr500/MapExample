using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Map.Domain
{
    public class LocationType
    {

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public byte LocationTypeId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public ICollection<Location> Locations{ get; set; }

    }
}