using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Map.Infrastructure
{
    public class AppResult
    {
        public object Data { get; set; }
        public bool Success { get; set; }
        public string Description { get; set; }




    }
}
