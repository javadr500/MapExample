using System;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Map.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using File = Map.Domain.File;

namespace Map.Controllers.v1
{
    public class FileController : BaseController
    {
        private readonly MapDBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public FileController(
            MapDBContext dbContext,
            IMapper mapper,
            IWebHostEnvironment webHostEnvironment
        )
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }


        [HttpGet("[action]/{fileId}")]
        public async Task<ActionResult> Download(Guid fileId)
        {

            var dbFile = await _dbContext.Files.SingleOrDefaultAsync(x => x.FileId == fileId);
            if (dbFile != null)
            {
                var pth = System.IO.Path.Combine(_webHostEnvironment.ContentRootPath, "images");
                if (System.IO.Directory.Exists(pth) == false)
                    System.IO.Directory.CreateDirectory(pth);

                var filePath = Path.Combine(pth, dbFile.FileName);

                return File(System.IO.File.ReadAllBytes(filePath), "image/jpg");

            }

            return BadRequest();
        }


        [HttpPost("[action]")]
        public async Task<AppResult> Upload(IFormFile file)
        {

            var pth = System.IO.Path.Combine(_webHostEnvironment.ContentRootPath, "images");
            if (System.IO.Directory.Exists(pth) == false)
                System.IO.Directory.CreateDirectory(pth);

            if (file.Length > 0)
            {
                var newId = Guid.NewGuid();
                var ext = Path.GetExtension(file.FileName);

                var dbFile = new File()
                {
                    FileId = newId,
                    FileExtention = ext,
                    FileName = newId + ext,
                    DisplayFileName = file.FileName,
                    FileLength = file.Length
                };

                await _dbContext.Files.AddAsync(dbFile);
                await _dbContext.SaveChangesAsync();


                var filePath = Path.Combine(pth, dbFile.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                return SuccessfullMessage(dbFile.FileId);

            }

            return ErrorMessage("Error");
        }



    }
}