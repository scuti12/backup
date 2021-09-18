branch1
﻿using TNOnlinesss.Libs;
//using Ibas;
//using Ibas.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TNOnlinesss.Models;
using TNOnlinesss.Libs.ConnectRel;
using TNOnlinesss.Models.IB;

namespace TNOnlinesss.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

     public class AuthController : ControllerBase
        {
            private IConfiguration _config;
            private IdbMain _IdbMain;
            private readonly ILogger _logger;
            //private readonly IHubContext<MessageHub> _hubContext;
            readonly ITokenService _tokenService;


            /////public AuthController(IConfiguration config, IdbMain idbMain, ILogger<string> logger, IHubContext<MessageHub> hubContext, ITokenService tokenService)
            public AuthController(IConfiguration config, IdbMain idbMain, ILogger<string> logger,  ITokenService tokenService)
             {
                _config = config;
                _IdbMain = idbMain;
                _logger = logger;
                //_hubContext = hubContext;
                _tokenService = tokenService;
            }



            [HttpPost, Route("login")]
            public IActionResult Login( Models.User user)
            {
                //_logger.LogInformation(ctrlHelper.UCompress(user.UserPassword));
                //_logger.LogInformation("==UNAme:" + user.userName + "URole===" + user.roleID);

                if (user == null)
                {
                    return BadRequest("Invalid client request");
                }



                Req rq = _IdbMain.sys_userlogin(user.userName, ctrlHelper.UCompress(user.userPassword), user.uMac, user.uAddr, user.uHostName);
                _logger.LogInformation(JsonSerializer.Serialize(rq));
                if (rq.ret == 0)
                {
                    ////Menu bolon hergelgch ner*************************************************************************************************
                    //var items = _IdbMain.ser_menu_data_by_usr(user.usr, user.dom);
                    //Action<Menus> SetChildren = null;
                    //SetChildren = parent =>
                    //{
                    //    parent.Children = items
                    //        .Where(childItem => childItem.PSMenuID == parent.SMenuID)
                    //        .ToList();
                    //    //Recursively call the SetChildren method for each child.
                    //    parent.Children
                    //            .ForEach(SetChildren);
                    //};
                    ////Initialize the hierarchical list to root level items
                    //List<Menus> hierarchicalItems = items
                    //    .Where(rootItem => rootItem.PSMenuID == 0)
                    //    .ToList();
                    ////Call the SetChildren method to set the children on each root level item.
                    //hierarchicalItems.ForEach(SetChildren);
                    //user.menus = hierarchicalItems;
                    //user.hname = _IdbMain.GetComboValues("", -1, "").Result.Where(x => x.val == user.dom).FirstOrDefault().name;



                    string retoken = _tokenService.GenerateRefreshToken();
                     _IdbMain.tn_check_refresh_iud(user.userName, retoken, DateTime.Now.AddDays(5), user.dom);


                        
                return Ok(new
                    {
                        
                        user = JsonSerializer.Serialize(user),
                        Token = _tokenService.GenerateAccessToken(new List<Claim>() {new Claim(ClaimTypes.Name, user.userName),new Claim(ClaimTypes.Role,  user.roleID.ToString()) }),
                        refreshToken = retoken,
                        dbmsg = rq.msg
                        //Token = "TestToken"+ user.userName+rq.subRet,                        

                    });
                }
                else
                {
                //return Ok(new { dbmsg= rq.msg });
                 return BadRequest( new { dbmsg= rq.msg });
                 //return Unauthorized();
                }
            }

        [HttpPost, Route("refresh")]
        public IActionResult Refresh(TokenApiModel tokenApiModel)
        {
            _logger.LogInformation("-----------REFRESH INfo:");

            if (tokenApiModel is null)
            {
                return BadRequest("Invalid client request");
            }
            var principal = _tokenService.GetPrincipalFromExpiredToken(tokenApiModel.AccessToken);
            var username = principal.Identity.Name;
            var user = _IdbMain.tn_check_refresh(principal.Identity.Name, "", 2, principal.Claims.Where(x => x.Type == ClaimTypes.Role).FirstOrDefault().Value).FirstOrDefault();

            if (user == null || user.refreshToken != tokenApiModel.refreshToken || user.refreshTokenExpire <= DateTime.Now)
            {
                return BadRequest("Invalid client request");
            }
            var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims.ToList());
            string retoken = _tokenService.GenerateRefreshToken();
            var date = DateTime.Now.AddDays(5);
            //_IdbMain.ser_check_refresh_iud(username, retoken, date, principal.Claims.Where(x => x.Type == ClaimTypes.Role).FirstOrDefault().Value);
            //_logger.LogInformation("tokenre");
            return new ObjectResult(new
            {
                accessToken = newAccessToken,
                refreshToken = retoken,
                refreshTokenExpire = date
            });
        }

        /*
         
        


        /*
            [Route("revoke"), HttpPost, Authorize]
            public IActionResult Revoke()
            {
                var username = User.Identity.Name;

                //var user = userContext.LoginModels.SingleOrDefault(u => u.UserName == username);
                //if (user == null) return BadRequest();

                //user.RefreshToken = null;

                //userContext.SaveChanges();

                return NoContent();
            }
            [HttpGet]
            [Route("doms")]
            public List<Urs> doms(string dom)
            {
                return _IdbMain.ser_user_list_by_dom(dom);
            }
            [HttpGet]
            [Route("GetCombos")]
            public async Task<ActionResult<List<combo>>> GetCombos(string param, int state, string dom)
            {
                //_logger.LogInformation(dom);
                //await _hubContext.Clients.All.SendAsync(GroupTypes.dcmeter, "хш");
                return await _IdbMain.GetComboValues(param, state, dom);
            }

            [Route("ser"), HttpPost]
            public IActionResult ser(ser_response ser)
            {
                _logger.LogInformation("test:" + JsonSerializer.Serialize(ser));
                Req rq = _IdbMain.ser_response_uid(ser);
                if (rq.ret == 0)
                {
                    Req rq1 = _IdbMain.ser_cusmeter_power_iud(rq.Ccode, ser.meterSer, ser.resObis, DateTime.Now, ser.resValue, _IdbMain.ser_get_user_by_msgid(ser.msgID), rq.dom);
                }
                return rq.ret == 0 ? Ok(rq.msg) : BadRequest(rq.msg);
            }
            [Route("combos"), HttpGet, Authorize]
            public async Task<ActionResult<List<combo>>> combos(string param, int state)
            {
                //_logger.LogInformation(dom);
                //await _hubContext.Clients.All.SendAsync(GroupTypes.dcmeter, "хш");
                return await _IdbMain.GetComboValues(param, state, User.FindFirst(ClaimTypes.Role).Value);
            }

            [Route("serobg"), HttpGet, Authorize]
            public ActionResult<List<obg>> ser_obg(int obgID, int state)
            {
                //_logger.LogInformation(dom);
                //await _hubContext.Clients.All.SendAsync(GroupTypes.dcmeter, "хш");
                return _IdbMain.ser_obg_list(obgID, state);
            }

            [Route("users"), HttpGet, Authorize]
            public List<user> users()
            {
                //_logger.LogInformation(dom);
                //await _hubContext.Clients.All.SendAsync(GroupTypes.dcmeter, "хш");
                return _IdbMain.ser_user_list(User.FindFirst(ClaimTypes.Role).Value);
            }
            [Route("glist"), HttpGet, Authorize]
            public List<guide> glist()
            {
                return _IdbMain.fp_guide_list(-1, -1, -1, "", 1);
            }
            [Route("gedit"), HttpPost, Authorize]
            public Req fp_guide_iud(guide guide)
            {
                return _IdbMain.fp_guide_iud(guide);
            }
            [Route("menubyusr"), HttpGet, Authorize]
            public List<Menus> get(string usr)
            {
                var items = _IdbMain.ser_menu_data_by_usr(usr, User.FindFirst(ClaimTypes.Role).Value);
                Action<Menus> SetChildren = null;
                SetChildren = parent =>
                {
                    parent.Children = items
                        .Where(childItem => childItem.PSMenuID == parent.SMenuID)
                        .ToList();
                    //Recursively call the SetChildren method for each child.
                    parent.Children
                            .ForEach(SetChildren);
                };
                //Initialize the hierarchical list to root level items
                List<Menus> hierarchicalItems = items
                    .Where(rootItem => rootItem.PSMenuID == 0)
                    .ToList();
                //Call the SetChildren method to set the children on each root level item.
                hierarchicalItems.ForEach(SetChildren);
                return hierarchicalItems;
            }
            [Route("getmoduls"), HttpGet, Authorize]
            public List<modul> getmoduls()
            {
                return _IdbMain.sb_get_moduls(User.FindFirst(ClaimTypes.Role).Value);
            }
            [Route("cumenu"), HttpPost, Authorize]
            public Req cumenu([FromBody] Menus m, [FromQuery] int optype)
            {
                return _IdbMain.ser_menu_data_accept(m, User.Identity.Name, optype, User.FindFirst(ClaimTypes.Role).Value);
            }
            [Route("utom"), HttpGet, Authorize]
            public Req utom(string GUsr, string SUsr)
            {
                return _IdbMain.ser_menu_usr_to_usr(GUsr, SUsr, User.Identity.Name, User.FindFirst(ClaimTypes.Role).Value);
            }
        */
    }
  
}
