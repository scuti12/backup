using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TNOnlinesss.Libs.ConnectRel;
using TNOnlinesss.Models;
using TNOnlinesss.Models.IB;

namespace TNOnlinesss.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : Controller
    {
        private IConfiguration _config;
        private IdbMain _IdbMain;
        private readonly ILogger _logger;
        private string fileName;

        public RequestController(IConfiguration config, IdbMain idbMain, ILogger<string> logger)
        {
            _config = config;
            _IdbMain = idbMain;
            _logger = logger;
        }

        [Route("reqdata"), HttpGet]
        public List<Request> cus(int ProID, int UserID, int prm1, int prm2, string prm3, string prm4)
        {
            return _IdbMain.tn_req_data_list(ProID, UserID, prm1, prm2, prm3, prm4);
        }
        
        [Route("rqedata"), HttpGet]
        public List<Rqelecinfo> rqedata(int ProID, int RqID, int prm1, int prm2, string prm3, string prm4, int UserID)
        {
            return _IdbMain.tn_req_elecinf_list(ProID, RqID, prm1, prm2, prm3, prm4, UserID);
        }
        [Route("rqfdata"), HttpGet]
        public List<Rqfile> rqfdata(int ProID, int RqID, int prm1, int prm2, string prm3, string prm4, int UserID)
        {
            return _IdbMain.tn_req_file_list(ProID, RqID, prm1, prm2, prm3, prm4, UserID);                   

        }
        
       



        [HttpPost, Route("rqop")]
        public Req rqop(Request rq, string UserID, int opType)
        {
            _logger.LogInformation("rqID==========" + rq.rqID);
            return _IdbMain.tn_req_data_iud(rq.rqID, rq.cusID, rq.iwID, rq.usID, rq.artype, rq.reqtype, rq.Ctidtxt, rq.Tnnum,rq.Tnognoo, rq.Oreason, rq.Tnreason, rq.TnrID, rq.Uadetail, rq.Zdetail, rq.rlName, rq.rfName, rq.rNumber,rq.rpNumber, rq.remail, rq.relType, rq.relTypeName, UserID, opType);
        }
        [HttpPost, Route("rqeop")]
        public Req rqeop(Rqelecinfo rqe, int opType)
        {
            _logger.LogInformation("rqID==========" + rqe.rqID);
            return _IdbMain.tn_req_elecinf_iud(rqe.reID,rqe.rqID,rqe.maxs,rqe.pwID,rqe.ehID,rqe.pcoef,rqe.UserID, opType);
        }




        [HttpPost, Route("rqfop")]
        public Req rqfop([FromForm] Rqfile rqf, int opType)
        {
            _logger.LogInformation("rqID==========" + rqf.files.FileName);
            if (rqf.files != null)
            {
                var file = rqf.files;
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
                    fileName = Guid.NewGuid().ToString() + Path.GetExtension(rqf.files.FileName);
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
            return _IdbMain.tn_req_file_iud(rqf.rfID, rqf.rqID, rqf.sfID, rqf.iwID, rqf.Huudas, rqf.Dugaar, Convert.ToDateTime(rqf.Ognoo), rqf.Descr, rqf.filePath, rqf.UserID, opType);
        }

        //sefile ---------------------------------------------------------------------------------------------------

        [HttpPost, Route("setfile")]
        public Req setfile(setfile set, int opType)
        {
            return _IdbMain.tn_setfile_iud(set.docID,set.adType, set.docName, set.sfID, set.iwID, set.chID, set.useID, set.reasonID, set.custype, set.dpnType, set.hdocType, opType);
        }



    }
}




//[HttpPost, Route("rqop")]
//public Req rqop(string rqID, string cusID, string iwID, string usID, string arID, string reqtype, string Ctidtxt, string Tnnum, string Tnognoo, string Oreason, string Tnreason, string TnrID, string Uadetail, string Zdetail,string UserID, int opType)
//{
//    _logger.LogInformation("iwID==========", iwID);
//    return _IdbMain.tn_req_data_iud(rqID, cusID, iwID, usID, arID, reqtype, Ctidtxt, Tnnum, Tnognoo, Oreason, Tnreason, TnrID, Uadetail, Zdetail, UserID, opType);
//}