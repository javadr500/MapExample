using System;
using System.Collections.Generic;
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
    public class LocationController : BaseController
    {
        private readonly MapDBContext _dbContext;
        private readonly IMapper _mapper;

        public LocationController(MapDBContext dbContext,
            IMapper mapper
            )
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }


        [HttpGet("list")]
        public async Task<AppResult> Get()
        {
            var r = await _dbContext.Locations
                .ProjectTo<LocationDto>(_mapper.ConfigurationProvider)
                .ToArrayAsync();

            return SuccessfullMessage(r);
        }

        [HttpPost]
        public async Task<AppResult> Post([FromBody] LocationDto model)
        {
            if (!ModelState.IsValid)
                throw new MapUnprocessableException(ModelState);

            var dbItem = _mapper.Map<Location>(model);
            dbItem.Date = DateTimeOffset.Now;
            dbItem.GeoLocation = GeometryHelper.CreatePoint(model.Lng, model.Lat);
            await _dbContext.Locations.AddAsync(dbItem);
            await _dbContext.SaveChangesAsync();
            model.LocationId = dbItem.LocationId;
            return SuccessfullMessage(model);
        }

    }


}