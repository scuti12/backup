
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Telerik.Reporting;
using Telerik.Reporting.Cache.File;
using Telerik.Reporting.Services;
using Telerik.Reporting.Services.AspNetCore;
using Telerik.Reporting.Services.Engine;

namespace TNOnlinesss.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ReportsControllerBase
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        public ReportsController(IReportServiceConfiguration reportServiceConfiguration, IWebHostEnvironment env)
           : base(reportServiceConfiguration)
        {
            _hostingEnvironment = env;
            
            //reportServiceConfiguration = new ReportServiceConfiguration {
            //    HostAppId = "Html5DemoApp",
            //    Storage = new FileStorage(),
            //    ReportSourceResolver = new MyResolver()
            //};


        }
        public class MyResolver : IReportSourceResolver
        {
            public ReportSource Resolve(string report, OperationOrigin operationOrigin, IDictionary<string, object> currentParameterValues)
            {
                Report reportInstance = new Report();
                if (report.Contains(""))
                {
                    (reportInstance.DataSource as SqlDataSource).ConnectionString = "";
                }
                return new InstanceReportSource { ReportDocument= reportInstance };
            }
        }
        [HttpGet("reportlist")]
        public IEnumerable<string> GetReports()
        {
            return Directory
                .GetFiles(Path.Combine(_hostingEnvironment.ContentRootPath,"Reports"))
                .Select(path =>
                    Path.GetFileName(path));
        }

        //protected override HttpStatusCode SendMailMessage(MailMessage mailMessage)
        //{
        //    throw new System.NotImplementedException("This method should be implemented in order to send mail messages");
        //    //using (var smtpClient = new SmtpClient("smtp01.mycompany.com", 25))
        //    //{
        //    //    smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
        //    //    smtpClient.EnableSsl = false;

        //    //    smtpClient.Send(mailMessage);
        //    //}
        //    //return HttpStatusCode.OK;
        //}
    }
}
