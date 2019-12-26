using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Map.Infrastructure
{
    public class MapException : System.Exception
    {
        public MapException()
        {
        }

        public MapException(string message) : base(message)
        {
        }
    }


    public class MapBadRequestException : MapException
    {
        public MapBadRequestException() : base("BadRequest")
        {
        }

        public MapBadRequestException(string message) : base(message)
        {
        }
    }



    public class MapUnauthorizedException : MapException
    {
        public MapUnauthorizedException() : base("Unauthorized")
        {
        }

        public MapUnauthorizedException(string message) : base(message)
        {
        }
    }



    public class MapUnprocessableException : MapException
    {
        private readonly ModelStateDictionary _modelState;

        public MapUnprocessableException(ModelStateDictionary modelState)
        {
            _modelState = modelState;
        }

        public ModelStateDictionary GetModelState()
        {
            return _modelState;
        }

        public string[] GetErrors()
        {
            var r = from x in _modelState.Values
                from error in x.Errors
                select error.ErrorMessage;
            return r.ToArray();
        }

    }


}