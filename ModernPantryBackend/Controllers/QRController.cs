using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace ModernPantryBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QRController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _qrApiLink;

        public QRController(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _qrApiLink = configuration["QrApiLink"];
        }

        [HttpGet]
        public async Task<ServiceResponse> GetQR(string url)
        {
            var request = _qrApiLink + url;
            var response = await _httpClient.GetByteArrayAsync(request);
            return ServiceResponse<byte[]>.Success(response, "Qr code generated.");
        }
    }
}
