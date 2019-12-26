using System;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Map.Domain;
using Map.Infrastructure;
using Map.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Map.Controllers.v1
{
    public class LocationTypeController : BaseController
    {
        private readonly MapDBContext _dbContext;
        private readonly IMapper _mapper;

        public LocationTypeController(MapDBContext dbContext,
            IMapper mapper
        )
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }


        [HttpGet("list")]
        public async Task<AppResult> Get()
        {
            var r = await _dbContext.LocationTypes
                .ProjectTo<LocationTypeDto>(_mapper.ConfigurationProvider)
                .ToArrayAsync();

            return SuccessfullMessage(r);
        }


    }
}