using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Map.Domain
{
    public class File
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Guid FileId { get; set; }
        public string DisplayFileName { get; set; }
        public string FileName { get; set; }
        public string FileExtention { get; set; }
        public long FileLength { get; set; }


        public ICollection<Location> Locations { get; set; }
    }
}