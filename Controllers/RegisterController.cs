using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TNOnlinesss.Libs;
using TNOnlinesss.Libs.ConnectRel;
using TNOnlinesss.Models;

namespace TNOnlinesss.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private IConfiguration _config;
        private IdbMain _IdbMain;
        private readonly ILogger _logger;


        public RegisterController(IConfiguration config, IdbMain idbMain, ILogger<string> logger)
        {
            _config = config;
            _IdbMain = idbMain;
            _logger = logger;
        }

        [HttpPost, Route("reg")]
        public Req reg(User usr, int opType)
        {
            return _IdbMain.sys_user_iud(usr.userID, usr.lName, usr.fName, usr.RegNum, usr.Email, usr.PhoneNum,usr.cusType, ctrlHelper.UCompress(usr.userPassword), 1, 1, 1, usr.Regwtype, 1, opType) ;
        }

        //setfile -------------------------------------------------------------------------------------------------------------
        
 

        [Route("usdata"), HttpGet]
        public List<User> cus(int ProID, int UserID, int prm1, int prm2, string prm3, string prm4)
        {
            return _IdbMain.sys_user_list(ProID, UserID, prm1, prm2, prm3, prm4);
        }
        


    }
}
