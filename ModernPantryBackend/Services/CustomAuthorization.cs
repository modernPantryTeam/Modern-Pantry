using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ModernPantryBackend.Services
{


    [AttributeUsage(AttributeTargets.Class)]
    public class CustomAuthorization : Attribute, IAuthorizationFilter
    {


        /// <summary>  
                /// This will Authorize User  
                /// </summary>  
                /// <returns></returns>  
        public void OnAuthorization(AuthorizationFilterContext filterContext)
        {

            if (filterContext != null)
            {
                Microsoft.Extensions.Primitives.StringValues authTokens;
                filterContext.HttpContext.Request.Headers.TryGetValue("Authorization", out authTokens);

                var _token = authTokens.FirstOrDefault();

                if (_token != null)
                {
                    string authToken = _token;
                    if (authToken != null)
                    {
                        if (IsValidToken(authToken))
                        {
                            filterContext.HttpContext.Response.Headers.Add("authToken", authToken);
                            filterContext.HttpContext.Response.Headers.Add("AuthStatus", "Authorized");

                            filterContext.HttpContext.Response.Headers.Add("storeAccessiblity", "Authorized");

                            return;
                        }
                        else
                        {
                            filterContext.HttpContext.Response.Headers.Add("authToken", authToken);
                            filterContext.HttpContext.Response.Headers.Add("AuthStatus", "NotAuthorized");

                            filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                            filterContext.HttpContext.Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "Not Authorized";
                            filterContext.Result = new JsonResult("NotAuthorized")
                            {
                                Value = new
                                {
                                    Status = "Error",
                                    Message = "Invalid Token"
                                },
                            };
                        }

                    }

                }
                else
                {
                    filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.ExpectationFailed;
                    filterContext.HttpContext.Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "Please Provide authToken";
                    filterContext.Result = new JsonResult("Please Provide authToken")
                    {
                        Value = new
                        {
                            Status = "Error",
                            Message = "Please Provide authToken"
                        },
                    };
                }
            }
        }

        public bool IsValidToken(string authToken)
        {
            authToken = authToken.Split(' ').Last();
            var validationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                //ValidIssuer = "http://localhost",
                //ValidAudience = "http://localhost",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("0123456789ABCDEF"))
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken validatedToken = null;
            try
            {
                tokenHandler.ValidateToken(authToken, validationParameters, out validatedToken);
            }
            catch (SecurityTokenException)
            {
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
            //... manual validations return false if anything untoward is discovered
            return validatedToken != null;
        }
    }


}
