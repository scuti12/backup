using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TNOnlinesss.Models.IB
{
    public class Rqfile
    {
        public string rfID { get;set;}
        public string rqID { get; set; }
        public string sfID { get; set; }
        public string iwID { get; set; }
        public string UserID { get; set; }


        public string filePath { get; set; }
        public string Huudas { get; set; }
        public string Dugaar { get; set; }
        public DateTime? Ognoo { get; set; }
        public string Descr { get; set; }
        public string sfName { get; set; }
        public string iwName { get; set; }
        public IFormFile files { get; set; }
        public string hvtype { get; set; }

 // setfile ------------------------------------------------------------------------
                                                                    
        public string docID { get; set; }
        public string adType { get; set; }
        public string docName { get; set; }      
        public string chID { get; set; }
        public string useID { get; set; }
        public string reasonID { get; set; }
        public string custype { get; set; }
        public string dpnType { get; set; }
        public string hdocType { get; set; }


        
        
    }
}
