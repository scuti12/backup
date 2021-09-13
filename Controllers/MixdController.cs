using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TNOnlinesss.Libs.ConnectRel;
using TNOnlinesss.Models;

namespace TNOnlinesss.Controllers
{
    [Route("api/[controller]"), ApiController]
    public class MixdController : Controller
    {
        private IConfiguration _config;
        private IdbMain _IdbMain;
        private readonly ILogger _logger;
        //private readonly IHubContext<MessageHub> _hubContext;
        public MixdController(IConfiguration config, IdbMain idbMain, ILogger<string> logger)
        {
            _config = config;
            _IdbMain = idbMain;
            _logger = logger;
            //_hubContext = hubContext;
        }


        [Route("cd"), HttpGet]
        public List<combo> worktype(int ProID, int prm1, int prm2, string prm3)
        {
            return _IdbMain.tn_cbox_data(ProID, prm1, prm2, prm3);
        }
    }
}
