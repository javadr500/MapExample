using Map.Infrastructure;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Map.Controllers
{
    [Produces("application/json")]
    [Route("api/v1/[controller]")]
    //[EnableCors("CorsPolicy")]
    public class BaseController : ControllerBase
    {
        protected AppResult SuccessfullResult(object data = null)
        {
            var result = new AppResult {Success = true, Data = data};
            return result;
        }


        protected AppResult SuccessfullMessage(object data = null)
        {
            var result = new AppResult
            {
                Success = true,
                Data = data
            };

            return result;
        }

        protected AppResult ErrorMessage(string message, object data = null)
        {
            var result = new AppResult
            {
                Success = false,
                Data = data,
                Description = message
            };

            return result;
        }
    }
}