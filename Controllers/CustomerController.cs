using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using TNOnlinesss.Libs.ConnectRel;
using TNOnlinesss.Models;
using TNOnlinesss.Models.IB;

namespace TNOnlinesss.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private IConfiguration _config;
        private IdbMain _IdbMain;
        private readonly ILogger _logger;

        private static IWebHostEnvironment _WebHostEnvironment;
        private static IHostingEnvironment _IHostingEnvironment;

        private string fileName;



        public CustomerController(IConfiguration config, IdbMain idbMain, ILogger<string> logger, IWebHostEnvironment WebHostEnvironment, IHostingEnvironment IHostingEnvironment)
        {
            _config = config;
            _IdbMain = idbMain;
            _logger = logger;
            _WebHostEnvironment = WebHostEnvironment;
            _IHostingEnvironment = IHostingEnvironment;


        }


        [Route("cus"), HttpGet]
        public List<Customer> cus(int ProID, int CusID, int prm1, int prm2, string prm3, string prm4)
        {
            _logger.LogInformation("===================Get customer list:");

            // _logger.LogInformation(User.FindFirst(ClaimTypes.Role).Value);
            //if (tempParam.val9 == "0")
            //{
            //    return _IdbMain.ser_cus_meter_conncet_list(tempParam.val1, tempParam.val2, User.FindFirst(ClaimTypes.Role).Value);
            //}
            //else
            //{
            //    return _IdbMain.ser_cus_payment_disconnect_load(tempParam.val1, tempParam.val2, Convert.ToInt32(tempParam.val3), Convert.ToDouble(tempParam.val4), User.FindFirst(ClaimTypes.Role).Value);
            //}
            return _IdbMain.tn_cus_list( ProID,  CusID,  prm1,  prm2,  prm3,  prm4);
        }



        [HttpPost, Route("cusiud")]
        public Req cusiud([FromForm] Customer cus,int opType)
        {
      
            //_logger.LogInformation("FileName===" + cus.files.FileName);
            //_logger.LogInformation("PATH1===" + _IHostingEnvironment.WebRootPath + " ==, " + _IHostingEnvironment.ContentRootPath+ "\\Files\\Images\\");
            //_logger.LogInformation("PATH2===" + _WebHostEnvironment.WebRootPath + " ==, " + _WebHostEnvironment.ContentRootPath+ "\\Files\\Images\\");

            if (cus.files != null)
            {
                var file = cus.files;
                //var folderName = Path.Combine("Files", "Images");
                var folderName = "Files\\Images\\";
                var folderPath = "Files/Images/";
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory() + "\\" + folderName);


                if (!Directory.Exists(Directory.GetCurrentDirectory() + folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }


                if (file.Length > 0)
                {
                     fileName = Guid.NewGuid().ToString() + Path.GetExtension(cus.files.FileName);
                    var fullPath = Path.Combine(pathToSave, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
            }
            else
            {
                fileName = string.Empty;
            }


  
            return _IdbMain.tn_cus_iud(cus.cusID, cus.lName, cus.fName, cus.phoneNum, cus.email, cus.cusType, fileName, opType);

        }

        private string GetUniqueFileName(string fileName)
        {
            fileName = Path.GetFileName(fileName);
            return Path.GetFileNameWithoutExtension(fileName)
                   + "_"
                   + Guid.NewGuid().ToString().Substring(0, 4)
                   + Path.GetExtension(fileName);
        }


        [HttpGet]
        [Route("download")]
        public async Task<IActionResult> Download([FromQuery] string file)
        {
            var uploads = Path.Combine(_IHostingEnvironment.WebRootPath, "\\Files\\Images\\");
            var filePath = Path.Combine(uploads, file);
            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            return File(memory, GetContentType(filePath), file);
        }

        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }

    }
}
