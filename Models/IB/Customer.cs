using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TNOnlinesss.Models.IB
{
    public class Customer
    {
        public int cusID { get; set; }
        public string lName { get; set; }
        public string fName { get; set; }
        public string phoneNum { get; set; }
        public string email { get; set; }
        public int cusType { get; set; }
        public string csTypeName { get; set; }
        public string regDate { get; set; }
        public IFormFile files { get; set; }
        public string filePath { get; set; }
        public string exsFile { get; set; }
        public int exsFileType { get; set; }
    }
}
