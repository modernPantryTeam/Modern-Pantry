namespace ModernPantryBackend.Services
{
    public class ServiceResponse
    {
        public bool SuccessStatus { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public string Message { get; set; }

        public ServiceResponse(bool successStatus, HttpStatusCode statusCode, string message)
        {
            SuccessStatus = successStatus;
            StatusCode = statusCode;
            Message = message;
        }

        public static ServiceResponse Error(string message = "", HttpStatusCode statusCode = HttpStatusCode.UnprocessableEntity)
        {
            return new ServiceResponse(false, statusCode, message);
        }

        public static ServiceResponse Success(string message = "", HttpStatusCode statusCode = HttpStatusCode.OK)
        {
            return new ServiceResponse(true, statusCode, message);
        }

        public static explicit operator ObjectResult(ServiceResponse v)
        {
            throw new NotImplementedException();
        }
    }

    public class ServiceResponse<T> : ServiceResponse
    {
        public T Content { get; set; }

        public ServiceResponse(bool success, HttpStatusCode statusCode, string message, T content) : base(success, statusCode, message)
        {
            Content = content;
        }

        public static ServiceResponse<T> Error(T content, string message = "", HttpStatusCode statusCode = HttpStatusCode.UnprocessableEntity)
        {
            return new ServiceResponse<T>(false, statusCode, message, content);
        }

        public static ServiceResponse<T> Success(T content, string message = "", HttpStatusCode statusCode = HttpStatusCode.OK)
        {
            return new ServiceResponse<T>(true, statusCode, message, content);
        }
    }
}
